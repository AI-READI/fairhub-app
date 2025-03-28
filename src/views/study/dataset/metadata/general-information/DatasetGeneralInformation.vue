<script setup lang="ts">
import type { MenuOption } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import LottieLoader from "@/components/loader/LottieLoader.vue";
import FadeTransition from "@/components/transitions/FadeTransition.vue";
import { useStudyStore } from "@/stores/study";
import type { DatasetGeneralInformation } from "@/types/Dataset";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const push = usePush();

const studyStore = useStudyStore();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const studyId = routeParams.studyId;
const datasetId = routeParams.datasetId;

const formRef = ref<FormInst | null>(null);
const moduleData = reactive<DatasetGeneralInformation>({
  dates: [],
  descriptions: [],
  titles: [],
});

const loading = ref(false);
const submitLoading = ref(false);

onBeforeMount(async () => {
  loading.value = true;

  const response = await fetch(
    `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/general-information`,
    {
      method: "GET",
    }
  );

  loading.value = false;

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Something went wrong.");
  }

  const data = await response.json();
  moduleData.titles = (data.titles ?? []).map((item: any) => ({
    ...item,
    origin: "remote",
  }));

  moduleData.descriptions = (data.descriptions ?? []).map((item: any) => ({
    ...item,
    origin: "remote",
  }));

  moduleData.dates = (data.dates ?? []).map((item: any) => ({
    ...item,
    origin: "remote",
  }));
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

    moduleData.titles = moduleData.titles.filter((item) => item.id !== item_id);
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

const removeDescription = async (item_id: string) => {
  const item = moduleData.descriptions.find((item) => item.id === item_id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/description/${item.id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Something went wrong.");

      throw new Error("Something went wrong.");
    }
    push.success("Dataset description removed successfully");
  }

  moduleData.descriptions = moduleData.descriptions.filter((item) => item.id !== item_id);
};
const addDescription = () => {
  moduleData.descriptions.push({
    id: nanoid(),
    description: "",
    origin: "local",
    type: null,
  });
};

const removeDate = async (id: string) => {
  const item = moduleData.dates.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/date/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Something went wrong.");
      throw new Error("Network response was not ok");
    }

    push.success("Date removed successfully.");
  }

  moduleData.dates = moduleData.dates.filter((item) => item.id !== id);
};

const addDate = () => {
  moduleData.dates.push({
    id: nanoid(),
    date: null,
    information: "",
    origin: "local",
    type: null,
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

      const data = {
        dates: moduleData.dates.map((item) => {
          const entry = {
            date: item.date,
            information: item.information || "",
            type: item.type,
          };

          if (item.origin === "local") {
            return entry;
          } else {
            return {
              ...entry,
              id: item.id,
            };
          }
        }),
        descriptions: moduleData.descriptions.map((item) => {
          const entry = {
            description: item.description,
            type: item.type,
          };

          if (item.origin === "local") {
            return entry;
          } else {
            return {
              ...entry,
              id: item.id,
            };
          }
        }),
        titles: tempTitles.map((item) => {
          const entry = {
            title: item.title,
            type: item.type,
          };

          if (item.origin === "local") {
            return entry;
          } else {
            return {
              ...entry,
              id: item.id,
            };
          }
        }),
      };

      submitLoading.value = true;

      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/general-information`,
        {
          body: JSON.stringify(data),
          method: "POST",
        }
      );

      submitLoading.value = false;

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
const scrollbarRef = ref<any>(null);

const menuOptions: MenuOption[] = [
  { key: "titles", label: "Titles" },
  { key: "description", label: "Description" },
  { key: "dates", label: "Dates" },
];

const scrollToSection = (key: string) => {
  const section = document.querySelector(`.${key}`) as HTMLElement;
  scrollbarRef.value?.scrollTo({ behavior: "smooth", top: section.offsetTop });
};
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="General information"
      description=""
      linkName="dataset:overview"
      :linkParams="{ studyId: routeParams.studyId, datasetId: routeParams.datasetId }"
    />

    <n-divider />

    <n-scrollbar ref="scrollbarRef" class="max-h-[80vh]">
      <LottieLoader v-if="loading" />

      <div v-else class="flex flex-row-reverse justify-end max-lg:flex-col">
        <div class="w-[250px] max-w-xl max-lg:hidden lg:block">
          <n-menu
            :options="menuOptions"
            @update:value="scrollToSection"
            class="metadata w-[100%]"
          />
        </div>

        <div class="w-full lg:hidden">
          <n-collapse accordion class="max-w-xxl rounded-md bg-gray-100 py-1 lg:hidden">
            <n-collapse-item title="On this page" name="menu">
              <n-menu :options="menuOptions" @update:value="scrollToSection" />
            </n-collapse-item>
          </n-collapse>
        </div>

        <FadeTransition>
          <n-form
            ref="formRef"
            class="w-full"
            :model="moduleData"
            size="small"
            label-placement="top"
            :disabled="studyStore.currentStudyRole === 'viewer'"
          >
            <h2 class="py-4">Titles</h2>

            <n-card class="bg-gray-50">
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
                    <n-button
                      class="ml-0"
                      size="large"
                      type="error"
                      :disabled="
                        item.type === 'MainTitle' || studyStore.currentStudyRole === 'viewer'
                      "
                    >
                      <f-icon icon="gridicons:trash" />
                    </n-button>
                  </template>

                  Are you sure you want to remove this title?
                </n-popconfirm>
              </div>

              <n-button
                class="mb-10 w-full"
                dashed
                type="success"
                @click="addTitle"
                :disabled="studyStore.currentStudyRole === 'viewer'"
              >
                <template #icon>
                  <f-icon icon="gridicons:create" />
                </template>

                Add a new title
              </n-button>
            </n-card>

            <n-divider />

            <h2 class="py-4">Description</h2>

            <n-card class="bg-gray-50">
              <div
                class="flex w-full flex-row items-center justify-between space-x-8"
                v-for="(item, index) in moduleData.descriptions"
                :key="index"
              >
                <n-space vertical class="w-full">
                  <div class="flex w-full flex-row items-start justify-between space-x-4">
                    <n-form-item
                      label="Description"
                      :path="`descriptions[${index}].description`"
                      :rule="{
                        message: 'Please enter the description',
                        required: true,
                        trigger: ['blur', 'change'],
                      }"
                      class="w-full"
                    >
                      <n-input
                        v-model:value="item.description"
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        type="textarea"
                        clearable
                      />
                    </n-form-item>

                    <n-form-item
                      label="Type"
                      :path="`descriptions[${index}].type`"
                      :rule="{
                        message: 'Please select the type of this description',
                        required: true,
                        trigger: ['blur', 'input'],
                      }"
                      class="w-full"
                    >
                      <n-select
                        v-model:value="item.type"
                        placeholder="Methods"
                        clearable
                        :disabled="item.type === 'Abstract'"
                        :options="FORM_JSON.datasetDescriptionTypeOptions"
                      />
                    </n-form-item>
                  </div>
                </n-space>

                <n-popconfirm @positive-click="removeDescription(item.id)" class="self-justify-end">
                  <template #trigger>
                    <n-button
                      class="ml-0"
                      size="large"
                      type="error"
                      :disabled="
                        item.type === 'Abstract' || studyStore.currentStudyRole === 'viewer'
                      "
                    >
                      <f-icon icon="gridicons:trash" />
                    </n-button>
                  </template>

                  Are you sure you want to remove this description?
                </n-popconfirm>
              </div>

              <n-button
                class="mb-10 w-full"
                dashed
                type="success"
                @click="addDescription"
                :disabled="studyStore.currentStudyRole === 'viewer'"
              >
                <template #icon>
                  <f-icon icon="gridicons:create" />
                </template>

                Add a new description
              </n-button>
            </n-card>

            <h2 class="py-4">Dates</h2>

            <n-card class="bg-gray-50">
              <CollapsibleCard
                v-for="(item, index) in moduleData.dates"
                :key="item.id"
                class="mb-5 shadow-md"
                :title="item.type || `Date ${index + 1}`"
                bordered
              >
                <template #header-extra>
                  <n-popconfirm @positive-click="removeDate(item.id)">
                    <template #trigger>
                      <n-button
                        type="error"
                        secondary
                        :disabled="studyStore.currentStudyRole === 'viewer'"
                      >
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
                </n-form-item>

                <n-form-item
                  label="Type"
                  :path="`dates[${index}].type`"
                  :rule="{
                    message: 'Please select the ',
                    required: true,
                    trigger: ['blur', 'change'],
                  }"
                >
                  <n-select
                    v-model:value="item.type"
                    placeholder="Accepted"
                    clearable
                    :options="FORM_JSON.datasetDateTypeOptions"
                  />
                </n-form-item>

                <n-form-item label="Information" :path="`dates[${index}].information`">
                  <n-input
                    v-model:value="item.information"
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    type="textarea"
                    clearable
                  />
                </n-form-item>
              </CollapsibleCard>

              <n-button
                class="my-10 w-full"
                dashed
                type="success"
                @click="addDate"
                :disabled="studyStore.currentStudyRole === 'viewer'"
              >
                <template #icon>
                  <f-icon icon="gridicons:create" />
                </template>

                Add a new date
              </n-button>
            </n-card>

            <div class="flex justify-start pt-4">
              <n-button
                size="large"
                type="primary"
                @click="saveMetadata"
                :loading="submitLoading"
                :disabled="studyStore.currentStudyRole === 'viewer'"
              >
                <template #icon>
                  <f-icon icon="material-symbols:save" />
                </template>
                Save changes
              </n-button>
            </div>
          </n-form>
        </FadeTransition>
      </div>
    </n-scrollbar>
  </main>
</template>
