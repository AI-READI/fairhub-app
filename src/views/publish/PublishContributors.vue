<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput } from "naive-ui";
import { useRoute } from "vue-router";

import router from "@/router";
import { contributor_info } from "@/stores/publish/contributors";
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

function handleNextButton() {
  currentRef.value++;
  router.push({
    name: "publish-related-sources",
    params: { versionId: routeParams.versionId },
  });
}

function onSave() {
  console.log("saved");
}
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <h1>Edit Contributors</h1>
    <div class="person-detail">
      <n-form :label-width="80" size="large">
        <n-form-item label="Name" path="Name">
          <n-input v-model:value="contributor_info.name" placeholder="Aydan" />
        </n-form-item>
        <n-form-item label="ORCID" path="ORCID">
          <n-input v-model:value="contributor_info.ORCID" type="text" placeholder="Study ORCID" />
        </n-form-item>
        <n-form-item label="Affiliation code" path="Aff">
          <n-input
            type="text"
            v-model:value="contributor_info.affiliation"
            placeholder="Affiliation code"
          />
        </n-form-item>
        <div class="next-button">
          <n-button type="primary" size="large" @click="onSave">Save</n-button>
        </div>
      </n-form>
    </div>
    <div></div>
    <div class="back-next-buttons">
      <n-button type="primary" size="large" @click="handleBackButton">Back</n-button>
      <n-button type="primary" size="large" @click="handleNextButton">Next</n-button>
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
