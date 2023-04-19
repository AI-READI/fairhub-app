<script setup lang="ts">
import { NDivider, NStep, NSteps, useMessage } from "naive-ui";
import { onBeforeMount } from "vue";
import { onBeforeRouteUpdate, RouterView, useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { currentRef } from "@/stores/publish/currentStep";
import { Study } from "@/stores/publish/study-publish";
import { studyPublish } from "@/stores/publish/study-state";
import { useStudiesStore } from "@/stores/studies";

const router = useRouter();
const authStore = useAuthStore();
const { error } = useMessage();

const route = useRoute();
const studiesStore = useStudiesStore();

const routeParams = {
  id: route.params.id.toString(),
};
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

onBeforeMount(checkAuth);

onBeforeRouteUpdate((to, from) => {
  if (from.params.id !== to.params.id) {
    // const studyClone= studiesStore.getStudy(parseInt(routeParams.id));
    studyPublish.value = new Study();

    console.log(from.params.id, "change to", to.params.id);
  }
  if (to.name === "publish-study") {
    checkAuth();
  }
});
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <n-steps :current="(currentRef as number)" class="steps pt-2 pl-2 text-sm">
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
    <router-link to="/studies/2/publish/precheck/version">Go to About</router-link>
    <n-divider class="w-full" />

    <router-view />
  </main>
</template>

<style>
.pl-2 {
  padding-left: 0.2rem;
}

.steps {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.n-step-indicator,
.n-step-content {
  margin-top: 1.5rem;
}

.n-steps .n-step {
  flex: 0;
}
</style>
