<script setup lang="ts">
import { useMessage } from "naive-ui";
import type { Ref } from "vue";
import { inject, onBeforeMount, ref, toRaw } from "vue";
import { provide } from "vue";
import type { RouteRecordName } from "vue-router";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";

import { DATASETS_KEY, STUDYPUBLISH_KEY } from "@/stores/publish/dataset-state";
import { Dataset, DatasetVersion } from "@/stores/publish/study-interfaces";
import { STUDY_KEY } from "@/stores/publish/study-state";
import { fetchDatasetVersion } from "@/stores/services/service";

const route = useRoute();
const router = useRouter();
const { error } = useMessage();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
  versionId: route.params.versionId as string,
};
const currentRef: Ref<number> = ref<number>(1);

const studyPublish: Ref<DatasetVersion | null> = ref(null);
provide(STUDYPUBLISH_KEY, studyPublish);

const datasets = inject(DATASETS_KEY, ref([]));
const study = inject(STUDY_KEY, ref(null));

function checkStudy() {
  if (routeParams.versionId === "new" && routeParams.datasetId === "new") {
    studyPublish.value = new DatasetVersion();
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
  const steps = new Map<RouteRecordName, number>(
    Object.entries({
      "publish-additional-info": 6,
      "publish-changelog": 8,
      "publish-contributors": 4,
      "publish-dataset-metadata": 2,
      "publish-readme": 7,
      "publish-related-sources": 5,
      "publish-select-participants": 1,
      "publish-study-metadata": 3,
      "publish-summary": 9,
    })
  );
  if (!route.name || !steps.has(route.name)) {
    return;
  }
  if (!steps.has(route.name)) {
    throw new Error(`A step for route was not found`);
  }
  currentRef.value = steps.get(route.name)!;
});

onBeforeRouteUpdate((to, from) => {
  console.log(from.name, to.name);
  if (
    from.params.studyId !== to.params.studyId &&
    from.params.datasetId !== to.params.datasetId &&
    from.params.versionId !== to.params.versionId
  ) {
    checkStudy();
  }
  const steps = new Map<RouteRecordName, number>(
    Object.entries({
      "publish-additional-info": 6,
      "publish-changelog": 8,
      "publish-contributors": 4,
      "publish-dataset-metadata": 2,
      "publish-readme": 7,
      "publish-related-sources": 5,
      "publish-select-participants": 1,
      "publish-study-metadata": 3,
      "publish-summary": 9,
    })
  );
  if (!to.name || !steps.has(to.name)) {
    return;
  }
  if (!steps.has(to.name)) {
    throw new Error(`A step for route was not found`);
  }
  currentRef.value = steps.get(to.name)!;
});
</script>
<template>
  <div>
    <n-steps
      :current="(currentRef as number)"
      class="steps flex flex-row flex-wrap pl-2 pt-2 text-sm 2xl:justify-between"
    >
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

    <router-view v-slot="{ Component }">
      <transition name="fade" appear mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
