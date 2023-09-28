<script setup lang="ts">
import type { GlobalThemeOverrides } from "naive-ui";
import { materialTheme, Notifications, Notivue } from "notivue";

import { theme } from "@/stores/settings";

const themeOverrides: GlobalThemeOverrides = {
  Button: {},
  Form: {
    feedbackPadding: "4px 0 8px 2px",
    labelFontWeight: "600",
  },
};
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
