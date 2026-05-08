---
name: custom-ui
description: Build custom call UI — hide default header/control panel and render your own UI around the call, customize appearance with CSS variables and class overrides. Use when hiding default controls and building your own call interface. Triggers on "custom control panel", "custom UI", "hideControlPanel", "custom call interface", "CSS override", "theme".
inclusion: manual
---

# CometChat Calls SDK v5 — Custom UI

## Overview

Customize the call interface by hiding default SDK panels and rendering your own UI around the call container, and/or overriding CSS variables and classes to theme the call UI.

## Key Imports

```typescript
import { CometChatCalls, type SessionSettings } from '@cometchat/calls-sdk-javascript';
```

## Implementation

### 1. Hide Default Panels

Hide the SDK's built-in header and/or control panel, then render your own UI above/below/around the call container:

```typescript
const sessionSettings: SessionSettings = {
  hideControlPanel: true,   // hide entire bottom bar
  hideHeaderPanel: true,    // hide top header
};
```

Then structure your HTML so your custom controls sit outside the call container:

```html
<!-- Your custom header -->
<div class="my-header">
  <span id="timer">00:00</span>
  <button id="btn-leave">Leave</button>
</div>

<!-- SDK renders call UI here -->
<div id="call-container" style="flex: 1;"></div>

<!-- Your custom control bar -->
<div class="my-controls">
  <button id="btn-mute">Mute</button>
  <button id="btn-video">Camera</button>
  <button id="btn-screen">Share Screen</button>
</div>
```

Wire your buttons to SDK actions:

```typescript
document.getElementById('btn-mute')!.onclick = () => CometChatCalls.toggleAudio();
document.getElementById('btn-video')!.onclick = () => CometChatCalls.toggleVideo();
document.getElementById('btn-screen')!.onclick = () => CometChatCalls.startScreenSharing();
document.getElementById('btn-leave')!.onclick = () => CometChatCalls.leaveSession();
```

### 2. Hide Individual Buttons

Instead of hiding the entire panel, selectively hide buttons:

```typescript
const sessionSettings: SessionSettings = {
  hideRecordingButton: true,
  hideShareInviteButton: true,
  hideChatButton: true,
  hideChangeLayoutButton: true,
  // Keep the rest visible
};
```

### 3. CSS Variable Overrides (Theming)

Override CSS variables on `:root` to theme the entire call UI without hiding anything:

```css
:root {
  /* Typography */
  --cometchat-calls-font-family: 'Inter', sans-serif;

  /* Primary color */
  --cometchat-calls-primary-color: #6C5CE7;
  --cometchat-calls-extended-primary-color-50: #f5f3ff;
  --cometchat-calls-extended-primary-color-100: #ede9fe;
  --cometchat-calls-extended-primary-color-200: #ddd6fe;
  --cometchat-calls-extended-primary-color-300: #c4b5fd;
  --cometchat-calls-extended-primary-color-400: #a78bfa;
  --cometchat-calls-extended-primary-color-500: #8b5cf6;
  --cometchat-calls-extended-primary-color-600: #7c3aed;
  --cometchat-calls-extended-primary-color-700: #6d28d9;
  --cometchat-calls-extended-primary-color-800: #5b21b6;
  --cometchat-calls-extended-primary-color-900: #4c1d95;

  /* Neutrals */
  --cometchat-calls-neutral-color-50: #0f0f0f;
  --cometchat-calls-neutral-color-100: #1a1a1a;
  --cometchat-calls-neutral-color-200: #2d2d2d;
  --cometchat-calls-neutral-color-300: #3d3d3d;
  --cometchat-calls-neutral-color-400: #525252;
  --cometchat-calls-neutral-color-500: #737373;
  --cometchat-calls-neutral-color-600: #a3a3a3;
  --cometchat-calls-neutral-color-700: #d4d4d4;
  --cometchat-calls-neutral-color-800: #e5e5e5;
  --cometchat-calls-neutral-color-900: #fafafa;

  /* Border radius */
  --cometchat-calls-radius-2: 8px;
  --cometchat-calls-radius-3: 10px;
  --cometchat-calls-radius-4: 12px;
  --cometchat-calls-radius-5: 16px;

  /* Spacing */
  --cometchat-calls-spacing-4: 16px;
  --cometchat-calls-spacing-5: 20px;

  /* Error */
  --cometchat-calls-error-color: #ef4444;
}
```

### 4. CSS Class Overrides (Component-Level)

Target specific SDK components with their CSS classes:

```css
/* Tile container */
.cometchat-calls-tile-container {
  border-radius: 12px;
  border: 1px solid rgba(108, 92, 231, 0.2);
}

/* Speaking indicator */
.cometchat-calls-tile-container--speaking {
  border: 2px solid #10b981;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.3);
}

/* Control pane */
.cometchat-calls-control-pane {
  background: #1a1a1a;
  border-top: 1px solid #2d2d2d;
}

/* Control buttons */
.cometchat-calls-control-button {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #2d2d2d;
}

.cometchat-calls-control-button:hover {
  background: #3d3d3d;
}

/* End call button */
.cometchat-calls-control-button--call-end {
  width: 64px;
  border-radius: 12px;
}

/* Header */
.cometchat-calls-header-container {
  padding: 14px 18px;
}

.cometchat-calls-header-title {
  font-weight: 600;
}

/* Notification toast */
.cometchat-calls-notification {
  border-radius: 10px;
  background: rgba(26, 26, 26, 0.95);
}

/* Avatar */
.cometchat-calls-avatar-fallback {
  background: linear-gradient(135deg, #6C5CE7, #a78bfa);
}

/* Icon colors */
.cometchat-calls-control-button .cometchat-calls-icon {
  color: #fafafa;
}

.cometchat-calls-audio-control__wrapper--active .cometchat-calls-icon {
  color: #ef4444;
}
```

### Available CSS Classes

| Component | Class |
|-----------|-------|
| Tile container | `.cometchat-calls-tile-container` |
| Tile speaking | `.cometchat-calls-tile-container--speaking` |
| Control pane | `.cometchat-calls-control-pane` |
| Control button | `.cometchat-calls-control-button` |
| End call button | `.cometchat-calls-control-button--call-end` |
| Raise hand active | `.cometchat-calls-control-button--raise-hand.cometchat-calls-control-button--active` |
| Header | `.cometchat-calls-header-container` |
| Header title | `.cometchat-calls-header-title` |
| Session timer | `.cometchat-calls-header-session-timer` |
| Modal/dialog | `.cometchat-calls-modal` |
| Notification | `.cometchat-calls-notification` |
| Avatar | `.cometchat-calls-avatar-wrapper` |
| Avatar fallback | `.cometchat-calls-avatar-fallback` |
| Tile label | `.cometchat-calls-tile-label` |
| Draggable tile | `.cometchat-calls-draggable-tile` |
| Recording indicator | `.cometchat-calls-recording-indicator` |
| Participant list | `.cometchat-calls-participant-list-close-button` |
| Audio control | `.cometchat-calls-audio-control__wrapper` |
| Video control | `.cometchat-calls-video-control__wrapper` |

### Available CSS Variables

| Variable | Purpose |
|----------|---------|
| `--cometchat-calls-font-family` | Global font |
| `--cometchat-calls-primary-color` | Primary accent color |
| `--cometchat-calls-extended-primary-color-{50-900}` | Primary color scale |
| `--cometchat-calls-neutral-color-{50-900}` | Neutral/gray scale |
| `--cometchat-calls-error-color` | Error/destructive color |
| `--cometchat-calls-radius-{2-5}` | Border radius scale |
| `--cometchat-calls-spacing-{4-5}` | Spacing scale |
| `--cometchat-calls-shimmer-gradient-color` | Loading shimmer gradient |

## Gotchas

- You **cannot** inject HTML inside the call container — the SDK owns that DOM
- Render your custom UI **outside** the call container (above, below, overlaid with CSS positioning)
- `hideControlPanel: true` hides the entire bottom bar — individual hide methods are ignored when this is set
- CSS overrides apply globally — scope them if you have multiple call instances
- Use event listeners (`addEventListener`) to sync your custom button states with actual media state
- All action methods are static on `CometChatCalls` — no instance needed
- Import your CSS override file in your app's entry point so it loads before the call UI renders
