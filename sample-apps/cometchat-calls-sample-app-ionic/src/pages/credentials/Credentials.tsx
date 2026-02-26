import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent } from '@ionic/react';
import styles from './Credentials.module.css';
import cometchatLogo from '../../assets/cometchat-logo.svg';
import flagUs from '../../assets/flag-us.svg';
import flagEu from '../../assets/flag-eu.svg';
import flagIn from '../../assets/flag-in.svg';
import { useAppStore } from '../../store/useAppStore';
import type { Region } from '../../store/useAppStore';

const regions: { key: Region; label: string; flag: string }[] = [
  { key: 'US', label: 'US', flag: flagUs },
  { key: 'EU', label: 'EU', flag: flagEu },
  { key: 'IN', label: 'IN', flag: flagIn },
];

function Credentials() {
  const history = useHistory();
  const { setCredentials } = useAppStore();
  const [selectedRegion, setSelectedRegion] = useState<Region>('US');
  const [appId, setAppId] = useState('');
  const [authKey, setAuthKey] = useState('');

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <img src={cometchatLogo} alt="CometChat" />
          </div>

          <div className={styles.form}>
            <div className={styles.titleWrapper}>
              <h2 className={styles.title}>App Credentials</h2>
            </div>

            <div className={styles.formContent}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Region</label>
                <div className={styles.regionRow}>
                  {regions.map((region) => {
                    const isSelected = selectedRegion === region.key;
                    return (
                      <button
                        key={region.key}
                        type="button"
                        className={`${styles.regionButton} ${isSelected ? styles.regionButtonSelected : ''}`}
                        onClick={() => setSelectedRegion(region.key)}
                        aria-pressed={isSelected}
                      >
                        <img
                          src={region.flag}
                          alt={`${region.label} flag`}
                          className={styles.flagIcon}
                        />
                        <span className={styles.regionLabel}>{region.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="app-id-input">
                  App ID
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id="app-id-input"
                    className={styles.input}
                    type="text"
                    placeholder="Enter the app ID"
                    value={appId}
                    onChange={(e) => setAppId(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="auth-key-input">
                  Auth Key
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id="auth-key-input"
                    className={styles.input}
                    type="text"
                    placeholder="Enter the Auth Key"
                    value={authKey}
                    onChange={(e) => setAuthKey(e.target.value)}
                  />
                </div>
              </div>

              <button
                className={styles.continueButton}
                type="button"
                onClick={() => {
                  setCredentials({
                    region: selectedRegion,
                    appId,
                    authKey,
                  });
                  history.push('/');
                }}
              >
                <span className={styles.continueButtonText}>Continue</span>
              </button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Credentials;
