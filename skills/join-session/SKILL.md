---
name: join-session
description: Join a CometChat call session using CometChatCalls.joinSession with SessionSettings and an HTMLElement container. Use when joining calls, configuring session settings, voice vs video calls, or generating tokens. Triggers on "join session", "join call", "start call", "SessionSettings", "joinSession".
inclusion: manual
---

# CometChat Calls SDK v5 — Join Session

## Overview

Join a call session using `CometChatCalls.joinSession()`. Requires a call token (generated from a session ID), a `SessionSettings` object, and an HTML container element to render the call UI.

## Key Imports

```typescript
import { CometChatCalls, type SessionSettings } from '@cometchat/calls-sdk-javascript';
```

## Implementation

### HTML Container

```html
<div id="call-container" style="width: 100%; height: 100vh;"></div>
```

### Generate Token + Join (Recommended)

```typescript
const container = document.getElementById('call-container') as HTMLElement;

// Step 1: Generate a call token from session ID
const { token } = await CometChatCalls.generateToken(sessionId);

// Step 2: Configure session settings
const sessionSettings: SessionSettings = {
  sessionType: 'VIDEO',
  layout: 'TILE',
  startAudioMuted: false,
  startVideoPaused: false,
};

// Step 3: Join the session
const result = await CometChatCalls.joinSession(token, sessionSettings, container);
if (result.error) {
  console.error('Failed to join:', result.error);
}
```

### Voice Call vs Video Call

```typescript
// Video call
const videoSettings: SessionSettings = {
  sessionType: 'VIDEO',
  layout: 'TILE',
  startVideoPaused: false,
};

// Voice call
const voiceSettings: SessionSettings = {
  sessionType: 'VOICE',
  layout: 'SPOTLIGHT',
  startVideoPaused: true,
};
```

### Join with Pre-generated Token

If your backend generates the token:

```typescript
const result = await CometChatCalls.joinSession(backendToken, sessionSettings, container);
```

### Leave Session

```typescript
CometChatCalls.leaveSession();
```

### End Session for All

```typescript
CometChatCalls.endSessionForAll();
```

## Gotchas

- The container **must** be a visible DOM element with explicit dimensions (width/height)
- All participants must use the **same session ID** to join the same call
- `sessionType` values are `'VIDEO'` and `'VOICE'` (not "AUDIO")
- `joinSession()` returns `{ data, error }` — check `error` for failures
- `generateToken()` requires the user to be logged in — it uses the cached auth token
- Call `joinSession` only after SDK is initialized and user is logged in
- The call UI renders inside the container — the SDK manages the DOM within it


