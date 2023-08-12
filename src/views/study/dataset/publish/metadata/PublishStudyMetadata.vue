<script setup lang="ts">
import type { Ref } from "vue";

import { useAuthStore } from "@/stores/auth";
import { useStudyStore } from "@/stores/study";
import type { Study } from "@/types/Study";

const route = useRoute();
const router = useRouter();
const { error } = useMessage();

const authStore = useAuthStore();
const studyStore = useStudyStore();

const routeParams = {
  datasetId: route.params.datasetId,
  studyId: route.params.studyId,
  versionId: route.params.versionId,
};

const study: Ref<Study> = computed(() => studyStore.study);

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }

  const studyId = routeParams.studyId as string;

  studyStore.getStudy(studyId);
});

function handleBackButton() {
  router.push({
    name: "dataset:publish:version:participants",
    params: {
      datasetId: routeParams.datasetId,
      studyId: routeParams.studyId,
      versionId: routeParams.versionId,
    },
  });
}

function handleNextButton() {
  router.push({
    name: "dataset:publish:version:dataset-metadata",
    params: {
      datasetId: routeParams.datasetId,
      studyId: routeParams.studyId,
      versionId: routeParams.versionId,
    },
  });
}
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Study Metadata"
      description="Details about your study are displayed here"
      linkName="dataset:publish:versions"
      :linkParams="{ datasetId: routeParams.datasetId, studyId: routeParams.studyId }"
    />

    <n-divider />

    <h3>Study Metadata</h3>

    <p class="py-1">
      Details about your study are displayed here. Go to the appropriate page to edit the details.
    </p>

    <n-divider />

    <n-card title="Identification">
      identifiers here

      <template #action>
        <RouterLink
          :to="{
            name: 'study:metadata:identification',
            params: {
              studyId: routeParams.studyId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Identifiers
          </n-button>
        </RouterLink>
      </template>
    </n-card>

    <n-divider />

    <div class="flex items-center justify-between">
      <n-button size="large" type="warning" @click="handleBackButton">
        <template #icon>
          <f-icon icon="ic:round-arrow-back-ios" />
        </template>
        Select participants
      </n-button>

      <n-button size="large" type="primary" @click="handleNextButton">
        <template #icon>
          <f-icon icon="ic:round-arrow-forward-ios" />
        </template>
        Add contributors
      </n-button>
    </div>
  </main>
</template>
