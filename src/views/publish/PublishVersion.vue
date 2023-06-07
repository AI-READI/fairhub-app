<script setup lang="ts">
import { NDivider, NStep, NSteps } from "naive-ui";
import type { Ref } from "vue";
import { onBeforeMount, ref } from "vue";
import { provide } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

import { currentRef } from "@/stores/publish/currentStep";
import { DATASET_KEY, STUDYPUBLISH_KEY } from "@/stores/publish/dataset-state";
import { Dataset, StudyVersion } from "@/stores/publish/study-interfaces";
import { fetchDataset, fetchDatasetVersion } from "@/stores/services/service";

const route = useRoute();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
  versionId: route.params.versionId as string,
};

const studyPublish: Ref<StudyVersion | null> = ref(null);
provide(STUDYPUBLISH_KEY, studyPublish);

const dataset: Ref<Dataset | null> = ref(new Dataset());
provide(DATASET_KEY, dataset);

function checkStudy() {
  //
  // if (routeParams.studyId!== studyPublish.value.id) {
  //   studyPublish.value = new StudyVersion(routeParams.studyId);
  // }
  if (routeParams.versionId === "new" && routeParams.datasetId === "new") {
    studyPublish.value = new StudyVersion();
    dataset.value = new Dataset();
  }
  if (routeParams.versionId === "new" && routeParams.datasetId !== "new") {
    studyPublish.value = new StudyVersion();
    fetchDataset(parseInt(routeParams.studyId)).then((p) => (dataset.value = p));
  }
}
if (routeParams.versionId !== "new" && routeParams.datasetId !== "new") {
  fetchDatasetVersion(
    parseInt(routeParams.studyId),
    parseInt(routeParams.datasetId),
    parseInt(routeParams.versionId)
  ).then((a) => (studyPublish.value = a));
}

onBeforeMount(() => {
  checkStudy();
});

onBeforeRouteUpdate((to, from) => {
  if (
    from.params.studyId !== to.params.studyId &&
    from.params.datasetId !== to.params.datasetId &&
    from.params.versionId !== to.params.versionId
  ) {
    checkStudy();
  }
});
</script>
<template>
  <n-steps
    :current="(currentRef as number)"
    class="steps flex flex-row flex-wrap pt-2 pl-2 text-sm 2xl:justify-between"
  >
    <!--      <n-step title="Versioning" description="" />-->
    <n-step title="Participants" description="" />
    <n-step title="Dataset Metadata" description="" />
    <n-step title="Study Metadata" description="" />
    <n-step title="Contributors" description="" />
    <n-step title="Related Resources" description="" />
    <n-step title="Additional Information" description="" />
    <n-step title="README" description="" />
    <n-step title="Changelog" description="" />
    <n-step title="Summary" description="" />
  </n-steps>
  <n-divider class="w-full" />

  <router-view />
</template>
