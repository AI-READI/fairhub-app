import "./assets/css/main.css";
import "md-editor-v3/lib/style.css";
import "notivue/notifications.css"; // Only needed if using built-in notifications
import "notivue/animations.css"; // Only needed if using built-in animations
import "./utils/fetchInterceptor";
import "./utils/axiosInterceptor";
// css for the markdown editor
import "katex/dist/katex.min.css";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import "@kangc/v-md-editor/lib/theme/style/github.css";

// import "@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css";
import { Icon } from "@iconify/vue";
import VMdEditor from "@kangc/v-md-editor";
import enUS from "@kangc/v-md-editor/lib/lang/en-US";
import createAlignPlugin from "@kangc/v-md-editor/lib/plugins/align";
import createKatexPlugin from "@kangc/v-md-editor/lib/plugins/katex/cdn";
import createTodoListPlugin from "@kangc/v-md-editor/lib/plugins/todo-list/index";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import { createFetch } from "@vueuse/core";
import { createNotivue } from "notivue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import Vue3Lottie from "vue3-lottie";

import App from "./App.vue";
import router from "./router";
import { baseURL } from "./utils/constants";

VMdEditor.use(githubTheme, {});
VMdEditor.use(createKatexPlugin());
VMdEditor.use(createTodoListPlugin());
VMdEditor.use(createAlignPlugin());
VMdEditor.lang.use("en-US", enUS);

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.component("f-icon", Icon);

app.use(pinia);
app.use(router);
app.use(Vue3Lottie, { name: "Vue3Lottie" });
app.use(VMdEditor);

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
