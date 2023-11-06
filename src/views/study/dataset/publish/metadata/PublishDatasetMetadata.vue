<script setup lang="ts">
import type { VersionDatasetMetadata } from "@/types/Version";
import { baseURL } from "@/utils/constants";

// const baseURL = "http://localhost:5000";

const route = useRoute();
const router = useRouter();
const dataset_metadata: Ref<VersionDatasetMetadata | null> = ref(null);

const routeParams = {
  datasetId: route.params.datasetId,
  studyId: route.params.studyId,
  versionId: route.params.versionId,
};

const getSpinner = ref(false);

onBeforeMount(async () => {
  getSpinner.value = true;

  const response = await fetch(
    `${baseURL}/study/${routeParams.studyId}/dataset/${routeParams.datasetId}/version/${routeParams.versionId}/dataset-metadata`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Something went wrong.");
  }
  getSpinner.value = false;

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
  <main class="flex h-full w-full flex-col pr-6" v-if="dataset_metadata">
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
    <!--    {{ dataset_metadata }}-->
    <CollapsibleCard title="Identifiers">
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Identifier">-->
      <!--          <ul class="m-0 list-none p-0">-->
      <!--            <li :key="item.id" v-for="item in dataset_metadata.identifiers">-->
      <!--              {{ item.identifier || "" }}-->
      <!--            </li>-->
      <!--          </ul>-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <n-table :bordered="false" striped>
        <thead>
          <tr>
            <th>Identifier</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataset_metadata.identifiers" :key="item.id">
            <td>{{ item.identifier || "" }}</td>
            <td>{{ item.type || "" }}</td>
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

    <CollapsibleCard title="Titles">
      <n-table :bordered="false" :single-line="false" striped>
        <thead>
          <tr>
            <th>Type</th>
            <th>Title(s)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataset_metadata.titles" :key="item.id">
            <td>{{ item.type.replace(/([a-z])([A-Z])/g, "$1 $2") }}</td>
            <td>{{ item.title }}</td>
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

    <CollapsibleCard title="Descriptions">
      <n-table :bordered="false" :single-line="false" striped>
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

    <CollapsibleCard title="Creators">
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Name">-->
      <!--          <ul class="m-0 list-none p-0">-->
      <!--            <li :key="item.id" v-for="item in dataset_metadata.contributors">-->
      <!--              {{ item.name || "" }}-->
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
          <tr v-for="item in dataset_metadata.creators" :key="item.id">
            <td>{{ item.name || "" }}</td>
            <td>{{ item.name_type || "" }}</td>
          </tr>
        </tbody>
      </n-table>
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Contributor Type">-->
      <!--          <ul class="m-0 list-none p-0">-->
      <!--            <li :key="item.id" v-for="item in dataset_metadata.contributors">-->
      <!--              {{ item.contributor_type || "" }}-->
      <!--            </li>-->
      <!--          </ul>-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
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
    <CollapsibleCard title="Contributors">
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Name">-->
      <!--          <ul class="m-0 list-none p-0">-->
      <!--            <li :key="item.id" v-for="item in dataset_metadata.contributors">-->
      <!--              {{ item.name || "" }}-->
      <!--            </li>-->
      <!--          </ul>-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Contributor Type">-->
      <!--          <ul class="m-0 list-none p-0">-->
      <!--            <li :key="item.id" v-for="item in dataset_metadata.contributors">-->
      <!--              {{ item.contributor_type || "" }}-->
      <!--            </li>-->
      <!--          </ul>-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <n-table :bordered="false" :single-line="false" striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Contributor Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataset_metadata.contributors" :key="item.id">
            <td>{{ item.name || "" }}</td>
            <td>{{ item.name_type || "" }}</td>
            <td>{{ item.contributor_type || "" }}</td>
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
    <CollapsibleCard title="Dates">
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Name">-->
      <!--          <ul class="m-0 list-none p-0">-->
      <!--            <li :key="item.id" v-for="item in item.id">-->
      <!--              {{ item.date }}-->
      <!--              {{ item.type }}-->
      <!--            </li>-->
      <!--          </ul>-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->

      <n-table :bordered="false" striped>
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

    <CollapsibleCard title="Publisher">
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Name">-->
      <!--          {{ dataset_metadata.publisher.managing_organization_name }}-->
      <!--          {{ dataset_metadata.publisher.managing_organization_ror_id }}-->
      <!--          {{ dataset_metadata.publisher.publisher }}-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <n-table :bordered="false" striped>
        <thead>
          <tr>
            <th>Publisher</th>
            <th>Organization name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ dataset_metadata.publisher.managing_organization_name }}</td>
            <td>{{ dataset_metadata.publisher.publisher }}</td>
          </tr>
        </tbody>
      </n-table>
      <template #action>
        <RouterLink
          :to="{
            name: 'dataset:metadata:publisher',
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
      <n-tag type="info">
        {{ dataset_metadata.record_keys.key_type }}
      </n-tag>
      <template #action>
        <RouterLink
          :to="{
            name: 'dataset:metadata:record-keys',
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
      <n-descriptions label-placement="left">
        <n-descriptions-item label="Were direct identifiers removed?">
          {{ dataset_metadata.de_identification.direct ? "Yes" : "No" }}
        </n-descriptions-item>
      </n-descriptions>
      <n-descriptions label-placement="left">
        <n-descriptions-item label="Type">
          {{ dataset_metadata.de_identification.type }}
        </n-descriptions-item>
      </n-descriptions>
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

    <CollapsibleCard title="Consent">
      <n-descriptions label-placement="left">
        <n-descriptions-item label="Non-commercial">
          {{ dataset_metadata.consent.noncommercial ? "Yes" : "No" }}
        </n-descriptions-item>
      </n-descriptions>
      <n-descriptions label-placement="left">
        <n-descriptions-item label="Research Type">
          {{ dataset_metadata.consent.research_type ? "Yes" : "No" }}
        </n-descriptions-item>
      </n-descriptions>
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
    <CollapsibleCard title="Subjects">
      <n-p :key="item.id" v-for="item in dataset_metadata.subjects">
        {{ item.subject }}
      </n-p>
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
    <CollapsibleCard title="Access">
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Description">-->
      <!--          {{ dataset_metadata.access.description }}-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <!--      -->
      <div>{{ dataset_metadata.access.description || "" }}</div>

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
    <CollapsibleCard title="Rights">
      <n-table :bordered="false" striped>
        <thead>
          <tr>
            <th>Rights</th>
            <th>Identifier</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataset_metadata.rights" :key="item.id">
            <td>{{ item.rights }}</td>
            <td>{{ item.identifier || "" }}</td>
          </tr>
        </tbody>
      </n-table>
      <!--      <div :key="item.id" v-for="item in dataset_metadata.rights">{{ item.rights }}</div>-->
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
    <CollapsibleCard title="Funders">
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Name">-->
      <!--          <ul class="m-0 list-none p-0">-->
      <!--            <li :key="item.id" v-for="item in dataset_metadata.funders">-->
      <!--              {{ item.name }}-->
      <!--            </li>-->
      <!--          </ul>-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <!--      -->
      <n-table :bordered="false" striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Identifier</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataset_metadata.funders" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.identifier || "" }}</td>
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
    <CollapsibleCard title="Related Items">
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Relation Type">-->
      <!--          <ul class="m-0 list-none p-0">-->
      <!--            <li :key="item.id" v-for="item in dataset_metadata.related_items">-->
      <!--              {{ item.relation_type }}-->
      <!--            </li>-->
      <!--          </ul>-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->

      <n-table :bordered="true">
        <thead>
          <tr>
            <th>Type</th>
            <th>Publisher</th>
            <th>Publication_year</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataset_metadata.related_items" :key="item.id">
            <td>{{ item.type || "" }}</td>
            <td>{{ item.publisher || "" }}</td>
            <td>{{ item.publication_year || "" }}</td>
          </tr>
        </tbody>
      </n-table>
      <n-h4>Titles</n-h4>
      <n-table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataset_metadata.related_items" :key="item.id">
            <td>
              <ul class="m-0 list-none p-0">
                <li v-for="i in item.titles" :key="i.id">{{ i.title }}</li>
              </ul>
            </td>
            <td>
              <ul class="m-0 list-none p-0">
                <li v-for="i in item.titles" :key="i.id">
                  <div v-if="i.type">{{ i.type?.replace(/([a-z])([A-Z])/g, "$1 $2") }}</div>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </n-table>
      <n-h4>Identifiers</n-h4>
      <n-table>
        <thead>
          <tr>
            <th>Identifier</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataset_metadata.related_items" :key="item.id">
            <td>
              <ul class="m-0 list-none p-0">
                <li v-for="i in item.identifiers" :key="i.id">{{ i.identifier }}</li>
              </ul>
            </td>
            <td>
              <ul class="m-0 list-none p-0">
                <li v-for="i in item.identifiers" :key="i.id">{{ i.type }}</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </n-table>
      <n-h4>Creators</n-h4>
      <n-table>
        <thead>
          <tr>
            <th>Name(s)</th>
            <th>Name Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataset_metadata.related_items" :key="item.id">
            <td>
              <ul class="m-0 list-none p-0">
                <li v-for="i in item.creators" :key="i.id">{{ i.name }}</li>
              </ul>
            </td>
            <td>
              <ul class="m-0 list-none p-0">
                <li v-for="i in item.creators" :key="i.id">{{ i.name_type }}</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </n-table>
      <n-h4>Contributors</n-h4>
      <n-table>
        <thead>
          <tr>
            <th>Name(s)</th>
            <th>Name Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataset_metadata.related_items" :key="item.id">
            <td>
              <ul class="m-0 list-none p-0">
                <li v-for="i in item.contributors" :key="i.id">{{ i.name }}</li>
              </ul>
            </td>
            <td>
              <ul class="m-0 list-none p-0">
                <li v-for="i in item.contributors" :key="i.id">{{ i.name_type }}</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </n-table>
      <template #action>
        <RouterLink
          :to="{
            name: 'dataset:metadata:related-items',
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
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Language">-->
      <!--          {{ dataset_metadata.about.language }}-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Size">-->
      <!--          {{ dataset_metadata.about.size[0] || "" }}-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
      <!--      -->
      <n-table :bordered="false" :single-line="false" striped>
        <thead>
          <tr>
            <th>Language</th>
            <th>Publisher</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ dataset_metadata.about.language }}</td>
            <td>{{ dataset_metadata.about.resource_type || "" }}</td>
          </tr>
        </tbody>
      </n-table>
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
