import { CometChatCalls } from '@cometchat/calls-sdk-javascript';
import { useEffect, useRef } from 'react';
import { TopLayer } from '../components/TopLayer';
import { callSettings, type JoinRequest } from './calls-context';

/**
 * The call itself, full screen over the app. Joins the session prepared while it rang (the
 * caller's from initiateCall, the callee's from connect), or joins directly when the prepare
 * failed. The Calls SDK draws the call UI, including the leave button.
 */
export function CallScreen({
  call,
  onEnded,
}: {
  call: JoinRequest;
  onEnded: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const joinedRef = useRef<string | null>(null);
  const onEndedRef = useRef(onEnded);
  useEffect(() => {
    onEndedRef.current = onEnded;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let closed = false;
    const close = () => {
      if (closed) return;
      closed = true;
      onEndedRef.current();
    };

    // Left with the leave button, the other side ended a 1:1 call, or the session went away.
    const offLeft = CometChatCalls.addEventListener('onSessionLeft', close);
    const offClosed = CometChatCalls.addEventListener(
      'onConnectionClosed',
      close,
    );

    // StrictMode runs this effect twice in development: join once.
    if (joinedRef.current === call.sessionId)
      return () => {
        offLeft();
        offClosed();
      };
    joinedRef.current = call.sessionId;

    const joinDirectly = async () => {
      const { token } = await CometChatCalls.generateToken(call.sessionId);
      const { error } = await CometChatCalls.joinSession(
        token,
        callSettings(call.type, call.title, call.isPeerCall),
        container,
      );
      if (error) throw error;
    };

    (async () => {
      if (!call.session) {
        await joinDirectly();
        return;
      }
      // The prepared session's settings were frozen when it was prepared; join takes none.
      const { error } = await call.session.join(container);
      // No call token came with the prepared session: generate one and join directly.
      if (error?.name === 'VALIDATION_ERROR') await joinDirectly();
      else if (error) throw error;
    })().catch((error) => {
      console.error('Joining the call failed:', error);
      close();
    });

    return () => {
      offLeft();
      offClosed();
    };
  }, [call]);

  return (
    // Escape does nothing: the call's own leave button ends it.
    <TopLayer className="call-screen" label={`Call with ${call.title}`}>
      <div ref={containerRef} className="call-screen__container" />
    </TopLayer>
  );
}
