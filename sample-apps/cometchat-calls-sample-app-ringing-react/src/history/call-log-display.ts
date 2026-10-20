import { CometChatCalls, type CallLog } from '@cometchat/calls-sdk-javascript';
import type { CallPeer } from '../calls/calls-context';

/** How a call log reads in the History list and on the details screen. */

export function isGroupCall(log: CallLog): boolean {
  return (
    log.getReceiverType()?.toLowerCase() === 'group' ||
    hasGuid(log.getReceiver())
  );
}

export function isVoice(log: CallLog): boolean {
  return ['audio', 'voice'].includes(log.getType()?.toLowerCase());
}

export function kind(log: CallLog): string {
  const mode = (log.getMode() ?? log.getCallCategory())?.toLowerCase();
  if (mode && mode !== 'call') return 'Meeting';
  if (isGroupCall(log)) return 'Group call';
  return isVoice(log) ? 'Voice call' : 'Video call';
}

export type Tone = 'live' | 'done' | 'missed';

export function status(log: CallLog): { label: string; tone: Tone } {
  switch (log.getStatus()?.toLowerCase()) {
    case 'ongoing':
      return { label: 'Live', tone: 'live' };
    case 'ended':
      return { label: 'Ended', tone: 'done' };
    case 'cancelled':
      return { label: 'Cancelled', tone: 'missed' };
    case 'unanswered':
      return { label: 'No answer', tone: 'missed' };
    case 'missed':
      return { label: 'Missed', tone: 'missed' };
    case 'rejected':
      return { label: 'Declined', tone: 'missed' };
    case 'busy':
      return { label: 'Busy', tone: 'missed' };
    case 'initiated':
      return { label: 'Not connected', tone: 'missed' };
    default:
      return { label: 'Unknown', tone: 'done' };
  }
}

function hasGuid(
  entity: unknown,
): entity is { getGuid(): string; getName(): string; getIcon(): string } {
  return typeof (entity as { getGuid?: unknown })?.getGuid === 'function';
}

/**
 * The other side of the call: the group for a group call, otherwise whichever of the initiator
 * and receiver is not the signed-in user. Calling it again rings them.
 */
export function counterpart(log: CallLog): CallPeer | null {
  const receiver = log.getReceiver();
  if (hasGuid(receiver)) {
    return {
      id: receiver.getGuid(),
      name: receiver.getName() || receiver.getGuid(),
      avatar: receiver.getIcon() || undefined,
      isGroup: true,
    };
  }
  const me = CometChatCalls.getLoggedInUser()?.uid;
  for (const user of [log.getInitiator(), receiver]) {
    const uid = user?.getUid?.();
    if (uid && uid !== me)
      return {
        id: uid,
        name: user.getName() || uid,
        avatar: user.getAvatar() || undefined,
      };
  }
  return null;
}

export function title(log: CallLog): string {
  // A meeting has no one on the other side: use its name.
  return (
    counterpart(log)?.name ?? (log.getReceiver()?.getName?.() || kind(log))
  );
}

/** "Today, 10:42 AM", "Yesterday, …" or "Oct 3, 2026, …", for a time in seconds. */
export function dateTime(seconds: number | undefined): string {
  if (!seconds) return '—';
  const date = new Date(seconds * 1000);
  const time = date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const day =
    date.toDateString() === today.toDateString()
      ? 'Today'
      : date.toDateString() === yesterday.toDateString()
        ? 'Yesterday'
        : date.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });
  return `${day}, ${time}`;
}

export function time(seconds: number | undefined): string {
  if (!seconds) return '—';
  return new Date(seconds * 1000).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
}

/** "m:ss" or "h:mm:ss"; a dash for a call that never connected. */
export function duration(minutes: number | undefined): string {
  const total = Math.round((minutes ?? 0) * 60);
  if (total <= 0) return '—';
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = String(total % 60).padStart(2, '0');
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;
}
