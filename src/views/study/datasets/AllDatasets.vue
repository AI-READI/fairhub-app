<script setup lang="ts">
import { useMessage } from "naive-ui";
import { computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useDatasetStore } from "@/stores/dataset";
import { useSidebarStore } from "@/stores/sidebar";

const router = useRouter();
const route = useRoute();
const { error, success } = useMessage();

const datasetStore = useDatasetStore();
const sidebarStore = useSidebarStore();

const routeParams = {
  studyId: route.params.studyId as string,
};

const datasets = computed(() => datasetStore.allDatasets);

onBeforeMount(() => {
  const studyId = routeParams.studyId as string;

  sidebarStore.setAppSidebarCollapsed(false);

  datasetStore.fetchAllDatasets(studyId);
});

// const deleteDatasetVersion = () => {
//   success("Dataset version deleted.");
// };

const navigateToDataset = (datasetId: string) => {
  sidebarStore.setAppSidebarCollapsed(true);

  router.push({ name: "dataset:overview", params: { datasetId } });
};
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <n-space justify="space-between">
      <h2>All Datasets</h2>

      <RouterLink
        :to="{
          name: 'dataset:new',
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

    <FadeTransition>
      <div class="flex flex-col items-center" v-if="datasetStore.loading">
        <Vue3Lottie
          animationLink="https://assets2.lottiefiles.com/private_files/lf30_b0iey3ml.json"
          :height="150"
          :width="200"
        />

        <p class="flex justify-center">Checking for previously published datasets...</p>
      </div>

      <div class="flex w-full flex-col" v-else>
        <FadeTransition>
          <div v-if="datasets.length === 0" class="my-8">
            <Vue3Lottie
              animationLink="https://assets8.lottiefiles.com/packages/lf20_tmsiddoc.json"
              :height="150"
              :width="150"
            />

            <p class="text-center">We could not find a previously published dataset.</p>
          </div>

          <div v-else>
            <div
              v-for="(dataset, index) in datasets"
              :key="index"
              class="mb-5 flex w-full flex-col rounded-md border border-slate-200 px-6 py-4 shadow-sm transition-all hover:cursor-pointer hover:border-slate-300 hover:bg-slate-100"
              @click="navigateToDataset(dataset.id)"
            >
              <div class="flex justify-between pt-2">
                <h3>{{ dataset.title }}</h3>

                <div class="flex items-center space-x-3">
                  <!-- <RouterLink
                  :to="{
                    name: 'dataset:new',
                    params: {
                      versionId: 'new',
                      datasetId: dataset.id,
                    },
                  }"
                  v-if="dataset.latest_version === dataset.publishedVersion"
                >
                  <n-button strong secondary type="primary">
                    <template #icon>
                      <f-icon icon="fluent:form-new-24-filled" />
                    </template>
                    Create a new version
                  </n-button>
                </RouterLink> -->

                  <!-- <div
                  v-if="dataset.latest_version !== dataset.publishedVersion"
                  class="flex items-center space-x-3"
                >
                  <RouterLink
                    :to="{
                      name: 'publish-select-participants',
                      params: {
                        versionId: dataset.latest_version,
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
                </div> -->
                </div>
              </div>

              <n-divider />

              <div class="flex flex-col">
                <p>{{ dataset.description }}</p>

                <n-divider v-if="dataset.latest_version" />

                <p v-if="dataset.latest_version">
                  <span class="font-bold"> Latest version: </span>
                  <span>
                    {{ dataset.latest_version }}
                  </span>
                </p>

                <!-- <p>
                <span class="font-bold"> Created on: </span>
                <span>
                  {{ displayHumanFriendlyDateAndTime(dataset.lastPublished) }}
                </span>
              </p> -->
              </div>
            </div>
          </div>
        </FadeTransition>
      </div>
    </FadeTransition>
  </main>
</template>
