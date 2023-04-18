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
    name: "publish-additional-info",
    params: { versionId: routeParams.versionId },
  });
}

function handleNextButton() {
  currentRef.value++;
  router.push({
    name: "publish-changelog",
    params: { versionId: routeParams.versionId },
  });
}
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <div class="readme">
      <h1>Readme</h1>
      <div class="readme">
        <n-card title="Confirm dataset title">
          <n-input placeholder="Confirm dataset title" />
          <div class="save-readme">
            <n-button type="success">Save</n-button>
          </div>
        </n-card>
        <n-card title="Confirm publication version">
          <n-input placeholder="Confirm publication version" />
          <div class="save-readme">
            <n-button type="success">Save</n-button>
          </div>
        </n-card>

        <n-card title="Confirm dataset  structure">
          <n-input placeholder="Confirm dataset structure" />
          <div class="save-readme">
            <n-button type="success">Save</n-button>
          </div>
        </n-card>

        <n-card title="Confirm recourses">
          <n-input type="textarea" placeholder="Confirm dataset recourse" />
          <div class="save-readme">
            <n-button type="success">Save</n-button>
          </div>
        </n-card>

        <n-card title="Confirm license">
          <n-input placeholder="Confirm dataset license" />
          <div class="save-readme">
            <n-button type="success">Save</n-button>
          </div>
        </n-card>

        <n-card title="Confirm citation">
          <n-input type="textarea" placeholder="Confirm citation" />
          <div class="save-readme">
            <n-button type="success">Save</n-button>
          </div>
        </n-card>
      </div>
    </div>
    <div></div>
    <div class="back-next-buttons">
      <n-button type="primary" size="large" @click="handleBackButton">Back</n-button>
      <n-button type="primary" size="large" @click="handleNextButton">Next</n-button>
    </div>
  </main>
</template>

<style>
.save-readme {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}
</style>
