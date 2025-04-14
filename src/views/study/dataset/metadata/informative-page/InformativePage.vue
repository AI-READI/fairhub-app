<script setup lang="ts">
import FadeTransition from "@/components/transitions/FadeTransition.vue";
import { useSidebarStore } from "@/stores/sidebar";
import type { Dataset } from "@/types/Dataset";
import { baseURL } from "@/utils/constants";
// const baseURL = "http://localhost:3001/api";

const route = useRoute();
const push = usePush();

const sidebarStore = useSidebarStore();
const router = useRouter();

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

const loading = ref(false);

onBeforeMount(async () => {
  sidebarStore.setAppSidebarCollapsed(true);

  loading.value = true;

  const response = await fetch(`${baseURL}/study/${studyId}/dataset/${datasetId}`, {
    method: "GET",
  });

  loading.value = false;

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Something went wrong.");
  }

  const data = await response.json();

  dataset.value = data;
});

const navigateHealthsheet = () => {
  router.push({
    name: "dataset:healthsheet:motivation",
    params: { datasetId: datasetId, studyId },
  });
};
const navigatePublish = () => {
  router.push({
    name: "dataset:publish:versions",
    params: { datasetId: datasetId, studyId },
  });
};
const previousPage = () => {
  router.push({
    name: "dataset:metadata:about",
    params: { datasetId: datasetId, studyId },
  });
};
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-6">
    <PageBackNavigationHeader
      title="Data collection"
      description="View an overview of your dataset"
      linkName="study:all-datasets"
      :linkParams="{ studyId: routeParams.studyId }"
    />

    <n-divider />

    <FadeTransition>
      <n-card class="flex max-w-screen-2xl items-center rounded-lg p-8">
        <h1>Select the task you would like to perform below:</h1>

        <div class="flex flex-row justify-between gap-8 pt-16">
          <n-button @click="navigateHealthsheet" type="default" class="my-8 h-16"
            >Fill out the healthsheet information</n-button
          >

          <n-button @click="navigatePublish" type="default" class="my-8 h-16"
            >Start to publish a new version</n-button
          >
        </div>
      </n-card>
    </FadeTransition>

    <div class="flex justify-between gap-4">
      <n-button @click="previousPage" size="large" type="primary">
        <template #icon>
          <f-icon icon="ic:round-arrow-back-ios" />
        </template>

        Back
      </n-button>
    </div>
  </main>
</template>
