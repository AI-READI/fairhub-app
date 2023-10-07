import "./assets/css/main.css";
import "md-editor-v3/lib/style.css";
import "notivue/notifications.css"; // Only needed if using built-in notifications
import "notivue/animations.css"; // Only needed if using built-in animations
import "./utils/fetchInterceptor";
import "./utils/axiosInterceptor";

import { Icon } from "@iconify/vue";
import { createFetch } from "@vueuse/core";
import { createNotivue } from "notivue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import Vue3Lottie from "vue3-lottie";

import App from "./App.vue";
import router from "./router";
import { baseURL } from "./utils/constants";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.component("f-icon", Icon);

app.use(pinia);
app.use(router);
app.use(Vue3Lottie, { name: "Vue3Lottie" });

// Make Axios available globally
app.config.globalProperties.$axios = axios;

export const push = createNotivue(app, {});

export const fetchWithAuth = createFetch({
  baseUrl: baseURL,
  fetchOptions: {},
  options: {
    async beforeFetch({ options }) {
      options.credentials = "include";

      return { options };
    },

    async onFetchError({ error }) {
      console.log("error fetching", error);
      return { error };
    },
  },
});

app.mount("#app");
