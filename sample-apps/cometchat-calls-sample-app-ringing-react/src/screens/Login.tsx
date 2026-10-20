import { useState, type FormEvent } from 'react';
import { Avatar } from '../components/Avatar';

/** The sample users every new CometChat app comes with. */
const SAMPLE_USERS = [1, 2, 3, 4, 5].map((n) => ({
  uid: `cometchat-uid-${n}`,
  name: [
    'Andrew Joseph',
    'George Alan',
    'Nancy Grace',
    'Susan Marie',
    'John Paul',
  ][n - 1],
  avatar: `https://assets.cometchat.io/sampleapp/v2/users/cometchat-uid-${n}.webp`,
}));

/** Sign in as a sample user or any UID. */
export function Login({
  onLogin,
  onChangeCredentials,
}: {
  onLogin: (uid: string) => Promise<void>;
  /** Absent when the credentials are set in config.ts. */
  onChangeCredentials?: () => void;
}) {
  const [uid, setUid] = useState('');
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (value: string) => {
    if (!value.trim() || working) return;
    setWorking(true);
    setError(null);
    try {
      await onLogin(value.trim());
    } catch (e) {
      setError(
        `Login failed: ${(e as { message?: string })?.message ?? String(e)}`,
      );
      setWorking(false);
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    void login(uid);
  };

  return (
    <div className="auth">
      <span className="logo" role="img" aria-label="CometChat" />
      <div className="card auth__card">
        <h1 className="title">Sign in</h1>

        <div>
          <span className="section-label">Choose a sample user</span>
          <ul className="list sample-users">
            {SAMPLE_USERS.map((user) => (
              <li key={user.uid}>
                <button
                  type="button"
                  className="sample-user"
                  disabled={working}
                  onClick={() => void login(user.uid)}
                >
                  <Avatar name={user.name} url={user.avatar} size={40} />
                  <span className="row-text">
                    <span className="body-strong">{user.name}</span>
                    <span className="caption">{user.uid}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <form className="auth__field" onSubmit={submit}>
          <label className="section-label" htmlFor="uid">
            Or enter a UID
          </label>
          <div className="auth__inline">
            <input
              id="uid"
              className="field"
              autoComplete="off"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
            />
            <button
              type="submit"
              className="button-primary"
              disabled={!uid.trim() || working}
            >
              {working ? 'Signing in…' : 'Sign in'}
            </button>
          </div>
        </form>

        {error && (
          <p className="new-group__error" role="alert">
            {error}
          </p>
        )}
        {onChangeCredentials && (
          <button
            type="button"
            className="button-text"
            onClick={onChangeCredentials}
          >
            Change app credentials
          </button>
        )}
      </div>
    </div>
  );
}
