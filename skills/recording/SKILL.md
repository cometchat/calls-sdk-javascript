---
name: recording
description: Record call sessions with start/stop, auto-start recording, and recording events. Use when implementing call recording, accessing recordings from call logs, or showing recording indicators. Triggers on "recording", "record call", "auto start recording", "recording events", "startRecording".
inclusion: manual
---

# CometChat Calls SDK v5 — Recording

## Overview

Record call sessions server-side. Supports manual start/stop, auto-start via `SessionSettings`, and event listeners for recording state. Recordings are accessible via call logs or the CometChat Dashboard.

## Key Imports

```typescript
import { CometChatCalls, type SessionSettings } from '@cometchat/calls-sdk-javascript';
```

## Implementation

### Start / Stop Recording

```typescript
CometChatCalls.startRecording();
CometChatCalls.stopRecording();
CometChatCalls.toggleRecording();
```

### Auto-Start Recording (SessionSettings)

```typescript
const sessionSettings: SessionSettings = {
  autoStartRecording: true,
  hideRecordingButton: false,  // show button (hidden by default)
};
```

### Listen for Recording Events (Local)

```typescript
CometChatCalls.addEventListener('onRecordingStarted', () => {
  // Show recording indicator
});

CometChatCalls.addEventListener('onRecordingStopped', () => {
  // Hide recording indicator
});
```

### Track Participant Recording

```typescript
CometChatCalls.addEventListener('onParticipantStartedRecording', (participant) => {
  console.log(`${participant.name} started recording`);
});

CometChatCalls.addEventListener('onParticipantStoppedRecording', (participant) => {
  console.log(`${participant.name} stopped recording`);
});
```

### Access Recordings from Call Logs

```typescript
const request = new CometChatCalls.CallLogRequestBuilder()
  .setHasRecording(true)
  .setLimit(20)
  .build();

const callLogs = await request.fetchNext();
for (const log of callLogs) {
  const recordings = log.getRecordings();
  for (const recording of recordings) {
    console.log('URL:', recording.getRecordingURL());
    console.log('Duration:', recording.getDuration(), 'seconds');
  }
}
```

## Gotchas

- Recording must be **enabled** in your CometChat Dashboard
- The recording button is **hidden by default** — use `hideRecordingButton: false` to show it
- All participants are notified when recording starts
- Recordings are stored server-side and available after the call ends
- `Recording` object has: `getRid()`, `getRecordingURL()`, `getStartTime()`, `getEndTime()`, `getDuration()`


