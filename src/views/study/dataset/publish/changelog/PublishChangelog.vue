<script setup lang="ts">
import { config, MdEditor } from "md-editor-v3";

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

const routeParams = {
  datasetId: route.params.datasetId,
  studyId: route.params.studyId,
  versionId: route.params.versionId,
};

const changelog = ref("");

onBeforeMount(() => {
  changelog.value = `# Changelog`;
});

function handleNextButton() {
  /**
   * TODO: Push the participant IDs to the database.
   */

  router.push({
    name: "dataset:publish:version:readme",
    params: {
      datasetId: routeParams.datasetId,
      studyId: routeParams.studyId,
      versionId: routeParams.versionId,
    },
  });
}
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
      Changelogs are a great way to keep track of what has changed in your dataset or study over
      time. Be sure to describe the changes in detail so that other researchers can understand what
      has changed. The editor below supports Markdown syntax. You can use it to add links, images,
      and other formatting to your changelog.
    </p>

    <MdEditor
      v-model="changelog"
      language="en-US"
      preview-theme="vuepress"
      :show-code-row-number="true"
      :sanitize="sanitize"
    />

    <n-divider />

    <div class="flex items-center justify-end">
      <n-button size="large" type="primary" @click="handleNextButton">
        <template #icon>
          <f-icon icon="ic:round-arrow-forward-ios" />
        </template>

        Review readme
      </n-button>
    </div>
  </main>
</template>
