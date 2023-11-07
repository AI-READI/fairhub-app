<script setup lang="ts">
// import { NDescriptions, NDescriptionsItem } from "naive-ui";
import type { VersionStudyMetadata } from "@/types/Version";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
// const baseURL = "http://localhost:5000";
const study_metadata: Ref<VersionStudyMetadata | null> = ref(null);

const routeParams = {
  datasetId: route.params.datasetId,
  studyId: route.params.studyId,
  versionId: route.params.versionId,
};

onBeforeMount(async () => {
  const response = await fetch(
    `${baseURL}/study/${routeParams.studyId}/dataset/${routeParams.datasetId}/version/${routeParams.versionId}/study-metadata`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong.");
  }

  const data = await response.json();

  study_metadata.value = data;
});

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
  <main class="flex h-full w-full flex-col pr-6" v-if="study_metadata">
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

    <CollapsibleCard title="Identifier" bordered>
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Identifier(s)">-->
      <!--          <ul class="m-0 list-none p-0">-->
      <!--            <li :key="item.identifier" v-for="item in study_metadata.identification">-->
      <!--              {{ item.identifier }}-->
      <!--            </li>-->
      <!--          </ul>-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Identifier Type">-->
      <!--          <ul class="m-0 list-none p-0">-->
      <!--            <li :key="item.identifier_type" v-for="item in study_metadata.identification">-->
      <!--              {{ item.identifier_type }}-->
      <!--            </li>-->
      <!--          </ul>-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <n-h4>Primary Identifier</n-h4>
      <n-table :bordered="false" striped :single-line="false">
        <thead>
          <tr>
            <th>Identifier(s)</th>
            <th>Identifier Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="study_metadata.primary_identifier">
            <td>{{ study_metadata.primary_identifier.identifier }}</td>
            <td>{{ study_metadata.primary_identifier.identifier_type }}</td>
          </tr>
        </tbody>
      </n-table>
      <n-h4>Secondary Identifiers</n-h4>
      <n-table :bordered="false" :single-line="false" striped>
        <thead>
          <tr>
            <th>Identifier(s)</th>
            <th>Identifier Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in study_metadata.secondary_identifiers" :key="item.id">
            <td>{{ item.identifier }}</td>
            <td>{{ item.identifier_type }}</td>
          </tr>
        </tbody>
      </n-table>

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

    <CollapsibleCard title="Status" bordered>
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Overall Status">-->
      <!--          {{ study_metadata.status.overall_status || "" }}-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Start Date">-->
      <!--          {{ study_metadata.status.start_date || "" }}-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <n-table :bordered="false" :single-line="false" striped>
        <thead>
          <tr>
            <th>Overall Status</th>
            <th>Start Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ study_metadata.status.overall_status }}</td>
            <td>{{ study_metadata.status.start_date }}</td>
          </tr>
        </tbody>
      </n-table>

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

    <CollapsibleCard title="Sponsors" bordered>
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Type">-->
      <!--          {{ study_metadata.sponsors.responsible_party_type || "" }}-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Investigator Name">-->
      <!--          {{ study_metadata.sponsors.responsible_party_investigator_name || "" }}-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <n-table :bordered="false" :single-line="false" striped>
        <thead>
          <tr>
            <th>Investigator Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ study_metadata.sponsors.responsible_party_investigator_name }}</td>
            <td>{{ study_metadata.sponsors.responsible_party_type }}</td>
          </tr>
        </tbody>
      </n-table>
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

    <CollapsibleCard title="Collaborators" bordered>
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Full Name">-->
      <!--          {{ study_metadata.sponsors.lead_sponsor_name || "" }}-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <n-table :bordered="false" :single-line="false" striped>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ study_metadata.sponsors.responsible_party_investigator_name }}</td>
            <td>{{ study_metadata.sponsors.responsible_party_type }}</td>
          </tr>
        </tbody>
      </n-table>
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

    <CollapsibleCard title="Oversight" bordered>
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Does this study have a DMC?">-->
      <!--          {{ study_metadata.oversight }}-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <!--      -->
      <p>{{ study_metadata.oversight ? "Yes" : "No" }}</p>
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

    <CollapsibleCard title="Description" bordered>
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Brief Summary">-->
      <!--          {{ study_metadata.description.brief_summary || "" }}-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <p>{{ study_metadata.description.brief_summary }}</p>

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

    <CollapsibleCard title="Conditions" bordered>
      <n-space>
        <n-tag type="info" v-for="item in study_metadata.conditions" :key="item">{{ item }} </n-tag>
      </n-space>
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

    <CollapsibleCard title="Design" bordered>
      <n-table :bordered="true">
        <tr>
          <th>Type</th>
          <td>{{ study_metadata.design.study_type || "-" }}</td>
        </tr>
        <tr>
          <th>Observational Models</th>
          <td>
            <ul class="m-0 flex list-none flex-wrap p-0">
              <n-space>
                <li
                  :key="item"
                  v-for="item in study_metadata.design.design_observational_model_list"
                >
                  <n-tag type="info">{{ item }}</n-tag>
                </li></n-space
              >
              <li v-if="!study_metadata.design.design_observational_model_list">-</li>
            </ul>
          </td>
        </tr>
        <tr>
          <th>Time Perspective</th>
          <td>
            <ul class="m-0 flex list-none flex-wrap p-0">
              <li :key="item" v-for="item in study_metadata.design.design_time_perspective_list">
                <n-space>
                  <n-tag type="info">{{ item }}</n-tag></n-space
                >
              </li>
              <li v-if="!study_metadata.design.design_time_perspective_list">-</li>
            </ul>
          </td>
        </tr>
        <tr>
          <th>Retention</th>
          <td>{{ study_metadata.design.bio_spec_retention || "-" }}</td>
        </tr>
        <tr>
          <th>Total number of participants</th>
          <td>{{ study_metadata.design.enrollment_count || "-" }}</td>
        </tr>
        <tr>
          <th>Enrollment type</th>
          <td>{{ study_metadata.design.enrollment_type || "-" }}</td>
        </tr>
        <tr>
          <th>Target Duration</th>
          <td>{{ study_metadata.design.target_duration || "-" }}</td>
        </tr>
        <tr>
          <th>Number of study groups/cohorts</th>
          <td>{{ study_metadata.design.target_duration || "-" }}</td>
        </tr>
      </n-table>

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

    <CollapsibleCard title="Arms" bordered>
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Arm label">-->
      <!--          <ul class="m-0 list-none p-0">-->
      <!--            <li :key="item.label" v-for="item in study_metadata.arms">-->
      <!--              {{ item.label }}-->
      <!--            </li>-->
      <!--          </ul>-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <n-table :bordered="true">
        <tr>
          <th>Label</th>
          <tbody>
            <tr v-for="item in study_metadata.arms" :key="item.id">
              <td>{{ item.label }}</td>
            </tr>
            <tr v-if="!study_metadata.arms.length">
              <td>-</td>
            </tr>
          </tbody>
        </tr>
      </n-table>
      <!--     <div v-for="item in study_metadata.arms" :key="item.id">{{ item.label }}</div>-->
      <template #action>
        <RouterLink
          :to="{
            name: 'study:metadata:arms',
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
    <CollapsibleCard title="Interventions" bordered>
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Type">-->
      <!--          <ul class="m-0 list-none p-0">-->
      <!--            <li :key="item.type" v-for="item in study_metadata.interventions">-->
      <!--              {{ item.type }}-->
      <!--            </li>-->
      <!--          </ul>-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <n-table :bordered="false" :single-line="false" striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in study_metadata.interventions" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.type }}</td>
          </tr>
          <tr v-if="!study_metadata.interventions.length">
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </n-table>

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

    <CollapsibleCard title="Eligibility" bordered>
      <n-table :bordered="false" :single-line="false" striped>
        <thead>
          <tr>
            <th>Gender</th>
            <th>Minimum Age</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ study_metadata.eligibility.gender || "-" }}</td>
            <td>{{ study_metadata.eligibility.maximum_age_value || "-" }}</td>
          </tr>
        </tbody>
      </n-table>
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

    <CollapsibleCard title="Contacts" bordered>
      <n-table :bordered="false" :single-line="false" striped>
        <thead>
          <tr>
            <th>Affiliation</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in study_metadata.contacts" :key="item.id">
            <td>{{ item.affiliation }}</td>
            <td>{{ item.name }}</td>
          </tr>
          <tr v-if="!study_metadata.contacts.length">
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </n-table>
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

    <CollapsibleCard title="Overal Officials" bordered>
      <n-table :bordered="false" :single-line="false" striped>
        <thead>
          <tr>
            <th>Affiliation</th>
            <th>Overall Official Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in study_metadata.overall_officials" :key="item.id">
            <td>{{ item.affiliation }}</td>
            <td>{{ item.name }}</td>
          </tr>
          <tr v-if="!study_metadata.overall_officials.length">
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </n-table>
      <template #action>
        <RouterLink
          :to="{
            name: 'study:metadata:officials',
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

    <CollapsibleCard title="Locations" bordered>
      <n-table :bordered="false" :single-line="false" striped>
        <thead>
          <tr>
            <th>Facility</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in study_metadata.locations" :key="item.id">
            <td>{{ item.facility }}</td>
            <td>{{ item.country }}</td>
          </tr>
          <tr v-if="!study_metadata.locations.length">
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </n-table>
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

    <CollapsibleCard title="IPD Sharing" bordered>
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Is there a plan to share IPD?">-->
      <!--          {{ study_metadata.ipd_sharing.ipd_sharing || "" }}-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <!--      -->
      <n-table :bordered="false" :single-line="false" striped>
        <thead>
          <tr>
            <th>Is there a plan to share IPD?</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ study_metadata.ipd_sharing.ipd_sharing || "-" }}</td>
            <td v-if="study_metadata.ipd_sharing.ipd_sharing_info_type_list.length">
              <n-tag
                type="info"
                class="mr-1"
                :key="item"
                v-for="item in study_metadata.ipd_sharing.ipd_sharing_info_type_list"
                >{{ item }}</n-tag
              >
            </td>
            <td v-if="!study_metadata.ipd_sharing.ipd_sharing_info_type_list.length">-</td>
          </tr>
        </tbody>
      </n-table>
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

    <CollapsibleCard title="References" bordered>
      <n-table :bordered="false" :single-line="false" striped>
        <thead>
          <tr>
            <th>Citation</th>
            <th>Identifier</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in study_metadata.references" :key="item.id">
            <td>{{ item.citation }}</td>
            <td>{{ item.identifier }}</td>
          </tr>
          <tr v-if="!study_metadata.references.length">
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </n-table>
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

    <CollapsibleCard title="Links" bordered>
      <n-table :bordered="false" :single-line="false" striped>
        <thead>
          <tr>
            <th>Url</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in study_metadata.links" :key="item.id">
            <td>{{ item.url }}</td>
            <td>{{ item.title }}</td>
          </tr>
          <tr v-if="!study_metadata.links.length">
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </n-table>
      <template #action>
        <RouterLink
          :to="{
            name: 'study:metadata:links',
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

    <CollapsibleCard title="Available IPD" bordered>
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Name of the URL">-->
      <!--          <ul class="m-0 list-none p-0">-->
      <!--            <li :key="item.url" v-for="item in study_metadata.available_ipd">-->
      <!--              {{ item.url }}-->
      <!--            </li>-->
      <!--          </ul>-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Identifier">-->
      <!--          <ul class="m-0 list-none p-0">-->
      <!--            <li :key="item.identifier" v-for="item in study_metadata.available_ipd">-->
      <!--              {{ item.identifier }}-->
      <!--            </li>-->
      <!--          </ul>-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <n-table :bordered="false" :single-line="false" striped>
        <thead>
          <tr>
            <th>Url</th>
            <th>Identifier</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in study_metadata.available_ipd" :key="item.url">
            <td>{{ item.url }}</td>
            <td>{{ item.identifier }}</td>
          </tr>
          <tr v-if="!study_metadata.available_ipd.length">
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </n-table>
      <template #action>
        <RouterLink
          :to="{
            name: 'study:metadata:available-ipd',
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
      <n-button size="large" type="primary" @click="handleNextButton">
        <template #icon>
          <f-icon icon="ic:round-arrow-forward-ios" />
        </template>

        Review dataset metadata
      </n-button>
    </div>
  </main>
</template>
