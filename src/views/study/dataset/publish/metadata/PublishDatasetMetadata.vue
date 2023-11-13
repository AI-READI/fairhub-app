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
  <main class="metadata flex h-full w-full flex-col pr-6" v-if="dataset_metadata">
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
    <CollapsibleCard title="Identifiers" bordered>
      <!--      <n-descriptions label-placement="left">-->
      <!--        <n-descriptions-item label="Identifier">-->
      <!--          <ul class="m-0 list-none p-0">-->
      <!--            <li :key="item.id" v-for="item in dataset_metadata.identifiers">-->
      <!--              {{ item.identifier || "" }}-->
      <!--            </li>-->
      <!--          </ul>-->
      <!--        </n-descriptions-item>-->
      <!--      </n-descriptions>-->
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
            <td>-</td>

            <td>-</td>
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
            <td>-</td>

            <td>-</td>
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
            <td>-</td>

            <td>-</td>
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
            <td>{{ item.name }}</td>

            <td>{{ item.name_type }}</td>
          </tr>

          <tr v-if="!dataset_metadata.creators.length">
            <td>-</td>

            <td>-</td>
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
            Edit Contributors
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
            <td>{{ item.name || "" }}</td>

            <td>{{ item.name_type || "" }}</td>

            <td>{{ item.contributor_type || "" }}</td>
          </tr>

          <tr v-if="!dataset_metadata.contributors.length">
            <td>-</td>

            <td>-</td>

            <td>-</td>
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
            <td>-</td>

            <td>-</td>
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

    <CollapsibleCard title="Publisher" bordered>
      <n-table :bordered="true" striped :single-line="false">
        <thead>
          <tr>
            <th>Publisher</th>

            <th>Organization name</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{{ dataset_metadata.publisher.managing_organization_name || "-" }}</td>

            <td>{{ dataset_metadata.publisher.publisher || "-" }}</td>
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

    <CollapsibleCard title="Record Keys" bordered>
      <n-tag type="info" v-if="dataset_metadata.record_keys.key_type">
        {{ dataset_metadata.record_keys.key_type }}
      </n-tag>

      <div>-</div>

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

    <CollapsibleCard title="De-identification" bordered>
      <!--       <n-table :bordered="true">-->
      <!--        <tr>-->
      <!--          <th>Type</th>-->
      <!--          <td>{{ study_metadata.design.study_type || "-" }}</td>-->
      <!--        </tr>-->
      <!--       </n-table>-->
      <n-descriptions label-placement="top" bordered>
        <n-descriptions-item label="Were direct identifiers removed?">
          {{
            dataset_metadata.de_identification.direct === true
              ? "Yes"
              : dataset_metadata.de_identification.direct === false
              ? "No"
              : "-"
          }}
        </n-descriptions-item>

        <n-descriptions-item label="Type">
          {{ dataset_metadata.de_identification.type || "-" }}
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

    <CollapsibleCard title="Consent" bordered>
      <n-table :bordered="true" striped :single-line="false">
        <tr>
          <th>Non-commercial</th>

          <td>{{ dataset_metadata.consent.noncommercial === true ? "Yes" : "No" }}</td>
        </tr>

        <tr>
          <th>Research type</th>

          <td>{{ dataset_metadata.consent.research_type === true ? "Yes" : "No" }}</td>
        </tr>
      </n-table>

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

      <n-p v-if="!dataset_metadata.subjects.length">-</n-p>

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

      <div v-if="!dataset_metadata.access.description">-</div>

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

            <td>{{ item.identifier || "" }}</td>
          </tr>

          <tr v-if="!dataset_metadata.rights.length">
            <td>-</td>

            <td>-</td>
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

    <CollapsibleCard title="Funders" bordered>
      <n-table :bordered="true" striped :single-line="false">
        <thead>
          <tr>
            <th>Name</th>

            <th>Identifier</th>

            <th>-</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in dataset_metadata.funders" :key="item.id">
            <td>{{ item.name }}</td>

            <td>{{ item.identifier || "" }}</td>

            <td>-</td>
          </tr>

          <tr v-if="!dataset_metadata.funders.length">
            <td>-</td>

            <td>-</td>

            <td>-</td>
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

    <CollapsibleCard title="Related Items" bordered>
      <div v-if="dataset_metadata.related_items.length !== 0">
        <div v-for="(item, index) in dataset_metadata.related_items" :key="item.id">
          <div v-if="item">
            <div class="mt-5" v-for="i in item.titles" :key="i.id">
              <n-h3 v-if="i.type === 'MainTitle'">{{ i.title }}</n-h3>
            </div>
          </div>

          <n-table :bordered="true" striped :single-line="false">
            <thead>
              <tr>
                <th>Type</th>

                <th>Publisher</th>

                <th>Publication_year</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{{ item.type || "-" }}</td>

                <td>{{ item.publisher || "-" }}</td>

                <td>{{ item.publication_year || "-" }}</td>
              </tr>
            </tbody>
          </n-table>

          <n-h4>Titles</n-h4>

          <n-table :bordered="true" striped :single-line="false">
            <thead>
              <tr>
                <th>Title</th>

                <th>Type</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="i in item.titles" :key="i.id">
                <td class="p-0">
                  <ul class="m-0 list-none p-0 even:bg-gray-50">
                    <li class="p-0">{{ i.title }}</li>
                  </ul>
                </td>

                <td class="p-0">
                  <ul class="m-0 list-none p-0 even:bg-gray-50">
                    <li class="p-0">
                      <div v-if="i.type">{{ i.type?.replace(/([a-z])([A-Z])/g, "$1 $2") }}</div>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </n-table>

          <n-h4>Identifiers</n-h4>

          <n-table :bordered="true" striped :single-line="false">
            <thead>
              <tr>
                <th>Identifier</th>

                <th>Type</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="i in item.identifiers" :key="i.id">
                <td class="p-0">
                  <ul class="m-0 list-none p-0 even:bg-gray-50">
                    <li class="p-0">
                      {{ i.identifier }}
                    </li>
                  </ul>
                </td>

                <td class="p-0">
                  <ul class="m-0 list-none p-0 even:bg-gray-50">
                    <li class="p-0">
                      {{ i.type }}
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </n-table>

          <n-h4>Creators</n-h4>

          <n-table :bordered="true" striped :single-line="false">
            <thead>
              <tr>
                <th>Name(s)</th>

                <th>Name Type</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="i in item.creators" :key="i.id">
                <td class="p-0">
                  <ul class="m-0 list-none p-0 even:bg-gray-50">
                    <li class="p-0">
                      {{ i.name }}
                    </li>
                  </ul>
                </td>

                <td class="p-0">
                  <ul class="m-0 list-none p-0 even:bg-gray-50">
                    <li class="p-0">
                      {{ i.name_type || "-" }}
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </n-table>

          <n-h4>Contributors</n-h4>

          <n-table :bordered="true" striped :single-line="false">
            <thead>
              <tr>
                <th>Name(s)</th>

                <th>Name Type</th>

                <th>Contributor Type</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="i in item.contributors" :key="i.id">
                <td class="p-0">
                  <ul class="m-0 list-none p-0 even:bg-gray-50">
                    <li class="p-0">
                      {{ i.name || "-" }}
                    </li>
                  </ul>
                </td>

                <td class="p-0">
                  <ul class="m-0 list-none p-0 even:bg-gray-50">
                    <li class="p-0">
                      {{ i.name_type || "-" }}
                    </li>
                  </ul>
                </td>

                <td class="p-0">
                  <ul class="m-0 list-none p-0 even:bg-gray-50">
                    <li class="p-0">
                      {{ i.contributor_type || "-" }}
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>

            <tbody v-if="item.contributors">
              <tr v-if="!item.contributors.length">
                <td>-</td>

                <td>-</td>

                <td>-</td>
              </tr>
            </tbody>
          </n-table>

          <n-divider v-if="index !== dataset_metadata.related_items.length - 1" />
        </div>
      </div>

      <div v-if="dataset_metadata.related_items.length === 0">
        <n-table :bordered="true" striped :single-line="false">
          <thead>
            <tr>
              <th>Type</th>

              <th>Publisher</th>

              <th>Publication_year</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>-</td>

              <td>-</td>

              <td>-</td>
            </tr>
          </tbody>
        </n-table>

        <n-h4>Titles</n-h4>

        <n-table :bordered="true" striped :single-line="false">
          <thead>
            <tr>
              <th>Title</th>

              <th>Type</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <ul class="m-0 list-none p-0">
                  <li class="p-3 even:bg-gray-50">-</li>
                </ul>
              </td>

              <td>
                <ul class="m-0 list-none p-0">
                  <li class="p-3 even:bg-gray-50">
                    <div>-</div>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </n-table>

        <n-h4>Identifiers</n-h4>

        <n-table :bordered="true" striped :single-line="false">
          <thead>
            <tr>
              <th>Identifier</th>

              <th>Type</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <ul class="m-0 list-none p-0">
                  <li class="p-3 even:bg-gray-50">-</li>
                </ul>
              </td>

              <td>
                <ul class="m-0 list-none p-0">
                  <li class="p-3 even:bg-gray-50">-</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </n-table>

        <n-h4>Creators</n-h4>

        <n-table :bordered="true" striped :single-line="false">
          <thead>
            <tr>
              <th>Name(s)</th>

              <th>Name Type</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <ul class="m-0 list-none p-0">
                  <li class="p-3 even:bg-gray-50">-</li>
                </ul>
              </td>

              <td>
                <ul class="m-0 list-none p-0">
                  <li class="p-3 even:bg-gray-50">-</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </n-table>

        <n-h4>Contributors</n-h4>

        <n-table :bordered="true" striped :single-line="false">
          <thead>
            <tr>
              <th>Name(s)</th>

              <th>Name Type</th>

              <th>Contributor Type</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <ul class="m-0 list-none p-0">
                  <li class="p-3 even:bg-gray-50">-</li>
                </ul>
              </td>

              <td class="p-0">
                <ul class="m-0 list-none p-0">
                  <li class="p-3 even:bg-gray-50">-</li>
                </ul>
              </td>

              <td class="p-0">
                <ul class="m-0 list-none p-0">
                  <li class="p-3 even:bg-gray-50">-</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </n-table>
      </div>

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

    <CollapsibleCard title="Additional Details" bordered>
      <n-table :bordered="true" striped :single-line="false">
        <thead>
          <tr>
            <th>Language</th>

            <th>Resource Type</th>

            <th>Size</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{{ dataset_metadata.about.language || "-" }}</td>

            <td>{{ dataset_metadata.about.resource_type || "-" }}</td>

            <td>
              <ul
                class="m-0 list-none p-0"
                v-if="dataset_metadata.about.size && dataset_metadata.about.size.length"
              >
                <li v-for="item in dataset_metadata.about.size" :key="item">
                  {{ item }}
                </li>
              </ul>

              <ul class="m-0 list-none p-0" v-else>
                <li>-</li>
              </ul>
            </td>
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
