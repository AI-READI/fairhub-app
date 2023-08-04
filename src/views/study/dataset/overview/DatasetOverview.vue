<script setup lang="ts">
import { useMessage } from "naive-ui";
import type { Ref } from "vue";
import { computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useDatasetStore } from "@/stores/dataset";
import { useSidebarStore } from "@/stores/sidebar";
import { useStudyStore } from "@/stores/study";
import type { Dataset } from "@/types/Dataset";
import type { Study } from "@/types/Study";

const router = useRouter();
const route = useRoute();
const { error } = useMessage();

const authStore = useAuthStore();

const sidebarStore = useSidebarStore();
const datasetStore = useDatasetStore();
const studyStore = useStudyStore();

const study: Ref<Study> = computed(() => studyStore.study);

const dataset: Ref<Dataset> = computed(() => datasetStore.dataset);

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }

  const studyId = routeParams.studyId;
  const datasetId = routeParams.datasetId;

  datasetStore.getDataset(datasetId, studyId);

  sidebarStore.setAppSidebarCollapse(true);
});

const handleBack = () => {
  router.push({
    name: "study:all-datasets",
    params: { studyId: routeParams.studyId },
  });
};
</script>

<template>
  <FadeTransition>
    <LottieLoader v-if="datasetStore.loading" />

    <main class="flex h-full w-full flex-col pr-6" px-4 v-else>
      <n-page-header subtitle="View an overview of your dataset" @back="handleBack">
        <template #title>
          <p>Overview</p>
        </template>

        <template #header>
          <n-breadcrumb>
            <n-breadcrumb-item>Study</n-breadcrumb-item>
            <n-breadcrumb-item>{{ study.title }}</n-breadcrumb-item>
            <n-breadcrumb-item>{{ dataset.title }}</n-breadcrumb-item>
            <n-breadcrumb-item>Overview</n-breadcrumb-item>
          </n-breadcrumb>
        </template>
      </n-page-header>

      <n-divider />

      <div class="flex w-full justify-between">
        <div class="pr-8">
          <h2>{{ dataset.title }}</h2>

          <p class="py-4">{{ dataset.description }}</p>
        </div>
      </div>
    </main>
  </FadeTransition>
</template>
