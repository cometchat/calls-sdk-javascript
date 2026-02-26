import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/login/Login.vue";
import JoinSession from "../pages/join-session/JoinSession.vue";
import Credentials from "../pages/credentials/Credentials.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Login },
    { path: "/join-session", component: JoinSession },
    { path: "/credentials", component: Credentials },
  ],
});

export default router;
