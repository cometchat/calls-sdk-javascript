import { Injectable, signal, computed } from '@angular/core';

export type Region = 'US' | 'EU' | 'IN';

export interface User {
  uid: string;
  name?: string;
  avatar?: string;
}

export interface AppCredentials {
  appId: string;
  authKey: string;
  region: Region;
}

const STORAGE_KEY = 'cometchat-credentials';

const initialCredentials: AppCredentials = {
  appId: '',
  authKey: '',
  region: 'US',
};

@Injectable({ providedIn: 'root' })
export class AppStoreService {
  readonly version = '5.0.0';

  private readonly _credentials = signal<AppCredentials>(this.loadCredentials());
  private readonly _user = signal<User | null>(null);

  readonly credentials = this._credentials.asReadonly();
  readonly user = this._user.asReadonly();

  private loadCredentials(): AppCredentials {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.state?.credentials ?? initialCredentials;
      }
    } catch {}
    return initialCredentials;
  }

  private persistCredentials(credentials: AppCredentials): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ state: { credentials } }));
  }

  setCredentials(credentials: AppCredentials): void {
    this._credentials.set(credentials);
    this.persistCredentials(credentials);
  }

  clearCredentials(): void {
    this._credentials.set(initialCredentials);
    this.persistCredentials(initialCredentials);
  }

  setUser(user: User): void {
    this._user.set(user);
  }

  clearUser(): void {
    this._user.set(null);
  }

  reset(): void {
    this._credentials.set(initialCredentials);
    this._user.set(null);
    this.persistCredentials(initialCredentials);
  }
}
