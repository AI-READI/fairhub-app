<script setup lang="ts">
import { config, MdEditor } from "md-editor-v3";

import { useAuthStore } from "@/stores/auth";
import { useVersionStore } from "@/stores/version";
import { sanitize } from "@/utils/helpers";
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
      title="Readme"
      description="Details that will be shown to users when they request access to this dataset."
      linkName="dataset:publish:version:changelog"
      :linkParams="{
        datasetId: routeParams.datasetId,
        studyId: routeParams.studyId,
        versionId: routeParams.versionId,
      }"
    />

    <n-divider />

    <p class="mb-10">
      A `README.md` file is a text file that introduces and explains a dataset. It contains
      information that is commonly required to understand what the dataset is about and how to use
      it. It is automatically displayed to users when they request access to this dataset.
    </p>

    <MdEditor
      v-model="readme"
      language="en-US"
      preview-theme="github"
      :show-code-row-number="true"
      :sanitize="sanitize"
    />

    <n-divider />

    <div class="flex items-center justify-between">
      <n-button size="large" secondary type="info" @click="autoGenerateReadme">
        <template #icon>
          <f-icon icon="mdi:auto-mode" />
        </template>

        Auto-generate README
      </n-button>

      <n-button size="large" type="primary" @click="handleNextButton">
        <template #icon>
          <f-icon icon="ic:round-arrow-forward-ios" />
        </template>

        View summary
      </n-button>
    </div>
  </main>
</template>
