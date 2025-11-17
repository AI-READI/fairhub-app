<script setup lang="ts">
import type { FormInst, MenuOption } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import { useStudyStore } from "@/stores/study";
import type { DatasetDataManagement } from "@/types/Dataset";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const push = usePush();

const studyStore = useStudyStore();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const studyId = routeParams.studyId;
const datasetId = routeParams.datasetId;

const routeState = window.history.state;
const missingFieldsList = (routeState?.missingFields || []).map((f) => f).join(", ");

const moduleData = reactive<DatasetDataManagement>({
  consent: {
    details: "",
    genetic_only: false,
    geog_restrict: false,
    no_methods: false,
    noncommercial: false,
    research_type: false,
    type: null,
  },
  deident: {
    dates: false,
    details: "",
    direct: false,
    hipaa: false,
    k_anon: false,
    nonarr: false,
    type: null,
  },
  subjects: [],
});

const formRef = ref<FormInst | null>(null);

const getLoading = ref(false);
const loading = ref(false);

onBeforeMount(async () => {
  getLoading.value = true;

  const response = await fetch(
    `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/data-management`,
    {
      method: "GET",
    }
  );

  getLoading.value = false;

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  moduleData.subjects = (data.subjects ?? []).map((item: any) => ({
    ...item,
    origin: "remote",
  }));
  moduleData.consent = {
    details: data.consent.details,
    genetic_only: data.consent.genetic_only,
    geog_restrict: data.consent.geog_restrict,
    no_methods: data.consent.no_methods,
    noncommercial: data.consent.noncommercial,
    research_type: data.consent.research_type,
    type: data.consent.type,
  };
  moduleData.deident = {
    dates: data.deident.dates,
    details: data.deident.details,
    direct: data.deident.direct,
    hipaa: data.deident.hipaa,
    k_anon: data.deident.k_anon,
    nonarr: data.deident.nonarr,
    type: data.deident.type,
  };
});

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data = {
        consent: {
          details: moduleData.consent.details || "",
          genetic_only: moduleData.consent.genetic_only,
          geog_restrict: moduleData.consent.geog_restrict,
          no_methods: moduleData.consent.no_methods,
          noncommercial: moduleData.consent.noncommercial,
          research_type: moduleData.consent.research_type,
          type: moduleData.consent.type,
        },
        deident: {
          dates: moduleData.deident.dates,
          details: moduleData.deident.details || "",
          direct: moduleData.deident.direct,
          hipaa: moduleData.deident.hipaa,
          k_anon: moduleData.deident.k_anon,
          nonarr: moduleData.deident.nonarr,
          type: moduleData.deident.type,
        },
        subjects: moduleData.subjects.map((item) => {
          const entry = {
            classification_code: item.classification_code || "",
            scheme: item.scheme || "",
            scheme_uri: item.scheme_uri || "",
            subject: item.subject,
            value_uri: item.value_uri || "",
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

      loading.value = true;

      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/data-management`,
        {
          body: JSON.stringify(data),
          method: "POST",
        }
      );

      loading.value = false;

      if (!response.ok) {
        push.error({
          title: "Failed to save status",
          message: "Something went wrong. Please try again later.",
        });

        throw new Error("Network response was not ok");
      }

      push.success("Status saved successfully");

      console.log("success");
    } else {
      console.log("error");
      console.log(errors);
    }
  });
};

const removeSubject = async (id: string) => {
  const item = moduleData.subjects.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/subject/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Something went wrong.");
      throw new Error("Network response was not ok");
    }

    push.success("Subject removed successfully.");
  }

  moduleData.subjects = moduleData.subjects.filter((item) => item.id !== id);
};

const addSubject = () => {
  moduleData.subjects.push({
    id: nanoid(),
    classification_code: "",
    origin: "local",
    scheme: "",
    scheme_uri: "",
    subject: "",
    value_uri: "",
  });
};

const scrollbarRef = ref<any>(null);

const menuOptions: MenuOption[] = [
  { key: "consent", label: "Consent" },
  { key: "subjects", label: "Subjects" },
  { key: "de-identification", label: "De-identification" },
];

const scrollToSection = (key: string) => {
  const section = document.querySelector(`.${key}`) as HTMLElement;
  scrollbarRef.value?.scrollTo({ behavior: "smooth", top: section.offsetTop });
};
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Data management"
      description=""
      linkName="dataset:overview"
      :linkParams="{ studyId: routeParams.studyId, datasetId: routeParams.datasetId }"
    />

    <n-divider />

    <n-scrollbar ref="scrollbarRef" class="max-h-[80vh]">
      <LottieLoader v-if="getLoading" />

      <div v-else class="flex flex-row-reverse max-lg:flex-col">
        <div class="w-[250px] max-lg:hidden lg:block">
          <n-menu
            :options="menuOptions"
            @update:value="scrollToSection"
            class="metadata w-[100%]"
          />
        </div>

        <div class="w-full pb-4 lg:hidden">
          <n-collapse accordion class="max-w-xxl rounded-md bg-gray-100 py-1 lg:hidden">
            <n-collapse-item title="On this page" name="menu">
              <n-menu class="metadata" :options="menuOptions" @update:value="scrollToSection" />
            </n-collapse-item>
          </n-collapse>
        </div>

        <FadeTransition>
          <n-form
            ref="formRef"
            :model="moduleData"
            size="small"
            :disabled="studyStore.currentStudyRole === 'viewer'"
            label-placement="top"
            class="w-full"
          >
            <div class="pb-4" v-if="routeState?.missingFields && routeState.missingFields.length">
              <n-alert type="error">
                Please fill the following required field(s):
                <span class="italic">
                  {{ missingFieldsList }}
                </span>
              </n-alert>
            </div>

            <h2 class="consent pb-4">Consent</h2>

            <n-card class="bg-gray-50">
              <n-form-item
                label="Type"
                :rule="{
                  message: 'Please select a type',
                  required: true,
                  trigger: ['blur', 'input'],
                }"
                path="consent.type"
              >
                <n-select
                  v-model:value="moduleData.consent.type"
                  placeholder="No Restriction"
                  clearable
                  :options="FORM_JSON.datasetConsentTypeOptions"
                />
              </n-form-item>

              <n-form-item
                label="Does the consent allows only non-commercial use of the data?"
                path="noncommercial"
                show-require-mark
              >
                <n-switch
                  v-model:value="moduleData.consent.noncommercial"
                  :round="true"
                  class="mx-1"
                  size="large"
                >
                  <template #checked> Yes </template>

                  <template #unchecked> No </template>
                </n-switch>
              </n-form-item>

              <n-form-item
                label="Does the consent allow only use of the data in a specific geographic location?"
                path="geog_restrict"
                show-require-mark
              >
                <n-switch
                  v-model:value="moduleData.consent.geog_restrict"
                  :round="true"
                  class="mx-1"
                  size="large"
                >
                  <template #checked> Yes </template>

                  <template #unchecked> No </template>
                </n-switch>
              </n-form-item>

              <n-form-item
                label="Does the consent allow only use of the data for a specific type of research?"
                path="research_type"
                show-require-mark
              >
                <n-switch
                  v-model:value="moduleData.consent.research_type"
                  :round="true"
                  class="mx-1"
                  size="large"
                >
                  <template #checked> Yes </template>

                  <template #unchecked> No </template>
                </n-switch>
              </n-form-item>

              <n-form-item
                label="Does the consent allow only use of the data for genetic research?"
                path="genetic_only"
                show-require-mark
              >
                <n-switch
                  v-model:value="moduleData.consent.genetic_only"
                  :round="true"
                  class="mx-1"
                  size="large"
                >
                  <template #checked> Yes </template>

                  <template #unchecked> No </template>
                </n-switch>
              </n-form-item>

              <n-form-item
                label="Does the consent allow only use of the data for research that does not involve the development of methods or algorithms?"
                path="no_methods"
                show-require-mark
              >
                <n-switch
                  v-model:value="moduleData.consent.no_methods"
                  :round="true"
                  class="mx-1"
                  size="large"
                >
                  <template #checked> Yes </template>

                  <template #unchecked> No </template>
                </n-switch>
              </n-form-item>

              <n-form-item label="Details" path="details">
                <n-input
                  v-model:value="moduleData.consent.details"
                  type="textarea"
                  placeholder="Provide further details of the de-identification of the dataset, perhaps referring to other documents and/or a URL"
                  clearable
                />
              </n-form-item>
            </n-card>

            <n-divider />

            <h2 class="subjects pb-4">Subjects</h2>

            <n-card class="bg-gray-50">
              <CollapsibleCard
                v-for="(item, index) in moduleData.subjects"
                :key="item.id"
                class="mb-5 shadow-md"
                :title="item.subject || `Subject ${index + 1}`"
                bordered
              >
                <template #header-extra>
                  <n-popconfirm
                    @positive-click="removeSubject(item.id)"
                    :disabled="studyStore.currentStudyRole === 'viewer'"
                  >
                    <template #trigger>
                      <n-button type="error" secondary>
                        <template #icon>
                          <f-icon icon="ep:delete" />
                        </template>

                        Remove subject
                      </n-button>
                    </template>

                    Are you sure you want to remove this subject?
                  </n-popconfirm>
                </template>

                <n-form-item
                  label="Subject"
                  :path="`subjects[${index}].subject`"
                  :rule="{
                    message: 'Please add the subject',
                    required: true,
                    trigger: ['blur', 'input'],
                  }"
                >
                  <n-input
                    v-model:value="item.subject"
                    placeholder="The subject, keyword, classification code, or key phrase that describes the resource."
                    clearable
                  />
                </n-form-item>

                <n-form-item label="Scheme" :path="`subjects[${index}].scheme`">
                  <n-input
                    v-model:value="item.scheme"
                    placeholder="ANZSRC Fields of Research"
                    clearable
                  />
                </n-form-item>

                <n-form-item label="Scheme URI" :path="`subjects[${index}].scheme_uri`">
                  <n-input
                    v-model:value="item.scheme_uri"
                    placeholder="https://id.loc.gov/authorities/subjects.html"
                    clearable
                  />
                </n-form-item>

                <n-form-item label="Value URI" :path="`subjects[${index}].value_uri`">
                  <n-input
                    v-model:value="item.value_uri"
                    placeholder="https://id.loc.gov/authorities/subjects/sh85118622.html"
                    clearable
                  />
                </n-form-item>

                <n-form-item
                  label="Classification Code"
                  :path="`subjects[${index}].classification_code`"
                >
                  <n-input
                    v-model:value="item.classification_code"
                    placeholder="https://id.loc.gov/authorities/subjects/sh85118622.html"
                    clearable
                  />
                </n-form-item>
              </CollapsibleCard>

              <n-button
                class="my-10 w-full"
                dashed
                type="success"
                @click="addSubject"
                :disabled="studyStore.currentStudyRole === 'viewer'"
              >
                <template #icon>
                  <f-icon icon="gridicons:create" />
                </template>

                Add a new subject
              </n-button>
            </n-card>

            <n-divider />

            <h2 class="de-identification pb-4">De-identification</h2>

            <n-card class="bg-gray-50">
              <n-form-item
                :rule="{
                  message: 'Please select a type',
                  required: true,
                  trigger: ['blur', 'input'],
                }"
                label="Type"
                path="deident.type"
              >
                <n-select
                  v-model:value="moduleData.deident.type"
                  placeholder="No De-identification applied"
                  clearable
                  :options="FORM_JSON.datasetDeIdentTypeOptions"
                />
              </n-form-item>

              <n-form-item label="Were direct identifiers removed?" path="direct" show-require-mark>
                <n-switch
                  v-model:value="moduleData.deident.direct"
                  :round="true"
                  class="mx-1"
                  size="large"
                >
                  <template #checked> Yes </template>

                  <template #unchecked> No </template>
                </n-switch>
              </n-form-item>

              <n-form-item
                label="Were US HIPAA de-identification rules applied?"
                path="hipaa"
                show-require-mark
              >
                <n-switch
                  v-model:value="moduleData.deident.hipaa"
                  :round="true"
                  class="mx-1"
                  size="large"
                >
                  <template #checked> Yes </template>

                  <template #unchecked> No </template>
                </n-switch>
              </n-form-item>

              <n-form-item
                label="Were dates rebased and/or replaced by integers?"
                path="dates"
                show-require-mark
              >
                <n-switch
                  v-model:value="moduleData.deident.dates"
                  :round="true"
                  class="mx-1"
                  size="large"
                >
                  <template #checked> Yes </template>

                  <template #unchecked> No </template>
                </n-switch>
              </n-form-item>

              <n-form-item
                label="Were narrative text fields removed?"
                path="nonarr"
                show-require-mark
              >
                <n-switch
                  v-model:value="moduleData.deident.nonarr"
                  :round="true"
                  class="mx-1"
                  size="large"
                >
                  <template #checked> Yes </template>

                  <template #unchecked> No </template>
                </n-switch>
              </n-form-item>

              <n-form-item
                label="Was k-anonymisation (k>=2) achieved?"
                path="k_anon"
                show-require-mark
              >
                <n-switch
                  v-model:value="moduleData.deident.k_anon"
                  :round="true"
                  class="mx-1"
                  size="large"
                >
                  <template #checked> Yes </template>

                  <template #unchecked> No </template>
                </n-switch>
              </n-form-item>

              <n-form-item label="Details" path="details">
                <n-input
                  v-model:value="moduleData.deident.details"
                  type="textarea"
                  placeholder="Provide further details of the de-identification of the dataset, perhaps referring to other documents and/or a URL"
                  clearable
                />
              </n-form-item>
            </n-card>

            <n-divider />

            <div class="flex justify-start pt-4">
              <n-button
                size="large"
                type="primary"
                @click="saveMetadata"
                :loading="loading"
                :disabled="studyStore.currentStudyRole === 'viewer'"
              >
                <template #icon>
                  <f-icon icon="material-symbols:save" />
                </template>

                Save Metadata
              </n-button>
            </div>
          </n-form>
        </FadeTransition>
      </div>
    </n-scrollbar>
  </main>
</template>
