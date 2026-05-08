---
name: migration-v4-to-v5
description: Migrate a web project from CometChat Calls SDK v4 to v5. Use when upgrading calls SDK version, replacing deprecated v4 APIs, migrating CallSettings to SessionSettings, replacing OngoingCallListener with addEventListener, migrating startSession to joinSession. Triggers on "migrate calls sdk", "upgrade v4 to v5", "replace deprecated calls api", "CallSettings to SessionSettings", "migration guide".
inclusion: manual
---

# CometChat Calls SDK — Migrate v4 to v5 (JavaScript)

## Overview

Calls SDK v5 is a drop-in replacement for v4. All v4 APIs are preserved as deprecated methods that internally delegate to v5 implementations. You can update the package version and existing code will compile and run without changes. This skill guides migration to the new v5 APIs.

## Migration Strategy

1. Update the package version
2. Add `CometChatCalls.login()` after authentication
3. Replace `CallSettings` / `CallSettingsBuilder` → `SessionSettings` object
4. Replace `startSession()` → `joinSession()`
5. Replace `OngoingCallListener` → `addEventListener()`
6. Replace static action methods (same names, just verify)
7. Clean up removed APIs (`switchToVideoCall`, `setCustomCSS`, `MainVideoContainerSetting`)

## Step 1 — Update Package

```bash
npm install @cometchat/calls-sdk-javascript@latest
```

## Step 2 — Add Authentication

v4 required passing `authToken` to `generateToken()`. v5 introduces `CometChatCalls.login()` which caches the token.

### v4 (remove this pattern)

```typescript
const { token } = await CometChatCalls.generateToken(sessionId, authToken);
```

### v5 (replace with)

```typescript
// Call once after your app authenticates the user
await CometChatCalls.login(uid, authKey);
// OR
await CometChatCalls.loginWithAuthToken(authToken);

// Now generateToken uses the cached auth token
const { token } = await CometChatCalls.generateToken(sessionId);
```

## Step 3 — Replace Session Settings

`CallSettingsBuilder` → plain `SessionSettings` object. Note the inverted boolean logic on visibility methods.

### v4 (remove this pattern)

```typescript
const callSettings = new CometChatCalls.CallSettingsBuilder()
  .enableDefaultLayout(true)
  .setIsAudioOnlyCall(true)
  .showEndCallButton(true)
  .showMuteAudioButton(true)
  .showPauseVideoButton(true)
  .showScreenShareButton(true)
  .showRecordingButton(true)
  .startWithAudioMuted(false)
  .startWithVideoMuted(false)
  .setMode('DEFAULT')
  .startRecordingOnCallStart(false)
  .setCallListener(new CometChatCalls.OngoingCallListener({ ... }))
  .build();
```

### v5 (replace with)

```typescript
const sessionSettings: SessionSettings = {
  sessionType: 'VOICE',
  layout: 'SIDEBAR',
  hideControlPanel: false,
  hideLeaveSessionButton: false,
  hideToggleAudioButton: false,
  hideToggleVideoButton: false,
  hideScreenSharingButton: false,
  hideRecordingButton: false,
  startAudioMuted: false,
  startVideoPaused: false,
  autoStartRecording: false,
};
```

### Builder Method Mapping

| v4 Method | v5 SessionSettings Property | Notes |
|-----------|---------------------------|-------|
| `setIsAudioOnlyCall(true)` | `sessionType: 'VOICE'` | Use `'VIDEO'` for video |
| `enableDefaultLayout(bool)` | `hideControlPanel: !bool` | Inverted logic |
| `showEndCallButton(bool)` | `hideLeaveSessionButton: !bool` | Inverted logic |
| `showMuteAudioButton(bool)` | `hideToggleAudioButton: !bool` | Inverted logic |
| `showPauseVideoButton(bool)` | `hideToggleVideoButton: !bool` | Inverted logic |
| `showScreenShareButton(bool)` | `hideScreenSharingButton: !bool` | Inverted logic |
| `showRecordingButton(bool)` | `hideRecordingButton: !bool` | Inverted logic |
| `startWithAudioMuted(bool)` | `startAudioMuted: bool` | Same logic |
| `startWithVideoMuted(bool)` | `startVideoPaused: bool` | Same logic |
| `setMode('DEFAULT')` | `layout: 'SIDEBAR'` | `'DEFAULT'` maps to `'SIDEBAR'` |
| `setMode('SPOTLIGHT')` | `layout: 'SPOTLIGHT'` | Same |
| `startRecordingOnCallStart(bool)` | `autoStartRecording: bool` | Same logic |
| `showVirtualBackgroundSetting(bool)` | `hideVirtualBackgroundButton: !bool` | Inverted logic |
| `setCustomCSS(css)` | *Removed* | Delete usage |
| `setVirtualBackground(vb)` | *Removed* | Delete usage |
| `setCallListener(listener)` | Use `addEventListener()` | See Step 5 |

## Step 4 — Replace Join Session

`startSession()` → `joinSession()`.

### v4 (remove this pattern)

```typescript
const { token } = await CometChatCalls.generateToken(sessionId, authToken);
CometChatCalls.startSession(token, callSettings, container);
```

### v5 (replace with)

```typescript
const { token } = await CometChatCalls.generateToken(sessionId);
const result = await CometChatCalls.joinSession(token, sessionSettings, container);
if (result.error) {
  console.error('Join failed:', result.error);
}
```

Key differences:
- Returns `{ data, error }` instead of relying on listener callbacks
- No need to pass `authToken` to `generateToken()` (handled by `login()`)
- Settings is a plain object, not a builder result

## Step 5 — Replace Event Listeners

Replace `OngoingCallListener` with individual `addEventListener()` calls.

### v4 (remove this pattern)

```typescript
const callSettings = new CometChatCalls.CallSettingsBuilder()
  .setCallListener(new CometChatCalls.OngoingCallListener({
    onCallEnded: () => { },
    onCallEndButtonPressed: () => { },
    onUserJoined: (user) => { },
    onUserLeft: (user) => { },
    onUserListUpdated: (userList) => { },
    onRecordingStarted: (event) => { },
    onRecordingStopped: () => { },
    onScreenShareStarted: () => { },
    onScreenShareStopped: () => { },
    onUserMuted: (event) => { },
    onError: (error) => { },
  }))
  .build();
```

### v5 (replace with)

```typescript
const controller = new AbortController();
const opts = { signal: controller.signal };

CometChatCalls.addEventListener('onSessionLeft', () => { }, opts);
CometChatCalls.addEventListener('onLeaveSessionButtonClicked', () => { }, opts);
CometChatCalls.addEventListener('onParticipantJoined', (p) => { }, opts);
CometChatCalls.addEventListener('onParticipantLeft', (p) => { }, opts);
CometChatCalls.addEventListener('onParticipantListChanged', (list) => { }, opts);
CometChatCalls.addEventListener('onRecordingStarted', () => { }, opts);
CometChatCalls.addEventListener('onRecordingStopped', () => { }, opts);
CometChatCalls.addEventListener('onScreenShareStarted', () => { }, opts);
CometChatCalls.addEventListener('onScreenShareStopped', () => { }, opts);
CometChatCalls.addEventListener('onParticipantAudioMuted', (p) => { }, opts);

// Cleanup all at once:
controller.abort();
```

### Event Mapping

| v4 Event | v5 Event |
|----------|----------|
| `onCallEnded` | `onSessionLeft` |
| `onCallEndButtonPressed` | `onLeaveSessionButtonClicked` |
| `onSessionTimeout` | `onSessionTimedOut` |
| `onUserJoined(user)` | `onParticipantJoined(participant)` |
| `onUserLeft(user)` | `onParticipantLeft(participant)` |
| `onUserListUpdated(list)` | `onParticipantListChanged(participants)` |
| `onRecordingStarted(event)` | `onRecordingStarted()` |
| `onRecordingStopped()` | `onRecordingStopped()` |
| `onScreenShareStarted()` | `onScreenShareStarted()` |
| `onScreenShareStopped()` | `onScreenShareStopped()` |
| `onUserMuted(event)` | `onParticipantAudioMuted(participant)` |
| `onCallSwitchedToVideo(event)` | *Removed — delete handler* |
| `onError(error)` | Check `result.error` from `joinSession()` |

## Step 6 — Update Static Methods

Most action methods keep the same names but are now directly on `CometChatCalls`:

| v4 Method | v5 Method | Notes |
|-----------|-----------|-------|
| `CometChatCalls.endSession()` | `CometChatCalls.leaveSession()` | Renamed |
| `CometChatCalls.startScreenShare()` | `CometChatCalls.startScreenSharing()` | Renamed |
| `CometChatCalls.stopScreenShare()` | `CometChatCalls.stopScreenSharing()` | Renamed |
| `CometChatCalls.setMode(mode)` | `CometChatCalls.setLayout(layout)` | Renamed |
| `CometChatCalls.switchToVideoCall()` | *Removed — delete usage* | |
| `CometChatCalls.openVirtualBackground()` | `CometChatCalls.showVirtualBackgroundDialog()` | Renamed |
| `CometChatCalls.closeVirtualBackground()` | `CometChatCalls.hideVirtualBackgroundDialog()` | Renamed |
| `CometChatCalls.setBackgroundBlur(level)` | `CometChatCalls.setVirtualBackgroundBlurLevel(level)` | Renamed |
| `CometChatCalls.setBackgroundImage(url)` | `CometChatCalls.setVirtualBackgroundImage(url)` | Renamed |

## Step 7 — Clean Up Removed APIs

Delete usage of these removed/deprecated features:
- `switchToVideoCall()` — no replacement
- `setCustomCSS()` — no replacement
- `MainVideoContainerSetting` — no replacement
- `setVirtualBackground()` on builder — use runtime methods instead
- `getCallDetails()` — use `CallLogRequestBuilder` instead

## Gotchas

- v5 is a drop-in replacement — you can update the package and migrate incrementally; v4 APIs still work but are deprecated
- Boolean logic is **inverted** for visibility: `showX(true)` → `hideX: false`
- `'DEFAULT'` mode maps to `'SIDEBAR'` layout in v5
- `OngoingCallListener` is replaced by individual `addEventListener()` calls with `AbortSignal` for cleanup
- `generateToken()` no longer requires `authToken` parameter — it's cached from `login()`
- `onCallSwitchedToVideo` and `switchToVideoCall()` are removed with no replacement
- The `User` object in v4 events is replaced by a simpler `Participant` object (`{ pid, name, uid, avatar }`)


