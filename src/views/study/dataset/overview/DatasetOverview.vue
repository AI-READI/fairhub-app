<script setup lang="ts">
import { useSidebarStore } from "@/stores/sidebar";
import type { Dataset } from "@/types/Dataset";

// import { baseURL } from "@/utils/constants";
const baseURL = "http://localhost:3001/api";

const route = useRoute();
const push = usePush();

const sidebarStore = useSidebarStore();

const dataset = ref<Dataset>({
  id: "",
  title: "",
  created_at: 0,
  description: "",
  updated_at: 0,
});

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const studyId = routeParams.studyId;
const datasetId = routeParams.datasetId;

onBeforeMount(async () => {
  sidebarStore.setAppSidebarCollapsed(true);

  const response = await fetch(`${baseURL}/study/${studyId}/dataset/${datasetId}`, {
    method: "GET",
  });

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Something went wrong.");
  }

  const data = await response.json();

  dataset.value = data;
});
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-6">
    <PageBackNavigationHeader
      title="Dataset metadata"
      description="View an overview of your dataset"
      linkName="study:all-datasets"
      :linkParams="{ studyId: routeParams.studyId }"
    />

    <n-divider />

    <div class="flex w-full justify-between">
      <div class="pr-8">
        <h2>{{ dataset.title }}</h2>

        <p class="py-4">{{ dataset.description }}</p>
      </div>
    </div>
  </main>
</template>
