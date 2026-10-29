import { useState, type FormEvent } from 'react';
import type { Credentials as AppCredentials, Region } from '../config';
import flagEu from '../assets/flag-eu.svg';
import flagIn from '../assets/flag-in.svg';
import flagUs from '../assets/flag-us.svg';

const REGIONS: { value: Region; label: string; flag: string }[] = [
  { value: 'us', label: 'US', flag: flagUs },
  { value: 'eu', label: 'EU', flag: flagEu },
  { value: 'in', label: 'IN', flag: flagIn },
];

/** App ID, region and Auth Key, from the CometChat dashboard. Skipped when set in config.ts. */
export function Credentials({
  onSave,
}: {
  onSave: (credentials: AppCredentials) => void;
}) {
  const [region, setRegion] = useState<Region>('us');
  const [appId, setAppId] = useState('');
  const [authKey, setAuthKey] = useState('');
  const ready = appId.trim() !== '' && authKey.trim() !== '';

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (ready) onSave({ appId: appId.trim(), region, authKey: authKey.trim() });
  };

  return (
    <div className="auth">
      <span className="logo" role="img" aria-label="CometChat" />
      <form className="card auth__card" onSubmit={submit}>
        <h1 className="title">App credentials</h1>

        <fieldset className="auth__field">
          <legend className="section-label">Region</legend>
          <div className="segments">
            {REGIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={region === option.value}
                className="segment"
                onClick={() => setRegion(option.value)}
              >
                <img src={option.flag} alt="" width={20} height={14} />{' '}
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="auth__field">
          <label className="section-label" htmlFor="app-id">
            App ID
          </label>
          <input
            id="app-id"
            className="field"
            autoComplete="off"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
          />
        </div>

        <div className="auth__field">
          <label className="section-label" htmlFor="auth-key">
            Auth Key
          </label>
          <input
            id="auth-key"
            className="field"
            autoComplete="off"
            value={authKey}
            onChange={(e) => setAuthKey(e.target.value)}
          />
        </div>

        <button type="submit" className="button-primary full" disabled={!ready}>
          Continue
        </button>
      </form>
    </div>
  );
}
