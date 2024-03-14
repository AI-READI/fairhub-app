<script setup lang="ts">
import type { VersionDatasetMetadata } from "@/types/Version";
import { baseURL } from "@/utils/constants";

// const baseURL = "http://localhost:5000";

const route = useRoute();
const router = useRouter();
const dataset_metadata: Ref<VersionDatasetMetadata> = ref({} as VersionDatasetMetadata);

const routeParams = {
  datasetId: route.params.datasetId,
  studyId: route.params.studyId,
  versionId: route.params.versionId,
};

const loading = ref(false);

onBeforeMount(async () => {
  loading.value = true;

  const response = await fetch(
    `${baseURL}/study/${routeParams.studyId}/dataset/${routeParams.datasetId}/version/${routeParams.versionId}/dataset-metadata`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Something went wrong.");
  }
  loading.value = false;

  dataset_metadata.value = await response.json();
});

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

// const formatDate = (timestamp: string) => {
//   if (timestamp) {
//     return new Date(timestamp).toLocaleString();
//   }
//   return "";
// };
</script>

<template>
  <main class="metadata flex h-full w-full flex-col pr-6">
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

    <FadeTransition>
      <LottieLoader v-if="loading" class="min-h-[600px]" />

      <div class="metadata flex h-full w-full flex-col space-y-10" v-else>
        <CollapsibleCard title="Identifiers" bordered>
          <n-table :bordered="true" striped :single-line="false">
            <thead>
              <tr>
                <th>Identifier</th>

                <th>Type</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in dataset_metadata.identifiers" :key="item.id">
                <td>{{ item.identifier || "-" }}</td>

                <td>{{ item.type || "-" }}</td>
              </tr>

              <tr v-if="!dataset_metadata.identifiers.length">
                <td colspan="2" class="text-center italic text-gray-500">No Identifier</td>
              </tr>
            </tbody>
          </n-table>

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

        <CollapsibleCard title="Titles" bordered>
          <n-table :bordered="true" :single-line="false" striped>
            <thead>
              <tr>
                <th>Type</th>

                <th>Title</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in dataset_metadata.titles" :key="item.id">
                <td>{{ item.type.replace(/([a-z])([A-Z])/g, "$1 $2") }}</td>

                <td>{{ item.title }}</td>
              </tr>

              <tr v-if="!dataset_metadata.titles.length">
                <td colspan="2" class="text-center italic text-gray-500">No Titles</td>
              </tr>
            </tbody>
          </n-table>

          <template #action>
            <RouterLink
              :to="{
                name: 'dataset:metadata:title',
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

        <CollapsibleCard title="Descriptions" bordered>
          <n-table :bordered="true" :single-line="false" striped>
            <thead>
              <tr>
                <th>Type</th>

                <th>Description</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in dataset_metadata.descriptions" :key="item.id">
                <td v-if="item.type">{{ item.type.replace(/([a-z])([A-Z])/g, "$1 $2") }}</td>

                <td>{{ item.description }}</td>
              </tr>

              <tr v-if="!dataset_metadata.descriptions.length">
                <td colspan="2" class="text-center italic text-gray-500">No Description</td>
              </tr>
            </tbody>
          </n-table>

          <template #action>
            <RouterLink
              :to="{
                name: 'dataset:metadata:descriptions',
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

        <CollapsibleCard title="Creators" bordered>
          <n-table :bordered="true" :single-line="false" striped>
            <thead>
              <tr>
                <th>Name</th>

                <th>Name Type</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in dataset_metadata.creators" :key="item.id">
                <td>
                  {{
                    item.name_type === "Organizational"
                      ? item.first_name
                      : item.first_name + ", " + item.last_name
                  }}
                </td>

                <td>{{ item.name_type }}</td>
              </tr>

              <tr v-if="!dataset_metadata.creators.length">
                <td colspan="2" class="text-center italic text-gray-500">No Creators</td>
              </tr>
            </tbody>
          </n-table>

          <template #action>
            <RouterLink
              :to="{
                name: 'dataset:metadata:creators',
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
                Edit Creators
              </n-button>
            </RouterLink>
          </template>
        </CollapsibleCard>

        <CollapsibleCard title="Contributors" bordered>
          <n-table :bordered="true" :single-line="false" striped>
            <thead>
              <tr>
                <th>Name</th>

                <th>Name Type</th>

                <th>Contributor Type</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in dataset_metadata.contributors" :key="item.id">
                <td>
                  {{
                    item.name_type === "Organizational"
                      ? item.first_name
                      : item.first_name + ", " + item.last_name
                  }}
                </td>

                <td>{{ item.name_type || "" }}</td>

                <td>{{ item.contributor_type || "" }}</td>
              </tr>

              <tr v-if="!dataset_metadata.contributors.length">
                <td colspan="3" class="text-center italic text-gray-500">No Contributors</td>
              </tr>
            </tbody>
          </n-table>

          <template #action>
            <RouterLink
              :to="{
                name: 'dataset:metadata:contributors',
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

        <CollapsibleCard title="Dates" bordered>
          <n-table :bordered="true" striped :single-line="false">
            <thead>
              <tr>
                <th>Dates</th>

                <th>Type</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in dataset_metadata.dates" :key="item.id">
                <td>{{ item.date }}</td>

                <td v-if="item.type">{{ item.type.replace(/([a-z])([A-Z])/g, "$1 $2") }}</td>
              </tr>

              <tr v-if="!dataset_metadata.dates.length">
                <td colspan="2" class="text-center italic text-gray-500">No Dates</td>
              </tr>
            </tbody>
          </n-table>

          <template #action>
            <RouterLink
              :to="{
                name: 'dataset:metadata:dates',
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

        <CollapsibleCard title="Managing Organization" bordered>
          <div v-if="dataset_metadata.managing_organization.managing_organization_name">
            <dl>
              <div class="flex flex-row flex-wrap">
                <dt
                  class="shrink-0 grow basis-0 border border-gray-100 bg-gray-50 p-2.5 font-medium"
                >
                  Name
                </dt>

                <dd class="grow basis-0 border border-gray-100 p-2.5">
                  {{ dataset_metadata.managing_organization.managing_organization_name }}
                </dd>
              </div>
            </dl>
          </div>

          <div class="italic text-gray-500" v-else>No Managing Organization</div>

          <template #action>
            <RouterLink
              :to="{
                name: 'dataset:metadata:managing-organization',
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
                Edit Managing Organization
              </n-button>
            </RouterLink>
          </template>
        </CollapsibleCard>

        <CollapsibleCard title="De-identification" bordered>
          <dl>
            <div class="flex flex-row flex-wrap">
              <dt class="shrink-0 grow basis-0 border border-gray-100 bg-gray-50 p-2.5 font-medium">
                Were direct identifiers removed?
              </dt>

              <dd class="grow basis-0 border border-gray-100 p-2.5">
                {{
                  dataset_metadata.de_identification.direct === true
                    ? "Yes"
                    : dataset_metadata.de_identification.direct === false
                    ? "No"
                    : "-"
                }}
              </dd>
            </div>

            <div class="flex flex-row flex-wrap">
              <dt class="shrink-0 grow basis-0 border border-gray-100 bg-gray-50 p-2.5 font-medium">
                Type
              </dt>

              <dd class="grow basis-0 border border-gray-100 p-2.5">
                {{ dataset_metadata.de_identification.type || "" }}
              </dd>
            </div>
          </dl>

          <template #action>
            <RouterLink
              :to="{
                name: 'dataset:metadata:de-identification',
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

        <CollapsibleCard title="Consent" bordered>
          <dl>
            <div class="flex flex-row flex-wrap">
              <dt class="shrink-0 grow basis-0 border border-gray-100 bg-gray-50 p-2.5 font-medium">
                Non-commercial
              </dt>

              <dd class="grow basis-0 border border-gray-100 p-2.5">
                {{ dataset_metadata.consent.noncommercial === true ? "Yes" : "No" }}
              </dd>
            </div>

            <div class="flex flex-row flex-wrap">
              <dt class="shrink-0 grow basis-0 border border-gray-100 bg-gray-50 p-2.5 font-medium">
                Research type
              </dt>

              <dd class="grow basis-0 border border-gray-100 p-2.5">
                {{ dataset_metadata.consent.research_type === true ? "Yes" : "No" }}
              </dd>
            </div>
          </dl>

          <template #action>
            <RouterLink
              :to="{
                name: 'dataset:metadata:consent',
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

        <CollapsibleCard title="Subjects" bordered>
          <n-table
            :bordered="true"
            striped
            :single-line="false"
            v-if="dataset_metadata.subjects && dataset_metadata.subjects.length"
          >
            <tbody>
              <tr :key="item.id" v-for="item in dataset_metadata.subjects">
                <td>{{ item.subject }}</td>
              </tr>
            </tbody>
          </n-table>

          <div v-if="!dataset_metadata.subjects.length" class="italic text-gray-500">
            No Subjects
          </div>

          <template #action>
            <RouterLink
              :to="{
                name: 'dataset:metadata:subjects',
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

        <CollapsibleCard title="Access" bordered>
          <n-space>
            <n-tag type="info" v-if="dataset_metadata.access.description">
              {{ dataset_metadata.access.description }}
            </n-tag>
          </n-space>

          <div v-if="!dataset_metadata.access.description" class="italic text-gray-500">
            No Access
          </div>

          <template #action>
            <RouterLink
              :to="{
                name: 'dataset:metadata:access',
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

        <CollapsibleCard title="Rights" bordered>
          <n-table :bordered="true" striped :single-line="false">
            <thead>
              <tr>
                <th>Rights</th>

                <th>Identifier</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in dataset_metadata.rights" :key="item.id">
                <td>{{ item.rights }}</td>

                <td>{{ item.identifier }}</td>
              </tr>

              <tr v-if="!dataset_metadata.rights.length">
                <td colspan="2" class="text-center italic text-gray-500">No rights</td>
              </tr>
            </tbody>
          </n-table>

          <template #action>
            <RouterLink
              :to="{
                name: 'dataset:metadata:rights',
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

        <CollapsibleCard title="Funders" bordered>
          <n-table :bordered="true" striped :single-line="false">
            <thead>
              <tr>
                <th>Name</th>

                <th>Identifier</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in dataset_metadata.funders" :key="item.id">
                <td>{{ item.name }}</td>

                <td>{{ item.identifier }}</td>
              </tr>

              <tr v-if="!dataset_metadata.funders.length">
                <td colspan="2" class="text-center italic text-gray-500">No Funders</td>
              </tr>
            </tbody>
          </n-table>

          <template #action>
            <RouterLink
              :to="{
                name: 'dataset:metadata:funders',
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

        <CollapsibleCard title="Related Identifiers" bordered>
          <n-table :bordered="true" striped :single-line="false">
            <thead>
              <tr>
                <th>Identifier</th>

                <th>Relation Type</th>

                <th>Resource Type</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in dataset_metadata.related_identifier" :key="item.id">
                <td>{{ item.identifier }}</td>

                <td>{{ item.relation_type }}</td>

                <td>{{ item.resource_type }}</td>
              </tr>

              <tr v-if="!dataset_metadata.related_identifier.length">
                <td colspan="3" class="text-center italic text-gray-500">No Related Identifiers</td>
              </tr>
            </tbody>
          </n-table>

          <template #action>
            <RouterLink
              :to="{
                name: 'dataset:metadata:related-identifiers',
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
                Edit Related Identifiers
              </n-button>
            </RouterLink>
          </template>
        </CollapsibleCard>

        <CollapsibleCard title="Additional Details" bordered>
          <div
            v-if="
              dataset_metadata.about.language ||
              dataset_metadata.about.resource_type ||
              (dataset_metadata.about.size && dataset_metadata.about.size.length)
            "
          >
            <dl>
              <div class="flex flex-row flex-wrap">
                <dt
                  class="shrink-0 grow basis-0 border border-gray-100 bg-gray-50 p-2.5 font-medium"
                >
                  Language
                </dt>

                <dd class="grow basis-0 border border-gray-100 p-2.5">
                  {{ dataset_metadata.about.language }}
                </dd>
              </div>

              <div class="flex flex-row flex-wrap">
                <dt class="grow basis-0 border border-gray-100 bg-gray-50 p-2.5 font-medium">
                  Resource Type
                </dt>

                <dd class="grow basis-0 border border-gray-100 p-2.5">
                  {{ dataset_metadata.about.resource_type }}
                </dd>
              </div>

              <div class="flex flex-row flex-wrap">
                <dt class="grow basis-0 border border-gray-100 bg-gray-50 p-2.5 font-medium">
                  Size
                </dt>

                <dd class="grow basis-0 border border-gray-100 p-2.5">
                  <ul
                    class="m-0 list-none p-0"
                    v-for="item in dataset_metadata.about.size"
                    :key="item"
                  >
                    <li>
                      {{ item }}
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>

          <div class="italic text-gray-500" v-else>No Additional Details</div>

          <template #action>
            <RouterLink
              :to="{
                name: 'dataset:metadata:about',
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
      </div>
    </FadeTransition>

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
