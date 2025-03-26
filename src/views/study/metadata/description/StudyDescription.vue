<script setup lang="ts">
import type { FormInst, FormRules, MenuOption } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import { useStudyStore } from "@/stores/study";
import type { StudyDescription } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const push = usePush();

const studyStore = useStudyStore();

const formRef = ref<FormInst | null>(null);

const moduleData = reactive<StudyDescription>({
  conditions: [],
  description: {
    brief_summary: "",
    detailed_description: "",
  },
  identification: {
    primary: {
      id: "",
      identifier: "",
      identifier_domain: "",
      identifier_link: "",
      identifier_type: null,
    },
    secondary: [],
  },
  keywords: [],
});

const rules: FormRules = {
  brief_summary: [
    {
      message: "Please enter a brief summary",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
};

const loading = ref(false);
const responseLoading = ref(false);

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  responseLoading.value = true;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/description`, {
    method: "GET",
  });

  responseLoading.value = false;

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.description = {
    brief_summary: data.description.brief_summary,
    detailed_description: data.description.detailed_description,
  };
  moduleData.keywords = data.keywords.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });
  moduleData.conditions = data.conditions.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });
  moduleData.identification.primary = {
    id: data.identification.primary.id,
    identifier: data.identification.primary.identifier,
    identifier_domain: data.identification.primary.identifier_domain,
    identifier_link: data.identification.primary.identifier_link,
    identifier_type: data.identification.primary.identifier_type,
  };
  moduleData.identification.secondary = data.identification.secondary.map((item: any) => ({
    ...item,
    origin: "remote",
  }));
});

const removeKeyword = async (id: string) => {
  const item = moduleData.keywords.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${route.params.studyId}/metadata/keywords/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Failed to delete central contact");
      throw new Error("Network response was not ok");
    }
  }

  moduleData.keywords = moduleData.keywords.filter((item) => item.id !== id);

  push.success("Keyword deleted successfully");
};

const addKeyword = () => {
  moduleData.keywords.push({
    id: nanoid(),
    name: "",
    classification_code: "",
    keyword_uri: "",
    origin: "local",
    scheme: "",
    scheme_uri: "",
  });
};

const addCondition = () => {
  moduleData.conditions.push({
    id: nanoid(),
    name: "",
    classification_code: "",
    condition_uri: "",
    origin: "local",
    scheme: "",
    scheme_uri: "",
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data = {
        conditions: moduleData.conditions.map((item) => {
          const entry = {
            name: item.name,
            classification_code: item.classification_code,
            condition_uri: item.condition_uri,
            scheme: item.scheme,
            scheme_uri: item.scheme_uri,
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
        description: {
          brief_summary: moduleData.description.brief_summary,
          detailed_description: moduleData.description.detailed_description || "",
        },
        identification: {
          primary: {
            identifier: moduleData.identification.primary.identifier,
            identifier_domain: moduleData.identification.primary.identifier_domain || "",
            identifier_link: moduleData.identification.primary.identifier_link || "",
            identifier_type: moduleData.identification.primary.identifier_type,
          },
          secondary: moduleData.identification.secondary.map((item) => {
            const entry = {
              identifier: item.identifier,
              identifier_domain: item.identifier_domain || "",
              identifier_link: item.identifier_link || "",
              identifier_type: item.identifier_type,
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
        },
        keywords: moduleData.keywords.map((item) => {
          const entry = {
            name: item.name,
            classification_code: item.classification_code,
            keyword_uri: item.keyword_uri,
            scheme: item.scheme,
            scheme_uri: item.scheme_uri,
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
        `${baseURL}/study/${route.params.studyId}/metadata/description`,
        {
          body: JSON.stringify(data),
          method: "POST",
        }
      );

      loading.value = false;

      if (!response.ok) {
        push.error("Something went wrong. Please try again later.");
        throw new Error("Network response was not ok");
      } else {
        push.success("Study updated successfully.");

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

const removeCondition = async (id: string) => {
  const item = moduleData.conditions.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${route.params.studyId}/metadata/conditions/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Failed to delete central contact");
      throw new Error("Network response was not ok");
    }
  }

  moduleData.conditions = moduleData.conditions.filter((item) => item.id !== id);

  push.success("Condition deleted successfully");
};

const addSecondaryIdentifier = () => {
  moduleData.identification.secondary.push({
    id: nanoid(),
    identifier: "",
    identifier_domain: "",
    identifier_link: "",
    identifier_type: null,
    origin: "local",
  });
};

const removeSecondaryIdentifier = async (id: string) => {
  const item = moduleData.identification.secondary.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${route.params.studyId}/metadata/identification/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Something went wrong. Please try again.");
      throw new Error("Network response was not ok");
    }

    push.success("Identifier removed successfully.");
  }

  moduleData.identification.secondary = moduleData.identification.secondary.filter(
    (item) => item.id !== id
  );
};
const menuOptions: MenuOption[] = [
  { key: "description", label: "Description" },
  { key: "keywords", label: "Keywords" },
  { key: "conditions", label: "Conditions" },
  { key: "identification", label: "Identification" },
];

const scrollbarRef = ref<any>(null);

const scrollToSection = (key: string) => {
  const section = document.querySelector(`.${key}`) as HTMLElement;
  scrollbarRef.value?.scrollTo({ behavior: "smooth", top: section.offsetTop });
};
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Study Description"
      description=""
      linkName="study:overview"
      :linkParams="{
        studyId: route.params.studyId,
      }"
    />

    <n-divider />

    <div class="flex flex-row-reverse max-lg:flex-col">
      <div class="w-[300px] max-w-xl max-lg:hidden lg:block">
        <n-menu :options="menuOptions" @update:value="scrollToSection" class="w-[100%]" />
      </div>

      <div class="w-full lg:hidden">
        <n-collapse accordion class="max-w-xxl rounded-md bg-gray-100 py-1 lg:hidden">
          <n-collapse-item title="On this page" name="menu">
            <n-menu class="metadata" :options="menuOptions" @update:value="scrollToSection" />
          </n-collapse-item>
        </n-collapse>
      </div>

      <n-scrollbar ref="scrollbarRef" class="max-h-[80vh]">
        <FadeTransition>
          <LottieLoader v-if="responseLoading" />

          <n-form
            ref="formRef"
            :model="moduleData"
            :rules="rules"
            size="large"
            label-placement="top"
            :disabled="studyStore.currentStudyRole === 'viewer'"
            v-else
          >
            <h2 class="description py-4">Description</h2>

            <n-card class="rounded-xl bg-gray-50">
              <SubHeadingText
                title="Brief Summary"
                description="Short description of the clinical study, written in language intended for the lay public."
              />

              <n-form-item
                label="Brief_summary"
                path="description.brief_summary"
                :show-label="false"
              >
                <n-input
                  v-model:value="moduleData.description.brief_summary"
                  type="textarea"
                  maxlength="5000"
                  show-count
                  placeholder="Short description of the clinical study, written in language intended for the lay public."
                  :rows="4"
                />
              </n-form-item>

              <SubHeadingText
                title="Detailed Description"
                description="Extended description of the study, including more technical information (as compared to the Brief Summary), if desired. Do not include the entire protocol; do not duplicate information recorded in other data elements, such as Eligibility Criteria or outcome measures"
              />

              <n-form-item
                label="Detailed Description"
                path="detailed_description"
                :show-label="false"
              >
                <n-input
                  v-model:value="moduleData.description.detailed_description"
                  type="textarea"
                  placeholder="Add your detailed description here"
                  :rows="10"
                />
              </n-form-item>
            </n-card>

            <n-divider></n-divider>

            <h2 class="keywords py-4">Keywords</h2>

            <n-card class="rounded-xl bg-gray-50">
              <CollapsibleCard
                v-for="(item, index) in moduleData.keywords"
                :key="item.id"
                class="mb-5 shadow-md"
                :title="item.name || `Keyword ${index + 1}`"
                bordered
              >
                <template #header-extra>
                  <n-popconfirm @positive-click="removeKeyword(item.id)">
                    <template #trigger>
                      <n-button type="error" secondary>
                        <template #icon>
                          <f-icon icon="ep:delete" />
                        </template>

                        Remove Keyword
                      </n-button>
                    </template>

                    Are you sure you want to remove this Keyword?
                  </n-popconfirm>
                </template>

                <n-form-item
                  label="Name"
                  :path="`keywords[${index}].name`"
                  :rule="{
                    message: 'Please enter a name',
                    required: true,
                    trigger: ['blur', 'change'],
                  }"
                >
                  <n-input
                    v-model:value="item.name"
                    placeholder="Artificial intelligence"
                    clearable
                  />
                </n-form-item>

                <n-form-item
                  label="Identifier"
                  :path="`keywords[${index}].classification_code`"
                  :rule="{
                    message: 'Please enter an identifier',
                    required: item.scheme,
                    trigger: ['blur', 'change'],
                  }"
                >
                  <n-input
                    v-model:value="item.classification_code"
                    placeholder="D001185"
                    clearable
                  />
                </n-form-item>

                <n-form-item
                  label="Identifier Scheme"
                  :path="`keywords[${index}].scheme`"
                  :rule="{
                    message: 'Please enter a scheme',
                    required: item.classification_code,
                    trigger: ['blur', 'change'],
                  }"
                >
                  <n-input v-model:value="item.scheme" placeholder="MeSH" clearable />
                </n-form-item>

                <n-form-item label="Scheme URI" :path="`keywords[${index}].scheme_uri`">
                  <n-input
                    v-model:value="item.scheme_uri"
                    placeholder="ttps://meshb.nlm.nih.gov/"
                    clearable
                  />
                </n-form-item>

                <n-form-item label="Keyword URI" :path="`keywords[${index}].keyword_uri`">
                  <n-input
                    v-model:value="item.keyword_uri"
                    placeholder="https://meshb.nlm.nih.gov/record/ui?ui=D001185"
                    clearable
                  />
                </n-form-item>
              </CollapsibleCard>

              <n-button class="my-10 w-full" dashed type="success" @click="addKeyword">
                <template #icon>
                  <f-icon icon="gridicons:create" />
                </template>

                Add a Keyword
              </n-button>
            </n-card>

            <n-divider></n-divider>

            <h2 class="conditions py-3">Conditions</h2>

            <n-card class="rounded-xl bg-gray-50">
              <CollapsibleCard
                v-for="(item, index) in moduleData.conditions"
                :key="item.id"
                class="mb-5 shadow-md"
                :title="item.name || `Condition ${index + 1}`"
                bordered
              >
                <template #header-extra>
                  <n-popconfirm @positive-click="removeCondition(item.id)">
                    <template #trigger>
                      <n-button type="error" secondary>
                        <template #icon>
                          <f-icon icon="ep:delete" />
                        </template>

                        Remove Condition
                      </n-button>
                    </template>

                    Are you sure you want to remove this Condition?
                  </n-popconfirm>
                </template>

                <n-form-item
                  label="Name"
                  :path="`conditions[${index}].name`"
                  :rule="{
                    message: 'Please enter a name',
                    required: true,
                    trigger: ['blur', 'change'],
                  }"
                >
                  <n-input v-model:value="item.name" placeholder="Diabetes mellitus" clearable />
                </n-form-item>

                <n-form-item
                  label="Identifier"
                  :path="`conditions[${index}].classification_code`"
                  :rule="{
                    message: 'Please enter an identifier',
                    required: item.scheme,
                    trigger: ['blur', 'change'],
                  }"
                >
                  <n-input
                    v-model:value="item.classification_code"
                    placeholder="45636-8"
                    clearable
                  />
                </n-form-item>

                <n-form-item
                  label="Identifier Scheme"
                  :path="`conditions[${index}].scheme`"
                  :rule="{
                    message: 'Please enter a scheme',
                    required: item.classification_code,
                    trigger: ['blur', 'change'],
                  }"
                >
                  <n-input v-model:value="item.scheme" placeholder="LOINC" clearable />
                </n-form-item>

                <n-form-item label="Scheme URI" :path="`conditions[${index}].scheme_uri`">
                  <n-input
                    v-model:value="item.scheme_uri"
                    placeholder="https://loinc.org"
                    clearable
                  />
                </n-form-item>

                <n-form-item label="Condition URI" :path="`conditions[${index}].condition_uri`">
                  <n-input
                    v-model:value="item.condition_uri"
                    placeholder="https://loinc.org/45636-8"
                    clearable
                  />
                </n-form-item>
              </CollapsibleCard>

              <n-button class="my-10 w-full" dashed type="success" @click="addCondition">
                <template #icon>
                  <f-icon icon="gridicons:create" />
                </template>

                Add a Condition
              </n-button>
            </n-card>

            <n-divider></n-divider>

            <h2 class="identification py-3">Identification</h2>

            <n-card class="rounded-xl bg-gray-50">
              <h3>Primary Identifier</h3>

              <p class="pb-8 pt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia
                voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum
              </p>

              <n-form-item label="Identifier" path="identification.primary.identifier">
                <n-input
                  v-model:value="moduleData.identification.primary.identifier"
                  placeholder="1-R01-MH99999-01A1"
                  clearable
                />
              </n-form-item>

              <n-form-item
                label="Type"
                path="identification.primary.identifier_type"
                :rule="{
                  message: 'Please select a identifier type',
                  required: true,
                  trigger: ['blur', 'change'],
                }"
              >
                <n-select
                  v-model:value="moduleData.identification.primary.identifier_type"
                  placeholder="NIH Grant Number"
                  clearable
                  :options="FORM_JSON.studyMetadataIdentificationPrimaryIdentifierTypeOptions"
                />
              </n-form-item>

              <n-form-item
                label="Domain"
                path="identification.primary.identifier_domain"
                placeholder="ClinicalTrials.gov"
                :rule="{
                  message: 'Please enter a domain',
                  required:
                    moduleData.identification.primary.identifier_type &&
                    (moduleData.identification.primary.identifier_type ===
                      'Other Grant/Funding Number' ||
                      moduleData.identification.primary.identifier_type === 'Other Identifier' ||
                      moduleData.identification.primary.identifier_type === 'Registry Identifier'),
                  trigger: ['blur', 'input'],
                }"
              >
                <n-input
                  v-model:value="moduleData.identification.primary.identifier_domain"
                  placeholder="Add a domain"
                  clearable
                />
              </n-form-item>

              <n-form-item label="Link" path="identification.primary.identifier_link">
                <n-input
                  v-model:value="moduleData.identification.primary.identifier_link"
                  placeholder="https://clinicaltrials.gov"
                  clearable
                />
              </n-form-item>

              <n-divider />

              <h3>Alternative Identifiers</h3>

              <p class="pb-8 pt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia
                voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum
              </p>

              <CollapsibleCard
                v-for="(item, index) in moduleData.identification.secondary"
                :key="item.id"
                class="mb-5 shadow-md"
                :title="`Alternative Identifier ${index + 1}`"
                bordered
              >
                <template #header-extra>
                  <n-popconfirm @positive-click="removeSecondaryIdentifier(item.id)">
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
                  :path="`identification.secondary[${index}].identifier`"
                  :rule="{
                    message: 'Please enter a study identifier',
                    required: true,
                    trigger: ['blur', 'input'],
                  }"
                >
                  <n-input
                    v-model:value="item.identifier"
                    placeholder="1-R01-MH99999-01A1"
                    clearable
                  />
                </n-form-item>

                <n-form-item
                  label="Type"
                  :path="`identification.secondary[${index}].identifier_type`"
                  :rule="{
                    message: 'Please select a study type',
                    required: true,
                    trigger: ['blur', 'change'],
                  }"
                >
                  <n-select
                    v-model:value="item.identifier_type"
                    placeholder="Other Grant/Funding Number"
                    clearable
                    :options="FORM_JSON.studyMetadataIdentificationPrimaryIdentifierTypeOptions"
                  />
                </n-form-item>

                <n-form-item
                  label="Domain"
                  :path="`identification.secondary[${index}].identifier_domain`"
                  :rule="{
                    message: 'Please enter a domain',
                    required:
                      item.identifier_type &&
                      (item.identifier_type === 'Other Grant/Funding Number' ||
                        item.identifier_type === 'Other Identifier' ||
                        item.identifier_type === 'Registry Identifier'),
                    trigger: ['blur', 'input'],
                  }"
                >
                  <n-input
                    v-model:value="item.identifier_domain"
                    placeholder="ClinicalTrials.gov"
                    clearable
                  />
                </n-form-item>

                <n-form-item
                  label="Link"
                  :path="`identification.secondary[${index}].identifier_link`"
                >
                  <n-input
                    v-model:value="item.identifier_link"
                    placeholder="https://clinicaltrials.gov"
                    clearable
                  />
                </n-form-item>
              </CollapsibleCard>

              <n-button class="my-10 w-full" dashed type="success" @click="addSecondaryIdentifier">
                <template #icon>
                  <f-icon icon="gridicons:create" />
                </template>

                Add an alternative identifier
              </n-button>
            </n-card>

            <div class="flex justify-start pt-8">
              <n-button
                size="large"
                type="primary"
                :disabled="studyStore.currentStudyRole === 'viewer'"
                @click="saveMetadata"
                :loading="loading"
              >
                <template #icon>
                  <f-icon icon="material-symbols:save" />
                </template>

                Save Metadata
              </n-button>
            </div>
          </n-form>
        </FadeTransition>
      </n-scrollbar>
    </div>
  </main>
</template>
