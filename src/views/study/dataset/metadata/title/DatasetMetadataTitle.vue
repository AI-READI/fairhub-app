<script setup lang="ts">
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import type { DatasetTitles } from "@/types/Dataset";
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
const moduleData = reactive<DatasetTitles>({
  titles: [],
});

onBeforeMount(async () => {
  const response = await fetch(`${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/title`, {
    method: "GET",
  });

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Something went wrong.");
  }

  const data = await response.json();

  moduleData.titles = data.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });
});

const removeTitle = async (item_id: string) => {
  const item = moduleData.titles.find((item) => item.id === item_id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/title/${item.id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Something went wrong.");

      throw new Error("Something went wrong.");
    }

    push.success("Title deleted successfully");

    // refresh page
    router.go(0);
  }
};

const addTitle = () => {
  moduleData.titles.push({
    id: nanoid(),
    title: "",
    origin: "local",
    type: "AlternativeTitle",
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const tempTitles = moduleData.titles;

      for (const item of tempTitles) {
        // remove any items that have a duplicate title and type
        if (tempTitles.filter((i) => i.title === item.title && i.type === item.type).length > 1) {
          tempTitles.splice(tempTitles.indexOf(item), 1);
        }
      }

      const data = tempTitles.map((item) => {
        const entry = {
          title: item.title || "",
          type: item.type || null,
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

      // call the API to update the dataset
      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/title`,
        {
          body: JSON.stringify(data),
          method: "POST",
        }
      );

      if (!response.ok) {
        push.error("Something went wrong.");

        throw new Error("Something went wrong.");
      }

      push.success("Dataset titles updated successfully");

      // refresh page
      router.go(0);

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
      title="Titles"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      linkName="dataset:overview"
      :linkParams="{ studyId: routeParams.studyId, datasetId: routeParams.datasetId }"
    />

    <n-divider />

    <p class="pb-8 pt-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
      voluptatem, quibusdam, quos voluptas quae quas voluptatum
    </p>

    <n-form ref="formRef" :model="moduleData" size="large" label-placement="top" class="pr-4">
      <div
        class="flex w-full flex-row items-center justify-between space-x-8"
        v-for="(item, index) in moduleData.titles"
        :key="index"
      >
        <n-space vertical class="w-full">
          <div class="flex w-full flex-row items-center justify-between space-x-4">
            <n-form-item
              label="Name"
              :path="`titles[${index}].title`"
              :rule="{
                message: 'Please enter the title',
                required: true,
                trigger: ['blur', 'change'],
              }"
              class="w-full"
            >
              <n-input
                v-model:value="item.title"
                placeholder="10.1038/s41597-023-02463-x"
                clearable
              />
            </n-form-item>

            <n-form-item
              label="Type"
              :path="`titles[${index}].type`"
              :rule="{
                message: 'Please select the type of this title',
                required: true,
                trigger: ['blur', 'input'],
              }"
              class="w-full"
            >
              <n-select
                v-model:value="item.type"
                placeholder="DOI"
                clearable
                :disabled="item.type === 'MainTitle'"
                :options="FORM_JSON.datasetTitleTypeOptions"
              />
            </n-form-item>
          </div>
        </n-space>

        <n-popconfirm @positive-click="removeTitle(item.id)" class="self-justify-end">
          <template #trigger>
            <n-button class="ml-0" size="large" type="error" :disabled="item.type === 'MainTitle'">
              <f-icon icon="gridicons:trash" />
            </n-button>
          </template>

          Are you sure you want to remove this title?
        </n-popconfirm>
      </div>

      <n-button class="mb-10 w-full" dashed type="success" @click="addTitle">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add a new title
      </n-button>

      <n-divider />
    </n-form>

    <n-divider />

    <div class="flex justify-start">
      <n-button size="large" type="primary" @click="saveMetadata">
        <template #icon>
          <f-icon icon="material-symbols:save" />
        </template>
        Save changes
      </n-button>
    </div>
  </main>
</template>
