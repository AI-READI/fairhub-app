<script setup lang="ts">
import { useMessage } from "naive-ui";
import { computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useDatasetStore } from "@/stores/dataset";

const router = useRouter();
const route = useRoute();
const { error } = useMessage();

const authStore = useAuthStore();
const datasetStore = useDatasetStore();

const routeParams = {
  studyId: route.params.studyId as string,
};

const datasets = computed(() => datasetStore.allDatasets);

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }

  const studyId = routeParams.studyId;

  datasetStore.fetchAllDatasets(studyId);
});
</script>

<template>
  <div>
    <div class="flex flex-col items-center pb-3" v-if="datasetStore.loading">
      <Vue3Lottie
        animationLink="https://assets2.lottiefiles.com/private_files/lf30_b0iey3ml.json"
        :height="150"
        :width="200"
      />
      <p class="flex justify-center">Checking for previously published datasets...</p>
    </div>
    <div v-if="!datasetStore.loading && datasets.length === 0">
      <Vue3Lottie
        animationLink="https://assets8.lottiefiles.com/packages/lf20_tmsiddoc.json"
        :height="150"
        :width="150"
      />
      <div class="new-button">
        <p class="flex justify-center">We could not find a previously published dataset.</p>
      </div>
    </div>

    <router-view v-slot="{ Component }" v-if="!datasetStore.loading && datasets.length > 0">
      <transition name="fade" appear mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
