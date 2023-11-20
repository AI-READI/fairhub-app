<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import { getBackParams, getBackRoute } from "@/stores/nav";
import type { DatasetCreators } from "@/types/Dataset";
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

const moduleData = reactive<DatasetCreators>({
  creators: [],
});

onBeforeMount(async () => {
  const response = await fetch(
    `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/creator`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  console.log(data);

  moduleData.creators = data.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });
});

const addEntryToAffiliationsList = () => {
  return {
    identifier: "",
    scheme: "",
    scheme_uri: "",
  };
};

const removeCreator = async (id: string) => {
  const item = moduleData.creators.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/creator/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Something went wrong.");
      throw new Error("Network response was not ok");
    }

    push.success("Creator removed successfully.");
  }

  moduleData.creators = moduleData.creators.filter((item) => item.id !== id);
};

const addCreator = () => {
  moduleData.creators.push({
    id: nanoid(),
    name: "",
    affiliations: [],
    name_identifier: "",
    name_identifier_scheme: "",
    name_identifier_scheme_uri: "",
    name_type: null,
    origin: "local",
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data: any = moduleData.creators.map((item) => {
        const entry = {
          name: item.name,
          affiliations: item.affiliations.map((affiliation) => {
            return {
              name: affiliation.name || "",
              identifier: affiliation.identifier || "",
              scheme: affiliation.scheme || "",
              scheme_uri: affiliation.scheme_uri || "",
            };
          }),
          name_identifier: item.name_identifier,
          name_identifier_scheme: item.name_identifier_scheme,
          name_identifier_scheme_uri: item.name_identifier_scheme_uri || "",
          name_type: item.name_type,
        };

        if (entry.name_type === "Organizational") {
          entry.affiliations = [];
        }

        if (item.origin === "local") {
          return entry;
        } else {
          return {
            ...entry,
            id: item.id,
          };
        }
      });

      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/creator`,
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
      title="Creators"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      :linkName="getBackRoute()"
      :linkParams="getBackParams()"
    />

    <n-divider />

    <n-form ref="formRef" :model="moduleData" size="large" label-placement="top" class="pr-4">
      <CollapsibleCard
        v-for="(item, index) in moduleData.creators"
        :key="item.id"
        class="mb-5 shadow-md"
        :title="item.name || `Creator ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removeCreator(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove creator
              </n-button>
            </template>

            Are you sure you want to remove this creator?
          </n-popconfirm>
        </template>

        <n-form-item
          label="Name"
          :path="`creators[${index}].name`"
          :rule="{
            message: 'Please enter a name',
            required: true,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input v-model:value="item.name" placeholder="Bertolt Hoover" clearable />
        </n-form-item>

        <n-form-item
          label="Name Type"
          :path="`creators[${index}].name_type`"
          :rule="{
            message: 'Please select an intervention type',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-select
            v-model:value="item.name_type"
            placeholder="Personal"
            clearable
            :options="FORM_JSON.datasetNameTypeOptions"
          />
        </n-form-item>

        <n-form-item
          label="Name Identifier"
          :path="`creators[${index}].name_identifier`"
          :rule="{
            message: 'Please enter a name identifier',
            required: true,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input
            v-model:value="item.name_identifier"
            placeholder="0000-0001-5109-3700"
            clearable
          />
        </n-form-item>

        <n-form-item
          label="Name Identifier Scheme"
          :path="`creators[${index}].name_identifier_scheme`"
          :rule="{
            message: 'Please enter a name identifier scheme',
            required: true,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input v-model:value="item.name_identifier_scheme" placeholder="ORCID" clearable />
        </n-form-item>

        <n-form-item
          label="Name Identifier Scheme URI"
          :path="`creators[${index}].name_identifier_scheme_uri`"
        >
          <n-input
            v-model:value="item.name_identifier_scheme_uri"
            placeholder="https://orcid.org/"
            clearable
          />
        </n-form-item>

        <n-form-item
          label="Affiliations"
          :path="`creators[${index}].affiliations`"
          ignore-path-change
          :rule="{
            message: 'Please add at least one affiliation',
            required: item.name_type === 'Personal',
            type: 'array',
            trigger: ['blur', 'input'],
          }"
        >
          <!-- outer form item is only used to diplay the label and the required mark -->

          <n-dynamic-input
            v-model:value="item.affiliations"
            #="{ index: idx, value }"
            :on-create="addEntryToAffiliationsList"
            :disabled="item.name_type === 'Organizational'"
            class="[&>div>*]:!self-center"
          >
            <div class="flex w-full flex-col space-y-4">
              <n-form-item
                ignore-path-change
                :show-feedback="false"
                label="Name"
                :path="`creators[${index}].affiliations[${idx}].name`"
                class="w-full"
                :rule="{
                  message: 'Please add at least one affiliation',
                  required: !item.affiliations[idx].identifier,
                  trigger: ['blur', 'input'],
                }"
              >
                <n-input
                  v-model:value="item.affiliations[idx].name"
                  placeholder="University of Marley"
                  :disabled="item.name_type === 'Organizational'"
                  @keydown.enter.prevent
                />
              </n-form-item>

              <div class="flex">
                <n-form-item
                  ignore-path-change
                  label="Identifier"
                  :path="`creators[${index}].affiliations[${idx}].identifier`"
                  class="w-full"
                  :rule="{
                    message: 'Identifier is required if name of affiliation is empty',
                    required: !item.affiliations[idx].name,
                    trigger: ['blur', 'input'],
                  }"
                >
                  <n-input
                    v-model:value="item.affiliations[idx].identifier"
                    :disabled="item.name_type === 'Organizational'"
                    placeholder="0156zyn36"
                    @keydown.enter.prevent
                  />
                </n-form-item>

                <n-form-item
                  ignore-path-change
                  label="Scheme"
                  :path="`creators[${index}].affiliations[${idx}].scheme`"
                  class="ml-3 w-full"
                  :rule="{
                    message: 'Scheme is required if identifier is present',
                    required: item.affiliations[idx].identifier,
                    trigger: ['blur', 'input'],
                  }"
                >
                  <n-input
                    v-model:value="item.affiliations[idx].scheme"
                    placeholder="ROR"
                    :disabled="item.name_type === 'Organizational'"
                    @keydown.enter.prevent
                  />
                </n-form-item>

                <n-form-item
                  ignore-path-change
                  label="Scheme URI"
                  :path="`creators[${index}].affiliations[${idx}]`"
                  class="ml-3 w-full"
                >
                  <n-input
                    v-model:value="item.affiliations[idx].scheme_uri"
                    placeholder="https://ror.org/"
                    @keydown.enter.prevent
                    :disabled="item.name_type === 'Organizational'"
                  />
                </n-form-item>
              </div>
            </div>
          </n-dynamic-input>
        </n-form-item>
      </CollapsibleCard>

      <n-button class="my-10 w-full" dashed type="success" @click="addCreator">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add a new creator
      </n-button>

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
