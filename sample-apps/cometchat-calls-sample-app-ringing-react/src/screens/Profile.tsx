import type { User } from '@cometchat/chat-sdk-javascript';
import { useState } from 'react';
import {
  applyAppearance,
  loadAppearance,
  loadCredentials,
  type Appearance,
} from '../config';
import { Avatar } from '../components/Avatar';
import { Dialog } from '../components/Dialog';
import { Icon } from '../components/Icon';

const APPEARANCES: { value: Appearance; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

/** Who is signed in, the appearance, the app's credentials and SDK versions, and signing out. */
export function Profile({
  user,
  onClose,
  onSignOut,
}: {
  user: User;
  onClose: () => void;
  onSignOut: () => Promise<void>;
}) {
  const [appearance, setAppearance] = useState(loadAppearance);
  const [copied, setCopied] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const credentials = loadCredentials();
  const name = user.getName() || user.getUid();

  const copyUid = async () => {
    try {
      await navigator.clipboard.writeText(user.getUid());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked: the UID is selectable instead.
    }
  };

  const signOut = async () => {
    setSigningOut(true);
    setError(null);
    try {
      await onSignOut();
    } catch (e) {
      setError(
        `Sign out failed: ${e instanceof Error ? e.message : String(e)}`,
      );
      setSigningOut(false);
    }
  };

  const info: [string, string][] = [
    ['App ID', credentials?.appId ?? 'Not set'],
    ['Region', credentials?.region.toUpperCase() ?? 'Not set'],
    ['App version', __APP_VERSION__],
    ['Calls SDK', __CALLS_SDK_VERSION__],
    ['Chat SDK', __CHAT_SDK_VERSION__],
  ];

  return (
    <Dialog title="Profile" onClose={onClose}>
      <div className="profile">
        <div className="profile__identity">
          <Avatar name={name} url={user.getAvatar() || undefined} size={88} />
          <h3 className="title">{name}</h3>
        </div>

        <div className="card profile__uid">
          <span className="profile__label">UID</span>
          <span className="mono profile__value">{user.getUid()}</span>
          <button
            type="button"
            className="icon-button plain"
            aria-label="Copy UID"
            onClick={() => void copyUid()}
          >
            <Icon name={copied ? 'check' : 'copy'} size={18} />
          </button>
          <span className="visually-hidden" aria-live="polite">
            {copied ? 'UID copied' : ''}
          </span>
        </div>

        <div>
          <span className="section-label" id="appearance-label">
            Appearance
          </span>
          <div
            className="segments"
            role="radiogroup"
            aria-labelledby="appearance-label"
          >
            {APPEARANCES.map((option) => (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={appearance === option.value}
                className="segment"
                onClick={() => {
                  setAppearance(option.value);
                  applyAppearance(option.value);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="section-label">App</span>
          <dl className="card profile__info">
            {info.map(([label, value]) => (
              <div key={label} className="profile__row">
                <dt className="profile__label">{label}</dt>
                <dd className="profile__value">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {error && (
          <p className="new-group__error" role="alert">
            {error}
          </p>
        )}
        {confirming ? (
          <div
            className="card profile__confirm"
            role="alertdialog"
            aria-labelledby="sign-out-title"
          >
            <p className="body-strong" id="sign-out-title">
              Sign out?
            </p>
            <p className="caption">This browser stops ringing for {name}.</p>
            <div className="profile__confirm-actions">
              <button
                type="button"
                className="button-text"
                onClick={() => setConfirming(false)}
                disabled={signingOut}
              >
                Cancel
              </button>
              <button
                type="button"
                className="button-outline-danger"
                onClick={() => void signOut()}
                disabled={signingOut}
              >
                {signingOut ? 'Signing out…' : 'Sign out'}
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="button-outline-danger"
            onClick={() => setConfirming(true)}
          >
            <Icon name="logout" /> Sign out
          </button>
        )}
      </div>
    </Dialog>
  );
}
