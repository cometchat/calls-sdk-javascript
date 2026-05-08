---
name: ringing-integration
description: Implement ringing with dual SDK (Chat + Calls). Use when adding incoming/outgoing call screens, CometChat.initiateCall, accept/reject/cancel calls, or integrating Chat SDK signaling with Calls SDK sessions. Triggers on "ringing", "incoming call", "outgoing call", "initiateCall", "acceptCall", "rejectCall".
inclusion: manual
---

# CometChat Calls SDK v5 — Ringing Integration

## Overview

Implement call ringing using both CometChat Chat SDK (signaling) and Calls SDK (session). The Chat SDK handles initiating, accepting, rejecting, and cancelling calls. The Calls SDK manages the actual call session after acceptance.

## Key Imports

```typescript
// Chat SDK — signaling
import { CometChat } from '@cometchat/chat-sdk-javascript';

// Calls SDK — session
import { CometChatCalls, type SessionSettings } from '@cometchat/calls-sdk-javascript';
```

## Implementation

### 1. Initiate a Call (Caller Side)

```typescript
const call = new CometChat.Call(
  receiverUID,
  CometChat.RECEIVER_TYPE.USER,
  CometChat.CALL_TYPE.VIDEO
);

const outgoingCall = await CometChat.initiateCall(call);
// Show outgoing call UI with outgoingCall.getSessionId()
```

### 2. Listen for Incoming Calls

```typescript
const listenerID = 'CALL_LISTENER';

CometChat.addCallListener(listenerID, new CometChat.CallListener({
  onIncomingCallReceived: (call) => {
    // Show incoming call UI
    // call.getSessionId(), call.getSender().getName(), call.getType()
  },
  onOutgoingCallAccepted: (call) => {
    // Navigate to call screen, join session with call.getSessionId()
    joinCallSession(call.getSessionId(), call.getType());
  },
  onOutgoingCallRejected: (call) => {
    // Dismiss outgoing call UI
  },
  onIncomingCallCancelled: (call) => {
    // Dismiss incoming call UI
  },
}));

// Remove in cleanup
CometChat.removeCallListener(listenerID);
```

### 3. Accept a Call (Receiver Side)

```typescript
const acceptedCall = await CometChat.acceptCall(sessionId);
// Join the Calls SDK session
joinCallSession(acceptedCall.getSessionId(), acceptedCall.getType());
```

### 4. Reject a Call

```typescript
await CometChat.rejectCall(sessionId, CometChat.CALL_STATUS.REJECTED);
```

### 5. Cancel an Outgoing Call

```typescript
await CometChat.rejectCall(sessionId, CometChat.CALL_STATUS.CANCELLED);
```

### 6. Join Call Session After Accept

```typescript
async function joinCallSession(sessionId: string, callType: string) {
  const container = document.getElementById('call-container') as HTMLElement;
  const isVoice = callType === CometChat.CALL_TYPE.AUDIO;

  const { token } = await CometChatCalls.generateToken(sessionId);

  const sessionSettings: SessionSettings = {
    sessionType: isVoice ? 'VOICE' : 'VIDEO',
    layout: isVoice ? 'SPOTLIGHT' : 'TILE',
    startVideoPaused: isVoice,
  };

  await CometChatCalls.joinSession(token, sessionSettings, container);
}
```

### 7. End a Call (During Session)

```typescript
// 1. Leave the Calls SDK session
CometChatCalls.leaveSession();

// 2. Listen for session end and notify via Chat SDK
CometChatCalls.addEventListener('onSessionLeft', () => {
  // Navigate away from call screen
});
```

### 8. Handle Leave Button

```typescript
CometChatCalls.addEventListener('onLeaveSessionButtonClicked', () => {
  CometChatCalls.leaveSession();
});
```

## Gotchas

- Cancel uses `CometChat.rejectCall()` with `CometChat.CALL_STATUS.CANCELLED` status
- Call type constants: `CometChat.CALL_TYPE.VIDEO` and `CometChat.CALL_TYPE.AUDIO`
- Remove call listeners on component unmount / page navigation to prevent memory leaks
- Initialize and login to **both** SDKs before using ringing
- The Chat SDK handles signaling (ring/accept/reject); the Calls SDK handles the actual media session
- `generateToken()` requires the Calls SDK user to be logged in


