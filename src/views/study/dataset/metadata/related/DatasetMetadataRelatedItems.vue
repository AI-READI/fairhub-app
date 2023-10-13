<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import type { DatasetRelatedItems } from "@/types/Dataset";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const push = usePush();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const studyId = routeParams.studyId;
const datasetId = routeParams.datasetId;

const formRef = ref<FormInst | null>(null);

const moduleData = reactive<DatasetRelatedItems>({
  related_items: [],
});

onBeforeMount(async () => {
  const response = await fetch(`${baseURL}/study/${studyId}/dataset/${datasetId}/related-item`, {
    method: "GET",
  });

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  console.log(data);

  moduleData.related_items = data.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });

  for (const item of moduleData.related_items) {
    item.identifiers = item.identifiers.map((identifier: any) => {
      return {
        ...identifier,
        origin: "remote",
      };
    });

    item.creators = item.creators.map((creator: any) => {
      return {
        ...creator,
        origin: "remote",
      };
    });

    item.contributors = item.contributors.map((contributor: any) => {
      return {
        ...contributor,
        origin: "remote",
      };
    });

    item.titles = item.titles.map((title: any) => {
      return {
        ...title,
        origin: "remote",
      };
    });
  }
});

const removeRelatedItem = async (id: string) => {
  const item = moduleData.related_items.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${studyId}/dataset/${datasetId}/related-item/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Something went wrong.");
      throw new Error("Network response was not ok");
    }
  }

  moduleData.related_items = moduleData.related_items.filter((item) => item.id !== id);
  push.success("Resource removed successfully.");
};

const addRelatedItem = () => {
  moduleData.related_items.push({
    id: nanoid(),
    contributors: [],
    creators: [],
    edition: "",
    first_page: "",
    identifiers: [],
    issue: "",
    last_page: "",
    number_type: null,
    number_value: "",
    origin: "local",
    publication_year: null,
    publisher: "",
    relation_type: null,
    titles: [
      {
        id: nanoid(),
        title: "",
        origin: "local",
        type: "MainTitle",
      },
    ],
    type: null,
    volume: "",
  });
};

const removeIdentifier = async (item_id: string, index: number) => {
  const item = moduleData.related_items.find((item) => item.id === item_id);

  if (item && item.origin === "remote") {
    const identifier = item.identifiers[index];

    if (identifier && identifier.origin === "remote") {
      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/related-item/${item_id}/identifier/${identifier.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        push.error("Something went wrong.");
        throw new Error("Network response was not ok");
      }
    }
  }

  item?.identifiers.splice(index, 1);

  push.success("Identifier removed successfully.");
};

const addIdentifier = (item_id: string) => {
  const item = moduleData.related_items.find((item) => item.id === item_id);

  if (item) {
    item.identifiers.push({
      id: nanoid(),
      identifier: "",
      metadata_scheme: "",
      origin: "local",
      scheme_type: "",
      scheme_uri: "",
      type: null,
    });
  }
};

const removeCreator = async (item_id: string, index: number) => {
  const item = moduleData.related_items.find((item) => item.id === item_id);

  if (item && item.origin === "remote") {
    const creator = item.creators[index];

    if (creator && creator.origin === "remote") {
      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/related-item/${item_id}/creator/${creator.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        push.error("Something went wrong.");
        throw new Error("Network response was not ok");
      }
    }
  }

  item?.creators.splice(index, 1);

  push.success("Creator removed successfully.");
};

const addCreator = (item_id: string) => {
  const item = moduleData.related_items.find((item) => item.id === item_id);

  if (item) {
    item.creators.push({
      id: nanoid(),
      name: "",
      name_type: null,
      origin: "local",
    });
  }
};

const removeContributor = async (item_id: string, index: number) => {
  const item = moduleData.related_items.find((item) => item.id === item_id);

  if (item && item.origin === "remote") {
    const contributor = item.contributors[index];

    if (contributor && contributor.origin === "remote") {
      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/related-item/${item_id}/contributor/${contributor.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        push.error("Something went wrong.");
        throw new Error("Network response was not ok");
      }
    }
  }

  item?.contributors.splice(index, 1);

  push.success("Contributor removed successfully.");
};

const addContributor = (item_id: string) => {
  const item = moduleData.related_items.find((item) => item.id === item_id);

  if (item) {
    item.contributors.push({
      id: nanoid(),
      name: "",
      contributor_type: null,
      name_type: null,
      origin: "local",
    });
  }
};

const removeTitle = async (item_id: string, index: number) => {
  const item = moduleData.related_items.find((item) => item.id === item_id);

  if (item && item.origin === "remote") {
    const title = item.titles[index];

    if (title && title.origin === "remote") {
      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/related-item/${item_id}/title/${title.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        push.error("Something went wrong.");
        throw new Error("Network response was not ok");
      }
    }
  }

  item?.titles.splice(index, 1);

  push.success("Title removed successfully.");
};

const addTitle = (item_id: string) => {
  const item = moduleData.related_items.find((item) => item.id === item_id);

  if (item) {
    item.titles.push({
      id: nanoid(),
      title: "",
      origin: "local",
      type: item.titles.length ? null : "MainTitle",
    });
  }
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data: any = moduleData.related_items.map((related_item) => {
        const entry = {
          id: related_item.id,
          contributors: related_item.contributors.map((contributor: any) => {
            const entry = {
              name: contributor.name,
              contributor_type: contributor.contributor_type,
              name_type: contributor.name_type,
            };

            if (contributor.origin === "local") {
              return entry;
            } else {
              return {
                ...entry,
                id: contributor.id,
              };
            }
          }),
          creators: related_item.creators.map((creator: any) => {
            const entry = {
              name: creator.name,
              name_type: creator.name_type,
            };

            if (creator.origin === "local") {
              return entry;
            } else {
              return {
                ...entry,
                id: creator.id,
              };
            }
          }),
          edition: related_item.edition,
          first_page: related_item.first_page,
          identifiers: related_item.identifiers.map((identifier: any) => {
            const entry = {
              identifier: identifier.identifier,
              metadata_scheme: identifier.metadata_scheme,
              scheme_type: identifier.scheme_type,
              scheme_uri: identifier.scheme_uri,
              type: identifier.type,
            };

            if (identifier.origin === "local") {
              return entry;
            } else {
              return {
                ...entry,
                id: identifier.id,
              };
            }
          }),
          issue: related_item.issue,
          last_page: related_item.last_page,
          number_type: related_item.number_type,
          number_value: related_item.number_value,
          publication_year: related_item.publication_year,
          publisher: related_item.publisher,
          relation_type: related_item.relation_type,
          titles: related_item.titles.map((title: any) => {
            const entry = {
              title: title.title,
              type: title.type,
            };

            if (title.origin === "local") {
              return entry;
            } else {
              return {
                ...entry,
                id: title.id,
              };
            }
          }),
          type: related_item.type,
          volume: related_item.volume,
        };

        if (related_item.origin === "local") {
          return entry;
        } else {
          return {
            ...entry,
            id: related_item.id,
          };
        }
      });

      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/related-item`,
        {
          body: JSON.stringify(data),

          method: "POST",
        }
      );

      if (!response.ok) {
        push.error("Something went wrong.");

        throw new Error("Network response was not ok");
      } else {
        push.success("Creators saved successfully.");

        // refresh page
        router.go(0);
      }

      console.log("success");
    } else {
      console.log("error");
      console.log(errors);
    }
  });
};
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Related Items"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      linkName="dataset:overview"
      :linkParams="{ studyId: routeParams.studyId, datasetId: routeParams.datasetId }"
    />

    <n-divider />

    <n-form ref="formRef" :model="moduleData" size="large" label-placement="top" class="pr-4">
      <CollapsibleCard
        v-for="(item, index) in moduleData.related_items"
        :key="item.id"
        class="mb-5 shadow-md"
        :title="`Item ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removeRelatedItem(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove resource
              </n-button>
            </template>

            Are you sure you want to remove this resource?
          </n-popconfirm>
        </template>

        <h3>About</h3>

        <p class="pb-8 pt-2">High level metadata about this resource</p>

        <n-form-item
          label="Type"
          :path="`related_items[${index}].type`"
          :rule="{
            message: 'Please select the type of this resource',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-select
            v-model:value="item.type"
            placeholder="Journal"
            clearable
            :options="FORM_JSON.datasetRelatedItemTypeOptions"
          />
        </n-form-item>

        <n-form-item
          label="Relation Type"
          :path="`related_items[${index}].relation_type`"
          :rule="{
            message: 'Please select the relation type of this resource',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-select
            v-model:value="item.relation_type"
            placeholder="Is part of"
            clearable
            :options="FORM_JSON.datasetRelatedItemRelationTypeOptions"
          />
        </n-form-item>

        <n-divider />

        <h3>Titles</h3>

        <p class="pb-8 pt-2">The titles for this resource.</p>

        <div class="flex flex-col divide-y-2 divide-dotted divide-slate-200">
          <div
            class="flex w-full flex-row items-center justify-between space-x-8 pt-3"
            v-for="(title, idx) in item.titles"
            :key="idx"
          >
            <n-space vertical class="w-full">
              <div class="flex w-full flex-row items-center justify-between space-x-4">
                <n-form-item
                  label="Name"
                  :path="`related_items[${index}].titles[${idx}].title`"
                  :rule="{
                    message: 'Please enter the name of this title',
                    required: true,
                    trigger: ['blur', 'change'],
                  }"
                  class="w-full"
                >
                  <n-input
                    v-model:value="title.title"
                    placeholder="family name, given name"
                    clearable
                  />
                </n-form-item>

                <n-form-item
                  label="Type"
                  :path="`related_items[${index}].titles[${idx}].type`"
                  :rule="{
                    message: 'Please select the type of this title',
                    required: true,
                    trigger: ['blur', 'input'],
                  }"
                  class="w-full"
                >
                  <n-select
                    v-model:value="title.type"
                    placeholder="Alternative Title"
                    clearable
                    :disabled="title.type === 'MainTitle'"
                    :options="FORM_JSON.datasetTitleTypeOptions"
                  />
                </n-form-item>
              </div>
            </n-space>

            <n-popconfirm @positive-click="removeTitle(item.id, idx)" class="self-justify-end">
              <template #trigger>
                <n-button
                  class="ml-0"
                  size="large"
                  type="error"
                  :disabled="title.type === 'MainTitle'"
                >
                  <f-icon icon="gridicons:trash" />
                </n-button>
              </template>

              Are you sure you want to remove this title?
            </n-popconfirm>
          </div>
        </div>

        <n-button class="mb-10 w-full" dashed type="success" @click="addTitle(item.id)">
          <template #icon>
            <f-icon icon="gridicons:create" />
          </template>

          Add a title
        </n-button>

        <n-divider />

        <h3>Identifiers</h3>

        <p class="pb-8 pt-2">The identifier for this resource.</p>

        <div class="flex flex-col divide-y-2 divide-dotted divide-slate-200">
          <div
            class="flex w-full flex-row items-center justify-between space-x-8 pt-3"
            v-for="(identifier, idx) in item.identifiers"
            :key="idx"
          >
            <n-space vertical class="w-full">
              <div class="flex w-full flex-row items-center justify-between space-x-4">
                <n-form-item
                  label="Identifier"
                  :path="`related_items[${index}].identifiers[${idx}].identifier`"
                  :rule="{
                    message: 'Please enter the type of this identifier',
                    required: true,
                    trigger: ['blur', 'change'],
                  }"
                  class="w-full"
                >
                  <n-input v-model:value="identifier.identifier" placeholder="DOI" clearable />
                </n-form-item>

                <n-form-item
                  label="Type"
                  :path="`related_items[${index}].identifiers[${idx}].type`"
                  :rule="{
                    message: 'Please select the type of this identifier',
                    required: true,
                    trigger: ['blur', 'input'],
                  }"
                  class="w-full"
                >
                  <n-select
                    v-model:value="identifier.type"
                    placeholder="DOI"
                    clearable
                    :options="FORM_JSON.datasetIdentifierTypeOptions"
                  />
                </n-form-item>
              </div>

              <div class="flex w-full flex-row items-center justify-between space-x-4">
                <n-form-item
                  label="Metadata Scheme"
                  :path="`related_items[${index}].identifiers[${idx}].metadata_scheme`"
                  :rule="{
                    message: 'Please enter the metadata scheme of this identifier',
                    required:
                      item.relation_type === 'HasMetadata' ||
                      item.relation_type === 'IsMetadataFor',
                    trigger: ['blur', 'change'],
                  }"
                  class="w-full"
                >
                  <n-input
                    v-model:value="identifier.metadata_scheme"
                    placeholder="Lorem Ipsum"
                    clearable
                  />
                </n-form-item>

                <n-form-item
                  label="Scheme URI"
                  :path="`related_items[${index}].identifiers[${idx}].scheme_uri`"
                  :rule="{
                    message: 'Please enter the scheme URI of this identifier',
                    required:
                      item.relation_type === 'HasMetadata' ||
                      item.relation_type === 'IsMetadataFor',
                    trigger: ['blur', 'change'],
                  }"
                  class="w-full"
                >
                  <n-input
                    v-model:value="identifier.scheme_uri"
                    placeholder="https://somesite.io"
                    clearable
                  />
                </n-form-item>

                <n-form-item
                  label="Relation Type"
                  :path="`related_items[${index}].identifiers[${idx}].scheme_type`"
                  :rule="{
                    message: 'Please enter the scheme type of this identifier',
                    required:
                      item.relation_type === 'HasMetadata' ||
                      item.relation_type === 'IsMetadataFor',
                    trigger: ['blur', 'change'],
                  }"
                  class="w-full"
                >
                  <n-input v-model:value="identifier.scheme_type" placeholder="XSD" clearable />
                </n-form-item>
              </div>
            </n-space>

            <n-popconfirm @positive-click="removeIdentifier(item.id, idx)" class="self-justify-end">
              <template #trigger>
                <n-button class="ml-0" size="large" type="error">
                  <f-icon icon="gridicons:trash" />
                </n-button>
              </template>

              Are you sure you want to remove this identifier?
            </n-popconfirm>
          </div>
        </div>

        <n-button class="mb-10 w-full" dashed type="success" @click="addIdentifier(item.id)">
          <template #icon>
            <f-icon icon="gridicons:create" />
          </template>

          Add an identifier
        </n-button>

        <n-divider />

        <h3>Creators</h3>

        <p class="pb-8 pt-2">The creators for this resource.</p>

        <div class="flex flex-col divide-y-2 divide-dotted divide-slate-200">
          <div
            class="flex w-full flex-row items-center justify-between space-x-8 pt-3"
            v-for="(creator, idx) in item.creators"
            :key="idx"
          >
            <n-space vertical class="w-full">
              <div class="flex w-full flex-row items-center justify-between space-x-4">
                <n-form-item
                  label="Name"
                  :path="`related_items[${index}].creators[${idx}].name`"
                  :rule="{
                    message: 'Please enter the name of this creator',
                    required: true,
                    trigger: ['blur', 'change'],
                  }"
                  class="w-full"
                >
                  <n-input
                    v-model:value="creator.name"
                    placeholder="family name, given name"
                    clearable
                  />
                </n-form-item>

                <n-form-item
                  label="Type"
                  :path="`related_items[${index}].creators[${idx}].name_type`"
                  :rule="{
                    message: 'Please select the type of this creator',
                    required: true,
                    trigger: ['blur', 'input'],
                  }"
                  class="w-full"
                >
                  <n-select
                    v-model:value="creator.name_type"
                    placeholder="Personal"
                    clearable
                    :options="FORM_JSON.datasetNameTypeOptions"
                  />
                </n-form-item>
              </div>
            </n-space>

            <n-popconfirm @positive-click="removeCreator(item.id, idx)" class="self-justify-end">
              <template #trigger>
                <n-button class="ml-0" size="large" type="error">
                  <f-icon icon="gridicons:trash" />
                </n-button>
              </template>

              Are you sure you want to remove this creator?
            </n-popconfirm>
          </div>
        </div>

        <n-button class="mb-10 w-full" dashed type="success" @click="addCreator(item.id)">
          <template #icon>
            <f-icon icon="gridicons:create" />
          </template>

          Add a creator
        </n-button>

        <n-divider />

        <h3>Contributors</h3>

        <p class="pb-8 pt-2">The contributors for this resource.</p>

        <div class="flex flex-col divide-y-2 divide-dotted divide-slate-200">
          <div
            class="flex w-full flex-row items-center justify-between space-x-8 pt-3"
            v-for="(contributor, idx) in item.contributors"
            :key="idx"
          >
            <n-space vertical class="w-full">
              <div class="flex w-full flex-row items-center justify-between space-x-4">
                <n-form-item
                  label="Name"
                  :path="`related_items[${index}].contributors[${idx}].name`"
                  :rule="{
                    message: 'Please enter the name of this contributor',
                    required: true,
                    trigger: ['blur', 'change'],
                  }"
                  class="w-full"
                >
                  <n-input
                    v-model:value="contributor.name"
                    placeholder="family name, given name"
                    clearable
                  />
                </n-form-item>

                <n-form-item
                  label="Type"
                  :path="`related_items[${index}].contributors[${idx}].name_type`"
                  :rule="{
                    message: 'Please select the type of this contributor',
                    required: true,
                    trigger: ['blur', 'input'],
                  }"
                  class="w-full"
                >
                  <n-select
                    v-model:value="contributor.name_type"
                    placeholder="Personal"
                    clearable
                    :options="FORM_JSON.datasetNameTypeOptions"
                  />
                </n-form-item>

                <n-form-item
                  label="Contributor Type"
                  :path="`related_items[${index}].contributors[${idx}].contributor_type`"
                  :rule="{
                    message: 'Please select the type of this contributor',
                    required: true,
                    trigger: ['blur', 'input'],
                  }"
                  class="w-full"
                >
                  <n-select
                    v-model:value="contributor.contributor_type"
                    placeholder="Contact Person"
                    clearable
                    :options="FORM_JSON.datasetContributorTypeOptions"
                  />
                </n-form-item>
              </div>
            </n-space>

            <n-popconfirm
              @positive-click="removeContributor(item.id, idx)"
              class="self-justify-end"
            >
              <template #trigger>
                <n-button class="ml-0" size="large" type="error">
                  <f-icon icon="gridicons:trash" />
                </n-button>
              </template>

              Are you sure you want to remove this contributor?
            </n-popconfirm>
          </div>
        </div>

        <n-button class="mb-10 w-full" dashed type="success" @click="addContributor(item.id)">
          <template #icon>
            <f-icon icon="gridicons:create" />
          </template>

          Add a contributor
        </n-button>

        <n-divider />

        <h3>Other</h3>

        <p class="pb-8 pt-2">Any additional details about this resource.</p>

        <n-form-item label="Publication Year" :path="`related_items[${index}].publication_year`">
          <n-date-picker v-model:value="item.publication_year" type="year" clearable />
        </n-form-item>

        <n-form-item label="Volume" :path="`related_items[${index}].volume`">
          <n-input v-model:value="item.volume" placeholder="1" clearable />
        </n-form-item>

        <n-form-item label="Issue" :path="`related_items[${index}].issue`">
          <n-input v-model:value="item.issue" placeholder="1" clearable />
        </n-form-item>

        <n-form-item label="Number" :path="`related_items[${index}].number_value`">
          <n-input
            v-model:value="item.number_value"
            placeholder="Number of the related item, e.g., report number of article number"
            clearable
          />
        </n-form-item>

        <n-form-item
          label="Type of resource's number"
          :path="`related_items[${index}].number_type`"
        >
          <n-select
            v-model:value="item.number_type"
            placeholder="Chapter"
            clearable
            :options="FORM_JSON.datasetRelatedItemNumberTypeOptions"
          />
        </n-form-item>

        <n-form-item label="First Page" :path="`related_items[${index}].first_page`">
          <n-input v-model:value="item.first_page" placeholder="1" clearable />
        </n-form-item>

        <n-form-item label="Last Page" :path="`related_items[${index}].last_page`">
          <n-input v-model:value="item.last_page" placeholder="1" clearable />
        </n-form-item>

        <n-form-item label="Publisher" :path="`related_items[${index}].publisher`">
          <n-input v-model:value="item.publisher" placeholder="1" clearable />
        </n-form-item>

        <n-form-item label="Edition" :path="`related_items[${index}].edition`">
          <n-input v-model:value="item.edition" placeholder="1" clearable />
        </n-form-item>

        <!-- <n-form-item
          label="Date Value"
          :path="`dates[${index}].date`"
          :rule="{
            message: 'Please select a date',
            required: true,
            type: 'number',
            trigger: ['blur', 'input'],
          }"
        >
          <n-date-picker v-model:value="item.date" type="date" clearable />
        </n-form-item> -->

        <!-- <n-form-item label="Name Identifier" :path="`dates[${index}].information`">
          <n-input
            v-model:value="item.information"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            type="textarea"
            clearable
          />
        </n-form-item> -->
      </CollapsibleCard>

      <n-button class="my-10 w-full" dashed type="success" @click="addRelatedItem">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add a new related item
      </n-button>

      <pre>{{ moduleData.related_items }}</pre>

      <n-divider />

      <div class="flex justify-start">
        <n-button size="large" type="primary" @click="saveMetadata">
          <template #icon>
            <f-icon icon="material-symbols:save" />
          </template>

          Save Metadata
        </n-button>
      </div>
    </n-form>
  </main>
</template>
