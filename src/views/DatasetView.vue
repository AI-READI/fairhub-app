<script setup lang="ts">
import type { Ref } from "vue";
import { provide, ref } from "vue";
import { useRoute } from "vue-router";

import { DATASETS_KEY } from "@/stores/publish/dataset-state";
import type { Dataset } from "@/stores/publish/study-interfaces";
import { fetchDatasets } from "@/stores/services/service";

const route = useRoute();

const routeParams = {
  studyId: route.params.studyId as string,
};

const datasets: Ref<Dataset[]> = ref([]);
provide(DATASETS_KEY, datasets);

let loading = ref(true);

setTimeout(() => {
  fetchDatasets(parseInt(routeParams.studyId)).then((d) => {
    datasets.value = d;
    loading.value = false;
  });
}, 1000);
</script>

<template>
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
  <router-view v-if="!loading && datasets.length > 0" />
</template>
