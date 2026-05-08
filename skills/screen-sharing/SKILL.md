---
name: screen-sharing
description: Start and stop screen sharing during calls. Web clients can initiate screen sharing. Use when implementing screen share, listening for screen share events, or checking presenter status. Triggers on "screen sharing", "screen share", "share screen", "startScreenSharing".
inclusion: manual
---

# CometChat Calls SDK v5 — Screen Sharing

## Overview

The Web Calls SDK can **initiate and receive** screen shares. When a user starts screen sharing, the browser's native screen picker dialog appears. The call layout automatically adjusts to display shared content.

## Key Imports

```typescript
import { CometChatCalls } from '@cometchat/calls-sdk-javascript';
```

## Implementation

### Start / Stop Screen Sharing

```typescript
CometChatCalls.startScreenSharing();  // opens browser screen picker
CometChatCalls.stopScreenSharing();   // stops sharing
```

### Listen for Screen Share Events (Local)

```typescript
CometChatCalls.addEventListener('onScreenShareStarted', () => {
  // Local user started screen sharing
  // Update UI to show "sharing" indicator
});

CometChatCalls.addEventListener('onScreenShareStopped', () => {
  // Local user stopped screen sharing
});
```

### Listen for Participant Screen Share Events

```typescript
CometChatCalls.addEventListener('onParticipantStartedScreenShare', (participant) => {
  console.log(`${participant.name} started screen sharing`);
  // Layout auto-adjusts to show shared screen
});

CometChatCalls.addEventListener('onParticipantStoppedScreenShare', (participant) => {
  console.log(`${participant.name} stopped screen sharing`);
  // Layout returns to normal
});
```

### Configure Screen Share Button Visibility

```typescript
const sessionSettings: SessionSettings = {
  hideScreenSharingButton: false,  // show screen share button (default)
};
```

### Handle Button Click Event

```typescript
CometChatCalls.addEventListener('onScreenShareButtonClicked', () => {
  // Fires when user clicks the built-in screen share button
});
```

## Gotchas

- Screen sharing requires HTTPS (or localhost) — browsers block `getDisplayMedia()` on HTTP
- The browser shows its own screen picker dialog — the SDK cannot bypass this
- Only **one user** can screen share at a time in a session
- If the user cancels the browser picker, no event fires
- The user can also stop sharing via the browser's native "Stop sharing" button — `onScreenShareStopped` fires in both cases
- Screen sharing may pause the local video (depending on browser/device) — the SDK handles this automatically
- Android/iOS mobile clients can **receive** screen shares from web but cannot initiate them


