import "./assets/main.css";
import "vue3-lottie/dist/style.css";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import Vue3Lottie from "vue3-lottie";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(Vue3Lottie, { name: "Vue3Lottie" });

app.mount("#app");
