import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { CometChatCalls } from '@cometchat/calls-sdk-javascript';
import Login from './pages/login/Login';
import JoinSession from './pages/join-session/JoinSession';
import Credentials from './pages/credentials/Credentials';
import { useAppStore } from './store/useAppStore';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Theme variables */
import './index.css';

setupIonicReact({ mode: 'md' });

function App() {
  const credentials = useAppStore((state) => state.credentials);
  const setUser = useAppStore((state) => state.setUser);
  const clearUser = useAppStore((state) => state.clearUser);

  useEffect(() => {
    const initCometChatCalls = async () => {
      const { appId, region, authKey } = credentials;

      if (!appId || !region || !authKey) {
        return;
      }

      const { error } = await CometChatCalls.init({
        appId,
        region,
        authKey,
      });

      if (error) {
        console.error('CometChatCalls initialization failed:', error);
      } else {
        console.log('CometChatCalls initialized successfully');
      }
    };

    initCometChatCalls();
  }, [credentials]);

  useEffect(() => {
    const checkLoggedInUser = () => {
      const user = CometChatCalls.getLoggedInUser();

      if (user) {
        setUser(user);
      } else {
        clearUser();
      }
    };
    checkLoggedInUser();
  }, [setUser, clearUser]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" component={Login} />
          <Route exact path="/join-session" component={JoinSession} />
          <Route exact path="/credentials" component={Credentials} />
          <Route>
            <Redirect to="/" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
