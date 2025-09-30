<script setup lang="ts">
import type { GlobalThemeOverrides } from "naive-ui";
import { materialTheme, Notifications, Notivue } from "notivue";

import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { theme } from "@/stores/settings";

const themeOverrides: GlobalThemeOverrides = {
  Button: {},
  common: {
    primaryColor: "#0284c7",
    primaryColorHover: "#0ea5e9",
    primaryColorPressed: "#0369a1",
    primaryColorSuppl: "#0ea5e9",
  },
  Form: {
    feedbackPadding: "4px 0 8px 2px",
    labelFontWeight: "600",
  },
};

router.beforeResolve(async (to) => {
  const authStore = useAuthStore();
  if (authStore.user.email_verified) {
    return true;
  }
  if (
    to.name == "home" ||
    to.name == "" ||
    to.name == "auth:signup" ||
    to.name == "auth:logout" ||
    to.name == "auth:login" ||
    to.name == "auth:confirm-email" ||
    to.name == "auth:verify-email"
  ) {
    return true;
  }
  router.push({
    name: "auth:confirm-email",
    query: { email: authStore.user.email_address },
  });
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

            <n-layout-content class="view h-[calc(100vh-56px)] py-4 pl-6">
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
