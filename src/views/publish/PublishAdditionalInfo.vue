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
    name: "publish-related-sources",
    params: { versionId: routeParams.versionId },
  });
}

function handleNextButton() {
  currentRef.value++;
  router.push({
    name: "publish-readme",
    params: { versionId: routeParams.versionId },
  });
}
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <h1>Additional information</h1>
    <div class="additional-info">
      <n-card title="Edit/Add funding">
        <n-input placeholder="Edit funding" />
        <div class="save-additional-info">
          <n-button type="success">Save</n-button>
        </div>
      </n-card>

      <n-card title="Update dataset version">
        <n-input placeholder="Update dataset version" />
        <div class="save-additional-info">
          <n-button type="success">Save</n-button>
        </div>
      </n-card>
      <n-card title="Update dataset publication date">
        <n-input placeholder="Update dataset publication date" />
        <div class="save-additional-info">
          <n-button type="success">Save</n-button>
        </div>
      </n-card>
      <n-card title="Select review license and access type">
        <div class="review-and-access">
          <n-input placeholder="Select review license" />
          <n-input placeholder="Select access type" />
        </div>
        <div class="save-additional-info">
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
.additional-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.review-and-access {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.save-additional-info {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}
</style>
