<script setup lang="ts">
import type { StepsProps } from "naive-ui";
import { NStep, NSteps, useMessage } from "naive-ui";
import { onBeforeMount } from "vue";
import { ref } from "vue";
import { RouterView, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const { error } = useMessage();

const currentRef = ref(1);

const currentStatus = ref<StepsProps["status"]>("process");
const current = currentRef;

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  } else {
    router.push({ name: "publish-new-version" });
  }
});
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <n-steps :current="(current as number)" :status="currentStatus">
      <n-step title="I Me Mine" description="All through the day, I me mine I me mine, I me mine" />
      <n-step
        title="Let It Be"
        description="When I find myself in times of trouble Mother Mary comes to me"
      />
      <n-step
        title="Come Together"
        description="Here come old flat top He come grooving up slowly"
      />
      <n-step
        title="Something"
        description="Something in the way she moves Attracts me like no other lover"
      />
    </n-steps>

    <router-view />
  </main>
</template>
