<script setup lang="ts">
import { NButton } from "naive-ui";
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
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <div class="person-detail">
      <h1>Summary</h1>
    </div>
    <div></div>
    <div class="back-next-buttons">
      <n-button type="primary" size="large" @click="handleBackButton">Back</n-button>
      <n-button type="primary" size="large" @click="onsubmit">Submit</n-button>
    </div>
  </main>
</template>
<style>
.person-detail {
  display: flex;
  flex-direction: column;
}

.next-button {
  display: flex;
  justify-content: flex-end !important;
}
</style>
