<script setup lang="ts">
import { watch, onMounted } from "vue";
import { CometChatCalls } from "@cometchat/calls-sdk-javascript";
import { useAppStore } from "./stores/appStore";
import { useRoute } from "vue-router";

const appStore = useAppStore();
const route = useRoute();

const initCometChatCalls = async () => {
  const { appId, region, authKey } = appStore.credentials;
  if (!appId || !region || !authKey) return;

  const { error } = await CometChatCalls.init({ appId, region, authKey });
  if (error) {
    console.error("CometChatCalls initialization failed:", error);
  } else {
    console.log("CometChatCalls initialized successfully");
  }
};

const checkLoggedInUser = () => {
  const user = CometChatCalls.getLoggedInUser();
  if (user) {
    appStore.setUser(user);
  } else {
    appStore.clearUser();
  }
};

watch(() => appStore.credentials, initCometChatCalls, {
  deep: true,
  immediate: true,
});
watch(() => route.path, checkLoggedInUser);
onMounted(checkLoggedInUser);
</script>

<template>
  <router-view />
</template>
