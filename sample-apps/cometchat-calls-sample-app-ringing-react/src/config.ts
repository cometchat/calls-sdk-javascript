/**
 * App credentials. Leave them empty to enter them on the first screen instead, or fill them in
 * to skip that screen. Get them from the CometChat dashboard: https://app.cometchat.com
 */
export const APP_CONSTANTS = {
  APP_ID: '', // Your App ID
  REGION: '', // us, eu or in
  AUTH_KEY: '', // Your Auth Key
};

export type Region = 'us' | 'eu' | 'in';

export interface Credentials {
  appId: string;
  region: Region;
  authKey: string;
}

const CREDENTIALS_KEY = 'ringing-sample.credentials';
const APPEARANCE_KEY = 'ringing-sample.appearance';

// Storage can be unavailable (a private window, blocked site data): the app then just asks again.
function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // Not saved: the next visit asks again.
  }
}

/** The credentials in APP_CONSTANTS, or else the ones entered on the credentials screen. */
export function loadCredentials(): Credentials | null {
  const { APP_ID, REGION, AUTH_KEY } = APP_CONSTANTS;
  if (APP_ID && REGION && AUTH_KEY) {
    return {
      appId: APP_ID,
      region: REGION.toLowerCase() as Region,
      authKey: AUTH_KEY,
    };
  }
  try {
    const saved = JSON.parse(
      read(CREDENTIALS_KEY) ?? 'null',
    ) as Credentials | null;
    return saved?.appId && saved.region && saved.authKey ? saved : null;
  } catch {
    return null;
  }
}

export function saveCredentials(credentials: Credentials | null) {
  write(CREDENTIALS_KEY, credentials ? JSON.stringify(credentials) : null);
}

/** Profile → Appearance. "system" follows the operating system. */
export type Appearance = 'system' | 'light' | 'dark';

export function loadAppearance(): Appearance {
  const saved = read(APPEARANCE_KEY);
  return saved === 'light' || saved === 'dark' ? saved : 'system';
}

/** Saves and applies the appearance: the tokens in styles.css key off data-theme. */
export function applyAppearance(appearance: Appearance) {
  write(APPEARANCE_KEY, appearance === 'system' ? null : appearance);
  if (appearance === 'system')
    document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', appearance);
}
