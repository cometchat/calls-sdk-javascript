---
name: event-listeners
description: Register call event listeners using CometChatCalls.addEventListener — session status, participant, media, button click, layout events. Use when handling call events, session status, participant changes, media state, button clicks, or layout changes. Triggers on "event listener", "addEventListener", "session listener", "participant listener", "media listener", "button click", "layout listener".
inclusion: manual
---

# CometChat Calls SDK v5 — Event Listeners

## Overview

Register event listeners using `CometChatCalls.addEventListener()`. Each call returns an unsubscribe function. Events are categorized into session status, participant, media, button click, and layout groups.

## Key Imports

```typescript
import { CometChatCalls } from '@cometchat/calls-sdk-javascript';
```

## Implementation

### Basic Pattern

```typescript
const unsubscribe = CometChatCalls.addEventListener('eventName', (payload) => {
  // handle event
});

// Later, to remove:
unsubscribe();
```

### Using AbortSignal for Cleanup

```typescript
const controller = new AbortController();

CometChatCalls.addEventListener('onSessionJoined', () => {
  console.log('Joined session');
}, { signal: controller.signal });

CometChatCalls.addEventListener('onSessionLeft', () => {
  console.log('Left session');
}, { signal: controller.signal });

// Remove all listeners at once:
controller.abort();
```

### 1. Session Status Events

```typescript
CometChatCalls.addEventListener('onSessionJoined', () => {
  console.log('Connected to session');
});

CometChatCalls.addEventListener('onSessionLeft', () => {
  console.log('Left session');
});

CometChatCalls.addEventListener('onSessionTimedOut', () => {
  console.log('Session timed out');
});

CometChatCalls.addEventListener('onConnectionLost', () => {
  console.log('Connection lost — show reconnecting UI');
});

CometChatCalls.addEventListener('onConnectionRestored', () => {
  console.log('Connection restored');
});

CometChatCalls.addEventListener('onConnectionClosed', () => {
  console.log('Connection closed');
});
```

### 2. Participant Events

```typescript
CometChatCalls.addEventListener('onParticipantJoined', (participant) => {
  console.log(`${participant.name} joined`);
});

CometChatCalls.addEventListener('onParticipantLeft', (participant) => {
  console.log(`${participant.name} left`);
});

CometChatCalls.addEventListener('onParticipantListChanged', (participants) => {
  // Full participant list — use for UI updates
  console.log('Participants:', participants.length);
});

CometChatCalls.addEventListener('onParticipantAudioMuted', (participant) => {
  console.log(`${participant.name} muted audio`);
});

CometChatCalls.addEventListener('onParticipantAudioUnmuted', (participant) => {
  console.log(`${participant.name} unmuted audio`);
});

CometChatCalls.addEventListener('onParticipantVideoPaused', (participant) => {
  console.log(`${participant.name} paused video`);
});

CometChatCalls.addEventListener('onParticipantVideoResumed', (participant) => {
  console.log(`${participant.name} resumed video`);
});

CometChatCalls.addEventListener('onParticipantHandRaised', (participant) => {
  console.log(`${participant.name} raised hand`);
});

CometChatCalls.addEventListener('onParticipantHandLowered', (participant) => {
  console.log(`${participant.name} lowered hand`);
});

CometChatCalls.addEventListener('onParticipantStartedScreenShare', (participant) => {
  console.log(`${participant.name} started screen sharing`);
});

CometChatCalls.addEventListener('onParticipantStoppedScreenShare', (participant) => {
  console.log(`${participant.name} stopped screen sharing`);
});

CometChatCalls.addEventListener('onParticipantStartedRecording', (participant) => {
  console.log(`${participant.name} started recording`);
});

CometChatCalls.addEventListener('onParticipantStoppedRecording', (participant) => {
  console.log(`${participant.name} stopped recording`);
});

CometChatCalls.addEventListener('onDominantSpeakerChanged', (participant) => {
  console.log(`Dominant speaker: ${participant.name}`);
});
```

### 3. Media Events (Local User)

```typescript
CometChatCalls.addEventListener('onAudioMuted', () => {
  // Update mute button to "muted" state
});

CometChatCalls.addEventListener('onAudioUnMuted', () => {
  // Update mute button to "unmuted" state
});

CometChatCalls.addEventListener('onVideoPaused', () => {
  // Update video button to "off" state
});

CometChatCalls.addEventListener('onVideoResumed', () => {
  // Update video button to "on" state
});

CometChatCalls.addEventListener('onRecordingStarted', () => {
  // Show recording indicator
});

CometChatCalls.addEventListener('onRecordingStopped', () => {
  // Hide recording indicator
});

CometChatCalls.addEventListener('onScreenShareStarted', () => {
  // Local user started screen sharing
});

CometChatCalls.addEventListener('onScreenShareStopped', () => {
  // Local user stopped screen sharing
});
```

### 4. Web-Specific Media Events

```typescript
CometChatCalls.addEventListener('onAudioInputDeviceChanged', (device: MediaDeviceInfo) => {
  console.log('Audio input changed to:', device.label);
});

CometChatCalls.addEventListener('onVideoInputDeviceChanged', (device: MediaDeviceInfo) => {
  console.log('Video input changed to:', device.label);
});

CometChatCalls.addEventListener('onAudioOutputDeviceChanged', (device: MediaDeviceInfo) => {
  console.log('Audio output changed to:', device.label);
});

CometChatCalls.addEventListener('onAudioInputDevicesChanged', (devices: MediaDeviceInfo[]) => {
  console.log('Available audio inputs:', devices.length);
});

CometChatCalls.addEventListener('onVideoInputDevicesChanged', (devices: MediaDeviceInfo[]) => {
  console.log('Available video inputs:', devices.length);
});

CometChatCalls.addEventListener('onAudioOutputDevicesChanged', (devices: MediaDeviceInfo[]) => {
  console.log('Available audio outputs:', devices.length);
});
```

### 5. Button Click Events

```typescript
CometChatCalls.addEventListener('onLeaveSessionButtonClicked', () => {
  // User clicked leave — handle navigation
});

CometChatCalls.addEventListener('onToggleAudioButtonClicked', () => {});
CometChatCalls.addEventListener('onToggleVideoButtonClicked', () => {});
CometChatCalls.addEventListener('onRaiseHandButtonClicked', () => {});
CometChatCalls.addEventListener('onShareInviteButtonClicked', () => {});
CometChatCalls.addEventListener('onChangeLayoutButtonClicked', () => {});
CometChatCalls.addEventListener('onParticipantListButtonClicked', () => {});
CometChatCalls.addEventListener('onRecordingToggleButtonClicked', () => {});
CometChatCalls.addEventListener('onScreenShareButtonClicked', () => {});
CometChatCalls.addEventListener('onChatButtonClicked', () => {});
```

### 6. Layout Events

```typescript
CometChatCalls.addEventListener('onCallLayoutChanged', (layout) => {
  console.log('Layout changed to:', layout); // 'TILE' | 'SIDEBAR' | 'SPOTLIGHT'
});

CometChatCalls.addEventListener('onParticipantListVisible', () => {
  console.log('Participant list opened');
});

CometChatCalls.addEventListener('onParticipantListHidden', () => {
  console.log('Participant list closed');
});
```

### Participant Object Shape

```typescript
interface Participant {
  pid: string;    // Participant ID (unique per session join)
  name: string;   // Display name
  uid: string;    // CometChat user ID
  avatar?: string; // Avatar URL
}
```

### Participant Actions (Programmatic)

These static methods let you manage participants during an active session:

```typescript
// Mute a participant's audio
CometChatCalls.muteParticipant(participant.uid);

// Pause a participant's video
CometChatCalls.pauseParticipantVideo(participant.uid);

// Pin a participant (keeps them prominent in layout)
CometChatCalls.pinParticipant(participant.pid, 'human');

// Unpin (return to automatic layout)
CometChatCalls.unpinParticipant();

// Raise / lower hand (self)
CometChatCalls.raiseHand();
CometChatCalls.lowerHand();
CometChatCalls.toggleHand();

// Show / hide participant list
CometChatCalls.showParticipantList();
CometChatCalls.hideParticipantList();
CometChatCalls.toggleParticipantList();

// Set chat button unread count
CometChatCalls.setChatButtonUnreadCount(5);
```

## Gotchas

- `addEventListener` returns an **unsubscribe function** — call it to remove the listener
- Use `AbortSignal` to batch-remove multiple listeners at once
- Register listeners **after** `joinSession()` succeeds
- Button click events fire **alongside** the SDK's default action (not before)
- `onParticipantListChanged` provides the full list (not a delta)
- Web-specific device events (`onAudioInputDeviceChanged`, etc.) are not available on mobile SDKs
- All callbacks run on the main thread — no need for `runOnUiThread` like Android
- Pinning only affects **your local view** — other participants can pin independently
- `unpinParticipant()` takes no arguments — unpins whoever is currently pinned
- There is no "kick" API — only mute and pause video


