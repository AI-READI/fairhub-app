<script setup lang="ts">
import { NButton } from "naive-ui";
import { useRoute, useRouter } from "vue-router";

import { currentRef } from "@/stores/publish/currentStep";

const route = useRoute();
const router = useRouter();

// type RowData = {
//   name: string;
//   address: string;
//   age: string;
//   key: number;
// };

const routeParams = {
  versionId: route.params.versionId.toString(),
};

function handleBackButton() {
  currentRef.value--;
  router.push({
    name: "publish-select-participants",
    params: { versionId: routeParams.versionId },
  });
}

function handleNextButton() {
  currentRef.value++;
  router.push({
    name: "publish-dataset-metadata",
    params: { versionId: routeParams.versionId },
  });
}
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <h1>Review participants</h1>
    <div></div>
    <div class="back-next-buttons">
      <n-button type="primary" size="large" @click="handleBackButton">Back</n-button>
      <n-button type="primary" size="large" @click="handleNextButton">Next</n-button>
    </div>
  </main>
</template>
<style scoped>
.person-detail {
  display: flex;
  flex-direction: column;
}
</style>
