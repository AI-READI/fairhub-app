<script setup lang="ts">
import { config } from "md-editor-v3";

import { useAuthStore } from "@/stores/auth";
import { useVersionStore } from "@/stores/version";
import TargetBlankExtension from "@/utils/TargetBlankExtension";

config({
  editorConfig: {
    languageUserDefined: {
      "en-US": {
        footer: {
          markdownTotal: "Character Count",
          scrollAuto: "Scroll Auto",
        },
      },
    },
  },
  markdownItConfig(md) {
    md.use(TargetBlankExtension);
  },
});

const route = useRoute();
const router = useRouter();
const { error } = useMessage();

const authStore = useAuthStore();

const versionStore = useVersionStore();

const routeParams = {
  datasetId: route.params.datasetId,
  studyId: route.params.studyId,
  versionId: route.params.versionId,
};

const version = ref(versionStore.version);

const readme = ref("");

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }
});

function handleNextButton() {
  router.push({
    name: "dataset:publish:version:summary",
    params: {
      datasetId: routeParams.datasetId,
      studyId: routeParams.studyId,
      versionId: routeParams.versionId,
    },
  });
}

const autoGenerateReadme = async () => {
  console.log("autoGenerateReadme");

  const response = await fetch("https://jaspervdj.be/lorem-markdownum/markdown.txt");

  readme.value = await response.text();
};
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Summary"
      description="Review your dataset before publishing it."
      linkName="dataset:publish:version:readme"
      :linkParams="{
        datasetId: routeParams.datasetId,
        studyId: routeParams.studyId,
        versionId: routeParams.versionId,
      }"
    />

    <n-divider />

    Content here

    <n-divider />

    <div class="flex items-center justify-between">
      <n-button size="large" type="primary" @click="handleNextButton">
        <template #icon>
          <f-icon icon="ic:round-arrow-forward-ios" />
        </template>

        Publish Dataset
      </n-button>
    </div>
  </main>
</template>
