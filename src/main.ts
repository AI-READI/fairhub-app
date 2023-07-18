import "./assets/main.css";

import { Icon } from "@iconify/vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import Vue3Lottie from "vue3-lottie";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.component("f-icon", Icon);

app.use(pinia);
app.use(router);
app.use(Vue3Lottie, { name: "Vue3Lottie" });

app.mount("#app");
