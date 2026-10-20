import type { User } from '@cometchat/chat-sdk-javascript';
import { useState } from 'react';
import { Avatar } from '../components/Avatar';
import { Groups } from './Groups';
import { History } from './History';
import { Profile } from './Profile';
import { Users } from './Users';

const TABS = ['Users', 'Groups', 'History'] as const;
type Tab = (typeof TABS)[number];

/** Users, Groups and History, with your avatar in the corner for the profile. */
export function Home({
  user,
  onSignOut,
}: {
  user: User;
  onSignOut: () => Promise<void>;
}) {
  const [tab, setTab] = useState<Tab>('Users');
  const [profileOpen, setProfileOpen] = useState(false);
  const myUid = user.getUid();

  return (
    <div className="home">
      <header className="home__header">
        <h1 className="large-title">{tab}</h1>
        <button
          type="button"
          className="home__profile"
          aria-label="Open profile"
          onClick={() => setProfileOpen(true)}
        >
          <Avatar
            name={user.getName() || myUid}
            url={user.getAvatar() || undefined}
            size={36}
          />
        </button>
      </header>

      <nav className="tabs" aria-label="Sections">
        {TABS.map((name) => (
          <button
            key={name}
            type="button"
            className="tab"
            aria-current={tab === name ? 'page' : undefined}
            onClick={() => setTab(name)}
          >
            {name}
          </button>
        ))}
      </nav>

      {/* Every tab stays mounted, so each keeps its list and scroll position. */}
      <main className="home__content">
        <div hidden={tab !== 'Users'}>
          <Users myUid={myUid} />
        </div>
        <div hidden={tab !== 'Groups'}>
          <Groups myUid={myUid} />
        </div>
        <div hidden={tab !== 'History'}>
          <History />
        </div>
      </main>

      {profileOpen && (
        <Profile
          user={user}
          onClose={() => setProfileOpen(false)}
          onSignOut={onSignOut}
        />
      )}
    </div>
  );
}
