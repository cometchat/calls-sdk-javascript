import { defineStore } from "pinia";

export type Region = "US" | "EU" | "IN";

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
  appId: "",
  authKey: "",
  region: "US",
};

export const useAppStore = defineStore("app", {
  state: () => ({
    version: "5.0.0",
    credentials: { ...initialCredentials } as AppCredentials,
    user: null as User | null,
  }),
  actions: {
    setCredentials(credentials: AppCredentials) {
      this.credentials = credentials;
    },
    clearCredentials() {
      this.credentials = { ...initialCredentials };
    },
    setUser(user: User) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
    reset() {
      this.credentials = { ...initialCredentials };
      this.user = null;
    },
  },
  persist: {
    pick: ["credentials"],
  },
});
