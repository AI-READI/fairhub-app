<script setup lang="ts">
import { config, MdEditor } from "md-editor-v3";

import { sanitize } from "@/utils/helpers";
import TargetBlankExtension from "@/utils/TargetBlankExtension";

// import { baseURL } from "@/utils/constants";
const baseURL = "http://localhost:3001/api";

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
const push = usePush();

const routeParams = {
  datasetId: route.params.datasetId,
  studyId: route.params.studyId,
  versionId: route.params.versionId,
};

const readme = ref("");
const saveLoading = ref(false);
const autogenerateLoading = ref(false);

onBeforeMount(async () => {
  const response = await fetch(
    `${baseURL}/study/${routeParams.studyId}/dataset/${routeParams.datasetId}/version/${routeParams.versionId}/readme`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong.");
  }

  const data = await response.json();

  readme.value = data.readme;
});

const handleNextButton = async () => {
  const data = {
    readme: readme.value,
  };

  saveLoading.value = true;

  const response = await fetch(
    `${baseURL}/study/${routeParams.studyId}/dataset/${routeParams.datasetId}/version/${routeParams.versionId}/readme`,
    {
      body: JSON.stringify(data),
      method: "PUT",
    }
  );

  saveLoading.value = false;

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Something went wrong.");
  }

  push.success("Readme updated successfully.");

  router.push({
    name: "dataset:publish:version:summary",
    params: {
      datasetId: routeParams.datasetId,
      studyId: routeParams.studyId,
      versionId: routeParams.versionId,
    },
  });
};

const autoGenerateReadme = async () => {
  autogenerateLoading.value = true;

  const response = await fetch(
    `${baseURL}/study/${routeParams.studyId}/dataset/${routeParams.datasetId}/version/${routeParams.versionId}/autogenerate-readme`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Something went wrong.");
  }

  const data = await response.json();

  readme.value = data.readme;

  // const response = await fetch("https://jaspervdj.be/lorem-markdownum/markdown.txt");

  // readme.value = await response.text();

  autogenerateLoading.value = false;
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

    <div class="mb-3 flex items-start space-x-10">
      <p>
        A `README.md` file is a text file that introduces and explains a dataset. It contains
        information that is commonly required to understand what the dataset is about and how to use
        it. It is automatically displayed to users when they request access to this dataset.
      </p>

      <n-button secondary type="info" @click="autoGenerateReadme" :loading="autogenerateLoading">
        <template #icon>
          <f-icon icon="mdi:auto-mode" />
        </template>

        Auto-generate README
      </n-button>
    </div>

    <MdEditor
      v-model="readme"
      language="en-US"
      preview-theme="github"
      :show-code-row-number="true"
      :sanitize="sanitize"
    />

    <n-divider />

    <div class="flex items-center justify-between">
      <n-button
        size="large"
        secondary
        type="info"
        @click="autoGenerateReadme"
        :loading="autogenerateLoading"
      >
        <template #icon>
          <f-icon icon="mdi:auto-mode" />
        </template>

        Auto-generate README
      </n-button>

      <n-button size="large" type="primary" @click="handleNextButton" :loading="saveLoading">
        <template #icon>
          <f-icon icon="ic:round-arrow-forward-ios" />
        </template>

        View summary
      </n-button>
    </div>
  </main>
</template>
