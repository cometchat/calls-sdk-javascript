# Changelog

All notable changes to the CometChat Calls SDK for JavaScript are documented here.

This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html). Released versions are published to npm as [`@cometchat/calls-sdk-javascript`](https://www.npmjs.com/package/@cometchat/calls-sdk-javascript).

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

