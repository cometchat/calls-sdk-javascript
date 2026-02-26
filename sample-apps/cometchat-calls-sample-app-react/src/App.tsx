import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CometChatCalls } from '@cometchat/calls-sdk-javascript';
import Login from './pages/login/Login';
import JoinSession from './pages/join-session/JoinSession';
import Credentials from './pages/credentials/Credentials';
import { useAppStore } from './store/useAppStore';

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
  }, [location.pathname, setUser]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/join-session" element={<JoinSession />} />
        <Route path="/credentials" element={<Credentials />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
