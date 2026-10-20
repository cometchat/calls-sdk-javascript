import { useEffect, useId, useRef } from 'react';
import { Avatar } from '../components/Avatar';
import { Icon } from '../components/Icon';
import { TopLayer } from '../components/TopLayer';
import type { CallPhase } from './calls-context';
import './CallOverlay.css';

/**
 * The ringing screens: "Calling… / Ringing… / No answer" for the caller, and the incoming call
 * with Decline / Answer for the callee.
 *
 * An alertdialog in the top layer, over everything: a ringing call is the one thing that should
 * take focus. The callee's focus lands on Answer; Escape declines an incoming call and cancels an
 * outgoing one.
 */
export function CallOverlay({
  phase,
  onCancel,
  onAccept,
  onDecline,
}: {
  phase: CallPhase;
  onCancel: () => void;
  onAccept: () => void;
  onDecline: () => void;
}) {
  const titleId = useId();
  const statusId = useId();
  const primaryRef = useRef<HTMLButtonElement>(null);
  const open = phase.kind !== 'idle';

  useEffect(() => {
    if (open) primaryRef.current?.focus();
  }, [open, phase.kind]);

  if (phase.kind === 'idle') return null;

  const isVoice = phase.type === 'audio';
  const isGroup =
    phase.kind === 'incoming' ? !!phase.groupName : !!phase.peer.isGroup;
  const header =
    phase.kind === 'incoming'
      ? `Incoming ${isGroup ? 'group ' : ''}${isVoice ? 'voice' : 'video'} call`
      : `${isGroup ? 'Group ' : ''}${isVoice ? 'voice' : 'video'} call`;
  const name =
    phase.kind === 'incoming'
      ? (phase.groupName ?? phase.peer.name)
      : phase.peer.name;
  const status =
    phase.kind === 'incoming'
      ? phase.groupName
        ? `${phase.peer.name} is calling`
        : ''
      : phase.status === 'calling'
        ? 'Calling…'
        : phase.status === 'ringing'
          ? 'Ringing…'
          : (phase.endText ?? 'Call ended');
  const ended = phase.kind === 'outgoing' && phase.status === 'ended';

  return (
    <TopLayer
      // A new ring is a new dialog, so focus moves to its button.
      key={phase.kind === 'incoming' ? phase.sessionId : 'outgoing'}
      className="call-overlay"
      role="alertdialog"
      labelledBy={titleId}
      describedBy={statusId}
      onEscape={phase.kind === 'incoming' ? onDecline : onCancel}
    >
      <div className="call-overlay__card">
        <p className="call-overlay__header">{header}</p>
        <div className="call-overlay__avatar">
          <Avatar
            name={name}
            url={
              phase.kind === 'incoming' && phase.groupName
                ? undefined
                : phase.peer.avatar
            }
            size={128}
            initials={isGroup ? 2 : 1}
          />
        </div>
        <h2 className="call-overlay__name" id={titleId}>
          {name}
        </h2>
        <p className="call-overlay__status" id={statusId} aria-live="polite">
          {status}
        </p>

        <div className="call-overlay__actions">
          {phase.kind === 'incoming' ? (
            <>
              <span className="call-overlay__action">
                <button
                  type="button"
                  className="call-fab call-fab--decline"
                  onClick={onDecline}
                  aria-label="Decline"
                >
                  <Icon name="call-end" size={30} />
                </button>
                <span aria-hidden="true">Decline</span>
              </span>
              <span className="call-overlay__action">
                <button
                  ref={primaryRef}
                  type="button"
                  className="call-fab call-fab--accept"
                  onClick={onAccept}
                  aria-label={`Answer ${isVoice ? 'voice' : 'video'} call`}
                >
                  <Icon name={isVoice ? 'phone' : 'video'} size={30} />
                </button>
                <span aria-hidden="true">Answer</span>
              </span>
            </>
          ) : (
            <span className="call-overlay__action">
              <button
                ref={primaryRef}
                type="button"
                className="call-fab call-fab--decline"
                onClick={onCancel}
                disabled={ended || !phase.sessionId}
                aria-label="End call"
              >
                <Icon name="call-end" size={30} />
              </button>
              <span aria-hidden="true">End call</span>
            </span>
          )}
        </div>
      </div>
    </TopLayer>
  );
}
