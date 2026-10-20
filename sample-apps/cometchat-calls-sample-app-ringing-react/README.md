<p align="center">
  <img alt="CometChat" src="https://assets.cometchat.io/website/images/logos/banner.png">
</p>

# CometChat Calls SDK — Ringing Sample App (React)

A web app showing 1:1 and group ringing calls with the **Calls SDK 5.1**. The caller places and ends
the call with the Calls SDK; the callee's open tab rings, prepares the session while it rings, and
joins it as soon as the call is answered. Web and mobile users can call each other: a callee on
Android or iOS rings through the Push Notifications SDK (see the iOS and Android ringing samples).

## Prerequisites

- Node.js 20.19 or later
- A [CometChat](https://app.cometchat.com/) app: its **App ID**, **Region** (US, EU or IN) and
  **Auth Key**
- Two browsers, or two browser profiles, to call one user from another (each signs in as a
  different user)

## Setup

1. Clone the repository and install the dependencies:
   ```sh
   git clone https://github.com/cometchat/calls-sdk-javascript.git
   cd calls-sdk-javascript/sample-apps/cometchat-calls-sample-app-ringing-react
   npm install
   ```
2. Run the app:
   ```sh
   npm run dev
   ```
3. Open it in two browsers. On first launch, enter your **App ID**, **Region** and **Auth Key** — or
   set them in `src/config.ts` before running it.
4. Sign in as a different user in each browser and call one from the other.

Browsers only allow the camera and microphone on `https://` pages and `localhost`. To call from
another device on your network, serve the app over HTTPS.

## Screens

- **Users**: everyone in the app, with presence. The phone and video buttons ring that person.
- **Groups**: the groups you have joined. The buttons ring every member; whoever answers joins the
  same session, and the call carries on when one of them leaves. **+** opens **New group call**,
  which creates a private group with the people you pick and rings it.
- **History**: your call logs: who, voice/video/group, the outcome, when and how long. Click a call
  for its details, the participants, and to call back or ring the group again.
- **Profile**: click your avatar in the top-right corner. It shows your UID, the System / Light /
  Dark appearance, the app's credentials and SDK versions, and **Sign out**.

## How a call works

**Placing a call** (`src/calls/CallProvider.tsx`)

1. `CometChatCalls.initiateCall(receiver, { type, receiverType, sessionSettings })` creates the call,
   rings the receiver (every member, with `receiverType: 'group'`) and prepares the caller's session
   without joining it. The session settings are frozen at this point, so they always carry the
   session type and, for a 1:1 call, `isPeerCall: true` (`callSettings` in `calls-context.ts`).
2. `onParticipantConnected` — a callee's device has the session: "Calling…" becomes "Ringing…".
3. `onParticipantJoined` — the callee answered: the call screen joins the prepared session with
   `session.join(container)`.
4. The end button, or no answer after 45 seconds, withdraws the call with
   `CometChatCalls.endCall(sessionId, 'cancelled' | 'unanswered')`, which stops the callee ringing.
   The caller gives up before a mobile callee's 60-second ring runs out.
5. A decline is not reliably pushed to the caller, so a ringing call reads its status from the server
   every 3 seconds and shows "Declined" or "Busy" (`src/calls/call-state.ts`).

**Receiving a call**

The web has no VoIP push: a call reaches a tab that is open and signed in.

1. The call message arrives on the Chat SDK's real-time connection, as
   `CometChat.CallListener.onIncomingCallReceived`. The tab rings — a ringtone made with Web Audio,
   the incoming-call screen, and a browser notification when the tab is in the background.
2. While it rings, `CometChatCalls.connect(sessionId, settings)` prepares the session, so Answer only
   has to join it.
3. **Answer** joins the prepared session. **Decline** is `endCall(sessionId, 'rejected')`. A tab
   already in a call declines a 1:1 call with `'busy'`; a group call is just not shown.
4. The ring stops when the caller cancels (`onIncomingCallCancelled`, or the prepared session
   closing), and — as a backstop — when the server says the call is over.
5. With the app open in several tabs, every tab rings; the one that answers or declines tells the
   others to stop (`src/calls/call-tabs.ts`).

## Project Structure

```
cometchat-calls-sample-app-ringing-react/
├── src/
│   ├── main.tsx                 # Entry point; applies the saved appearance
│   ├── App.tsx                  # Credentials → sign in → home
│   ├── config.ts                # Credentials (optional) and the appearance setting
│   ├── sdk.ts                   # Chat + Calls SDK init, login, logout
│   ├── styles.css               # Light/dark colour tokens, type, buttons, fields
│   ├── app.css                  # Screen layouts
│   ├── calls/
│   │   ├── CallProvider.tsx     # The ringing flow: placing, receiving, answering, declining
│   │   ├── calls-context.ts     # Call types, useCalls(), the shared session settings
│   │   ├── call-state.ts        # The call's status on the server (decline / cancel backstop)
│   │   ├── call-tabs.ts         # Several open tabs agree on who answered
│   │   ├── ringtone.ts          # Ringtone and ringback, made with Web Audio
│   │   ├── CallOverlay.tsx      # "Calling… / Ringing…" and the incoming call
│   │   └── CallScreen.tsx       # The call itself
│   ├── history/
│   │   └── call-log-display.ts  # How a call log reads
│   ├── screens/                 # Credentials, Login, Home, Users, Groups, NewGroupCall,
│   │                            # History, CallDetails, Profile
│   └── components/              # Avatar, Icon, SearchField, Dialog, TopLayer, usePagedList
└── vite.config.ts
```

## Dependencies

- [`@cometchat/calls-sdk-javascript`](https://www.npmjs.com/package/@cometchat/calls-sdk-javascript)
  5.1 — calls, sessions and call logs
- [`@cometchat/chat-sdk-javascript`](https://www.npmjs.com/package/@cometchat/chat-sdk-javascript)
  4.2 — users, groups, group creation, and delivering incoming calls to the tab
- React 19 and Vite

## Build It with AI

The skills in the repository's [`skills/`](../../skills) folder cover this app. Copy that folder into
your project and try:

```text
Using the skills in skills/, build a React app with the CometChat Calls SDK 5.1 and the Chat SDK
that rings 1:1 and group calls. Place calls with CometChatCalls.initiateCall (receiverType user or
group) with sessionType and isPeerCall in the session settings, show "Calling… / Ringing…" until
onParticipantJoined, then join the prepared session with session.join(container). Cancel with
endCall after 45 seconds without an answer, and poll the call's status while it rings to show
"Declined" or "Busy". Ring incoming calls from CometChat.addCallListener, prepare them with
CometChatCalls.connect while they ring, and decline with endCall(sessionId, 'rejected'). List call
history with CallLogRequestBuilder.
```

**Skills used:** `setup`, `ringing-integration`, `session-settings`, `event-listeners`, `call-logs`

## Help and Support

For issues running the project or integrating the SDK, see the
[documentation](https://www.cometchat.com/docs/calls/javascript/overview) or create a
[support ticket](https://help.cometchat.com/hc/en-us).
