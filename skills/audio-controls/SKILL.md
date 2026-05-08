---
name: audio-controls
description: Control audio during calls — mute/unmute microphone, switch audio input/output devices. Use when implementing audio toggle, device switching, or custom mute buttons. Triggers on "mute audio", "unmute", "audio device", "microphone", "speaker", "audio controls".
inclusion: manual
---

# CometChat Calls SDK v5 — Audio Controls

## Overview

Programmatically control the local microphone (mute/unmute) and switch audio input/output devices during an active call.

## Key Imports

```typescript
import { CometChatCalls } from '@cometchat/calls-sdk-javascript';
```

## Implementation

### Mute / Unmute

```typescript
CometChatCalls.muteAudio();    // mute microphone
CometChatCalls.unmuteAudio();  // unmute microphone
CometChatCalls.toggleAudio();  // toggle mute state
```

### Get Available Audio Devices

```typescript
const audioInputs = CometChatCalls.getAudioInputDevices();   // microphones
const audioOutputs = CometChatCalls.getAudioOutputDevices(); // speakers/headphones
```

### Get Current Device

```typescript
const currentMic = CometChatCalls.getCurrentAudioInputDevice();
const currentSpeaker = CometChatCalls.getCurrentAudioOutputDevice();
```

### Switch Audio Input (Microphone)

```typescript
const devices = CometChatCalls.getAudioInputDevices();
CometChatCalls.setAudioInputDevice(devices[1].deviceId);
```

### Switch Audio Output (Speaker)

```typescript
const outputs = CometChatCalls.getAudioOutputDevices();
CometChatCalls.setAudioOutputDevice(outputs[0].deviceId);
```

### Listen for Audio Events

```typescript
CometChatCalls.addEventListener('onAudioMuted', () => {
  // Update mute button to "muted" state
});

CometChatCalls.addEventListener('onAudioUnMuted', () => {
  // Update mute button to "unmuted" state
});

CometChatCalls.addEventListener('onAudioInputDeviceChanged', (device) => {
  console.log('Mic switched to:', device.label);
});

CometChatCalls.addEventListener('onAudioOutputDeviceChanged', (device) => {
  console.log('Speaker switched to:', device.label);
});

CometChatCalls.addEventListener('onAudioInputDevicesChanged', (devices) => {
  // Device list changed (plugged/unplugged) — rebuild UI
});

CometChatCalls.addEventListener('onAudioOutputDevicesChanged', (devices) => {
  // Output device list changed — rebuild UI
});
```

### Pre-select Device (Before Joining)

```typescript
const sessionSettings: SessionSettings = {
  audioInputDeviceId: 'specific-device-id',
  audioOutputDeviceId: 'specific-output-id',
  startAudioMuted: true,  // join muted
};
```

## Gotchas

- `muteAudio()` / `unmuteAudio()` only work during an active session
- Device lists return `MediaDeviceInfo` objects with `deviceId`, `label`, `kind`, `groupId`
- `setAudioOutputDevice()` may not work in all browsers (Safari has limited support)
- Device labels may be empty strings until the user grants microphone permission
- Use `onAudioInputDevicesChanged` to detect when devices are plugged/unplugged
- For voice calls, consider setting `startAudioMuted: false` as default


