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
    name: "publish-study-metadata",
    params: { versionId: routeParams.versionId },
  });
}

function onsubmit() {
  console.log("saved");
}
</script>

<template>
  <main class="flex h-full w-full flex-col">
    <h1>Review Summary</h1>
    <div class="summary">
      <n-card title="Confirm dataset details">
        <n-input placeholder="Confirm details" />
        <div class="save-related">
          <n-button type="success">Save</n-button>
        </div>
      </n-card>
    </div>
    <div class="back-next-buttons">
      <n-button type="primary" size="large" @click="handleBackButton">Back</n-button>
      <n-button type="primary" size="large" @click="onsubmit">Publish</n-button>
    </div>
  </main>
</template>

<style>
.summary {
  margin: 1rem 0 1rem 0;
}
</style>
