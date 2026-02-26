import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import cometchatLogo from '../../assets/cometchat-logo.svg';
import checkIcon from '../../assets/check-icon.svg';
import { CometChatCalls } from '@cometchat/calls-sdk-javascript';
import { useAppStore } from '../../store/useAppStore';

interface SampleUser {
  name: string;
  uid: string;
  avatar: string;
}

const sampleUsers: SampleUser[] = [
  {
    name: 'Andrew Joseph',
    uid: 'cometchat-uid-1',
    avatar:
      'https://assets.cometchat.io/sampleapp/v2/users/cometchat-uid-1.webp',
  },
  {
    name: 'George Alan',
    uid: 'cometchat-uid-2',
    avatar:
      'https://assets.cometchat.io/sampleapp/v2/users/cometchat-uid-2.webp',
  },
  {
    name: 'Nancy Grace',
    uid: 'cometchat-uid-3',
    avatar:
      'https://assets.cometchat.io/sampleapp/v2/users/cometchat-uid-3.webp',
  },
  {
    name: 'Susan Marie',
    uid: 'cometchat-uid-4',
    avatar:
      'https://assets.cometchat.io/sampleapp/v2/users/cometchat-uid-4.webp',
  },
  {
    name: 'John Paul',
    uid: 'cometchat-uid-5',
    avatar:
      'https://assets.cometchat.io/sampleapp/v2/users/cometchat-uid-5.webp',
  },
];

function Login() {
  const [uidInput, setUidInput] = useState('cometchat-uid-1');
  const navigate = useNavigate();
  const { user, setUser } = useAppStore();

  useEffect(() => {
    if (user) {
      navigate('/join-session');
    }
  }, [user]);

  const handleLogin = () => {
    if (!uidInput.trim()) {
      return;
    }
    CometChatCalls.login(uidInput).then((user) => {
      setUser({
        uid: user.uid,
        name: user.name,
        avatar: user.avatar,
      });
    });
  };

  const rows = [sampleUsers.slice(0, 3), sampleUsers.slice(3, 5)];

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={cometchatLogo} alt="CometChat" />
      </div>

      <div className={styles.form}>
        <div className={styles.usersSection}>
          <div className={styles.usersSectionInner}>
            <p className={styles.title}>Sign in to CometChat</p>
          </div>

          <div className={styles.usersGrid}>
            <p className={styles.label}>Choose a Sample User</p>
            {rows.map((row, rowIndex) => (
              <div className={styles.profileRow} key={rowIndex}>
                {row.map((user) => {
                  const isSelected = uidInput === user.uid;
                  return (
                    <div
                      key={user.uid}
                      className={`${styles.profileCard} ${isSelected ? styles.profileCardSelected : ''}`}
                      onClick={() => {
                        setUidInput(user.uid);
                      }}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setUidInput(user.uid);
                        }
                      }}
                    >
                      {isSelected && (
                        <div className={styles.checkBadge} aria-hidden="true">
                          <img src={checkIcon} alt="" width={10} height={10} />
                        </div>
                      )}
                      <div className={styles.avatar}>
                        <img src={user.avatar} alt={user.name} />
                      </div>
                      <div className={styles.profileInfo}>
                        <p className={styles.profileName}>{user.name}</p>
                        <p className={styles.profileUid}>{user.uid}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.separator}>
          <div className={styles.separatorLine} />
          <p className={styles.separatorText}>Or</p>
          <div className={styles.separatorLine} />
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.fields}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="uid-input">
                Enter UID
              </label>
              <div className={styles.fieldInputWrapper}>
                <input
                  id="uid-input"
                  className={styles.fieldInput}
                  type="text"
                  placeholder="Enter UID here"
                  value={uidInput}
                  onChange={(e) => {
                    setUidInput(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className={styles.buttonSection}>
            <button
              className={styles.loginButton}
              type="button"
              onClick={handleLogin}
            >
              <span className={styles.loginButtonText}>Login</span>
            </button>
            <p
              className={styles.credentialsLink}
              onClick={() => navigate('/credentials')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate('/credentials');
                }
              }}
            >
              Change <span>App Credentials</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
