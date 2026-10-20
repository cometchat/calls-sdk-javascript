import {
  CometChatCalls,
  type CallSession,
} from '@cometchat/calls-sdk-javascript';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { CallOverlay } from './CallOverlay';
import { CallScreen } from './CallScreen';
import { openCallTabs, type CallTabs } from './call-tabs';
import {
  fetchCallStatus,
  outgoingEndText,
  outgoingEndTextFromServer,
  outgoingRingIsOver,
  ringIsOver,
} from './call-state';
import {
  CallsContext,
  callSettings,
  type CallKind,
  type CallPeer,
  type CallPhase,
  type CallsApi,
  type JoinRequest,
} from './calls-context';
import { startTone, stopTone } from './ringtone';

/**
 * Ringing with the Calls SDK 5.1, the same flow as the iOS and Android samples, so web and
 * mobile users can call each other.
 *
 * Placing a call:
 *   `initiateCall` creates the call, rings the receiver (every member of a group) and prepares
 *   the caller's session, without joining it. The screen says "Calling…" until a callee's device
 *   prepares the session too, which arrives as `onParticipantConnected`: then "Ringing…". The
 *   callee answering arrives as `onParticipantJoined`, and the caller joins. A decline is not
 *   reliably reported, so the call's status is read from the server every 3 s. Cancel is
 *   `endCall('cancelled')`; 45 s without an answer is `endCall('unanswered')`.
 *
 * Receiving a call (the web has no VoIP push):
 *   the call message reaches the open tab over the Chat SDK (`onIncomingCallReceived`). The tab
 *   rings and prepares the session with `connect()` while it rings, so Answer only has to join.
 *   Decline is `endCall('rejected')`; already in a call, a 1:1 call is declined 'busy'. The ring
 *   stops when the caller cancels (a call message, or the prepared session closing) and, as a
 *   backstop, when the server says the call is over. A closed tab does not ring.
 */

/** The caller gives up first, so a mobile callee (60 s ring) never rings for a call already over. */
const RING_TIMEOUT_MS = 45_000;
/** How long an incoming call rings here. */
const INCOMING_TIMEOUT_MS = 60_000;
/** How long "Declined", "No answer" and the like stay up. */
const END_TEXT_MS = 2_000;
/** How long Answer waits for a still-running prepare before joining directly. */
const PREPARE_WAIT_MS = 4_000;
/** How often a ringing call's status is read from the server. */
const RING_CHECK_MS = 3_000;
const LISTENER_ID = 'ringing-sample';

function peerOf(user: CometChat.User | undefined): CallPeer {
  return {
    id: user?.getUid?.() ?? '',
    name: user?.getName?.() || user?.getUid?.() || 'Unknown',
    avatar: user?.getAvatar?.() || undefined,
  };
}

/** Lets an incoming call reach someone looking at another tab. */
function notifyIncoming(peer: CallPeer, type: CallKind): Notification | null {
  if (
    !document.hidden ||
    !('Notification' in window) ||
    Notification.permission !== 'granted'
  ) {
    return null;
  }
  try {
    const n = new Notification(
      `Incoming ${type === 'audio' ? 'voice' : 'video'} call`,
      {
        body: peer.name,
        icon: peer.avatar,
        tag: 'ringing-sample-incoming-call',
        requireInteraction: true,
      },
    );
    n.onclick = () => {
      window.focus();
      n.close();
    };
    return n;
  } catch {
    return null;
  }
}

export function CallProvider({ children }: { children: ReactNode }) {
  const [phase, setPhaseState] = useState<CallPhase>({ kind: 'idle' });
  const [activeCall, setActiveCall] = useState<JoinRequest | null>(null);
  const phaseRef = useRef<CallPhase>(phase);
  const inCallRef = useRef(false);
  const outgoingSessionRef = useRef<CallSession | null>(null);
  // The ringing call's prepared session: Answer joins it, and the caller ending the call through
  // the room closes it.
  const incomingSessionRef = useRef<CallSession | null>(null);
  const incomingPrepareRef = useRef<Promise<CallSession | null> | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notificationRef = useRef<Notification | null>(null);
  const titleRef = useRef<string | null>(null);
  // Each startCall gets a number; an initiateCall resolving for an older one (cancelled while
  // still "Calling…") withdraws its call instead.
  const callSeqRef = useRef(0);
  const tabsRef = useRef<CallTabs | null>(null);

  const setPhase = useCallback((next: CallPhase) => {
    phaseRef.current = next;
    setPhaseState(next);
  }, []);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  const clearAttention = () => {
    stopTone();
    notificationRef.current?.close();
    notificationRef.current = null;
    if (titleRef.current !== null) {
      document.title = titleRef.current;
      titleRef.current = null;
    }
  };

  const toIdle = useCallback(() => {
    clearTimer();
    clearAttention();
    outgoingSessionRef.current = null;
    setPhase({ kind: 'idle' });
  }, [setPhase]);

  /** Lets go of the ringing call's prepared session (not answered here). */
  const releaseIncoming = useCallback((leave = true) => {
    const session = incomingSessionRef.current;
    incomingSessionRef.current = null;
    incomingPrepareRef.current = null;
    if (leave && session) void session.leave();
  }, []);

  const setInCall = useCallback((call: JoinRequest | null) => {
    inCallRef.current = call !== null;
    tabsRef.current?.setInCall(call !== null);
    setActiveCall(call);
  }, []);

  // Other tabs of this app (call-tabs.ts): answered or declined in one = stop ringing in all.
  useEffect(() => {
    const tabs = openCallTabs((sessionId) => {
      const cur = phaseRef.current;
      if (cur.kind === 'incoming' && cur.sessionId === sessionId) {
        releaseIncoming();
        toIdle();
      }
    });
    tabsRef.current = tabs;
    return () => {
      tabs.close();
      tabsRef.current = null;
    };
  }, [toIdle, releaseIncoming]);

  /** Hands an answered call to the call screen. */
  const join = useCallback(
    (request: JoinRequest) => {
      clearTimer();
      clearAttention();
      setPhase({ kind: 'idle' });
      setInCall(request);
    },
    [setPhase, setInCall],
  );

  const endOutgoing = useCallback(
    (endText: string) => {
      const cur = phaseRef.current;
      if (cur.kind !== 'outgoing') return;
      clearTimer();
      clearAttention();
      outgoingSessionRef.current = null;
      setPhase({ ...cur, status: 'ended', endText });
      timerRef.current = setTimeout(() => {
        if (phaseRef.current.kind === 'outgoing') setPhase({ kind: 'idle' });
      }, END_TEXT_MS);
    },
    [setPhase],
  );

  // While a call rings here, check that it still is: an end announced through the caller's room
  // never reaches this tab as a "cancelled" call message.
  const ringingSessionId = phase.kind === 'incoming' ? phase.sessionId : null;
  const ringingIsGroup = phase.kind === 'incoming' && !!phase.groupName;
  useEffect(() => {
    if (!ringingSessionId) return;
    let stopped = false;
    const timer = setInterval(async () => {
      const status = await fetchCallStatus(ringingSessionId);
      if (stopped) return;
      const cur = phaseRef.current;
      if (
        cur.kind === 'incoming' &&
        cur.sessionId === ringingSessionId &&
        ringIsOver(status, ringingIsGroup)
      ) {
        releaseIncoming();
        toIdle();
      }
    }, RING_CHECK_MS);
    return () => {
      stopped = true;
      clearInterval(timer);
    };
  }, [ringingSessionId, ringingIsGroup, toIdle, releaseIncoming]);

  // The same check for our own outgoing call, from the moment it exists. The callee's decline
  // reaches the server at once but nothing pushes it here, and a callee who declines before
  // their device prepared the session never sends onParticipantConnected.
  const outgoingSessionId =
    phase.kind === 'outgoing' && phase.status !== 'ended'
      ? (phase.sessionId ?? null)
      : null;
  useEffect(() => {
    if (!outgoingSessionId) return;
    let stopped = false;
    const timer = setInterval(async () => {
      const endText = outgoingRingIsOver(
        await fetchCallStatus(outgoingSessionId),
      );
      if (stopped || !endText) return; // still ringing, or the status could not be read
      const cur = phaseRef.current;
      if (
        cur.kind === 'outgoing' &&
        cur.status !== 'ended' &&
        cur.sessionId === outgoingSessionId
      ) {
        endOutgoing(endText);
      }
    }, RING_CHECK_MS);
    return () => {
      stopped = true;
      clearInterval(timer);
    };
  }, [outgoingSessionId, endOutgoing]);

  // ---- Placing a call ----

  const startCall = useCallback(
    async (peer: CallPeer, type: CallKind) => {
      if (phaseRef.current.kind !== 'idle' || inCallRef.current) return;
      // A user gesture: the one moment the browser lets us ask, so incoming calls can notify
      // while this tab is in the background later.
      if ('Notification' in window && Notification.permission === 'default') {
        void Notification.requestPermission();
      }
      const seq = ++callSeqRef.current;
      setPhase({ kind: 'outgoing', peer, type, status: 'calling' });
      startTone('ringback');

      const isGroup = !!peer.isGroup;
      const { data, error } = await CometChatCalls.initiateCall(peer.id, {
        type,
        receiverType: isGroup ? 'group' : 'user',
        sessionSettings: callSettings(type, peer.name, !isGroup),
      });

      // Read afresh: the call may have been cancelled during the await.
      const cur = phaseRef.current as CallPhase;
      const stillOurs =
        seq === callSeqRef.current &&
        cur.kind === 'outgoing' &&
        cur.status === 'calling';
      if (!stillOurs) {
        // Cancelled while "Calling…": the call exists now, so withdraw it.
        if (data) void CometChatCalls.endCall(data.sessionId, 'cancelled');
        return;
      }
      if (error || !data) {
        console.warn('initiateCall failed:', error);
        endOutgoing('Call failed');
        return;
      }
      outgoingSessionRef.current = data.session;
      setPhase({ ...cur, sessionId: data.sessionId });
      timerRef.current = setTimeout(() => {
        // A group the caller stops waiting on is withdrawn: "unanswered" is each member's outcome.
        void CometChatCalls.endCall(
          data.sessionId,
          isGroup ? 'cancelled' : 'unanswered',
        );
        endOutgoing('No answer');
      }, RING_TIMEOUT_MS);
    },
    [setPhase, endOutgoing],
  );

  const cancel = useCallback(() => {
    const cur = phaseRef.current;
    if (cur.kind !== 'outgoing') return;
    // endCall also tears down the prepared session.
    if (cur.status !== 'ended' && cur.sessionId)
      void CometChatCalls.endCall(cur.sessionId, 'cancelled');
    callSeqRef.current += 1; // an initiateCall still in flight withdraws itself
    toIdle();
  }, [toIdle]);

  // The callee's device preparing the call, the callee answering, or the far side ending the
  // call, all show up on the caller's prepared session.
  useEffect(() => {
    const offConnected = CometChatCalls.addEventListener(
      'onParticipantConnected',
      (participant) => {
        const cur = phaseRef.current;
        if (
          cur.kind !== 'outgoing' ||
          cur.status !== 'calling' ||
          !cur.sessionId
        )
          return;
        // Not one of our own devices in the room: only a callee ringing counts.
        if (participant.uid === CometChatCalls.getLoggedInUser()?.uid) return;
        setPhase({ ...cur, status: 'ringing' });
      },
    );
    const offJoined = CometChatCalls.addEventListener(
      'onParticipantJoined',
      () => {
        const cur = phaseRef.current;
        // Also while "Calling…": a callee whose prepare failed answers with a direct join.
        if (cur.kind !== 'outgoing' || cur.status === 'ended' || !cur.sessionId)
          return;
        join({
          sessionId: cur.sessionId,
          type: cur.type,
          title: cur.peer.name,
          isPeerCall: !cur.peer.isGroup,
          session: outgoingSessionRef.current ?? undefined,
        });
      },
    );
    const offClosed = CometChatCalls.addEventListener(
      'onConnectionClosed',
      () => {
        const cur = phaseRef.current;
        if (
          cur.kind === 'outgoing' &&
          cur.status !== 'ended' &&
          cur.sessionId
        ) {
          // The close carries no reason: ask the server why before saying "Call ended".
          const { sessionId } = cur;
          void outgoingEndTextFromServer(sessionId).then((text) => {
            const now = phaseRef.current;
            if (
              now.kind === 'outgoing' &&
              now.status !== 'ended' &&
              now.sessionId === sessionId
            )
              endOutgoing(text);
          });
        } else if (cur.kind === 'incoming' && incomingSessionRef.current) {
          // The ringing call's prepared session closed: the caller cancelled or the call ended.
          releaseIncoming(false);
          toIdle();
        }
      },
    );
    return () => {
      offConnected();
      offJoined();
      offClosed();
    };
  }, [setPhase, join, endOutgoing, releaseIncoming, toIdle]);

  // ---- Receiving a call ----

  useEffect(() => {
    CometChat.addCallListener(
      LISTENER_ID,
      new CometChat.CallListener({
        onIncomingCallReceived: (call: CometChat.Call) => {
          const isGroup =
            call.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP;
          const caller =
            (call.getCallInitiator?.() as CometChat.User | undefined) ??
            (call.getSender() as CometChat.User);
          // The Chat SDK also hands the caller their own call message as "incoming".
          if (caller?.getUid?.() === CometChatCalls.getLoggedInUser()?.uid)
            return;
          const sessionId = call.getSessionId();
          // A message delivered late (a sleeping tab, a reconnect) for a call long over.
          const initiatedAt = call.getInitiatedAt?.() ?? 0;
          if (initiatedAt && Date.now() / 1000 - initiatedAt > 60) return;
          // In a call in another tab: that tab tells a 1:1 caller you are busy.
          if (tabsRef.current?.otherTabInCall()) return;
          if (phaseRef.current.kind !== 'idle' || inCallRef.current) {
            // A 1:1 caller is told you are busy. A group call is just not shown: one member
            // being busy must not end it for the others.
            if (!isGroup) void CometChatCalls.endCall(sessionId, 'busy');
            return;
          }
          const peer = peerOf(caller);
          const type: CallKind = call.getType() === 'audio' ? 'audio' : 'video';
          const receiver = call.getReceiver() as
            { getName?: () => string } | undefined;
          const groupName = isGroup
            ? receiver?.getName?.() || 'Group call'
            : undefined;
          setPhase({ kind: 'incoming', peer, type, sessionId, groupName });
          startTone('incoming');
          notificationRef.current = notifyIncoming(peer, type);
          titleRef.current = document.title;
          document.title = `Incoming call · ${peer.name}`;
          timerRef.current = setTimeout(() => {
            releaseIncoming();
            toIdle();
          }, INCOMING_TIMEOUT_MS);

          // Prepare while it rings: Answer then only has to join, and the caller cancelling
          // through the room reaches this tab as onConnectionClosed.
          const prepare = CometChatCalls.connect(
            sessionId,
            callSettings(type, groupName ?? peer.name, !isGroup),
          )
            .then((session) => {
              const cur = phaseRef.current;
              const stillRinging =
                cur.kind === 'incoming' && cur.sessionId === sessionId;
              if (incomingPrepareRef.current !== prepare) {
                // Declined, cancelled or answered elsewhere meanwhile: nobody will join it.
                if (!stillRinging && session.prepareStatus === 'prepared')
                  void session.leave();
                return null;
              }
              if (session.prepareStatus !== 'prepared') return null;
              incomingSessionRef.current = session;
              return session;
            })
            .catch((error) => {
              // Answer falls back to a direct join; the status check keeps watching the ring.
              console.warn('Preparing the incoming call failed:', error);
              return null;
            });
          incomingPrepareRef.current = prepare;
        },
        onIncomingCallCancelled: (call: CometChat.Call) => {
          const cur = phaseRef.current;
          if (
            cur.kind === 'incoming' &&
            cur.sessionId === call.getSessionId()
          ) {
            releaseIncoming();
            toIdle();
          }
        },
        // Can arrive when the callee declines, but not in every case: the status poll is the
        // reliable path.
        onOutgoingCallRejected: (call: CometChat.Call) => {
          const cur = phaseRef.current;
          if (
            cur.kind !== 'outgoing' ||
            cur.status === 'ended' ||
            cur.sessionId !== call.getSessionId()
          )
            return;
          endOutgoing(outgoingEndText(call.getStatus()) ?? 'Call ended');
        },
      }),
    );
    return () => CometChat.removeCallListener(LISTENER_ID);
  }, [setPhase, toIdle, releaseIncoming, endOutgoing]);

  const accept = useCallback(async () => {
    const cur = phaseRef.current;
    if (cur.kind !== 'incoming') return;
    tabsRef.current?.handled(cur.sessionId);
    // Join the prepared session; if the prepare is still running, give it a moment.
    const pending = incomingPrepareRef.current;
    const session =
      incomingSessionRef.current ??
      (pending
        ? await Promise.race([
            pending,
            new Promise<null>((r) =>
              setTimeout(() => r(null), PREPARE_WAIT_MS),
            ),
          ])
        : null);
    // Handed over: the call screen owns it now.
    incomingSessionRef.current = null;
    incomingPrepareRef.current = null;
    join({
      sessionId: cur.sessionId,
      type: cur.type,
      title: cur.groupName ?? cur.peer.name,
      isPeerCall: !cur.groupName,
      session: session ?? undefined,
    });
  }, [join]);

  const decline = useCallback(() => {
    const cur = phaseRef.current;
    if (cur.kind !== 'incoming') return;
    tabsRef.current?.handled(cur.sessionId);
    if (cur.groupName) {
      // Declining a group call stays local: it goes on for the others.
      releaseIncoming();
    } else {
      // endCall('rejected') also leaves the prepared session.
      releaseIncoming(false);
      void CometChatCalls.endCall(cur.sessionId, 'rejected');
    }
    toIdle();
  }, [toIdle, releaseIncoming]);

  const callEnded = useCallback(() => setInCall(null), [setInCall]);

  // Signing out mid-ring must not leave a tone going.
  useEffect(() => () => clearAttention(), []);

  const api = useMemo<CallsApi>(
    () => ({
      phase,
      busy: phase.kind !== 'idle' || activeCall !== null,
      activeCall,
      startCall: (peer, type) => void startCall(peer, type),
      cancel,
      accept: () => void accept(),
      decline,
      callEnded,
    }),
    [phase, activeCall, startCall, cancel, accept, decline, callEnded],
  );

  return (
    <CallsContext.Provider value={api}>
      {children}
      {activeCall && <CallScreen call={activeCall} onEnded={callEnded} />}
      <CallOverlay
        phase={phase}
        onCancel={cancel}
        onAccept={api.accept}
        onDecline={decline}
      />
    </CallsContext.Provider>
  );
}
