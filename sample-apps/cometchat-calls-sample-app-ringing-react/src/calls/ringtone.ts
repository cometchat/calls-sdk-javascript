/**
 * Call tones, synthesised with Web Audio so no asset ships for them.
 *
 *   incoming  two short 440+480 Hz bursts every 3 s (the receiver's ring)
 *   ringback  one 440+480 Hz tone, 2 s on / 4 s off (what the caller hears)
 *
 * Browsers start an AudioContext suspended until the page has had a user
 * gesture. Ringback always follows one (the call button). An incoming ring on
 * a tab nobody has touched may stay silent; the on-screen card and the
 * browser notification still show.
 */
type Tone = 'incoming' | 'ringback';

let ctx: AudioContext | null = null;
let timer: ReturnType<typeof setInterval> | null = null;

function context(): AudioContext | null {
  try {
    ctx ??= new AudioContext();
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function burst(ac: AudioContext, at: number, length: number) {
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0, at);
  gain.gain.linearRampToValueAtTime(0.12, at + 0.02);
  gain.gain.setValueAtTime(0.12, at + length - 0.05);
  gain.gain.linearRampToValueAtTime(0, at + length);
  gain.connect(ac.destination);
  for (const freq of [440, 480]) {
    const osc = ac.createOscillator();
    osc.frequency.value = freq;
    osc.connect(gain);
    osc.start(at);
    osc.stop(at + length);
  }
}

function ring(tone: Tone) {
  const ac = context();
  if (!ac) return;
  const now = ac.currentTime + 0.05;
  if (tone === 'incoming') {
    burst(ac, now, 0.4);
    burst(ac, now + 0.6, 0.4);
  } else {
    burst(ac, now, 2);
  }
}

export function startTone(tone: Tone) {
  stopTone();
  ring(tone);
  timer = setInterval(() => ring(tone), tone === 'incoming' ? 3000 : 6000);
}

export function stopTone() {
  if (timer) clearInterval(timer);
  timer = null;
}
