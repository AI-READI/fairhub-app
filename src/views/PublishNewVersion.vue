<script setup lang="ts">
import { NSpace, useMessage } from "naive-ui";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const { error } = useMessage();

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }
});
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <n-space vertical> new version layout </n-space>
  </main>
</template>
