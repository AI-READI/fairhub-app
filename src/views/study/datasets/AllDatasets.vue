<script setup lang="ts">
import { useSidebarStore } from "@/stores/sidebar";
import { useStudyStore } from "@/stores/study";
import type { Dataset } from "@/types/Dataset";
import { baseURL } from "@/utils/constants";
// const baseURL = "http://localhost:3001/api";
import { displayHumanFriendlyDateAndTime } from "@/utils/date";

const router = useRouter();
const route = useRoute();
const push = usePush();

const sidebarStore = useSidebarStore();
const studyStore = useStudyStore();

const loading = ref(true);
const datasets = ref<Dataset[]>([]);

const routeParams = {
  studyId: route.params.studyId as string,
};

onBeforeMount(async () => {
  sidebarStore.setAppSidebarCollapsed(false);

  const response = await fetch(`${baseURL}/study/${routeParams.studyId}/dataset`, {
    method: "GET",
  });

  loading.value = false;

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  datasets.value = data;
  // loop datasets to fetch versions for each
  for (const dataset of datasets.value) {
    const responseVersion = await fetch(
      `${baseURL}/study/${routeParams.studyId}/dataset/${dataset.id}/version`,
      { method: "GET" }
    );

    if (!responseVersion.ok) {
      push.error(`Something went wrong (versions for dataset ${dataset.id}).`);
      continue;
    }

    const dataVersion = await responseVersion.json();

    // attach versions to each dataset
    dataset.versions = dataVersion;
  }
  console.log(data);
});

const navigateToDataset = (datasetId: string) => {
  sidebarStore.setAppSidebarCollapsed(true);

  router.push({ name: "dataset:overview", params: { datasetId } });
};

const navigateToNewVersion = (datasetId: string) => {
  router.push({
    name: "dataset:publish:versions:new",
    params: {
      datasetId,
      studyId: routeParams.studyId,
    },
  });
};

const navigateToDatasetVersion = (datasetId: string) => {
  router.push({
    name: "dataset:publish:versions",
    params: {
      datasetId,
      studyId: routeParams.studyId,
    },
  });
};

const draftAndNonExistingVersions = computed(() =>
  datasets.value.filter((d) => !d.versions?.some((v) => v.published))
);

const publishedVersions = computed(() =>
  datasets.value.filter((d) => d.versions?.some((v) => v.published))
);
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <n-space justify="space-between">
      <h2>Datasets</h2>

      <RouterLink
        :to="{
          name: 'dataset:new',
        }"
      >
        <n-button
          size="large"
          type="primary"
          :disabled="
            studyStore.currentStudyRole === 'viewer' || studyStore.currentStudyRole === 'editor'
          "
        >
          <template #icon>
            <f-icon icon="ion:add-circle-outline" />
          </template>

          Publish a new dataset
        </n-button>
      </RouterLink>
    </n-space>

    <n-divider />

    <FadeTransition>
      <div class="flex flex-col items-center" v-if="loading">
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

            <p class="text-center">We could not find any datasets for this study.</p>
          </div>

          <div v-else>
            <div
              v-for="d in draftAndNonExistingVersions"
              :key="d.id"
              class="mb-5 flex w-full flex-col rounded-md border border-slate-200 px-6 py-4 shadow-sm transition-all hover:cursor-pointer hover:border-slate-300 hover:bg-slate-100"
              @click="navigateToNewVersion(d.id)"
            >
              <div class="flex justify-between pt-2">
                <h3>{{ d.title || "Untitled Dataset" }}</h3>
              </div>

              <n-divider />

              <div class="flex flex-col space-y-4">
                <p>
                  <span class="font-bold">Description:</span>

                  <span>{{ d.description || "No description provided" }}</span>
                </p>

                <p>
                  <span class="font-bold">Created date:</span>

                  <span>{{ displayHumanFriendlyDateAndTime(d.created_at) }}</span>
                </p>

                <p>
                  <span class="font-bold">Last updated date:</span>

                  <span>{{ displayHumanFriendlyDateAndTime(d.updated_on) }}</span>
                </p>

                <p>
                  <span class="font-bold">Status:</span>

                  <span>
                    {{ d.versions?.some((v) => v.published) ? "Published" : " In preparation" }}
                  </span>
                </p>
              </div>

              <div class="flex justify-end gap-4 pb-8">
                <n-button type="primary" @click.stop="navigateToNewVersion(d.id)">
                  Publish a new version
                </n-button>

                <a href="https://fairhub.io" target="_blank" class="text-sky-600">
                  <n-button secondary type="info" size="medium">
                    <template #icon><f-icon icon="el:share" /></template>
                    View on FAIRhub.io
                  </n-button>
                </a>
              </div>
            </div>

            <!-- 2. published section -->
            <h3 v-if="publishedVersions.length" class="mb-2 text-lg font-bold">
              Published Datasets
            </h3>

            <div
              v-for="d in publishedVersions"
              :key="d.id"
              class="mb-5 flex w-full flex-col rounded-md border border-slate-200 px-6 py-4 shadow-sm transition-all hover:cursor-pointer hover:border-slate-300 hover:bg-slate-100"
              @click="navigateToDataset(d.id)"
            >
              <div class="flex justify-between pt-2">
                <h3>{{ d.title || "Untitled Dataset" }}</h3>
              </div>

              <n-divider />

              <div class="flex flex-col space-y-4">
                <p>
                  <span class="font-bold">Description:</span>

                  <span>{{ d.description || "No description provided" }}</span>
                </p>

                <p>
                  <span class="font-bold">Created date:</span>

                  <span>{{ displayHumanFriendlyDateAndTime(d.created_at) }}</span>
                </p>

                <p>
                  <span class="font-bold">Last updated date:</span>

                  <span>{{ displayHumanFriendlyDateAndTime(d.updated_on) }}</span>
                </p>

                <p>
                  <span class="font-bold">Status:</span>

                  <span> Published</span>
                </p>
              </div>

              <div class="flex justify-end gap-4 pb-8">
                <n-button type="primary" @click.stop="navigateToDatasetVersion(d.id)">
                  View all versions
                </n-button>

                <a href="https://fairhub.io" target="_blank" class="text-sky-600">
                  <n-button secondary type="info" size="medium">
                    <template #icon><f-icon icon="el:share" /></template>
                    View on FAIRhub.io
                  </n-button>
                </a>
              </div>
            </div>
          </div>
        </FadeTransition>
      </div>
    </FadeTransition>
  </main>
</template>
