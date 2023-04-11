<script setup lang="ts">
import { NButton, NCard, NSpace, useMessage } from "naive-ui";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { formValue } from "@/stores/publish/datasetMetadata";
import { currentRef } from "@/stores/publish/step";

const router = useRouter();
const authStore = useAuthStore();
const { error } = useMessage();

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }
});

const route = useRoute();

const routeParams = {
  versionId: route.params.versionId.toString(),
};

const checkingForPreviousVersions = ref(true);

setTimeout(() => {
  checkingForPreviousVersions.value = false;
}, 3000);

function handleBackButton() {
  currentRef.value--;
  router.push({
    name: "publish-dataset-metadata",
    params: { versionId: routeParams.versionId },
  });
}

function handleNextButton() {
  currentRef.value++;
  router.push({
    name: "publish-study-metadata",
    params: { versionId: routeParams.versionId },
  });
}
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <n-card class="!mt-4">
      <n-space align="center">
        <div class="flex flex-col" :key="formValue.title">
          {{ formValue.title }}
        </div>
      </n-space>
    </n-card>

    <n-card class="!mt-4">
      <n-space align="center">
        <div class="flex flex-col" :key="formValue.description">
          {{ formValue.description }}
        </div>
      </n-space>
    </n-card>

    <n-card class="!mt-4">
      <n-space align="center" class="keywords">
        <div class="flex flex-col" :key="index" v-for="(item, index) in formValue.keywords">
          <div>{{ item }}</div>
        </div>
      </n-space>
    </n-card>

    <n-card class="!mt-4">
      <n-space align="center">
        <div class="flex flex-col" :key="formValue.primaryLanguage">
          {{ formValue.primaryLanguage }}
        </div>
      </n-space>
    </n-card>
    <div class="back-next-buttons">
      <n-button size="large">Confirm</n-button>
    </div>

    <div class="back-next-buttons">
      <n-button type="primary" size="large" @click="handleBackButton">Back</n-button>
      <n-button type="primary" size="large" @click="handleNextButton">Next</n-button>
    </div>
  </main>
</template>
<style>
.back-next-buttons {
  display: flex;
  justify-content: space-between;
}

.keywords {
  flex-direction: column !important;
  align-items: unset !important;
}
</style>
