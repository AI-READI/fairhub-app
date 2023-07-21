<script setup lang="ts">
import { useMessage } from "naive-ui";
import { computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useDatasetStore } from "@/stores/dataset";
import { displayHumanFriendlyDateAndTime } from "@/utils/date";

const router = useRouter();
const route = useRoute();
const { error, success } = useMessage();

const authStore = useAuthStore();
const datasetStore = useDatasetStore();

const routeParams = {
  studyId: route.params.studyId as string,
};

console.log(routeParams);

const datasets = computed(() => datasetStore.allDatasets);

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });

    return;
  }
});

const deleteDatasetVersion = () => {
  success("Dataset version deleted.");
};
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-4 pr-6">
    <n-space justify="space-between">
      <h2>All Datasets</h2>

      <RouterLink
        :to="{
          name: 'publish-select-participants',
          params: { versionId: 'new', datasetId: 'new' },
        }"
      >
        <n-button size="large" type="primary">
          <template #icon>
            <f-icon icon="ion:add-circle-outline" />
          </template>
          Create a new dataset
        </n-button>
      </RouterLink>
    </n-space>

    <n-divider />

    <div class="my-3 flex w-full flex-col rounded-md">
      <div
        v-for="(dataset, index) in datasets"
        :key="index"
        class="my-5 flex w-full flex-col rounded-md border border-slate-100 p-4 shadow-md transition-all"
      >
        <div class="flex justify-between pt-2">
          <h3>{{ dataset.name }}</h3>

          <div class="flex items-center space-x-3">
            <RouterLink
              :to="{
                name: 'publish-select-participants',
                params: {
                  versionId: 'new',
                  datasetId: dataset.id,
                },
              }"
              v-if="dataset.latestVersion === dataset.publishedVersion"
            >
              <n-button strong secondary type="primary">
                <template #icon>
                  <f-icon icon="fluent:form-new-24-filled" />
                </template>
                Create a new version
              </n-button>
            </RouterLink>

            <div
              v-if="dataset.latestVersion !== dataset.publishedVersion"
              class="flex items-center space-x-3"
            >
              <RouterLink
                :to="{
                  name: 'publish-select-participants',
                  params: {
                    versionId: dataset.latestVersion,
                    datasetId: dataset.id,
                  },
                }"
              >
                <n-button strong secondary type="info">
                  <template #icon>
                    <f-icon icon="material-symbols:resume" />
                  </template>
                  Resume working on this version
                </n-button>
              </RouterLink>

              <n-popconfirm @positive-click="deleteDatasetVersion">
                <template #trigger>
                  <n-button strong secondary type="error">
                    <template #icon>
                      <f-icon icon="ph:trash-fill" />
                    </template>
                    Discard this version
                  </n-button>
                </template>
                Are you sure you want to discard this version?
              </n-popconfirm>
            </div>
          </div>
        </div>

        <n-divider />

        <div class="flex flex-col space-y-2">
          <p>{{ dataset.description }}</p>

          <n-divider />

          <p>
            <span class="font-bold"> Latest version: </span>
            <span>
              {{ dataset.latestVersion }}
            </span>
          </p>

          <p>
            <span class="font-bold"> Created on: </span>
            <span>
              {{ displayHumanFriendlyDateAndTime(dataset.lastPublished) }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
