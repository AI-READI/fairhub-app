<script setup lang="ts">
import { NLayout, NLayoutContent, NSpace } from "naive-ui";
import { RouterView } from "vue-router";

import AppHeader from "./components/header/AppHeader.vue";
import AppSidebar from "./components/sidebar/AppSidebar.vue";
</script>

<template>
  <div>
    <AppHeader />

    <n-space vertical size="large">
      <n-layout has-sider>
        <AppSidebar />

        <n-layout-content class="h-[calc(100vh-56px)] pl-6 pt-5 pb-3">
          <RouterView />
        </n-layout-content>
      </n-layout>
    </n-space>
  </div>
</template>

<style scoped></style>
