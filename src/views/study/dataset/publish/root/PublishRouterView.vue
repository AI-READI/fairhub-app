<script setup lang="ts">
import { useMessage } from "naive-ui";
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useSidebarStore } from "@/stores/sidebar";
import { useVersionStore } from "@/stores/version";

const route = useRoute();
const router = useRouter();
const { error } = useMessage();

const authStore = useAuthStore();
const versionStore = useVersionStore();
const sidebarStore = useSidebarStore();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
  versionId: route.params.versionId as string,
};

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }

  sidebarStore.setAppSidebarCollapse(true);

  const studyId = routeParams.studyId;
  const datasetId = routeParams.datasetId;
  const versionId = routeParams.versionId;

  versionStore.getVersion(datasetId, studyId);

  if (route.name && route.name === "dataset:root") {
    console.log("redirecting to datset overview");

    router.push({ name: "dataset:overview", params: { datasetId, studyId } });
  }
});
</script>

<template>
  test
  <router-view v-slot="{ Component }" :key="$route.fullPath">
    <transition name="fade" appear mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
