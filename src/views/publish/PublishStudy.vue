<script setup lang="ts">
import type { StepsProps } from "naive-ui";
import { NDivider, NStep, NSteps, useMessage } from "naive-ui";
import { onBeforeMount } from "vue";
import { ref } from "vue";
import { onBeforeRouteUpdate, RouterView, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";

const currentRef = ref(1);

const currentStatus = ref<StepsProps["status"]>("process");
const current = currentRef;
const router = useRouter();
const authStore = useAuthStore();
const { error } = useMessage();

function checkAuth() {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  } else {
    /**
     * TODO: Need to save which step the user is on in the store
     */
    router.push({ name: "publish-check-for-previous-version" });
  }
}

onBeforeMount(checkAuth);

onBeforeRouteUpdate((to, from) => {
  if (to.name === "publish-study") {
    checkAuth();
  }
});
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <n-steps :current="(current as number)" :status="currentStatus" class="pt-2 pl-2 text-sm">
      <n-step title="Versioning" description="" class="!text-sm" />
      <n-step title="Participants" description="" />
      <n-step title="Dataset Metadata" description="" />
      <n-step title="Study Metadata" description="" />
      <n-step title="Contributors" description="" />
      <n-step title="Related Resources" description="" />
      <n-step title="Additional Information" description="" />
      <n-step title="README" description="" />
      <n-step title="Changelog" description="" />
      <n-step title="Summary" description="" />
    </n-steps>

    <n-divider class="w-full" />

    <router-view />
  </main>
</template>
