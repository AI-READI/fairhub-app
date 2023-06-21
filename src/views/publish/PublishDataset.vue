<script setup lang="ts">
import { NButton, NCard } from "naive-ui";
import { inject, ref } from "vue";
import { useRoute } from "vue-router";

import { DATASETS_KEY } from "@/stores/publish/dataset-state";

const route = useRoute();

const routeParams = {
  studyId: route.params.studyId as string,
};

const datasets = inject(DATASETS_KEY, ref([]));
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

    <div>
      <ul class="flex:2xl col-auto:2xl list-none gap-6">
        <li v-for="(dataset, index) in datasets" :key="index">
          <n-card class="mb-5" hoverable>
            <div>{{ dataset.name }}</div>
            <div class="col-auto flex gap-2">
              <div v-if="dataset.latestVersion === dataset.publishedVersion">
                Current version published
                {{
                  dataset.lastPublished.toLocaleDateString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                }}

                <RouterLink
                  :to="{
                    name: 'publish-select-participants',
                    params: {
                      versionId: 'new',
                      datasetId: dataset.id,
                    },
                  }"
                  ><n-button> New version</n-button>
                </RouterLink>
              </div>
              <div v-if="dataset.latestVersion !== dataset.publishedVersion">
                Unpublished version last updated on
                {{
                  dataset.lastModified.toLocaleDateString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                }}
                <n-button>
                  <RouterLink
                    :to="{
                      name: 'publish-select-participants',
                      params: {
                        versionId: dataset.latestVersion,
                        datasetId: dataset.id,
                      },
                    }"
                  >
                    Resume
                  </RouterLink>
                </n-button>
                <n-button>
                  <RouterLink
                    :to="{
                      name: 'publish-select-participants',
                      params: {
                        versionId: dataset.latestVersion,
                        datasetId: dataset.id,
                      },
                    }"
                  >
                    Discard
                  </RouterLink>
                </n-button>
              </div>
            </div>
          </n-card>
        </li>
      </ul>
    </div>
    <!--      <div>-->
    <!--          Select the dataset that you would like to continue working with and click "Resume"-->
    <!--        <div>-->
    <!--          <n-card hoverable> Continue where you left </n-card>-->
    <!--        </div>-->
    <!--     </div>-->
    <div></div>
  </main>
</template>
