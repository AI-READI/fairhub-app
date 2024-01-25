<script setup lang="ts">
import type { VersionStudyMetadata } from "@/types/Version";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
// const baseURL = "http://localhost:5000";
const study_metadata: Ref<VersionStudyMetadata> = ref({} as VersionStudyMetadata);

const routeParams = {
  datasetId: route.params.datasetId,
  studyId: route.params.studyId,
  versionId: route.params.versionId,
};

const loading = ref(false);

onBeforeMount(async () => {
  loading.value = true;
  const response = await fetch(
    `${baseURL}/study/${routeParams.studyId}/dataset/${routeParams.datasetId}/version/${routeParams.versionId}/study-metadata`,
    {
      method: "GET",
    }
  );

  loading.value = false;

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
  <main class="metadata flex h-full w-full flex-col pr-6">
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

    <FadeTransition>
      <LottieLoader v-if="loading" class="min-h-[600px]" />

      <div class="metadata flex h-full w-full flex-col space-y-10" v-else>
        <CollapsibleCard title="Identifier" bordered>
          <n-h4>Primary Identifier</n-h4>

          <n-table :bordered="true" striped :single-line="false">
            <thead>
              <tr>
                <th>Identifier</th>

                <th>Identifier Type</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-if="
                  study_metadata.primary_identifier &&
                  study_metadata.primary_identifier.identifier &&
                  study_metadata.primary_identifier.identifier_type
                "
              >
                <td>{{ study_metadata.primary_identifier.identifier }}</td>

                <td>{{ study_metadata.primary_identifier.identifier_type }}</td>
              </tr>

              <tr v-else>
                <td colspan="2" class="text-center italic text-gray-500">No Primary Identifier</td>
              </tr>
            </tbody>
          </n-table>

          <n-h4>Secondary Identifiers</n-h4>

          <n-table :bordered="true" striped :single-line="false">
            <thead>
              <tr>
                <th>Identifier</th>

                <th>Identifier Type</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in study_metadata.secondary_identifiers" :key="item.id">
                <td>{{ item.identifier }}</td>

                <td>{{ item.identifier_type }}</td>
              </tr>

              <tr v-if="!study_metadata.secondary_identifiers.length">
                <td colspan="2" class="text-center italic text-gray-500">
                  No Secondary Identifiers
                </td>
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
          <n-table :bordered="true" striped :single-line="false">
            <thead>
              <tr>
                <th>Overall Status</th>

                <th>Start Date</th>
              </tr>
            </thead>

            <tbody>
              <tr v-if="study_metadata.status.overall_status && study_metadata.status.start_date">
                <td>{{ study_metadata.status.overall_status }}</td>

                <td>{{ study_metadata.status.start_date }}</td>
              </tr>

              <tr v-else>
                <td colspan="2" class="text-center italic text-gray-500">No Overall Status</td>
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
          <n-table :bordered="true" striped :single-line="false">
            <thead>
              <tr>
                <th>Investigator Name</th>

                <th>Type</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-if="
                  study_metadata.sponsors.responsible_party_investigator_name &&
                  study_metadata.sponsors.responsible_party_type
                "
              >
                <td>{{ study_metadata.sponsors.responsible_party_investigator_name }}</td>

                <td>{{ study_metadata.sponsors.responsible_party_type }}</td>
              </tr>

              <tr v-else>
                <td colspan="2" class="text-center italic text-gray-500">No Sponsors</td>
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
          <n-table :bordered="true" striped :single-line="false">
            <thead>
              <tr>
                <th>Full Name</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(item, index) in study_metadata.collaborators" :key="index">
                <td>
                  {{ item }}
                </td>
              </tr>

              <tr v-if="study_metadata.collaborators && !study_metadata.collaborators.length">
                <td colspan="1" class="text-center italic text-gray-500">No Collaborators</td>
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
          <div class="border p-6" v-if="study_metadata.description.brief_summary">
            {{ study_metadata.description.brief_summary }}
          </div>

          <div v-if="!study_metadata.description.brief_summary" class="italic text-gray-500">
            No Description
          </div>

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
            <n-tag type="info" v-for="item in study_metadata.conditions" :key="item"
              >{{ item }}
            </n-tag>
          </n-space>

          <div v-if="!study_metadata.conditions.length" class="italic text-gray-500">
            No Conditions
          </div>

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

        <CollapsibleCard title="Keywords" bordered>
          <n-space>
            <n-tag type="info" v-for="item in study_metadata.keywords" :key="item"
              >{{ item }}
            </n-tag>
          </n-space>

          <div v-if="!study_metadata.keywords.length" class="italic text-gray-500">No Keywords</div>

          <template #action>
            <RouterLink
              :to="{
                name: 'study:metadata:keywords',
                params: {
                  studyId: routeParams.studyId,
                },
              }"
            >
              <n-button type="info" secondary>
                <template #icon>
                  <f-icon icon="material-symbols:edit" />
                </template>
                Edit Keywords
              </n-button>
            </RouterLink>
          </template>
        </CollapsibleCard>

        <CollapsibleCard title="Design" bordered>
          <n-table
            :bordered="true"
            striped
            :single-line="false"
            v-if="
              study_metadata.design.study_type &&
              study_metadata.design.study_type === 'Observational'
            "
          >
            <tbody>
              <tr>
                <th>Type</th>

                <td>{{ study_metadata.design.study_type }}</td>
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
                  </ul>
                </td>
              </tr>

              <tr>
                <th>Time Perspective</th>

                <td>
                  <ul class="m-0 flex list-none flex-wrap p-0">
                    <n-space>
                      <li
                        :key="item"
                        v-for="item in study_metadata.design.design_time_perspective_list"
                      >
                        <n-tag type="info">{{ item }}</n-tag>
                      </li>
                    </n-space>

                    <li v-if="!study_metadata.design.design_time_perspective_list">-</li>
                  </ul>
                </td>
              </tr>

              <tr>
                <th>Retention</th>

                <td>
                  {{ study_metadata.design.bio_spec_retention }}
                </td>
              </tr>

              <tr>
                <th>Total number of participants</th>

                <td>
                  {{ study_metadata.design.enrollment_count }}
                </td>
              </tr>

              <tr>
                <th>Enrollment type</th>

                <td>
                  {{ study_metadata.design.enrollment_type }}
                </td>
              </tr>

              <tr>
                <th>Target Duration</th>

                <td>
                  {{ study_metadata.design.target_duration }}
                </td>
              </tr>

              <tr>
                <th>Number of study groups/cohorts</th>

                <td>
                  {{ study_metadata.design.number_groups_cohorts }}
                </td>
              </tr>
            </tbody>
          </n-table>

          <n-table
            v-else-if="
              study_metadata.design.study_type &&
              study_metadata.design.study_type === 'Interventional'
            "
          >
            <tr>
              <th>Type</th>

              <td>{{ study_metadata.design.study_type }}</td>
            </tr>

            <tr>
              <th>Design Allocation</th>

              <td>
                {{ study_metadata.design.design_allocation }}
              </td>
            </tr>

            <tr>
              <th>Design Intervention Model</th>

              <td>
                {{ study_metadata.design.design_intervention_model }}
              </td>
            </tr>

            <tr>
              <th>Design Primary Purpose</th>

              <td>
                {{ study_metadata.design.design_primary_purpose }}
              </td>
            </tr>

            <tr>
              <th>Design Masking</th>

              <td>
                {{ study_metadata.design.design_masking }}
              </td>
            </tr>

            <tr>
              <th>Design Who Masked List</th>

              <td>
                <ul class="m-0 flex list-none flex-wrap p-0">
                  <li :key="item" v-for="item in study_metadata.design.design_who_masked_list">
                    {{ item }}
                  </li>
                </ul>

                <ul
                  v-if="study_metadata.design.design_who_masked_list"
                  class="m-0 flex list-none flex-wrap p-0"
                >
                  <li v-if="!study_metadata.design.design_who_masked_list.length">-</li>
                </ul>
              </td>
            </tr>

            <tr>
              <th>Phase List</th>

              <td>
                <ul class="m-0 flex list-none flex-wrap p-0">
                  <li :key="item" v-for="item in study_metadata.design.phase_list">
                    <n-space>
                      <n-tag class="mr-2" type="info">{{ item }}</n-tag></n-space
                    >
                  </li>
                </ul>

                <ul
                  v-if="study_metadata.design.phase_list"
                  class="m-0 flex list-none flex-wrap p-0"
                >
                  <li v-if="!study_metadata.design.phase_list.length">-</li>
                </ul>
              </td>
            </tr>

            <tr>
              <th>Number Arms</th>

              <td>
                {{ study_metadata.design.number_arms }}
              </td>
            </tr>
          </n-table>

          <div
            class="italic text-gray-500"
            v-if="
              !study_metadata.design.study_type &&
              !study_metadata.design.enrollment_count &&
              !study_metadata.design.enrollment_type &&
              !study_metadata.design.design_allocation
            "
          >
            No Design
          </div>

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
          <n-table :bordered="true" striped :single-line="false">
            <thead>
              <tr>
                <th>Label</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in study_metadata.arms" :key="item.id">
                <td>{{ item.label }}</td>
              </tr>

              <tr v-if="!study_metadata.arms.length">
                <td colspan="2" class="text-center italic text-gray-500">No Arms</td>
              </tr>
            </tbody>
          </n-table>

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
                Edit Arms
              </n-button>
            </RouterLink>
          </template>
        </CollapsibleCard>

        <CollapsibleCard title="Interventions" bordered>
          <n-table :bordered="true" :single-line="false" striped>
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
                <td colspan="2" class="text-center italic text-gray-500">No Interventions</td>
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
          <n-table :bordered="true" :single-line="false" striped>
            <thead>
              <tr>
                <th>Gender</th>

                <th>Minimum Age</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-if="
                  study_metadata.eligibility.gender && study_metadata.eligibility.maximum_age_value
                "
              >
                <td>{{ study_metadata.eligibility.gender }}</td>

                <td>{{ study_metadata.eligibility.maximum_age_value }}</td>
              </tr>

              <tr v-else>
                <td colspan="2" class="text-center italic text-gray-500">No Eligibility</td>
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
          <n-table :bordered="true" :single-line="false" striped>
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
                <td colspan="2" class="text-center italic text-gray-500">No Contacts</td>
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
          <n-table :bordered="true" :single-line="false" striped>
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
                <td colspan="2" class="text-center italic text-gray-500">No Overall Officials</td>
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
          <n-table :bordered="true" :single-line="false" striped>
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
                <td colspan="2" class="text-center italic text-gray-500">No Location</td>
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
          <n-table :bordered="true" :single-line="false" striped>
            <thead>
              <tr>
                <th>Is there a plan to share IPD?</th>

                <th>Type</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-if="
                  study_metadata.ipd_sharing.ipd_sharing ||
                  (study_metadata.ipd_sharing.ipd_sharing_info_type_list &&
                    study_metadata.ipd_sharing.ipd_sharing_info_type_list.length)
                "
              >
                <td>{{ study_metadata.ipd_sharing.ipd_sharing }}</td>

                <td>
                  <n-space>
                    <n-tag
                      type="info"
                      :key="index"
                      v-for="(item, index) in study_metadata.ipd_sharing.ipd_sharing_info_type_list"
                      >{{ item }}
                    </n-tag>
                  </n-space>
                </td>
              </tr>

              <tr v-else>
                <td colspan="2" class="text-center italic text-gray-500">No IPD Sharing</td>
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
          <n-table :bordered="true" :single-line="false" striped>
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
                <td colspan="2" class="text-center italic text-gray-500">No Reference</td>
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
          <n-table :bordered="true" :single-line="false" striped>
            <thead>
              <tr>
                <th>Name of the Link</th>

                <th>URL</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in study_metadata.links" :key="item.id">
                <td>{{ item.title }}</td>

                <td>{{ item.url }}</td>
              </tr>

              <tr v-if="!study_metadata.links.length">
                <td colspan="2" class="text-center italic text-gray-500">No Link</td>
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
          <n-table :bordered="true" :single-line="false" striped>
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
                <td colspan="2" class="text-center italic text-gray-500">No Available IPD</td>
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
      </div>
    </FadeTransition>

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
