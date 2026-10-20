import type {
  CallSession,
  SessionSettings,
} from '@cometchat/calls-sdk-javascript';
import { createContext, useContext } from 'react';

/** Types, context and settings for the ringing flow (see CallProvider). */

export type CallKind = 'audio' | 'video';

/** Who a call rings: a user, or every member of a group. */
export interface CallPeer {
  /** A user's UID, or a group's GUID when `isGroup`. */
  id: string;
  name: string;
  avatar?: string;
  isGroup?: boolean;
}

export type CallPhase =
  | { kind: 'idle' }
  | {
      kind: 'outgoing';
      peer: CallPeer;
      type: CallKind;
      /** 'calling' until a callee's device has the call (onParticipantConnected), then 'ringing'. */
      status: 'calling' | 'ringing' | 'ended';
      /** Set once initiateCall created the call. */
      sessionId?: string;
      endText?: string;
    }
  | {
      kind: 'incoming';
      /** The caller. */
      peer: CallPeer;
      type: CallKind;
      sessionId: string;
      /** The group's name when the call rings a group you are in. */
      groupName?: string;
    };

/** An answered call, handed to the call screen to join. */
export interface JoinRequest {
  sessionId: string;
  type: CallKind;
  title: string;
  /** A 1:1 call: it ends for both when either leaves. False for a group call. */
  isPeerCall: boolean;
  /** The session prepared while it rang. Absent when the prepare failed: join directly. */
  session?: CallSession;
}

export interface CallsApi {
  phase: CallPhase;
  /** A call is ringing either way, or one is on. */
  busy: boolean;
  /** The call on screen, if any. */
  activeCall: JoinRequest | null;
  startCall: (peer: CallPeer, type: CallKind) => void;
  cancel: () => void;
  accept: () => void;
  decline: () => void;
  /** The call screen closed. */
  callEnded: () => void;
}

/**
 * The settings for a ringing call. `initiateCall` and `connect` freeze them on the session they
 * prepare, and `session.join(container)` takes none, so both sides build them here.
 *
 * Always set the session type: the default is video, so a voice call without it opens the
 * camera. `isPeerCall` for a 1:1 call ends the call for both sides when either leaves.
 */
export function callSettings(
  type: CallKind,
  title: string,
  isPeerCall: boolean,
): SessionSettings {
  return {
    title,
    sessionType: type === 'audio' ? 'VOICE' : 'VIDEO',
    isPeerCall,
  };
}

export const CallsContext = createContext<CallsApi | null>(null);

export function useCalls(): CallsApi {
  const api = useContext(CallsContext);
  if (!api) throw new Error('useCalls must be used inside <CallProvider>');
  return api;
}
