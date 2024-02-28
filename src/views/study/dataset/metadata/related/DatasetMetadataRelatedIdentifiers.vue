<script setup lang="ts">
import { type FormInst } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import type { DatasetRelatedIdentifiers } from "@/types/Dataset";
// const baseURL = "http://localhost:3001/api";
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

const moduleData = reactive<DatasetRelatedIdentifiers>({
  related_identifiers: [],
});

const responseLoading = ref(false);
const submitLoading = ref(false);

onBeforeMount(async () => {
  responseLoading.value = true;

  const response = await fetch(
    `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/related-identifier`,
    {
      method: "GET",
    }
  );

  responseLoading.value = false;

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  console.log(data);

  moduleData.related_identifiers = data.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });
});

const removeIdentifier = async (id: string) => {
  const item = moduleData.related_identifiers.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/related-identifier/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Something went wrong.");
      throw new Error("Network response was not ok");
    }

    push.success("Identifier removed successfully.");
  }

  moduleData.related_identifiers = moduleData.related_identifiers.filter((item) => item.id !== id);
};

const addIdentifier = () => {
  moduleData.related_identifiers.push({
    id: nanoid(),
    identifier: "",
    identifier_type: null,
    origin: "local",
    related_metadata_scheme: "",
    relation_type: null,
    resource_type: null,
    scheme_type: "",
    scheme_uri: "",
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data: any = moduleData.related_identifiers.map((item) => {
        const entry = {
          identifier: item.identifier,
          identifier_type: item.identifier_type,
          related_metadata_scheme: item.related_metadata_scheme || "",
          relation_type: item.relation_type,
          resource_type: item.resource_type || null,
          scheme_type: item.scheme_type || "",
          scheme_uri: item.scheme_uri || "",
        };

        if (item.origin === "local") {
          return entry;
        } else {
          return {
            ...entry,
            id: item.id,
          };
        }
      });

      submitLoading.value = true;

      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/related-identifier`,
        {
          body: JSON.stringify(data),

          method: "POST",
        }
      );

      submitLoading.value = false;

      if (!response.ok) {
        push.error("Something went wrong.");

        throw new Error("Network response was not ok");
      } else {
        push.success("Identifiers saved successfully.");

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
      title="Related Identifiers"
      description="Identifiers of related resources."
      linkName="dataset:overview"
      :linkParams="{ studyId: routeParams.studyId, datasetId: routeParams.datasetId }"
    />

    <n-divider />

    <FadeTransition>
      <LottieLoader v-if="responseLoading" />

      <n-form
        ref="formRef"
        :model="moduleData"
        size="large"
        label-placement="top"
        class="pr-4"
        v-else
      >
        <CollapsibleCard
          v-for="(item, index) in moduleData.related_identifiers"
          :key="item.id"
          class="mb-5 shadow-md"
          :title="`Identifier ${index + 1}`"
          bordered
        >
          <template #header-extra>
            <n-popconfirm @positive-click="removeIdentifier(item.id)">
              <template #trigger>
                <n-button type="error" secondary>
                  <template #icon>
                    <f-icon icon="ep:delete" />
                  </template>

                  Remove Identifier
                </n-button>
              </template>

              Are you sure you want to remove this identifier?
            </n-popconfirm>
          </template>

          <n-form-item
            label="Identifier"
            :path="`related_identifiers[${index}].identifier`"
            :rule="{
              message: 'Please enter an identifier',
              required: true,
              trigger: ['blur', 'input'],
            }"
          >
            <n-input
              v-model:value="item.identifier"
              placeholder="10.5281/zenodo.1234567"
              clearable
            />
          </n-form-item>

          <n-form-item
            label="Identifier Type"
            :path="`related_identifiers[${index}].identifier_type`"
            :rule="{
              message: 'Please select an identifier type',
              required: true,
              trigger: ['blur', 'change'],
            }"
          >
            <n-select
              v-model:value="item.identifier_type"
              placeholder="DOI"
              clearable
              :options="FORM_JSON.datasetIdentifierTypeOptions"
            />
          </n-form-item>

          <n-form-item
            label="Relation Type"
            :path="`related_identifiers[${index}].relation_type`"
            :rule="{
              message: 'Please select a relation type',
              required: true,
              trigger: ['blur', 'change'],
            }"
          >
            <n-select
              v-model:value="item.relation_type"
              placeholder="Is part of"
              clearable
              :options="FORM_JSON.datasetRelatedIdentifierRelationTypeOptions"
            />
          </n-form-item>

          <n-form-item label="Resource Type" :path="`related_identifiers[${index}].resource_type`">
            <n-select
              v-model:value="item.resource_type"
              placeholder="Dataset"
              clearable
              :options="FORM_JSON.datasetRelatedIdentifierResourceTypeOptions"
            />
          </n-form-item>

          <n-form-item
            label="Related Metadata Scheme"
            :path="`related_identifiers[${index}].related_metadata_scheme`"
            :rule="{
              message: 'Please enter a related metadata scheme',
              required:
                item.relation_type === 'IsMetadataFor' || item.relation_type === 'HasMetadata',
              trigger: ['blur', 'input'],
            }"
          >
            <n-input
              v-model:value="item.related_metadata_scheme"
              placeholder="DataCite"
              clearable
            />
          </n-form-item>

          <n-form-item
            label="Scheme Type"
            :path="`related_identifiers[${index}].scheme_type`"
            :rule="{
              message: 'Please enter a related metadata scheme',
              required:
                item.relation_type === 'IsMetadataFor' || item.relation_type === 'HasMetadata',
              trigger: ['blur', 'input'],
            }"
          >
            <n-input v-model:value="item.scheme_type" placeholder="DataCite" clearable />
          </n-form-item>

          <n-form-item
            label="Scheme URI"
            :path="`related_identifiers[${index}].scheme_uri`"
            :rule="{
              message: 'Please enter a related metadata scheme',
              required:
                item.relation_type === 'IsMetadataFor' || item.relation_type === 'HasMetadata',
              trigger: ['blur', 'input'],
            }"
          >
            <n-input
              v-model:value="item.scheme_uri"
              placeholder="https://datacite.org/schema/datacite-metadata-v4.3.xsd"
              clearable
            />
          </n-form-item>
        </CollapsibleCard>

        <n-button class="my-10 w-full" dashed type="success" @click="addIdentifier">
          <template #icon>
            <f-icon icon="gridicons:create" />
          </template>

          Add a new identifier
        </n-button>

        <n-divider />

        <div class="flex justify-start">
          <n-button size="large" type="primary" @click="saveMetadata" :loading="submitLoading">
            <template #icon>
              <f-icon icon="material-symbols:save" />
            </template>

            Save Metadata
          </n-button>
        </div>
      </n-form>
    </FadeTransition>
  </main>
</template>
