<script setup lang="ts">
import type { Ref } from "vue";

import CollapsibleCard from "@/components/cards/CollapsibleCard.vue";
import { useAuthStore } from "@/stores/auth";
import { useStudyStore } from "@/stores/study";
import type { Study } from "@/types/Study";

const route = useRoute();
const router = useRouter();
const { error } = useMessage();

const authStore = useAuthStore();
const studyStore = useStudyStore();

const routeParams = {
  datasetId: route.params.datasetId,
  studyId: route.params.studyId,
  versionId: route.params.versionId,
};

const study: Ref<Study> = computed(() => studyStore.study);

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }

  const studyId = routeParams.studyId as string;

  studyStore.getStudy(studyId);
});

function handleBackButton() {
  router.push({
    name: "dataset:publish:version:study-metadata",
    params: {
      datasetId: routeParams.datasetId,
      studyId: routeParams.studyId,
      versionId: routeParams.versionId,
    },
  });
}

function handleNextButton() {
  router.push({
    name: "dataset:publish:version:changelog",
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
      title="Dataset Metadata"
      description="Details about your dataset are displayed here"
      linkName="dataset:publish:versions"
      :linkParams="{ datasetId: routeParams.datasetId, studyId: routeParams.studyId }"
    />

    <n-divider />

    <h3>Dataset Metadata</h3>

    <p class="py-1">
      Details about your dataset are displayed here. Go to the appropriate page to edit the details.
    </p>

    <n-divider />

    <CollapsibleCard title="Identifiers">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'dataset:metadata:identifiers',
            params: {
              studyId: routeParams.studyId,
              datasetId: routeParams.datasetId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Identifiers
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Titles">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'dataset:metadata:identifiers',
            params: {
              studyId: routeParams.studyId,
              datasetId: routeParams.datasetId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Titles
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Descriptions">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'dataset:metadata:identifiers',
            params: {
              studyId: routeParams.studyId,
              datasetId: routeParams.datasetId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Descriptions
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Contributors">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'dataset:metadata:identifiers',
            params: {
              studyId: routeParams.studyId,
              datasetId: routeParams.datasetId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Contributors
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Dates">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'dataset:metadata:identifiers',
            params: {
              studyId: routeParams.studyId,
              datasetId: routeParams.datasetId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Dates
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Publisher">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'dataset:metadata:identifiers',
            params: {
              studyId: routeParams.studyId,
              datasetId: routeParams.datasetId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Publisher Details
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Record Keys">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'dataset:metadata:identifiers',
            params: {
              studyId: routeParams.studyId,
              datasetId: routeParams.datasetId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Record Keys
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="De-identification">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'dataset:metadata:identifiers',
            params: {
              studyId: routeParams.studyId,
              datasetId: routeParams.datasetId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit De-identification Details
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Consent">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'dataset:metadata:identifiers',
            params: {
              studyId: routeParams.studyId,
              datasetId: routeParams.datasetId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Consent Details
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Subjects">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'dataset:metadata:identifiers',
            params: {
              studyId: routeParams.studyId,
              datasetId: routeParams.datasetId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Subjects
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Access">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'dataset:metadata:identifiers',
            params: {
              studyId: routeParams.studyId,
              datasetId: routeParams.datasetId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Access Details
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Rights">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'dataset:metadata:identifiers',
            params: {
              studyId: routeParams.studyId,
              datasetId: routeParams.datasetId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Rights Details
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Funders">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'dataset:metadata:identifiers',
            params: {
              studyId: routeParams.studyId,
              datasetId: routeParams.datasetId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Funders
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Related Items">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'dataset:metadata:identifiers',
            params: {
              studyId: routeParams.studyId,
              datasetId: routeParams.datasetId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Related Items
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Additional Details">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'dataset:metadata:identifiers',
            params: {
              studyId: routeParams.studyId,
              datasetId: routeParams.datasetId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Additional Details
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <n-divider />

    <div class="flex items-center justify-between">
      <n-button size="large" type="warning" @click="handleBackButton">
        <template #icon>
          <f-icon icon="ic:round-arrow-back-ios" />
        </template>

        Review study metadata
      </n-button>

      <n-button size="large" type="primary" @click="handleNextButton">
        <template #icon>
          <f-icon icon="ic:round-arrow-forward-ios" />
        </template>

        Add a changelog
      </n-button>
    </div>
  </main>
</template>
