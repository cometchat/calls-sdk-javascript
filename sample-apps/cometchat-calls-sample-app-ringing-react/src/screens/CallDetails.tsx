import type { CallLog } from '@cometchat/calls-sdk-javascript';
import { useCalls } from '../calls/calls-context';
import { Avatar } from '../components/Avatar';
import { Dialog } from '../components/Dialog';
import { Icon } from '../components/Icon';
import * as display from '../history/call-log-display';

/** One call from History: its outcome and timings, the participants, and calling back. */
export function CallDetails({
  log,
  onClose,
}: {
  log: CallLog;
  onClose: () => void;
}) {
  const { startCall, busy } = useCalls();
  const name = display.title(log);
  const peer = display.counterpart(log);
  const status = display.status(log);
  const voice = display.isVoice(log);
  const participants = log.getParticipants() ?? [];

  const fields: [string, string][] = [
    ['Duration', display.duration(log.getTotalDurationInMinutes())],
    ['Started', display.dateTime(log.getStartedAt() || log.getInitiatedAt())],
    ['Ended', display.time(log.getEndedAt())],
    ['Type', display.kind(log)],
    ['Participants', String(participants.length)],
  ];

  return (
    <Dialog title="Call details" onClose={onClose}>
      <div className="details">
        <div className="details__header">
          <Avatar
            name={name}
            url={peer?.avatar}
            size={56}
            initials={peer?.isGroup ? 2 : 1}
          />
          <div>
            <h3 className="title">{name}</h3>
            <p className="caption">{display.kind(log)}</p>
          </div>
        </div>

        <dl className="card details__grid">
          <div>
            <dt className="caption">Status</dt>
            <dd>
              <span className={`status-chip status-chip--${status.tone}`}>
                {status.label}
              </span>
            </dd>
          </div>
          {fields.map(([label, value]) => (
            <div key={label}>
              <dt className="caption">{label}</dt>
              <dd className="body-strong tabular">{value}</dd>
            </div>
          ))}
        </dl>

        {peer && (
          <button
            type="button"
            className="button-primary full"
            disabled={busy}
            onClick={() => {
              onClose();
              startCall(peer, voice ? 'audio' : 'video');
            }}
          >
            <Icon name={voice ? 'phone' : 'video'} />
            {peer.isGroup
              ? `Ring the group (${voice ? 'voice' : 'video'})`
              : `Call back (${voice ? 'voice' : 'video'})`}
          </button>
        )}

        <div>
          <span className="section-label">Session ID</span>
          <p className="code-block">{log.getSessionID()}</p>
        </div>

        {participants.length > 0 && (
          <div>
            <span className="section-label">Participants</span>
            <ul className="list card">
              {participants.map((participant, index) => {
                const participantName =
                  participant.getName() || participant.getUid() || 'Unknown';
                const state = participant.getState();
                return (
                  <li key={`${participant.getUid()}-${index}`} className="row">
                    <Avatar
                      name={participantName}
                      url={participant.getAvatar() || undefined}
                      size={36}
                    />
                    <span className="row-text">
                      <span className="body-strong">{participantName}</span>
                      {state && (
                        <span className="caption">
                          {state.charAt(0).toUpperCase() + state.slice(1)}
                        </span>
                      )}
                    </span>
                    <span className="caption tabular">
                      {display.duration(
                        participant.getTotalDurationInMinutes(),
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </Dialog>
  );
}
