import { CometChat } from '@cometchat/chat-sdk-javascript';
import { useCallback, useState } from 'react';
import { useCalls, type CallKind } from '../calls/calls-context';
import { Avatar } from '../components/Avatar';
import { Icon } from '../components/Icon';
import { SearchField } from '../components/SearchField';
import { useDebounced, usePagedList } from '../components/usePagedList';
import { NewGroupCall } from './NewGroupCall';

const PAGE_SIZE = 30;

/**
 * The groups you have joined. The call buttons ring every member: whoever answers joins the same
 * session, and the call carries on when one of them leaves. **+** creates a group to ring.
 */
export function Groups({ myUid }: { myUid: string }) {
  const { startCall, busy } = useCalls();
  const [query, setQuery] = useState('');
  const [creating, setCreating] = useState(false);
  const search = useDebounced(query.trim());

  const makeRequest = useCallback(() => {
    const builder = new CometChat.GroupsRequestBuilder()
      .setLimit(PAGE_SIZE)
      .joinedOnly(true);
    if (search) builder.setSearchKeyword(search);
    return builder.build();
  }, [search]);
  const {
    items: groups,
    loading,
    error,
    reload,
    onScroll,
  } = usePagedList<CometChat.Group>(makeRequest, PAGE_SIZE);

  const ring = (group: CometChat.Group, type: CallKind) =>
    startCall(
      {
        id: group.getGuid(),
        name: group.getName() || group.getGuid(),
        avatar: group.getIcon() || undefined,
        isGroup: true,
      },
      type,
    );

  return (
    <section className="tab-panel" aria-label="Groups">
      <div className="toolbar">
        <SearchField
          id="groups-search"
          value={query}
          placeholder="Search groups"
          onChange={setQuery}
        />
        <button
          type="button"
          className="icon-button"
          aria-label="New group call"
          onClick={() => setCreating(true)}
        >
          <Icon name="plus" />
        </button>
      </div>
      <ul className="list scroll" onScroll={onScroll}>
        {groups.map((group) => {
          const name = group.getName() || group.getGuid();
          const members = group.getMembersCount();
          return (
            <li key={group.getGuid()} className="row">
              <Avatar
                name={name}
                url={group.getIcon() || undefined}
                initials={2}
              />
              <div className="row-text">
                <p className="body-strong">{name}</p>
                <p className="caption">
                  {members} {members === 1 ? 'member' : 'members'}
                </p>
              </div>
              <div className="row-actions">
                <button
                  type="button"
                  className="icon-button"
                  disabled={busy}
                  aria-label={`Voice call ${name}`}
                  onClick={() => ring(group, 'audio')}
                >
                  <Icon name="phone" />
                </button>
                <button
                  type="button"
                  className="icon-button"
                  disabled={busy}
                  aria-label={`Video call ${name}`}
                  onClick={() => ring(group, 'video')}
                >
                  <Icon name="video" />
                </button>
              </div>
            </li>
          );
        })}
        {loading && groups.length === 0 && (
          <li className="empty">
            <span className="spinner" aria-label="Loading groups" />
          </li>
        )}
        {!loading && groups.length === 0 && (
          <li className="empty">
            {search ? (
              <strong>No group called “{search}”</strong>
            ) : (
              <>
                <strong>No groups yet</strong>
                <span>Create a group to ring several people at once.</span>
                {error && <span>{error}</span>}
                <button
                  type="button"
                  className="button-primary"
                  onClick={() => setCreating(true)}
                >
                  New group call
                </button>
              </>
            )}
          </li>
        )}
      </ul>
      {creating && (
        <NewGroupCall
          myUid={myUid}
          onClose={() => setCreating(false)}
          onCreated={(group, type) => {
            setCreating(false);
            reload();
            ring(group, type);
          }}
        />
      )}
    </section>
  );
}
