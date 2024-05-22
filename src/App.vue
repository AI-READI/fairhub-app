<script setup lang="ts">
import type { GlobalThemeOverrides } from "naive-ui";
import { materialTheme, Notifications, Notivue } from "notivue";

import { useAuth } from "@/composables/useAuth";
import { myMSALObj, state } from "@/config/msalConfig";
import { theme } from "@/stores/settings";

const { handleRedirect, login, logout } = useAuth();

const themeOverrides: GlobalThemeOverrides = {
  Button: {},
  Form: {
    feedbackPadding: "4px 0 8px 2px",
    labelFontWeight: "600",
  },
};

const handleLogin = async () => {
  await login();
};

const handleLogout = () => {
  logout();
};

const initialize = async () => {
  try {
    await myMSALObj.initialize(); // Initialize MSAL
  } catch (error) {
    console.error("Initialization failed", error);
  }
};

onMounted(async () => {
  await initialize();
  await handleRedirect();
});
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <n-dialog-provider>
      <n-message-provider>
        <AppHeader />

        <Notivue v-slot="item">
          <Notifications :item="item" :theme="materialTheme" />
        </Notivue>

        <n-space vertical size="large">
          <n-layout has-sider>
            <AppSidebar />

            <DatasetSidebar />

            <n-layout-content class="h-[calc(100vh-56px)] py-4 pl-6">
              <div>
                <div v-if="state.isAuthenticated">
                  <pre>{{ state.user }}</pre>

                  <button @click="handleLogout">Logout</button>
                </div>

                <div v-else>
                  <button @click="handleLogin">Login</button>
                </div>
              </div>

              <router-view v-slot="{ Component }">
                <transition name="fade" appear mode="out-in">
                  <component :is="Component" />
                </transition>
              </router-view>
            </n-layout-content>
          </n-layout>
        </n-space>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>
