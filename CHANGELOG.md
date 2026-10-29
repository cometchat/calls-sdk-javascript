# Changelog

All notable changes to the CometChat Calls SDK for JavaScript are documented here.

This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html). Released versions are published to npm as [`@cometchat/calls-sdk-javascript`](https://www.npmjs.com/package/@cometchat/calls-sdk-javascript).

## 5.1.0 — 2026-10-28

### Added

- **Ringing.** `CometChatCalls.initiateCall(...)` starts a call to a user or group and prepares its session, `CometChatCalls.connect(sessionId, ...)` prepares a session while it rings so answering joins almost immediately, and `CometChatCalls.endCall(...)` ends it with an `EndCallStatus` (`rejected`, `cancelled`, `busy` or `unanswered`) that the other side receives. See the [ringing sample](sample-apps/cometchat-calls-sample-app-ringing-react).
- **`CometChatCalls.getActiveSession()`** returns the live session, with `leave()`, `isSessionJoined()`, `isSessionActive()`, `getParticipants()` and `prepareStatus` on the session object.
- **`onConnected` and `onParticipantConnected` events**, which fire while a session is prepared and before the user joins.

### Changed

- Screen sharing quality: a shared screen on stage is capped at 1080p, and its lower quality layers are kept so viewers on weaker connections still receive it.

### Fixed

- A participant is no longer shown as muted when their audio track has not been identified yet.
- The session no longer stays open after the user is removed from the call.
- One-to-one calls no longer show a reconnecting state and hold the call when the direct peer-to-peer link drops while the media server link is still up.

## 5.0.8 — 2026-10-15

### Added

- **`onVirtualBackgroundFailed` event.** Subscribe with `CometChatCalls.addEventListener('onVirtualBackgroundFailed', listener)` to learn when the virtual background fails for good. The payload is a `VirtualBackgroundFailure` whose `reason` is `'initialization'`, `'inference'` or `'image'`. Applying another background from the listener retries it.

### Changed

- When the virtual background fails for good, the SDK now pauses the local video and resets the background to none, so the camera is never sent without the background the user chose. Previously, frames that could not be segmented were sent unprocessed, and after repeated failures the background was removed for the rest of the call.
- Peer-to-peer connections are no longer used when `autoStartRecording` is enabled. The recorder always joins as a participant, so a peer-to-peer connection would only be torn down again.

### Fixed

- The camera now turns off when a session is left while a background change is still in progress, for example when `clearVirtualBackground()` is called right before `leaveSession()`.
- `clearVirtualBackground()`, `setVirtualBackgroundBlurLevel()` and `setVirtualBackgroundImage()` now also update the background picker, which previously kept highlighting the last tile chosen in the UI.
- Hiding or detaching the call container before the call UI unmounts, for example when a call ends, no longer throws an uncaught "Container dimensions and number of tiles must be positive" error.

## 5.0.7 — 2026-10-07

### Added

- **Virtual Background V2 engine.** An optional segmentation engine, enabled per session with `virtualBackground.enableV2`. It is **off by default**; when it is enabled and V2 cannot run, the SDK falls back to the previous engine automatically.
- **Custom virtual background images** supplied through session settings. Pass `virtualBackground.images` as URL strings or `{ src, label }` objects. User-uploaded images can be turned off with `allowUserImages: false`, and the blur option with `allowBlur: false`.
- **Self-hosted virtual background assets** via `virtualBackground.assetsBaseUrl`, for apps that serve the models, WebAssembly files and inference worker from their own infrastructure.

### Changed

- Replaced the built-in virtual backgrounds with a fixed set of six named defaults, exported as `DEFAULT_VIRTUAL_BACKGROUND_IMAGES` so they can be extended rather than replaced.
- Exported the virtual background configuration types `VirtualBackgroundConfig` and `VirtualBackgroundImage`.
- Stopped showing "joined" and "left" notifications in one-to-one calls, where they are redundant.

### Fixed

- Virtual background assets now load from the production CDN. Earlier versions fetched the segmentation models and WebAssembly files from the staging CDN.
- Background image failures now surface during V2 initialization instead of failing silently.
- The virtual background configuration is cleared on store reset, and uploaded backgrounds are dropped when `allowUserImages` is `false`.

## 5.0.6 — 2026-09-14

### Fixed

- Audio now plays in Instagram's in-app browser, where Chrome's autoplay policy blocked it. A manual play button is shown when autoplay is blocked.
- Videos now resume reliably after the app returns to the foreground.

