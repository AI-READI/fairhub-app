<script setup lang="ts">
import { useMessage } from "naive-ui";
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
  <main class="flex w-full flex-col pr-6">
    <HeadingText title="Dashboard" description="Some description text here" />

    <n-divider />

    <n-space vertical>
      <n-skeleton height="40px" width="66%" :sharp="false" />

      <n-skeleton height="40px" width="66%" :sharp="false" />

      <n-skeleton height="40px" width="33%" />

      <n-skeleton height="40px" width="66%" :sharp="false" />

      <n-skeleton text height="40px" :repeat="2" style="width: 60%" />

      <n-skeleton text height="40px" style="width: 60%" />

      <n-skeleton height="40px" width="33%" />
    </n-space>
  </main>
</template>
