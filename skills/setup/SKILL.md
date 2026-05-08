---
name: setup
description: Set up CometChat Calls SDK v5 for JavaScript/TypeScript. Use when installing the SDK, configuring CallAppSettings, calling init, login, or requesting browser permissions. Triggers on "setup calls sdk", "install cometchat", "initialize calls", "npm install", "login calls sdk".
inclusion: manual
---

# CometChat Calls SDK v5 — Setup

## Overview

Install and initialize the CometChat Calls SDK v5 in a web project. Covers npm installation, `CometChatCalls.init()`, authentication with `login()` or `loginWithAuthToken()`, and browser permissions.

## Key Imports

```typescript
import { CometChatCalls } from '@cometchat/calls-sdk-javascript';
```

## Implementation

### 1. Install the Package

```bash
npm install @cometchat/calls-sdk-javascript@latest
```

### 2. Initialize the SDK

```typescript
const appSettings = {
  appId: 'YOUR_APP_ID',
  region: 'us', // 'us' | 'eu' | 'in'
};

const result = await CometChatCalls.init(appSettings);
if (result.success) {
  console.log('Calls SDK initialized');
} else {
  console.error('Init failed:', result.error.message);
}
```

### 3. Login with UID + Auth Key (Development Only)

```typescript
try {
  const user = await CometChatCalls.login('USER_UID', 'AUTH_KEY');
  console.log('Logged in:', user.name);
} catch (error) {
  console.error('Login failed:', error.errorDescription);
}
```

### 4. Login with Auth Token (Production)

```typescript
try {
  const user = await CometChatCalls.loginWithAuthToken('AUTH_TOKEN');
  console.log('Logged in:', user.name);
} catch (error) {
  console.error('Login failed:', error.errorDescription);
}
```

### 5. Check Login State

```typescript
const user = CometChatCalls.getLoggedInUser();
if (user) {
  console.log('Already logged in as:', user.name);
}

// Or check boolean
if (CometChatCalls.isUserLoggedIn()) {
  // ready to join sessions
}
```

### 6. Logout

```typescript
await CometChatCalls.logout();
```

### 7. Browser Permissions (Optional)

The SDK automatically requests camera and microphone permissions when joining a session. You can optionally pre-request them to avoid the permission prompt during the call:

```typescript
await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
```

### 8. Login Listeners (Optional)

```typescript
CometChatCalls.addLoginListener('my-listener', {
  onLoginSuccess: (user) => console.log('Login success:', user.name),
  onLoginFailure: (error) => console.error('Login failed:', error.errorDescription),
  onLogoutSuccess: () => console.log('Logged out'),
  onLogoutFailure: (error) => console.error('Logout failed:', error.errorDescription),
});

// Remove when done
CometChatCalls.removeLoginListener('my-listener');
```

## Gotchas

- Call `init()` before any other SDK method
- `init()` returns `{ success, error }` — it does not throw
- `login()` and `loginWithAuthToken()` throw on failure — use try/catch
- Auth Key login is for development only — use Auth Token in production
- The SDK persists login state in `localStorage` — users stay logged in across page reloads
- If using both Chat SDK and Calls SDK, initialize and login to both separately
- `region` accepts both lowercase (`'us'`) and uppercase (`'US'`)

## Sample App Reference

- `sample-apps/cometchat-calls-sample-app-react/` — React sample with init + login flow
- `sample-apps/cometchat-calls-sample-app-vue/` — Vue sample
- `sample-apps/cometchat-calls-sample-app-angular/` — Angular sample
- `sample-apps/cometchat-calls-sample-app-svelte/` — Svelte sample
- `sample-apps/cometchat-calls-sample-app-ionic/` — Ionic sample
