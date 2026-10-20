---
name: ringing-integration
description: Implement 1:1 and group ringing on the web with the Calls SDK 5.1 (initiateCall / connect / endCall, prepared sessions), with the Chat SDK delivering incoming calls to open tabs. Use when adding outgoing or incoming call screens, ringing a user or a group, cancelling, declining, detecting a decline or busy, or joining an answered call. Triggers on "ringing", "incoming call", "outgoing call", "initiateCall", "endCall", "connect", "decline", "busy", "group call", "call back".
inclusion: manual
---

# CometChat Calls SDK v5.1 — Ringing (Web)

## Overview

| Side | SDK | What it does |
|---|---|---|
| Caller | Calls SDK 5.1 | `initiateCall` creates the call, rings the receiver and **prepares the session** without joining it; `endCall` withdraws it |
| Callee (web) | Chat SDK | Delivers the call to each open tab of the callee: `CometChat.addCallListener` → `onIncomingCallReceived` |
| Callee (web) | Calls SDK 5.1 | `connect` prepares the session while it rings; `session.join(container)` answers; `endCall(id, 'rejected')` declines |

The web has no VoIP push: only an open, signed-in tab rings. A callee on Android or iOS rings through
the Push Notifications SDK, so web and mobile users can call each other.

The Chat SDK's calling methods (`CometChat.initiateCall`, `acceptCall`, `rejectCall`, `endCall`,
`startCall`) are **not** used in this flow. `CometChat.addCallListener` is the one Chat SDK call API
still needed: it is how an incoming call reaches the tab.

## Prerequisites

- `@cometchat/calls-sdk-javascript` 5.1+, initialized and logged in (`CometChatCalls.login`)
- `@cometchat/chat-sdk-javascript`, initialized and logged in as the **same user**
- HTTPS (or `localhost`) for camera and microphone

## 1. Session settings: build them once

`initiateCall` and `connect` freeze the settings on the session they prepare, and
`session.join(container)` takes none. Build them from one function on both sides:

```typescript
import type { SessionSettings } from '@cometchat/calls-sdk-javascript';

function callSettings(type: 'audio' | 'video', title: string, isPeerCall: boolean): SessionSettings {
  return {
    title,
    sessionType: type === 'audio' ? 'VOICE' : 'VIDEO', // the default is video: always set it
    isPeerCall, // 1:1: the call ends for both when either leaves. Group: false
  };
}
```

## 2. Place the call (caller)

```typescript
import { CometChatCalls } from '@cometchat/calls-sdk-javascript';

const { data: call, error } = await CometChatCalls.initiateCall(receiverId, {
  type: isVideo ? 'video' : 'audio',
  receiverType: isGroup ? 'group' : 'user',
  sessionSettings: callSettings(isVideo ? 'video' : 'audio', name, !isGroup),
});
if (error) {
  // Nothing was created: show "Call failed"
} else {
  // call.sessionId, call.session (the CallSession being prepared). Show "Calling…"
}
```

`initiateCall` never rejects; it resolves with `{ data, error }`. It resolves before the prepare has
finished (`call.session.prepareStatus` is `'pending'`); a failed prepare does not fail the call.

## 3. Follow the prepared session

Listeners from `CometChatCalls.addEventListener` are global and return an unsubscribe function:

```typescript
const me = CometChatCalls.getLoggedInUser()?.uid;
const offConnected = CometChatCalls.addEventListener('onParticipantConnected', participant => {
  if (participant.uid !== me) setStatus('Ringing…'); // a callee's device has the session
});
const offJoined = CometChatCalls.addEventListener('onParticipantJoined', () => {
  // The callee answered: show the call screen and join (step 6)
});
const offClosed = CometChatCalls.addEventListener('onConnectionClosed', async () => {
  // The prepared session went away before anyone joined. It carries no reason: ask the server (step 5)
});
```

## 4. Cancel and timeout

```typescript
// The end button
await CometChatCalls.endCall(call.sessionId, 'cancelled');

// No answer after 45 s (a mobile callee rings for 60 s: give up first).
// A group is withdrawn: 'unanswered' is each member's own outcome.
await CometChatCalls.endCall(call.sessionId, isGroup ? 'cancelled' : 'unanswered');
```

`endCall` also tears down the prepared session. Losing a race with the other side ending the call
returns an error, which is harmless.

## 5. Detect a decline or busy

A decline reaches the server at once, but the caller is not reliably told. While the call rings,
read its status every 3 seconds (`GET /v3.0/calls/:sessionId` with the user's auth token):

```typescript
async function fetchCallStatus(sessionId: string): Promise<string | null> {
  const authToken = CometChatCalls.getUserAuthToken();
  if (!authToken) return null;
  const url = `https://${APP_ID}.call-${REGION}.cometchat.io/v3.0/calls/${encodeURIComponent(sessionId)}`;
  try {
    const response = await fetch(url, { headers: { accept: 'application/json', appid: APP_ID, authtoken: authToken } });
    if (!response.ok) return null;
    const body = await response.json();
    const entry = Array.isArray(body.data) ? body.data[0] : body.data;
    return entry?.status ?? null;
  } catch {
    return null; // keep ringing: a failed request must never end a live call
  }
}
// 'rejected' → "Declined", 'busy' → "Busy", 'initiated' / 'ongoing' / null → still ringing, anything else → "Call ended"
```

Start polling as soon as `initiateCall` resolves, not only after "Ringing…": a callee who declines
before their device prepared the session never sends `onParticipantConnected`.

## 6. Join the answered call

```typescript
const { error } = await call.session.join(container);
if (error?.name === 'VALIDATION_ERROR') {
  // No call token came with the prepared session: join directly
  const { token } = await CometChatCalls.generateToken(call.sessionId);
  await CometChatCalls.joinSession(token, callSettings(type, title, isPeerCall), container);
}
```

## 7. Receive a call (callee)

```typescript
import { CometChat } from '@cometchat/chat-sdk-javascript';

CometChat.addCallListener('ringing', new CometChat.CallListener({
  onIncomingCallReceived: (call: CometChat.Call) => {
    const caller = call.getCallInitiator() as CometChat.User;
    if (caller.getUid() === CometChatCalls.getLoggedInUser()?.uid) return; // your own call, echoed back
    if (Date.now() / 1000 - call.getInitiatedAt() > 60) return; // delivered late: long over
    const isGroup = call.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP;
    if (alreadyInACall) {
      if (!isGroup) void CometChatCalls.endCall(call.getSessionId(), 'busy'); // a group call is just not shown
      return;
    }
    // Ring (ringtone, incoming screen), then prepare while it rings:
    prepared = CometChatCalls.connect(call.getSessionId(), callSettings(type, title, !isGroup));
  },
  onIncomingCallCancelled: call => { /* stop ringing for call.getSessionId() */ },
}));
// At logout: CometChat.removeCallListener('ringing')
```

- **Answer**: `(await prepared).join(container)` — fall back to `generateToken` + `joinSession` when
  the prepare failed (step 6).
- **Decline (1:1)**: `CometChatCalls.endCall(sessionId, 'rejected')`, which also leaves the prepared
  session. **Decline (group)**: only `session.leave()` the prepared session: the call goes on for the
  others.
- **Stop ringing** on `onIncomingCallCancelled`, on `onConnectionClosed` of the prepared session, and,
  as a backstop, when the status poll (step 5) says the call is no longer `initiated` (for a group
  call: `ended`, `cancelled`, `unanswered` or `rejected`).

## 8. Leave a call

The Calls SDK's own leave button ends the call. Listen for the end:

```typescript
CometChatCalls.addEventListener('onSessionLeft', closeCallScreen);
CometChatCalls.addEventListener('onConnectionClosed', closeCallScreen); // the other side ended a 1:1 call
```

## Gotchas

- **Set `sessionType` and `isPeerCall` in the settings `initiateCall` / `connect` get.** They are frozen
  there; an audio call without `sessionType: 'VOICE'` opens the camera, and without `isPeerCall` a
  hang-up leaves the other side alone in the room.
- **Don't join before `onParticipantJoined`.** The caller sits in the prepared session invisibly, with
  the camera and microphone off, until there is someone to talk to.
- **Poll while ringing, on both sides.** Neither a decline (to the caller) nor a cancel made through
  the room (to the callee) is reliably delivered as an event.
- **The Chat SDK echoes your own call back as "incoming".** Filter it by the initiator's UID, or the
  caller's tab declines its own call as busy.
- **Several tabs ring at once.** Tell the others when one answers or declines (a `BroadcastChannel`).
- **Browsers block sound until the user interacts with the page.** A ringtone on a tab nobody has
  touched may stay silent; show a browser notification too.
- **A modal `<dialog>` sits above any `z-index`.** Show the ringing screen in the top layer as well
  (`dialog.showModal()`), or it can ring unseen behind another open dialog.

## Sample App Reference

`sample-apps/cometchat-calls-sample-app-ringing-react`:

- `src/calls/CallProvider.tsx` — placing, receiving, answering, declining, cancel and timeout
- `src/calls/calls-context.ts` — `callSettings`
- `src/calls/call-state.ts` — the status poll
- `src/calls/CallScreen.tsx` — joining the answered call
- `src/calls/call-tabs.ts` — several open tabs
- `src/screens/NewGroupCall.tsx` — creating a group to ring
