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
    name: "dataset:publish:version:participants",
    params: {
      datasetId: routeParams.datasetId,
      studyId: routeParams.studyId,
      versionId: routeParams.versionId,
    },
  });
}

function handleNextButton() {
  router.push({
    name: "dataset:publish:version:dataset-metadata",
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
      title="Study Metadata"
      description="Details about your study are displayed here"
      linkName="dataset:publish:version:participants"
      :linkParams="{
        datasetId: routeParams.datasetId,
        studyId: routeParams.studyId,
        versionId: routeParams.versionId,
      }"
    />

    <n-divider />

    <h3>Study Metadata</h3>

    <p class="py-1">
      Details about your study are displayed here. Go to the appropriate page to edit the details.
    </p>

    <n-divider />

    <CollapsibleCard title="Identification">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'study:metadata:identification',
            params: {
              studyId: routeParams.studyId,
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

    <CollapsibleCard title="Status">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'study:metadata:status',
            params: {
              studyId: routeParams.studyId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Status
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Sponsors">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'study:metadata:sponsors',
            params: {
              studyId: routeParams.studyId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Sponsors
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Collaborators">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'study:metadata:collaborators',
            params: {
              studyId: routeParams.studyId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Collaborators
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Oversight">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'study:metadata:oversight',
            params: {
              studyId: routeParams.studyId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Oversight Details
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Description">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'study:metadata:description',
            params: {
              studyId: routeParams.studyId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Description
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Conditions">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'study:metadata:conditions',
            params: {
              studyId: routeParams.studyId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Conditions
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Design">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'study:metadata:design',
            params: {
              studyId: routeParams.studyId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Design
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Interventions">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'study:metadata:interventions',
            params: {
              studyId: routeParams.studyId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Interventions
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Eligibility">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'study:metadata:eligibility',
            params: {
              studyId: routeParams.studyId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Eligibility
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="Contacts">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'study:metadata:contacts',
            params: {
              studyId: routeParams.studyId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit Contacts
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="IPD Sharing">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'study:metadata:ipd-sharing',
            params: {
              studyId: routeParams.studyId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit IPD Sharing
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <CollapsibleCard title="References">
      some content

      <template #action>
        <RouterLink
          :to="{
            name: 'study:metadata:references',
            params: {
              studyId: routeParams.studyId,
            },
          }"
        >
          <n-button type="info" secondary>
            <template #icon>
              <f-icon icon="material-symbols:edit" />
            </template>
            Edit References
          </n-button>
        </RouterLink>
      </template>
    </CollapsibleCard>

    <n-divider />

    <div class="flex items-center justify-end">
      <n-button size="large" type="warning" @click="handleBackButton" class="hidden">
        <template #icon>
          <f-icon icon="ic:round-arrow-back-ios" />
        </template>

        Select participants
      </n-button>

      <n-button size="large" type="primary" @click="handleNextButton">
        <template #icon>
          <f-icon icon="ic:round-arrow-forward-ios" />
        </template>

        Review dataset metadata
      </n-button>
    </div>
  </main>
</template>
