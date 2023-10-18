<script setup lang="ts">
import { useVersionStore } from "@/stores/version";

const route = useRoute();
const push = usePush();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const versionStore = useVersionStore();

const allVersions = computed(() => versionStore.allVersions);

onBeforeMount(() => {
  const datasetId = route.params.datasetId as string;

  versionStore.getAllVersions(datasetId);
});

const deleteVersion = async (_versionId: string) => {
  // await versionStore.deleteVersion(versionId);

  await versionStore.getAllVersions(routeParams.datasetId);

  push.success("Version deleted successfully");
};
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="All Versions"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      linkName="dataset:overview"
      :linkParams="{ datasetId: routeParams.datasetId, studyId: routeParams.studyId }"
    />

    <n-divider />

    <h3>Unpublished versions</h3>

    <p class="py-2">
      Any releases that have not been published will be listed here. You can continue to edit these
      versions until they are published.
    </p>

    <div class="py-4">
      <n-card
        v-for="version in allVersions"
        :key="version.id"
        :title="version.title"
        v-show="!version.published"
      >
        <template #header-extra> Last modified here </template>

        Some details about the version

        <template #action>
          <div class="flex items-center space-x-3">
            <RouterLink
              :to="{
                name: 'dataset:publish:version:participants',
                params: {
                  versionId: version.id,
                  datasetId: routeParams.datasetId,
                  studyId: routeParams.studyId,
                },
              }"
            >
              <n-button strong secondary type="info">
                <template #icon>
                  <f-icon icon="material-symbols:resume" />
                </template>
                Resume working on this version
              </n-button>
            </RouterLink>

            <n-popconfirm @positive-click="deleteVersion(version.id)">
              <template #trigger>
                <n-button strong secondary type="error">
                  <template #icon>
                    <f-icon icon="ph:trash-fill" />
                  </template>
                  Discard this version
                </n-button>
              </template>
              Are you sure you want to discard this version?
            </n-popconfirm>
          </div>
        </template>
      </n-card>
    </div>

    <n-divider />

    <h3>Published versions</h3>

    <p class="py-2">Published versions of this dataset are listed here.</p>

    <div class="py-4">
      <n-card
        v-for="version in allVersions"
        :key="version.id"
        :title="version.title"
        v-show="version.published"
      >
        <template #header-extra> published date here </template>

        Some details about the version

        <template #action>
          <n-button type="info" size="large">
            <template #icon>
              <f-icon icon="ph:eye-fill" />
            </template>

            View dataset on discover.fairhub.io
          </n-button>
        </template>
      </n-card>
    </div>
  </main>
</template>
