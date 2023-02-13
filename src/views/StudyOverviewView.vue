<script setup lang="ts">
import { NSkeleton, NSpace, useMessage } from "naive-ui";
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

const study = {
  id: 1,
  title: "AI-READI",
  description:
    "The AI-READI project seeks to create and share a flagship ethically-sourced dataset of type 2 diabetes.",
  image: `https://fairdataihub.org/images/hero/aireadi-logo.png`,
  size: "2.8 GB",
  lastUpdated: "2023-02-13",
  lastPublished: {
    version: "1.0.0",
    date: "2023-01-13",
    doi: "10.1234/1234",
  },
};
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <n-space vertical>
      <h1>{{ study.title }}</h1>
      <p>{{ study.description }}</p>
    </n-space>

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
