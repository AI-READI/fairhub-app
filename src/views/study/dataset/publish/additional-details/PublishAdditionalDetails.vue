<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useVersionStore } from "@/stores/version";

const route = useRoute();
const router = useRouter();
const { error } = useMessage();

const authStore = useAuthStore();

const versionStore = useVersionStore();

const routeParams = {
  datasetId: route.params.datasetId,
  studyId: route.params.studyId,
  versionId: route.params.versionId,
};

const version = ref(versionStore.version);

const changelog = ref("");

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }

  changelog.value = version.value.changelog;
});

function handleNextButton() {
  /**
   * TODO: Push the participant IDs to the database.
   */

  router.push({
    name: "dataset:publish:version:study-metadata",
    params: {
      datasetId: routeParams.datasetId,
      studyId: routeParams.studyId,
      versionId: routeParams.versionId,
    },
  });
}

function handleBackButton() {
  router.push({
    name: "dataset:publish:versions",
  });
}
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Additional Information"
      description="Some final details about your dataset."
      linkName="dataset:publish:version:changelog"
      :linkParams="{
        datasetId: routeParams.datasetId,
        studyId: routeParams.studyId,
        versionId: routeParams.versionId,
      }"
    />

    <n-divider />

    <n-divider />

    <div class="flex items-center justify-end">
      <n-button size="large" type="warning" @click="handleBackButton" class="hidden">
        <template #icon>
          <f-icon icon="ic:round-arrow-back-ios" />
        </template>

        Review dataset metadata
      </n-button>

      <n-button size="large" type="primary" @click="handleNextButton">
        <template #icon>
          <f-icon icon="ic:round-arrow-forward-ios" />
        </template>

        View Summary
      </n-button>
    </div>
  </main>
</template>
