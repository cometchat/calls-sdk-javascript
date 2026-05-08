---
name: video-controls
description: Control video during calls — pause/resume camera, switch video input device. Use when implementing camera toggle, device switching, or custom video buttons. Triggers on "pause video", "resume video", "switch camera", "camera toggle", "video controls", "video device".
inclusion: manual
---

# CometChat Calls SDK v5 — Video Controls

## Overview

Programmatically control the local camera (pause/resume) and switch between video input devices during an active call.

## Key Imports

```typescript
import { CometChatCalls } from '@cometchat/calls-sdk-javascript';
```

## Implementation

### Pause / Resume Video

```typescript
CometChatCalls.pauseVideo();   // turn off camera
CometChatCalls.resumeVideo();  // turn on camera
CometChatCalls.toggleVideo();  // toggle camera state
```

### Switch Camera (Mobile Web)

```typescript
CometChatCalls.switchCamera();  // toggle front ↔ back (mobile devices)
```

### Get Available Video Devices

```typescript
const videoInputs = CometChatCalls.getVideoInputDevices();
```

### Get Current Video Device

```typescript
const currentCamera = CometChatCalls.getCurrentVideoInputDevice();
```

### Switch Video Input Device

```typescript
const devices = CometChatCalls.getVideoInputDevices();
CometChatCalls.setVideoInputDevice(devices[1].deviceId);
```

### Listen for Video Events

```typescript
CometChatCalls.addEventListener('onVideoPaused', () => {
  // Update video button to "off" state, show avatar
});

CometChatCalls.addEventListener('onVideoResumed', () => {
  // Update video button to "on" state, show video
});

CometChatCalls.addEventListener('onVideoInputDeviceChanged', (device) => {
  console.log('Camera switched to:', device.label);
});

CometChatCalls.addEventListener('onVideoInputDevicesChanged', (devices) => {
  // Device list changed — rebuild camera selector UI
});
```

### Pre-select Device (Before Joining)

```typescript
const sessionSettings: SessionSettings = {
  sessionType: 'VIDEO',
  videoInputDeviceId: 'specific-camera-id',
  startVideoPaused: false,
};
```

## Gotchas

- `pauseVideo()` / `resumeVideo()` only work during an active session
- `switchCamera()` is primarily for mobile web (front/back toggle) — on desktop, use `setVideoInputDevice()`
- Device lists return `MediaDeviceInfo` objects with `deviceId`, `label`, `kind`, `groupId`
- Device labels may be empty strings until the user grants camera permission
- For voice calls (`sessionType: 'VOICE'`), set `startVideoPaused: true`
- Camera permissions must be granted before joining — the SDK requests them automatically


