import { CometChatCalls } from '@cometchat/calls-sdk-javascript';
import { loadCredentials } from '../config';

/**
 * A call's status on the server ("initiated", "ongoing", "ended", "rejected", "busy", …), from
 * `GET /calls/:sessionId` with the logged-in user's auth token.
 *
 * The web needs it because some ends of a ring are never pushed to the other side: a decline
 * reaches the server at once but not the caller, and a cancel made through the caller's room
 * sends no "cancelled" call message to the callee's tab. Both sides poll this while it rings.
 *
 * Null when the status can't be read (offline, a failed request): keep ringing. A failed
 * request must never end a live call.
 */
export async function fetchCallStatus(
  sessionId: string,
): Promise<string | null> {
  const token = CometChatCalls.getUserAuthToken();
  const credentials = loadCredentials();
  if (!token || !credentials) return null;
  const { appId, region } = credentials;
  const url = `https://${appId}.call-${region}.cometchat.io/v3.0/calls/${encodeURIComponent(sessionId)}`;
  try {
    const response = await fetch(url, {
      headers: { accept: 'application/json', appid: appId, authtoken: token },
    });
    if (!response.ok) return null;
    const body = (await response.json()) as {
      data?: { status?: string }[] | { status?: string };
    };
    const call = Array.isArray(body.data) ? body.data[0] : body.data;
    return call?.status ?? null;
  } catch {
    return null;
  }
}

/** What the caller's screen says when the callee declined: "Declined" or "Busy". */
export function outgoingEndText(
  status: string | null | undefined,
): string | null {
  switch (status?.toLowerCase()) {
    case 'rejected':
      return 'Declined';
    case 'busy':
      return 'Busy';
    default:
      return null;
  }
}

/**
 * The caller's end text after the prepared session closed. The close carries no reason, so ask
 * the server, for at most `timeoutMs`, and fall back to "Call ended".
 */
export async function outgoingEndTextFromServer(
  sessionId: string,
  timeoutMs = 1500,
): Promise<string> {
  const status = await Promise.race([
    fetchCallStatus(sessionId),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), timeoutMs)),
  ]);
  return outgoingEndText(status) ?? 'Call ended';
}

/**
 * Whether a call the caller is still ringing is over on the server, and what to say. Null means
 * keep ringing: still "initiated", answered ("ongoing", handled by onParticipantJoined), or the
 * status could not be read.
 */
export function outgoingRingIsOver(status: string | null): string | null {
  if (!status) return null;
  const s = status.toLowerCase();
  if (s === 'initiated' || s === 'ongoing') return null;
  return outgoingEndText(s) ?? 'Call ended';
}

/**
 * Whether an incoming call should stop ringing here. A 1:1 call stops on anything but
 * "initiated": ended, cancelled, or answered on another of your devices ("ongoing"). A group
 * call keeps ringing while it goes on (others may be in it) and stops once it is over.
 */
export function ringIsOver(status: string | null, isGroup: boolean): boolean {
  if (!status) return false;
  const s = status.toLowerCase();
  if (isGroup)
    return ['ended', 'cancelled', 'unanswered', 'rejected'].includes(s);
  return s !== 'initiated';
}
