import { CometChat } from '@cometchat/chat-sdk-javascript';
import { useCallback, useState } from 'react';
import type { CallKind } from '../calls/calls-context';
import { Avatar } from '../components/Avatar';
import { Dialog } from '../components/Dialog';
import { Icon } from '../components/Icon';
import { SearchField } from '../components/SearchField';
import { useDebounced, usePagedList } from '../components/usePagedList';

const PAGE_SIZE = 30;
/** Every member's devices ring, so keep the group small. */
const MAX_MEMBERS = 20;

/**
 * Creates a private group with the people you pick, then rings it. The group stays in the
 * Groups tab, so the same people can be rung again with one tap.
 */
export function NewGroupCall({
  myUid,
  onClose,
  onCreated,
}: {
  myUid: string;
  onClose: () => void;
  onCreated: (group: CometChat.Group, type: CallKind) => void;
}) {
  const [name, setName] = useState('');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Map<string, CometChat.User>>(
    new Map(),
  );
  const [working, setWorking] = useState<CallKind | null>(null);
  const [error, setError] = useState<string | null>(null);
  const search = useDebounced(query.trim());

  const makeRequest = useCallback(() => {
    const builder = new CometChat.UsersRequestBuilder()
      .setLimit(PAGE_SIZE)
      .hideBlockedUsers(true);
    if (search) builder.setSearchKeyword(search);
    return builder.build();
  }, [search]);
  const { items, loading, onScroll } = usePagedList<CometChat.User>(
    makeRequest,
    PAGE_SIZE,
  );
  const users = items.filter((user) => user.getUid() !== myUid);

  const toggle = (user: CometChat.User) => {
    const uid = user.getUid();
    if (!selected.has(uid) && selected.size >= MAX_MEMBERS) {
      setError(`A group can ring up to ${MAX_MEMBERS} people.`);
      return;
    }
    setError(null);
    setSelected((current) => {
      const next = new Map(current);
      if (next.has(uid)) next.delete(uid);
      else next.set(uid, user);
      return next;
    });
  };

  /** "Ana, Ben, Cai +2" when no name was typed. */
  const groupName = (members: CometChat.User[]) => {
    if (name.trim()) return name.trim();
    const names = members.map((user) => user.getName() || user.getUid());
    return (
      names.slice(0, 3).join(', ') +
      (names.length > 3 ? ` +${names.length - 3}` : '')
    );
  };

  /**
   * Creates the group, then adds the members in a second request, so a member who cannot be
   * added does not stop the group being created.
   */
  const create = async (type: CallKind) => {
    const members = [...selected.values()];
    if (members.length === 0 || working) return;
    setWorking(type);
    setError(null);
    try {
      const group = new CometChat.Group(
        `group-${crypto.randomUUID()}`,
        groupName(members),
        CometChat.GROUP_TYPE.PRIVATE,
        '',
      );
      const created = await CometChat.createGroup(group);
      await CometChat.addMembersToGroup(
        created.getGuid(),
        members.map(
          (user) =>
            new CometChat.GroupMember(
              user.getUid(),
              CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT,
            ),
        ),
        [],
      );
      onCreated(created, type);
    } catch (e) {
      console.error('Creating the group failed:', e);
      setError('Could not create the group. Try again.');
      setWorking(null);
    }
  };

  const count = selected.size;
  return (
    <Dialog title="New group call" onClose={onClose}>
      <div className="new-group">
        <label className="section-label" htmlFor="group-name">
          Group name
        </label>
        <input
          id="group-name"
          className="field"
          maxLength={60}
          placeholder="Optional. Defaults to the members’ names"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <p className="section-label new-group__count" aria-live="polite">
          Members · {count} selected
        </p>
        <SearchField
          id="members-search"
          value={query}
          placeholder="Search users"
          onChange={setQuery}
        />

        <ul className="list new-group__list" onScroll={onScroll}>
          {users.map((user) => {
            const userName = user.getName() || user.getUid();
            const checked = selected.has(user.getUid());
            return (
              <li key={user.getUid()}>
                <label className="row new-group__row">
                  <Avatar name={userName} url={user.getAvatar() || undefined} />
                  <span className="row-text">
                    <span>{userName}</span>
                    {/* Names need not be unique; the UID tells two of them apart. */}
                    <span className="caption">{user.getUid()}</span>
                  </span>
                  <input
                    type="checkbox"
                    aria-label={userName}
                    checked={checked}
                    onChange={() => toggle(user)}
                  />
                </label>
              </li>
            );
          })}
          {loading && users.length === 0 && (
            <li className="empty">
              <span className="spinner" aria-label="Loading users" />
            </li>
          )}
        </ul>

        {error && (
          <p className="new-group__error" role="alert">
            {error}
          </p>
        )}
        <div className="new-group__actions">
          <button
            type="button"
            className="button-primary"
            disabled={count === 0 || !!working}
            onClick={() => void create('audio')}
          >
            <Icon name="phone" />{' '}
            {working === 'audio' ? 'Creating…' : 'Start voice'}
          </button>
          <button
            type="button"
            className="button-primary"
            disabled={count === 0 || !!working}
            onClick={() => void create('video')}
          >
            <Icon name="video" />{' '}
            {working === 'video' ? 'Creating…' : 'Start video'}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
