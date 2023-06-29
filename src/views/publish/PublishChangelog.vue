<script setup lang="ts">
import { NButton, NCard, NInput } from "naive-ui";
import { useRoute } from "vue-router";

import router from "@/router";

const route = useRoute();
const routeParams = {
  versionId: route.params.versionId.toString(),
};

function handleBackButton() {
  router.push({
    name: "publish-readme",
    params: { versionId: routeParams.versionId },
  });
}

function handleNextButton() {
  router.push({
    name: "publish-summary",
    params: { versionId: routeParams.versionId },
  });
}
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <h1>Changelog</h1>
    <div class="changelog">
      <n-card title="Enter changes in new version">
        <n-input type="textarea" placeholder="" />
        <div class="save-changelog">
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
<style scoped>
.save-changelog {
  margin-top: 1rem;
}
</style>
