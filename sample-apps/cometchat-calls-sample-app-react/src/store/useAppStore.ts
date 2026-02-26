import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

interface AppState {
  // App version
  version: string;

  // Credentials
  credentials: AppCredentials;
  setCredentials: (credentials: AppCredentials) => void;
  clearCredentials: () => void;

  // User
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;

  // Reset all
  reset: () => void;
}

const initialCredentials: AppCredentials = {
  appId: '',
  authKey: '',
  region: 'US',
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // App version
      version: '5.0.0',

      // Credentials
      credentials: initialCredentials,
      setCredentials: (credentials) => set({ credentials }),
      clearCredentials: () => set({ credentials: initialCredentials }),

      // User
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),

      // Reset all
      reset: () => set({ credentials: initialCredentials, user: null }),
    }),
    {
      name: 'cometchat-credentials',
      partialize: (state) => ({ credentials: state.credentials }),
    },
  ),
);
