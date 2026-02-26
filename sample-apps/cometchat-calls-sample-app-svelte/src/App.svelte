<script lang="ts">
  import Router from 'svelte-spa-router';
  import { CometChatCalls } from '@cometchat/calls-sdk-javascript';
  import Login from './pages/login/Login.svelte';
  import JoinSession from './pages/join-session/JoinSession.svelte';
  import Credentials from './pages/credentials/Credentials.svelte';
  import { appStore } from './store/appStore.svelte';

  const routes = {
    '/': Login,
    '/join-session': JoinSession,
    '/credentials': Credentials,
  };

  $effect(() => {
    const { appId, region, authKey } = appStore.credentials;

    if (!appId || !region || !authKey) return;

    const initCometChatCalls = async () => {
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
  });

  $effect(() => {
    const user = CometChatCalls.getLoggedInUser();
    if (user) {
      appStore.setUser(user);
    } else {
      appStore.clearUser();
    }
  });
</script>

<Router {routes} />
