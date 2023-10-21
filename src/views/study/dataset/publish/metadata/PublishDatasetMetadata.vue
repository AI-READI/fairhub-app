<script setup lang="ts">
import CollapsibleCard from "@/components/cards/CollapsibleCard.vue";

const route = useRoute();
const router = useRouter();

const routeParams = {
  datasetId: route.params.datasetId,
  studyId: route.params.studyId,
  versionId: route.params.versionId,
};

onBeforeMount(() => {
  /**
   * TODO: Fetch dataset minimised metadata
   */
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
      linkName="dataset:publish:version:study-metadata"
      :linkParams="{
        datasetId: routeParams.datasetId,
        studyId: routeParams.studyId,
        versionId: routeParams.versionId,
      }"
    />

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

    <div class="flex items-center justify-end">
      <n-button size="large" type="primary" @click="handleNextButton">
        <template #icon>
          <f-icon icon="ic:round-arrow-forward-ios" />
        </template>

        Add a changelog
      </n-button>
    </div>
  </main>
</template>
