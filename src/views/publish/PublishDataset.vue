<script setup lang="ts">
import { NButton, NCard } from "naive-ui";
import type { Ref } from "vue";
import { provide, ref } from "vue";
import { useRoute } from "vue-router";

import { DATASETS_KEY } from "@/stores/publish/dataset-state";
import type { Dataset } from "@/stores/publish/study-interfaces";
import { fetchDatasets } from "@/stores/services/service";

const route = useRoute();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
  versionId: route.params.versionId as string,
};

let loading = ref(true);

const datasets: Ref<Dataset[]> = ref([]);
provide(DATASETS_KEY, datasets);

setTimeout(() => {
  fetchDatasets(parseInt(routeParams.studyId)).then((d) => {
    datasets.value = d;
    loading.value = false;
  });
}, 1000);
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <h1>Current Datasets</h1>

    <div class="row-auto flex items-end justify-end">
      <n-button>
        <RouterLink
          :to="{
            name: 'publish-select-participants',
            params: { versionId: 'new', datasetId: 'new' },
          }"
        >
          Create new dataset
        </RouterLink>
      </n-button>
    </div>
    <div class="flex flex-col items-center pb-3" v-if="loading">
      <Vue3Lottie
        animationLink="https://assets2.lottiefiles.com/private_files/lf30_b0iey3ml.json"
        :height="150"
        :width="200"
      />
      <p class="flex justify-center">Checking for previously published versions datasets</p>
    </div>
    <div v-if="!loading && datasets.length === 0">
      <Vue3Lottie
        animationLink="https://assets8.lottiefiles.com/packages/lf20_tmsiddoc.json"
        :height="150"
        :width="150"
      />
      <div class="new-button">
        <p class="flex justify-center">We could not find a previously published dataset.</p>
      </div>
    </div>

    <div>
      <ul class="list-none gap-6">
        <li v-for="(dataset, index) in datasets" :key="index">
          <n-card>
            <div>{{ dataset.name }}</div>
            <div class="col-auto flex gap-2">
              <div>
                <!--                      <div>6/15/2023 [Resume] [Discard]</div>-->
                <n-button v-if="dataset.latestVersion === dataset.publishedVersion">
                  <RouterLink
                    :to="{
                      name: 'publish-select-participants',
                      params: {
                        versionId: 'new',
                        datasetId: dataset.id,
                      },
                    }"
                  >
                    Create new version
                  </RouterLink>
                </n-button>
              </div>
              <div>
                <!--                      <div>6/15/2023 [Resume] [Discard]</div>-->
                <n-button v-if="dataset.latestVersion !== dataset.publishedVersion">
                  <RouterLink
                    :to="{
                      name: 'publish-select-participants',
                      params: {
                        versionId: dataset.latestVersion,
                        datasetId: dataset.id,
                      },
                    }"
                  >
                    Update a current version
                  </RouterLink>
                </n-button>
              </div>
            </div>
          </n-card>
        </li>
      </ul>
    </div>
    <div>
      Project currently on progress
      <div>
        <n-card hoverable> Continue where you left </n-card>
      </div>
    </div>
  </main>
</template>
