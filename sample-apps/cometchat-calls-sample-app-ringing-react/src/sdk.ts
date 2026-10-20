import { CometChatCalls } from '@cometchat/calls-sdk-javascript';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import type { Credentials } from './config';

/**
 * Both SDKs, set up the same way:
 *  - the Calls SDK places, prepares, joins and ends calls, and lists call history;
 *  - the Chat SDK lists users and groups, creates a group to ring, and delivers incoming calls
 *    to this tab (the web has no VoIP push: a call reaches an open tab over the Chat SDK's
 *    real-time connection).
 */
export async function initSdks({ appId, region, authKey }: Credentials) {
  const settings = new CometChat.AppSettingsBuilder()
    .setRegion(region)
    .subscribePresenceForAllUsers()
    .autoEstablishSocketConnection(true)
    .build();
  await CometChat.init(appId, settings);

  const { error } = await CometChatCalls.init({ appId, region, authKey });
  if (error) throw new Error(error.message);
}

/** Logs in to both SDKs as the same user. Incoming calls need the Chat SDK logged in too. */
export async function login(uid: string, authKey: string) {
  const user =
    (await CometChat.getLoggedinUser()) ??
    (await CometChat.login(uid, authKey));
  if (!CometChatCalls.getLoggedInUser())
    await CometChatCalls.login(uid, authKey);
  return user;
}

/** A session from an earlier visit, in both SDKs; null when signed out. */
export async function restoreSession(): Promise<CometChat.User | null> {
  const user = await CometChat.getLoggedinUser();
  if (!user) return null;
  if (!CometChatCalls.getLoggedInUser()) {
    // The Chat SDK kept its session but the Calls SDK did not: sign that one in from it.
    await CometChatCalls.loginWithAuthToken(user.getAuthToken());
  }
  return user;
}

export async function logout() {
  await CometChatCalls.logout().catch((error) =>
    console.warn('Calls SDK logout failed:', error),
  );
  await CometChat.logout();
}
