export type Region = 'US' | 'EU' | 'IN';

interface User {
  uid: string;
  name?: string;
  avatar?: string;
}

interface AppCredentials {
  appId: string;
  authKey: string;
  region: Region;
}

const initialCredentials: AppCredentials = {
  appId: '',
  authKey: '',
  region: 'US',
};

function loadCredentials(): AppCredentials {
  try {
    const stored = localStorage.getItem('cometchat-credentials');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.state?.credentials) {
        return parsed.state.credentials;
      }
    }
  } catch {
    // ignore
  }
  return initialCredentials;
}

function saveCredentials(credentials: AppCredentials) {
  localStorage.setItem(
    'cometchat-credentials',
    JSON.stringify({ state: { credentials } }),
  );
}

class AppStore {
  version = '5.0.0';
  credentials: AppCredentials = $state(loadCredentials());
  user: User | null = $state(null);

  setCredentials(credentials: AppCredentials) {
    this.credentials = credentials;
    saveCredentials(credentials);
  }

  clearCredentials() {
    this.credentials = initialCredentials;
    saveCredentials(initialCredentials);
  }

  setUser(user: User) {
    this.user = user;
  }

  clearUser() {
    this.user = null;
  }

  reset() {
    this.credentials = initialCredentials;
    this.user = null;
    saveCredentials(initialCredentials);
  }
}

export const appStore = new AppStore();
