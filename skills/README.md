# CometChat Calls SDK v5 — JavaScript Skills

Agent skills for building with the CometChat Calls SDK v5 on Web (JavaScript/TypeScript). Install individually or browse all available skills.

## How It Works

Skills are bundled in this repository under `skills/`. When you clone the repo and open it in a supported AI coding assistant, skills auto-trigger based on what you're doing — mention "join session" and the join-session skill loads, ask about "screen sharing" and the screen-sharing skill loads. No manual activation needed.

To use these skills in your own project, copy the `skills/` folder into your project root:

```bash
cp -r skills/ /path/to/your/project/skills/
```

## Available Skills

### Core

| Skill | Triggers On |
|-------|-------------|
| `setup` | SDK install, npm, CallAppSettings, init, login, permissions |
| `join-session` | CometChatCalls.joinSession, SessionSettings, voice vs video |
| `ringing-integration` | Dual SDK (Chat + Calls), initiateCall, accept/reject/cancel, incoming/outgoing |
| `session-settings` | All SessionSettings options: layouts, session type, hide buttons, idle timeout |
| `event-listeners` | addEventListener for session, participant, media, button, layout events, participant actions |
| `call-logs` | CallLogRequestBuilder, fetching and displaying call history |

### Migration

| Skill | Triggers On |
|-------|-------------|
| `migration-v4-to-v5` | Upgrading from Calls SDK v4 to v5, replacing deprecated APIs, CallSettings to SessionSettings, OngoingCallListener to addEventListener |

### Advanced

| Skill | Triggers On |
|-------|-------------|
| `recording` | Auto-start recording, recording events |
| `screen-sharing` | Start/stop screen share, screen share events |
| `audio-controls` | Mute/unmute, audio device switching |
| `video-controls` | Camera on/off, video device switching |
| `custom-ui` | Custom control panel, hide default controls, programmatic actions |

## How Auto-Detection Works

Each skill has a `description` field in its YAML frontmatter that lists trigger keywords. When you mention something related (like "join a call" or "add screen sharing"), the agent reads the description, decides the skill is relevant, and loads its full content. You never need to manually select a skill.

## Compatibility

- CometChat Calls SDK v5 (`@cometchat/calls-sdk-javascript@latest`)
- CometChat Chat SDK v4 (`@cometchat/chat-sdk-javascript@latest`) — required for ringing
- TypeScript 5.x, any modern bundler (Vite, Webpack, etc.)
- Framework-agnostic — works with React, Vue, Angular, Svelte, vanilla JS
- Works with: Kiro, Claude Code, Cursor, Copilot, and other AI coding assistants that support the skills ecosystem
