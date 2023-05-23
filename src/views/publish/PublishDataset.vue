<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

import type { Dataset } from "@/stores/publish/study-interfaces";
import { fetchDatasets } from "@/stores/services/service";

const route = useRoute();
const routeParams = {
  id: route.params.studyId.toString(),
};

// const datasets = ref(await fetchDatasets(parseInt(routeParams.id)));
const datasets: Ref<Dataset[]> = ref([]);
fetchDatasets(parseInt(routeParams.id)).then((d) => (datasets.value = d));
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <h1>Edit Contributors</h1>
    <ul>
      <li v-for="(data, index) in datasets" :key="index">
        <RouterLink
          :to="{
            name: 'publish-select-participants',
            params: { versionId: 'new', datasetId: data.id },
          }"
        >
          {{ data.name }}
        </RouterLink>
      </li>
    </ul>
  </main>
</template>
