import { CometChat } from '@cometchat/chat-sdk-javascript';
import { useCallback, useState } from 'react';
import { useCalls } from '../calls/calls-context';
import { Avatar } from '../components/Avatar';
import { Icon } from '../components/Icon';
import { SearchField } from '../components/SearchField';
import { useDebounced, usePagedList } from '../components/usePagedList';

const PAGE_SIZE = 30;

/** Everyone in the app, with presence. The phone and video buttons ring that person. */
export function Users({ myUid }: { myUid: string }) {
  const { startCall, busy } = useCalls();
  const [query, setQuery] = useState('');
  const search = useDebounced(query.trim());

  const makeRequest = useCallback(() => {
    const builder = new CometChat.UsersRequestBuilder()
      .setLimit(PAGE_SIZE)
      .hideBlockedUsers(true);
    if (search) builder.setSearchKeyword(search);
    return builder.build();
  }, [search]);
  const { items, loading, error, onScroll } = usePagedList<CometChat.User>(
    makeRequest,
    PAGE_SIZE,
  );
  const users = items.filter((user) => user.getUid() !== myUid);

  return (
    <section className="tab-panel" aria-label="Users">
      <div className="toolbar">
        <SearchField
          id="users-search"
          value={query}
          placeholder="Search users"
          onChange={setQuery}
        />
      </div>
      <ul className="list scroll" onScroll={onScroll}>
        {users.map((user) => {
          const name = user.getName() || user.getUid();
          const online = user.getStatus() === CometChat.USER_STATUS.ONLINE;
          const peer = {
            id: user.getUid(),
            name,
            avatar: user.getAvatar() || undefined,
          };
          return (
            <li key={user.getUid()} className="row">
              <Avatar name={name} url={peer.avatar} online={online} />
              <div className="row-text">
                <p className="body-strong">{name}</p>
                <p
                  className="caption"
                  style={online ? { color: 'var(--status-online)' } : undefined}
                >
                  {online ? 'Online' : 'Offline'}
                </p>
              </div>
              <div className="row-actions">
                <button
                  type="button"
                  className="icon-button"
                  disabled={busy}
                  aria-label={`Voice call ${name}`}
                  onClick={() => startCall(peer, 'audio')}
                >
                  <Icon name="phone" />
                </button>
                <button
                  type="button"
                  className="icon-button"
                  disabled={busy}
                  aria-label={`Video call ${name}`}
                  onClick={() => startCall(peer, 'video')}
                >
                  <Icon name="video" />
                </button>
              </div>
            </li>
          );
        })}
        {loading && users.length === 0 && (
          <li className="empty">
            <span className="spinner" aria-label="Loading users" />
          </li>
        )}
        {!loading && users.length === 0 && (
          <li className="empty">
            <strong>
              {search ? `No user called “${search}”` : 'No users found'}
            </strong>
            {error && <span>{error}</span>}
          </li>
        )}
      </ul>
    </section>
  );
}
