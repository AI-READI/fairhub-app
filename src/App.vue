<script setup lang="ts">
import {
  NConfigProvider,
  NDialogProvider,
  NLayout,
  NLayoutContent,
  NMessageProvider,
  NSpace,
} from "naive-ui";
import { RouterView } from "vue-router";

import { theme } from "@/stores/settings";

import AppHeader from "./components/header/AppHeader.vue";
import AppSidebar from "./components/sidebar/AppSidebar.vue";
</script>

<template>
  <n-config-provider :theme="theme">
    <n-dialog-provider>
      <n-message-provider>
        <AppHeader />
        <n-space vertical size="large">
          <n-layout has-sider>
            <AppSidebar />
            <n-layout-content class="h-[calc(100vh-56px)] pl-6 pt-5 pb-3">
              <RouterView />
            </n-layout-content>
          </n-layout>
        </n-space>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<style scoped></style>
