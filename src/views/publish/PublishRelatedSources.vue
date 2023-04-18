<script setup lang="ts">
import { NButton, NCard, NInput } from "naive-ui";
import { useRoute } from "vue-router";

import router from "@/router";
import { currentRef } from "@/stores/publish/currentStep";

const route = useRoute();
const routeParams = {
  versionId: route.params.versionId.toString(),
};

function handleBackButton() {
  currentRef.value--;
  router.push({
    name: "publish-contributors",
    params: { versionId: routeParams.versionId },
  });
}

function handleNextButton() {
  currentRef.value++;
  router.push({
    name: "publish-additional-info",
    params: { versionId: routeParams.versionId },
  });
}
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <h1>Related Sources</h1>
    <div class="related">
      <n-card title="Edit resources">
        <n-input placeholder="Edit resources" />
        <div class="save-related">
          <n-button type="success">Save</n-button>
        </div>
      </n-card>
      <n-card title="Confirm resources">
        <n-input placeholder="Confirm resources" />
        <div class="save-related">
          <n-button type="success">Save</n-button>
        </div>
      </n-card>
    </div>
    <div class="back-next-buttons">
      <n-button type="primary" size="large" @click="handleBackButton">Back</n-button>
      <n-button type="primary" size="large" @click="handleNextButton">Next</n-button>
    </div>
  </main>
</template>
<style>
.save-related {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}
</style>
