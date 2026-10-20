/**
 * The app open in several tabs: every tab gets the incoming call from the Chat SDK and rings on
 * its own. This channel lets them agree:
 *  - the tab that answers or declines tells the others, which stop ringing (`handled`);
 *  - a tab in a call says so (`in-call`), so the others don't ring while you're on a call in it;
 *    the busy reply to a 1:1 caller is sent by that tab alone.
 * A new tab asks who's in a call (`hello`). Same-origin only, so it never crosses browsers or
 * devices. No BroadcastChannel (very old browsers) = each tab on its own, as before.
 */
type Message =
  | { kind: 'handled'; sessionId: string }
  | { kind: 'in-call'; tab: string; on: boolean }
  | { kind: 'hello'; tab: string };

export type CallTabs = {
  /** This tab answered or declined the call: the other tabs stop ringing for it. */
  handled(sessionId: string): void;
  /** This tab joined or left a call. */
  setInCall(on: boolean): void;
  /** Some other tab of this app is in a call right now. */
  otherTabInCall(): boolean;
  close(): void;
};

export function openCallTabs(
  onHandledElsewhere: (sessionId: string) => void,
): CallTabs {
  const tab = Math.random().toString(36).slice(2);
  const busyTabs = new Set<string>();
  let inCall = false;
  const channel =
    typeof BroadcastChannel === 'undefined'
      ? null
      : new BroadcastChannel('ringing-sample-calls');
  const post = (m: Message) => channel?.postMessage(m);

  if (channel) {
    channel.onmessage = (e: MessageEvent<Message>) => {
      const m = e.data;
      if (m.kind === 'handled') onHandledElsewhere(m.sessionId);
      else if (m.kind === 'in-call') {
        if (m.on) busyTabs.add(m.tab);
        else busyTabs.delete(m.tab);
      } else if (m.kind === 'hello' && inCall)
        post({ kind: 'in-call', tab, on: true });
    };
    post({ kind: 'hello', tab });
  }
  // A tab closed or reloaded mid-call must not leave the others thinking you're busy.
  const onHide = () => {
    if (inCall) post({ kind: 'in-call', tab, on: false });
  };
  window.addEventListener('pagehide', onHide);

  return {
    handled: (sessionId) => post({ kind: 'handled', sessionId }),
    setInCall(on) {
      if (on === inCall) return;
      inCall = on;
      post({ kind: 'in-call', tab, on });
    },
    otherTabInCall: () => busyTabs.size > 0,
    close() {
      onHide();
      window.removeEventListener('pagehide', onHide);
      channel?.close();
    },
  };
}
