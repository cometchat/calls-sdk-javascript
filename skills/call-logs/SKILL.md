---
name: call-logs
description: Fetch call history using CallLogRequestBuilder with pagination and filters. Use when displaying call logs, filtering by type/status/recording, or accessing recordings. Triggers on "call logs", "call history", "CallLogRequestBuilder", "fetch recordings".
inclusion: manual
---

# CometChat Calls SDK v5 — Call Logs

## Overview

Retrieve call history using `CallLogRequestBuilder` with pagination, filtering by type, status, direction, recordings, and specific users/groups.

## Key Imports

```typescript
import { CometChatCalls } from '@cometchat/calls-sdk-javascript';
```

## Implementation

### Basic Fetch

```typescript
const request = new CometChatCalls.CallLogRequestBuilder()
  .setLimit(30)
  .build();

const callLogs = await request.fetchNext();
for (const log of callLogs) {
  console.log('Session:', log.getSessionID());
  console.log('Duration:', log.getTotalDuration());
  console.log('Status:', log.getStatus());
  console.log('Type:', log.getType());
}
```

### Filtered Queries

```typescript
// Video calls only
new CometChatCalls.CallLogRequestBuilder()
  .setCallType('video')
  .setLimit(20)
  .build();

// Calls with recordings
new CometChatCalls.CallLogRequestBuilder()
  .setHasRecording(true)
  .build();

// Missed incoming calls
new CometChatCalls.CallLogRequestBuilder()
  .setCallStatus('missed')
  .setCallDirection('incoming')
  .build();

// Calls with a specific user
new CometChatCalls.CallLogRequestBuilder()
  .setUid('user_id')
  .build();

// Meeting calls only
new CometChatCalls.CallLogRequestBuilder()
  .setCallCategory('meet')
  .build();
```

### Pagination

```typescript
const request = new CometChatCalls.CallLogRequestBuilder()
  .setLimit(20)
  .build();

// Forward pagination
const page1 = await request.fetchNext();
const page2 = await request.fetchNext();

// Backward pagination
const prevPage = await request.fetchPrevious();
```

### Access Recordings

```typescript
for (const log of callLogs) {
  if (log.getHasRecording()) {
    const recordings = log.getRecordings();
    for (const recording of recordings) {
      console.log('URL:', recording.getRecordingURL());
      console.log('Duration:', recording.getDuration(), 'seconds');
      console.log('Start:', recording.getStartTime());
      console.log('End:', recording.getEndTime());
    }
  }
}
```

### CallLog Properties

| Method | Returns | Description |
|--------|---------|-------------|
| `getSessionID()` | string | Session identifier |
| `getType()` | string | `'video'` or `'audio'` |
| `getStatus()` | string | `'ended'`, `'missed'`, `'rejected'`, `'cancelled'`, etc. |
| `getCallCategory()` | string | `'call'` or `'meet'` |
| `getTotalDuration()` | string | Human-readable duration |
| `getTotalParticipants()` | number | Participant count |
| `getHasRecording()` | boolean | Whether recorded |
| `getRecordings()` | Recording[] | Recording objects |
| `getInitiator()` | CallUser | Who started the call |
| `getReceiver()` | CallUser \| CallGroup | Who received the call |
| `getInitiatedAt()` | number | Timestamp |
| `getEndedAt()` | number | Timestamp |

## Gotchas

- `setCallType()` takes lowercase strings: `'video'` or `'audio'`
- `setCallDirection()` takes `'incoming'` or `'outgoing'`
- `setCallCategory()` takes `'call'` or `'meet'`
- `setCallStatus()` takes `'ongoing'`, `'busy'`, `'rejected'`, `'cancelled'`, `'ended'`, or `'missed'`
- Create a new `CallLogRequestBuilder` to reset pagination
- `fetchNext()` and `fetchPrevious()` return Promises — use `await`


