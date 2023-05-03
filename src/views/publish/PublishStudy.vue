<script setup lang="ts">
import { NDivider, NStep, NSteps, useMessage } from "naive-ui";
import { onBeforeMount } from "vue";
import { onBeforeRouteUpdate, RouterView, useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { currentRef } from "@/stores/publish/currentStep";
import { Study } from "@/stores/publish/study-publish";
import { studyPublish } from "@/stores/publish/study-state";

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
    currentRef.value = 1;
  }
}

const route = useRoute();
function checkStudy() {
  let id = parseInt(route.params.id.toString());
  if (id !== studyPublish.value.id) {
    studyPublish.value = new Study(id);
  }
}

onBeforeMount(() => {
  checkAuth();
  checkStudy();
});

onBeforeRouteUpdate((to, from) => {
  if (from.params.id !== to.params.id) {
    checkStudy();
  }
  if (to.name === "publish-study") {
    checkAuth();
  }
});
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <n-steps
      :current="(currentRef as number)"
      class="flex flex-row flex-wrap pt-2 pl-2 text-sm 2xl:justify-between"
    >
      <n-step title="Versioning" description="" />
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
