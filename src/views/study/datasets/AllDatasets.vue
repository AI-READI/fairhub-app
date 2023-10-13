<script setup lang="ts">
import { useSidebarStore } from "@/stores/sidebar";
import type { Dataset } from "@/types/Dataset";
import { baseURL } from "@/utils/constants";
import { displayHumanFriendlyDateAndTime } from "@/utils/date";

const router = useRouter();
const route = useRoute();
const push = usePush();

const sidebarStore = useSidebarStore();

const loading = ref(true);
const datasets = ref<Dataset[]>([]);

const routeParams = {
  studyId: route.params.studyId as string,
};

onBeforeMount(async () => {
  const studyId = routeParams.studyId as string;

  sidebarStore.setAppSidebarCollapsed(false);

  const response = await fetch(`${baseURL}/study/${studyId}/dataset`, {
    method: "GET",
  });

  loading.value = false;

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  console.log(data);

  datasets.value = data;
});

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
              </div>

              <n-divider />

              <div class="flex flex-col space-y-4">
                <p>{{ dataset.description }}</p>

                <!-- <n-divider v-if="dataset.latest_version" /> -->

                <!-- <p v-if="dataset.latest_version">
                  <span class="font-bold"> Latest version: </span>
                  <span>
                    {{ dataset.latest_version }}
                  </span>
                </p> -->

                <p>
                  <span class="font-bold"> Created on: </span>
                  <span>
                    {{ displayHumanFriendlyDateAndTime(dataset.created_at) }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </FadeTransition>
      </div>
    </FadeTransition>
  </main>
</template>
