---
name: session-settings
description: Configure all SessionSettings options — layouts, session type, hide buttons, idle timeout, recording, noise reduction, virtual background. Use when customizing call UI or pre-session config. Triggers on "SessionSettings", "session settings", "hide button", "layout type", "idle timeout", "noise reduction".
inclusion: manual
---

# CometChat Calls SDK v5 — Session Settings

## Overview

`SessionSettings` is a plain object that configures every aspect of a call session before joining. Pass it to `joinSession()` — all properties are optional with sensible defaults.

## Key Imports

```typescript
import { CometChatCalls, type SessionSettings } from '@cometchat/calls-sdk-javascript';
```

## Implementation

### Full Settings Example

```typescript
const sessionSettings: SessionSettings = {
  // Session type & layout
  sessionType: 'VIDEO',                    // 'VIDEO' | 'VOICE'
  layout: 'TILE',                          // 'TILE' | 'SIDEBAR' | 'SPOTLIGHT'

  // Initial media state
  startAudioMuted: false,
  startVideoPaused: false,

  // Recording
  autoStartRecording: false,

  // Timeout
  idleTimeoutPeriodBeforePrompt: 60000,    // ms before showing "extend?" prompt
  idleTimeoutPeriodAfterPrompt: 120000,    // ms after prompt before auto-end

  // Identity
  displayName: 'John Doe',
  title: 'Team Meeting',

  // Hide panels
  hideControlPanel: false,
  hideHeaderPanel: false,
  hideSessionTimer: false,
  hideNetworkIndicator: false,
  hideRecordingStatusIndicator: false,

  // Hide individual buttons
  hideLeaveSessionButton: false,
  hideToggleAudioButton: false,
  hideToggleVideoButton: false,
  hideSwitchCameraButton: false,
  hideRecordingButton: true,               // hidden by default
  hideRaiseHandButton: false,
  hideShareInviteButton: true,             // hidden by default
  hideParticipantListButton: false,
  hideChangeLayoutButton: false,
  hideChatButton: true,                    // hidden by default
  hideScreenSharingButton: false,

  // Web-specific
  hideVirtualBackgroundButton: false,
  enableNoiseReduction: false,
  audioInputDeviceId: undefined,           // pre-select specific device
  audioOutputDeviceId: undefined,
  videoInputDeviceId: undefined,

  // Spotlight layout options
  enableSpotlightDrag: true,
  enableSpotlightSwap: true,

  // Participant context menu (right-click actions)
  enableParticipantContextMenu: true,
};

CometChatCalls.joinSession(token, sessionSettings, container);
```

### Constants Reference

```typescript
// Access via CometChatCalls.constants
CometChatCalls.constants.LAYOUT.TILE        // 'TILE'
CometChatCalls.constants.LAYOUT.SIDEBAR     // 'SIDEBAR'
CometChatCalls.constants.LAYOUT.SPOTLIGHT   // 'SPOTLIGHT'

CometChatCalls.constants.TYPE.VIDEO         // 'VIDEO'
CometChatCalls.constants.TYPE.VOICE         // 'VOICE'
```

### Common Presets

**Voice call:**
```typescript
const voiceSettings: SessionSettings = {
  sessionType: 'VOICE',
  layout: 'SPOTLIGHT',
  startVideoPaused: true,
};
```

**Video call:**
```typescript
const videoSettings: SessionSettings = {
  sessionType: 'VIDEO',
  layout: 'TILE',
  startVideoPaused: false,
};
```

**Custom UI (hide default controls):**
```typescript
const customSettings: SessionSettings = {
  hideControlPanel: true,
  hideHeaderPanel: true,
};
```

### Button Defaults

| Button | Default Hidden? |
|--------|----------------|
| Recording | Yes (`true`) |
| Share Invite | Yes (`true`) |
| Chat | Yes (`true`) |
| All others | No (`false`) |

## Gotchas

- `SessionSettings` is a `Partial<>` type — all properties are optional
- `sessionType` uses `'VOICE'` not "AUDIO"
- Layout values: `'TILE'`, `'SIDEBAR'`, `'SPOTLIGHT'` — all caps
- Idle timeout values are in **milliseconds** (not seconds like Android)
- Recording, share invite, and chat buttons are hidden by default
- `hideControlPanel: true` hides the entire bottom bar — individual hide methods are ignored
- These are pre-session configs only; use `CometChatCalls.*` static methods for runtime changes
- Web-specific options (`enableNoiseReduction`, `hideVirtualBackgroundButton`, device IDs) are not available on mobile SDKs


