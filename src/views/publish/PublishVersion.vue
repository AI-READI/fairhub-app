<script setup lang="ts">
import { NDivider, NStep, NSteps } from "naive-ui";
import type { Ref } from "vue";
import { inject, onBeforeMount, ref, toRaw } from "vue";
import { provide } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

import { currentRef } from "@/stores/publish/currentStep";
import { DATASETS_KEY, STUDYPUBLISH_KEY } from "@/stores/publish/dataset-state";
import { Dataset, StudyVersion } from "@/stores/publish/study-interfaces";
import { STUDY_KEY } from "@/stores/publish/study-state";
import { fetchDatasetVersion } from "@/stores/services/service";

const route = useRoute();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
  versionId: route.params.versionId as string,
};

const studyPublish: Ref<StudyVersion | null> = ref(null);
provide(STUDYPUBLISH_KEY, studyPublish);

// const dataset: Ref<Dataset | null> = ref(null);

const datasets = inject(DATASETS_KEY, ref([]));

const study = inject(STUDY_KEY, ref(null));

function checkStudy() {
  if (routeParams.versionId === "new" && routeParams.datasetId === "new") {
    studyPublish.value = new StudyVersion();
    // dataset.value = null;
    if (study.value) {
      studyPublish.value.contributors = structuredClone(toRaw(study.value).contributors);
    }
  }
  if (routeParams.versionId === "new" && routeParams.datasetId !== "new") {
    const dataset: Dataset | undefined = datasets.value.find(
      (d) => d.id === parseInt(routeParams.datasetId)
    );
    if (!dataset) throw new Error("dataset not found");
    fetchDatasetVersion(
      parseInt(routeParams.studyId),
      parseInt(routeParams.datasetId),
      dataset.latestVersion
    ).then((version) => {
      studyPublish.value = version;
      if (dataset.latestVersion !== dataset.publishedVersion) {
        throw new Error("Unpublished version already exist.");
      }
      studyPublish.value.id = 0;
    });
  }
  if (routeParams.versionId !== "new" && routeParams.datasetId !== "new") {
    fetchDatasetVersion(
      parseInt(routeParams.studyId),
      parseInt(routeParams.datasetId),
      parseInt(routeParams.versionId)
    ).then((version) => (studyPublish.value = version));
  }
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
