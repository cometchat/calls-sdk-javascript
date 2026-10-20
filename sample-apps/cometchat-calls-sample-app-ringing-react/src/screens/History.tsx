import { CometChatCalls, type CallLog } from '@cometchat/calls-sdk-javascript';
import { useCallback, useEffect, useState } from 'react';
import { useCalls } from '../calls/calls-context';
import { Avatar } from '../components/Avatar';
import { usePagedList } from '../components/usePagedList';
import * as display from '../history/call-log-display';
import { CallDetails } from './CallDetails';

const PAGE_SIZE = 30;

/**
 * Your call history from the Calls SDK. Reloads when a call ends, so the call just made is
 * listed; scroll for older calls.
 */
export function History() {
  const { activeCall, phase } = useCalls();
  const [selected, setSelected] = useState<CallLog | null>(null);

  const makeRequest = useCallback(
    () =>
      new CometChatCalls.CallLogRequestBuilder()
        .setLimit(PAGE_SIZE)
        .setAuthToken(CometChatCalls.getUserAuthToken() ?? '')
        .build(),
    [],
  );
  const {
    items: logs,
    loading,
    error,
    reload,
    onScroll,
  } = usePagedList<CallLog>(makeRequest, PAGE_SIZE);

  // A call or a ring just ended: list it.
  const idle = !activeCall && phase.kind === 'idle';
  useEffect(() => {
    if (idle) reload();
  }, [idle, reload]);

  return (
    <section className="tab-panel" aria-label="History">
      <ul className="list scroll" onScroll={onScroll}>
        {logs.map((log, index) => {
          const name = display.title(log);
          const peer = display.counterpart(log);
          const status = display.status(log);
          return (
            // A session can be listed more than once (one entry per call on it).
            <li key={`${log.getSessionID()}-${index}`}>
              <button
                type="button"
                className="row"
                onClick={() => setSelected(log)}
              >
                <Avatar
                  name={name}
                  url={peer?.avatar}
                  initials={peer?.isGroup ? 2 : 1}
                />
                <span className="row-text">
                  <span className="history-title">
                    <span className="body-strong">{name}</span>
                    <span className="kind-chip">{display.kind(log)}</span>
                  </span>
                  <span className="caption history-meta">
                    <span className={`status-dot status-dot--${status.tone}`}>
                      {status.label}
                    </span>
                    <span aria-hidden="true">·</span>
                    {display.dateTime(
                      log.getStartedAt() || log.getInitiatedAt(),
                    )}
                  </span>
                </span>
                <span className="caption tabular">
                  {display.duration(log.getTotalDurationInMinutes())}
                </span>
              </button>
            </li>
          );
        })}
        {loading && logs.length === 0 && (
          <li className="empty">
            <span className="spinner" aria-label="Loading call history" />
          </li>
        )}
        {!loading && logs.length === 0 && (
          <li className="empty">
            <strong>No calls yet</strong>
            <span>
              {error
                ? `Could not load call history: ${error}`
                : 'Calls you make and receive show up here.'}
            </span>
            {error && (
              <button type="button" className="button-primary" onClick={reload}>
                Retry
              </button>
            )}
          </li>
        )}
      </ul>
      {selected && (
        <CallDetails log={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
