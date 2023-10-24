<script setup lang="ts">
import { useMessage } from "naive-ui";
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
// import { useDatasetStore } from "@/stores/dataset";
import { useSidebarStore } from "@/stores/sidebar";

const route = useRoute();
const router = useRouter();
const { error } = useMessage();

const authStore = useAuthStore();
// const datasetStore = useDatasetStore();
const sidebarStore = useSidebarStore();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }

  sidebarStore.setAppSidebarCollapsed(true);

  const studyId = routeParams.studyId;
  const datasetId = routeParams.datasetId;

  // datasetStore.getDataset(datasetId, studyId);

  if (route.name && route.name === "dataset:root") {
    console.log("redirecting to datset overview");

    router.push({ name: "dataset:overview", params: { datasetId, studyId } });
  }
});
</script>

<template>
  <router-view v-slot="{ Component }" :key="$route.fullPath">
    <transition name="fade" appear mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
