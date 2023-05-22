<script setup lang="ts">
import { NButton, NCard } from "naive-ui";
import { useRouter } from "vue-router";

import { currentRef } from "@/stores/publish/currentStep";
import { previousVersion, versionChecked } from "@/stores/publish/version";

const router = useRouter();

const title = "Study title";
setTimeout(() => {
  versionChecked.value = true;
  previousVersion.value = "v1";
  // if (previousVersion.value) {
  //   router.push({
  //     name: "publish-select-participants",
  //     params: { versionId: previousVersion.value },
  //   });
  // }
}, 1000);

function handleNextButton() {
  currentRef.value++;
  router.push({
    name: "publish-select-participants",
    params: { versionId: "v1" },
  });
}

function publishDataset() {
  router.push({
    name: "publish-select-participants",
    params: { versionId: "v1" },
  });
}
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <n-card>
      <div class="flex flex-col items-center pb-3" v-if="!versionChecked">
        <Vue3Lottie
          animationLink="https://assets2.lottiefiles.com/private_files/lf30_b0iey3ml.json"
          :height="150"
          :width="200"
        />
        <p>Checking for previously published versions of this dataset</p>
      </div>

      <div v-if="versionChecked && !previousVersion">
        <Vue3Lottie
          animationLink="https://assets8.lottiefiles.com/packages/lf20_tmsiddoc.json"
          :height="150"
          :width="150"
        />
        <div class="new-button">
          <p>We could not find a previously published version of this study.</p>
          <n-button type="primary" class="mt-4" @click="handleNextButton">
            Create new version
          </n-button>
        </div>
      </div>
      <div v-if="versionChecked && previousVersion">
        <div class="button-card">
          <p>What would you like to do?</p>
          <div class="version-button">
            <RouterLink :to="{ name: 'publish-select-participants', params: { versionId: 'v1' } }">
              <n-button type="primary" class="mt-4" @click="publishDataset">
                Publish a new dataset
              </n-button>
            </RouterLink>
            <n-button type="primary" class="mt-4" @click="handleNextButton">
              Publish a new version of previous dataset
            </n-button>
          </div>
        </div>
      </div>
    </n-card>
    <div>
      Project currently on progress
      <n-card :title="title" hoverable> Continue where you left </n-card>
    </div>
  </main>
</template>
<style scoped>
.button-card,
.new-button {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.version-button {
  gap: 3rem;
  display: flex;
}
</style>
