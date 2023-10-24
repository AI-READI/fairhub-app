<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import type { DatasetFunders } from "@/types/Dataset";
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

const moduleData = reactive<DatasetFunders>({
  funders: [],
});

onBeforeMount(async () => {
  const response = await fetch(`${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/funder`, {
    method: "GET",
  });

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  console.log(data);

  moduleData.funders = data.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });
});

const removeFunder = async (id: string) => {
  const item = moduleData.funders.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/funder/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Something went wrong.");
      throw new Error("Network response was not ok");
    }

    push.success("Funder removed successfully.");
  }

  moduleData.funders = moduleData.funders.filter((item) => item.id !== id);
};

const addFunder = () => {
  moduleData.funders.push({
    id: nanoid(),
    name: "",
    award_number: "",
    award_title: "",
    award_uri: "",
    identifier: "",
    identifier_scheme_uri: "",
    identifier_type: null,
    origin: "local",
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data: any = moduleData.funders.map((item) => {
        const entry = {
          name: item.name,
          award_number: item.award_number || "",
          award_title: item.award_title || "",
          award_uri: item.award_uri || "",
          identifier: item.identifier || "",
          identifier_scheme_uri: item.identifier_scheme_uri || "",
          identifier_type: item.identifier_type || null,
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

      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/funder`,
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
      title="Funders"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      linkName="dataset:overview"
      :linkParams="{ studyId: routeParams.studyId, datasetId: routeParams.datasetId }"
    />

    <n-divider />

    <n-form ref="formRef" :model="moduleData" size="large" label-placement="top" class="pr-4">
      <CollapsibleCard
        v-for="(item, index) in moduleData.funders"
        :key="item.id"
        class="mb-5 shadow-md"
        :title="item.name || `Funder ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removeFunder(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove Funder
              </n-button>
            </template>

            Are you sure you want to remove this date?
          </n-popconfirm>
        </template>

        <n-form-item
          label="Name"
          :path="`funders[${index}].name`"
          :rule="{
            message: 'Please enter a name',
            required: true,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input
            v-model:value="item.name"
            placeholder="National Institutes of Health (NIH)"
            clearable
          />
        </n-form-item>

        <n-form-item
          label="Identifier"
          :path="`funders[${index}].identifier`"
          :rule="{
            message: 'Please enter an identifier',
            required: true,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input v-model:value="item.identifier" placeholder="123456789" clearable />
        </n-form-item>

        <n-form-item
          label="Identifier Scheme URI"
          :path="`funders[${index}].identifier_scheme_uri`"
        >
          <n-input
            v-model:value="item.identifier_scheme_uri"
            placeholder="https://ror.org"
            clearable
          />
        </n-form-item>

        <n-form-item label="Identifier Type" :path="`funders[${index}].identifier_type`">
          <n-select
            v-model:value="item.identifier_type"
            placeholder="ROR"
            clearable
            :options="FORM_JSON.datasetFunderIdentifierTypeOptions"
          />
        </n-form-item>

        <n-form-item
          label="Award Number"
          :path="`funders[${index}].award_number`"
          :rule="{
            message: 'Please enter an award number',
            required: true,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input v-model:value="item.award_number" placeholder="GBMF3859.01" clearable />
        </n-form-item>

        <n-form-item label="Award Title" :path="`funders[${index}].award_title`">
          <n-input
            v-model:value="item.award_title"
            placeholder="The Moore-Sloan Data Science Environments"
            clearable
          />
        </n-form-item>

        <n-form-item label="Award URI" :path="`funders[${index}].award_uri`">
          <n-input
            v-model:value="item.award_uri"
            placeholder="https://doi.org/10.35802/221400"
            clearable
          />
        </n-form-item>
      </CollapsibleCard>

      <n-button class="my-10 w-full" dashed type="success" @click="addFunder">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add a new funder
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
