<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import type { DatasetRelatedItems } from "@/types/Dataset";

// import { baseURL } from "@/utils/constants";
const baseURL = "http://localhost:3001/api";

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

    push.success("Creator removed successfully.");
  }

  moduleData.related_items = moduleData.related_items.filter((item) => item.id !== id);
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
    titles: [],
    type: null,
    volume: "",
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data: any = moduleData.related_items.map((item) => {
        const entry = {};

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
        :title="item.type || `Date ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removeRelatedItem(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove date
              </n-button>
            </template>

            Are you sure you want to remove this date?
          </n-popconfirm>
        </template>

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
