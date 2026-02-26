import { useState, useRef, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IonPage, IonContent } from '@ionic/react';
import { CometChatCalls } from '@cometchat/calls-sdk-javascript';
import styles from './JoinSession.module.css';
import cometchatLogo from '../../assets/cometchat-logo.svg';
import logoutIcon from '../../assets/logout-icon.svg';
import Avatar from '../../components/Avatar';
import { useAppStore } from '../../store/useAppStore';
import { getRandomMeetingId } from '../../utils/helpers';

function JoinSession() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('sessionId') ?? '';
  const [menuOpen, setMenuOpen] = useState(false);
  const [inMeeting, setInMeeting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const meetingContainerRef = useRef<HTMLDivElement>(null);
  const { user, clearUser, version } = useAppStore();
  const history = useHistory();

  const setSessionId = (value: string) => {
    if (value) {
      history.replace(`/join-session?sessionId=${encodeURIComponent(value)}`);
    } else {
      history.replace('/join-session');
    }
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const cleanup = CometChatCalls.addEventListener('onConnectionClosed', () => {
      setInMeeting(false);
    });
    return () => cleanup();
  }, []);

  useEffect(() => {
    if (inMeeting && sessionId) {
      CometChatCalls.generateToken(sessionId).then(({ token }) => {
        console.log('token', token);
        if (meetingContainerRef.current) {
          CometChatCalls.joinSession(token, {}, meetingContainerRef.current);
        }
      });
    }
  }, [inMeeting, sessionId]);

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <div
          className={styles.meetingContainer}
          ref={meetingContainerRef}
          style={{ display: inMeeting ? 'block' : 'none' }}
        />

        <div className={styles.container} style={{ display: inMeeting ? 'none' : 'flex' }}>
          <div className={styles.avatarWrapper} ref={menuRef}>
            <button
              className={styles.avatarButton}
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Open user menu"
              aria-expanded={menuOpen}
              aria-haspopup="true"
            >
              <Avatar name={user?.name ?? ''} url={user?.avatar} size={45} />
            </button>

            {menuOpen && (
              <div className={styles.popupMenu} role="menu">
                <div className={styles.popupUserInfo}>
                  <Avatar name={user?.name ?? ''} url={user?.avatar} size={32} />
                  <span className={styles.popupName}>{user?.name}</span>
                </div>
                <button
                  className={styles.popupItem}
                  type="button"
                  role="menuitem"
                  onClick={async () => {
                    try {
                      await CometChatCalls.logout();
                    } catch (error) {
                      console.error('Logout failed:', error);
                    }
                    clearUser();
                    history.push('/');
                  }}
                >
                  <img src={logoutIcon} alt="" className={styles.popupIcon} />
                  <span className={styles.popupName}>Logout</span>
                </button>
                <div className={styles.popupFooter}>
                  <span className={styles.popupVersion}>V.{version}</span>
                </div>
              </div>
            )}
          </div>

          <div className={styles.logo}>
            <img src={cometchatLogo} alt="CometChat" />
          </div>

          <div className={styles.form}>
            <div className={styles.formContent}>
              <div className={styles.fields}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="session-id-input">
                    Enter Session Id
                  </label>
                  <div className={styles.inputWrapper}>
                    <input
                      id="session-id-input"
                      className={styles.input}
                      type="text"
                      placeholder="Session ID"
                      value={sessionId}
                      onChange={(e) => setSessionId(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <button
                className={`${styles.joinButton} ${sessionId ? styles.joinButtonActive : ''}`}
                type="button"
                disabled={!sessionId}
                onClick={() => setInMeeting(true)}
              >
                <span className={styles.buttonText}>Join Meeting</span>
              </button>

              {!sessionId && (
                <>
                  <div className={styles.separator}>
                    <div className={styles.separatorLine} />
                    <span className={styles.separatorText}>Or</span>
                    <div className={styles.separatorLine} />
                  </div>

                  <button
                    className={styles.instantButton}
                    type="button"
                    onClick={() => {
                      const meetingId = getRandomMeetingId();
                      setSessionId(meetingId);
                      setInMeeting(true);
                    }}
                  >
                    <span className={styles.buttonText}>Start Instant Meeting</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default JoinSession;
