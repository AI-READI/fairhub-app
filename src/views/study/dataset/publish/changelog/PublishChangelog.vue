<script setup lang="ts">
import { config, MdEditor } from "md-editor-v3";

// import { baseURL } from "@/utils/constants";
const baseURL = "http://localhost:3001/api";
import LottieLoader from "@/components/loader/LottieLoader.vue";
import FadeTransition from "@/components/transitions/FadeTransition.vue";
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
const push = usePush();

const routeParams = {
  datasetId: route.params.datasetId,
  studyId: route.params.studyId,
  versionId: route.params.versionId,
};

const changelog = ref("");
const loading = ref(false);
const getSpinner = ref(false);

onBeforeMount(async () => {
  getSpinner.value = true;

  const response = await fetch(
    `${baseURL}/study/${routeParams.studyId}/dataset/${routeParams.datasetId}/version/${routeParams.versionId}/changelog`,
    {
      method: "GET",
    }
  );

  getSpinner.value = false;

  if (!response.ok) {
    throw new Error("Something went wrong.");
  }

  const data = await response.json();

  changelog.value = data.changelog;
});

const handleNextButton = async () => {
  const data = {
    changelog: changelog.value,
  };

  loading.value = true;

  const response = await fetch(
    `${baseURL}/study/${routeParams.studyId}/dataset/${routeParams.datasetId}/version/${routeParams.versionId}/changelog`,
    {
      body: JSON.stringify(data),
      method: "PUT",
    }
  );

  loading.value = false;

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Something went wrong.");
  }

  push.success("Changelog updated successfully.");

  router.push({
    name: "dataset:publish:version:readme",
    params: {
      datasetId: routeParams.datasetId,
      studyId: routeParams.studyId,
      versionId: routeParams.versionId,
    },
  });
};
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Changelog"
      description="What is new in this version?"
      linkName="dataset:publish:version:dataset-metadata"
      :linkParams="{
        datasetId: routeParams.datasetId,
        studyId: routeParams.studyId,
        versionId: routeParams.versionId,
      }"
    />

    <n-divider />

    <p class="mb-10">
      Changelogs are a great way to keep track of what has changed in your dataset. Be sure to
      describe the changes in detail so that other researchers can understand what has changed.
      <br />
      The editor below supports Markdown syntax. You can use it to add links, images, and other
      formatting to your changelog.
    </p>

    <FadeTransition>
      <LottieLoader v-if="getSpinner" />

      <MdEditor
        v-else
        v-model="changelog"
        language="en-US"
        preview-theme="vuepress"
        :show-code-row-number="true"
        :sanitize="sanitize"
      />
    </FadeTransition>

    <n-divider />

    <div class="flex items-center justify-end">
      <n-button size="large" type="primary" @click="handleNextButton" :loading="loading">
        <template #icon>
          <f-icon icon="ic:round-arrow-forward-ios" />
        </template>

        Review readme
      </n-button>
    </div>
  </main>
</template>
