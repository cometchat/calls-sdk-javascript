import type { User } from '@cometchat/chat-sdk-javascript';
import { useEffect, useState } from 'react';
import { CallProvider } from './calls/CallProvider';
import {
  APP_CONSTANTS,
  loadCredentials,
  saveCredentials,
  type Credentials as AppCredentials,
} from './config';
import { Credentials } from './screens/Credentials';
import { Home } from './screens/Home';
import { Login } from './screens/Login';
import { initSdks, login, logout, restoreSession } from './sdk';

type Screen =
  | { kind: 'starting' }
  | { kind: 'credentials' }
  | { kind: 'login' }
  | { kind: 'home'; user: User }
  | { kind: 'error'; message: string };

const credentialsInConfig = !!(
  APP_CONSTANTS.APP_ID &&
  APP_CONSTANTS.REGION &&
  APP_CONSTANTS.AUTH_KEY
);

export default function App() {
  const [screen, setScreen] = useState<Screen>(() =>
    loadCredentials() ? { kind: 'starting' } : { kind: 'credentials' },
  );

  // Set up both SDKs, then pick up a session from an earlier visit.
  useEffect(() => {
    if (screen.kind !== 'starting') return;
    const credentials = loadCredentials();
    if (!credentials) return;
    initSdks(credentials)
      .then(restoreSession)
      .then((user) =>
        setScreen(user ? { kind: 'home', user } : { kind: 'login' }),
      )
      .catch((error) =>
        setScreen({
          kind: 'error',
          message: error instanceof Error ? error.message : String(error),
        }),
      );
  }, [screen.kind]);

  const changeCredentials = () => {
    saveCredentials(null);
    // Start clean: the SDKs were set up for the old app.
    window.location.reload();
  };

  switch (screen.kind) {
    case 'starting':
      return (
        <div className="auth">
          <span className="spinner" aria-label="Starting" />
        </div>
      );
    case 'error':
      return (
        <div className="auth">
          <div className="card auth__card" role="alert">
            <h1 className="title">Could not start</h1>
            <p>{screen.message}</p>
            {!credentialsInConfig && (
              <button
                type="button"
                className="button-primary full"
                onClick={changeCredentials}
              >
                Change app credentials
              </button>
            )}
          </div>
        </div>
      );
    case 'credentials':
      return (
        <Credentials
          onSave={(credentials: AppCredentials) => {
            saveCredentials(credentials);
            setScreen({ kind: 'starting' });
          }}
        />
      );
    case 'login':
      return (
        <Login
          onLogin={async (uid) => {
            const user = await login(uid, loadCredentials()!.authKey);
            setScreen({ kind: 'home', user });
          }}
          onChangeCredentials={
            credentialsInConfig ? undefined : changeCredentials
          }
        />
      );
    case 'home':
      return (
        <CallProvider>
          <Home
            user={screen.user}
            onSignOut={async () => {
              await logout();
              setScreen({ kind: 'login' });
            }}
          />
        </CallProvider>
      );
  }
}
