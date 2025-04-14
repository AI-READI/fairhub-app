<script setup lang="ts">
import type { FormInst, MenuOption } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import LottieLoader from "@/components/loader/LottieLoader.vue";
import { useStudyStore } from "@/stores/study";
import type { DatasetTeam } from "@/types/Dataset";
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

const moduleData = reactive<DatasetTeam>({
  contributors: [],
  creators: [],
  funders: [],
  managing_organization: {
    name: "",
    identifier: "",
    identifier_scheme: "",
    identifier_scheme_uri: "",
  },
});

const responseLoading = ref(false);
const submitLoading = ref(false);

onBeforeMount(async () => {
  responseLoading.value = true;

  const response = await fetch(`${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/team`, {
    method: "GET",
  });

  responseLoading.value = false;

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  moduleData.managing_organization = {
    name: data.managing_organization.name,
    identifier: data.managing_organization.identifier,
    identifier_scheme: data.managing_organization.identifier_scheme,
    identifier_scheme_uri: data.managing_organization.identifier_scheme_uri,
  };

  moduleData.creators = (data.creators ?? []).map((item: any) => ({
    ...item,
    origin: "remote",
  }));
  moduleData.contributors = (data.contributors ?? []).map((item: any) => ({
    ...item,
    origin: "remote",
  }));
  moduleData.funders = (data.funders ?? []).map((item: any) => ({
    ...item,
    origin: "remote",
  }));
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
    affiliations: [],
    family_name: "",
    given_name: "",
    name_identifier: "",
    name_identifier_scheme: "",
    name_identifier_scheme_uri: "",
    name_type: null,
    origin: "local",
  });
};

const removeContributor = async (id: string) => {
  const item = moduleData.contributors.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/contributor/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      push.error("Something went wrong.");
      throw new Error("Network response was not ok");
    }

    push.success("Contributor removed successfully.");
  }

  moduleData.contributors = moduleData.contributors.filter((item) => item.id !== id);
};

const addContributor = () => {
  moduleData.contributors.push({
    id: nanoid(),
    affiliations: [],
    contributor_type: null,
    family_name: "",
    given_name: "",
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
      const data: any = {
        contributors: moduleData.contributors.map((item) => {
          const entry = {
            affiliations: item.affiliations.map((affiliation) => {
              return {
                name: affiliation.name || "",
                identifier: affiliation.identifier || "",
                scheme: affiliation.scheme || "",
                scheme_uri: affiliation.scheme_uri || "",
              };
            }),
            contributor_type: item.contributor_type,
            family_name: item.family_name || "",
            given_name: item.given_name,
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
        }),
        creators: moduleData.creators.map((item) => {
          const entry = {
            affiliations: item.affiliations.map((affiliation) => {
              return {
                name: affiliation.name || "",
                identifier: affiliation.identifier || "",
                scheme: affiliation.scheme || "",
                scheme_uri: affiliation.scheme_uri || "",
              };
            }),
            family_name: item.family_name || "",
            given_name: item.given_name,
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
        }),
        funders: moduleData.funders.map((item) => {
          const entry = {
            name: item.name,
            award_number: item.award_number,
            award_title: item.award_title || "",
            award_uri: item.award_uri || "",
            identifier: item.identifier,
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
        }),
        managing_organization: {
          name: moduleData.managing_organization.name,
          identifier: moduleData.managing_organization.identifier || "",
          identifier_scheme: moduleData.managing_organization.identifier_scheme || "",
          identifier_scheme_uri: moduleData.managing_organization.identifier_scheme_uri || "",
        },
      };
      submitLoading.value = true;

      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/team`,
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
        push.success("Creators saved successfully.");

        // refresh page
        router.push({
          name: "dataset:metadata:data-management",
          params: { datasetId: datasetId, studyId },
        });
      }

      console.log("success");
    } else {
      console.log("error");
      console.log(errors);
    }
  });
};

const scrollbarRef = ref<any>(null);

const menuOptions: MenuOption[] = [
  { key: "creators", label: "Creators" },
  { key: "contributors", label: "Contributors" },
  { key: "managing-organization", label: "Managing organization" },
  { key: "funders", label: "Funders" },
];

const scrollToSection = (key: string) => {
  const section = document.querySelector(`.${key}`) as HTMLElement;
  scrollbarRef.value?.scrollTo({ behavior: "smooth", top: section.offsetTop });
};
const previousPage = () => {
  router.push({
    name: "dataset:metadata:identifiers",
    params: { datasetId: datasetId, studyId },
  });
};
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Team"
      description=""
      linkName="dataset:overview"
      :linkParams="{ studyId: routeParams.studyId, datasetId: routeParams.datasetId }"
    />

    <n-divider />

    <n-scrollbar ref="scrollbarRef" class="max-h-[80vh]">
      <LottieLoader v-if="responseLoading" />

      <div v-else class="flex flex-row-reverse max-lg:flex-col">
        <div class="w-[300px] max-w-xl max-lg:hidden lg:block">
          <n-menu
            :options="menuOptions"
            @update:value="scrollToSection"
            class="metadata w-[100%]"
          />
        </div>

        <div class="w-full pb-4 lg:hidden">
          <n-collapse accordion class="max-w-xxl rounded-md bg-gray-100 py-1 lg:hidden">
            <n-collapse-item title="On this page" name="menu">
              <n-menu :options="menuOptions" @update:value="scrollToSection" />
            </n-collapse-item>
          </n-collapse>
        </div>

        <FadeTransition>
          <n-form
            ref="formRef"
            :model="moduleData"
            size="small"
            label-placement="top"
            class="w-full pr-4"
            :disabled="studyStore.currentStudyRole === 'viewer'"
          >
            <h2 class="creators pb-4">Creators</h2>

            <n-card class="bg-gray-50">
              <CollapsibleCard
                v-for="(item, index) in moduleData.creators"
                :key="item.id"
                class="mb-5 shadow-md"
                :title="
                  item.given_name
                    ? `${item.given_name} ${item.family_name}`
                    : `Creator ${index + 1}`
                "
                bordered
              >
                <template #header-extra>
                  <n-popconfirm
                    @positive-click="removeCreator(item.id)"
                    :disabled="studyStore.currentStudyRole === 'viewer'"
                  >
                    <template #trigger>
                      <n-button
                        type="error"
                        secondary
                        :disabled="studyStore.currentStudyRole === 'viewer'"
                      >
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
                  label="Name Type"
                  :path="`creators[${index}].name_type`"
                  :rule="{
                    message: 'Please select a name type',
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
                  label="Given Name"
                  :path="`creators[${index}].given_name`"
                  :rule="{
                    message: 'Please enter a name',
                    required: true,
                    trigger: ['blur', 'input'],
                  }"
                >
                  <n-input v-model:value="item.given_name" placeholder="Bertolt" clearable />
                </n-form-item>

                <n-form-item
                  label="Family Name"
                  :path="`creators[${index}].family_name`"
                  :rule="{
                    message: 'Please enter a value',
                    required: item.name_type === 'Personal',
                    trigger: ['blur', 'input'],
                  }"
                >
                  <n-input
                    v-model:value="item.family_name"
                    :placeholder="item.name_type === 'Organizational' ? 'N/A' : 'Hoover'"
                    clearable
                    :disabled="item.name_type === 'Organizational'"
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
                  <n-input
                    v-model:value="item.name_identifier_scheme"
                    placeholder="ORCID"
                    clearable
                  />
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
                    :disabled="
                      item.name_type === 'Organizational' ||
                      studyStore.currentStudyRole === 'viewer'
                    "
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

              <n-button
                class="my-10 w-full"
                dashed
                type="success"
                @click="addCreator"
                :disabled="studyStore.currentStudyRole === 'viewer'"
              >
                <template #icon>
                  <f-icon icon="gridicons:create" />
                </template>

                Add a new creator
              </n-button>
            </n-card>

            <n-divider />

            <h2 class="contributors pb-4">Contributors</h2>

            <n-card class="bg-gray-50">
              <CollapsibleCard
                v-for="(item, index) in moduleData.contributors"
                :key="item.id"
                class="mb-5 shadow-md"
                :title="
                  item.given_name
                    ? `${item.given_name} ${item.family_name}`
                    : `Contributor ${index + 1}`
                "
                bordered
              >
                <template #header-extra>
                  <n-popconfirm @positive-click="removeContributor(item.id)">
                    <template #trigger>
                      <n-button
                        type="error"
                        secondary
                        :disabled="studyStore.currentStudyRole === 'viewer'"
                      >
                        <template #icon>
                          <f-icon icon="ep:delete" />
                        </template>

                        Remove contributor
                      </n-button>
                    </template>

                    Are you sure you want to remove this contributor?
                  </n-popconfirm>
                </template>

                <n-form-item
                  label="Contributor Type"
                  :path="`contributors[${index}].contributor_type`"
                  :rule="{
                    message: 'Please select an intervention type',
                    required: true,
                    trigger: ['blur', 'change'],
                  }"
                >
                  <n-select
                    v-model:value="item.contributor_type"
                    placeholder="ContactPerson"
                    clearable
                    :options="FORM_JSON.datasetContributorTypeOptions"
                  />
                </n-form-item>

                <n-form-item
                  label="Name Type"
                  :path="`contributors[${index}].name_type`"
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
                  label="Given Name"
                  :path="`contributors[${index}].given_name`"
                  :rule="{
                    message: 'Please enter a name',
                    required: true,
                    trigger: ['blur', 'input'],
                  }"
                >
                  <n-input v-model:value="item.given_name" placeholder="Bertolt" clearable />
                </n-form-item>

                <n-form-item
                  label="Family Name"
                  :path="`contributors[${index}].family_name`"
                  :rule="{
                    message: 'Please enter a value',
                    required: item.name_type === 'Personal',
                    trigger: ['blur', 'input'],
                  }"
                >
                  <n-input
                    v-model:value="item.family_name"
                    :placeholder="item.name_type === 'Organizational' ? 'N/A' : 'Hoover'"
                    clearable
                    :disabled="item.name_type === 'Organizational'"
                  />
                </n-form-item>

                <n-form-item
                  label="Name Identifier"
                  :path="`contributors[${index}].name_identifier`"
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
                  :path="`contributors[${index}].name_identifier_scheme`"
                  :rule="{
                    message: 'Please enter a name identifier scheme',
                    required: true,
                    trigger: ['blur', 'input'],
                  }"
                >
                  <n-input
                    v-model:value="item.name_identifier_scheme"
                    placeholder="ORCID"
                    clearable
                  />
                </n-form-item>

                <n-form-item
                  label="Name Identifier Scheme URI"
                  :path="`contributors[${index}].name_identifier_scheme_uri`"
                >
                  <n-input
                    v-model:value="item.name_identifier_scheme_uri"
                    placeholder="https://orcid.org/"
                    clearable
                  />
                </n-form-item>

                <n-form-item
                  label="Affiliations"
                  :path="`contributors[${index}].affiliations`"
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
                    :disabled="
                      item.name_type === 'Organizational' ||
                      studyStore.currentStudyRole === 'viewer'
                    "
                    class="[&>div>*]:!self-center"
                  >
                    <div class="flex w-full flex-col space-y-4">
                      <n-form-item
                        ignore-path-change
                        :show-feedback="true"
                        label="Name"
                        :path="`contributors[${index}].affiliations[${idx}].name`"
                        class="w-full"
                        :rule="{
                          message: 'Affiliation name is required if identifier is empty',
                          required:
                            !item.affiliations[idx].identifier && item.name_type === 'Personal',
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
                          :path="`contributors[${index}].affiliations[${idx}].identifier`"
                          class="w-full"
                          :rule="{
                            message: 'Identifier is required if name of affiliation is empty',
                            required: !item.affiliations[idx].name && item.name_type === 'Personal',
                            trigger: ['blur', 'input'],
                          }"
                        >
                          <n-input
                            v-model:value="item.affiliations[idx].identifier"
                            placeholder="0156zyn36"
                            :disabled="item.name_type === 'Organizational'"
                            @keydown.enter.prevent
                          />
                        </n-form-item>

                        <n-form-item
                          ignore-path-change
                          label="Scheme"
                          :path="`contributors[${index}].affiliations[${idx}].scheme`"
                          class="ml-3 w-full"
                          :rule="{
                            message: 'Scheme is required if identifier is present',
                            required:
                              item.affiliations[idx].identifier && item.name_type === 'Personal',
                            trigger: ['blur', 'input'],
                          }"
                        >
                          <n-input
                            v-model:value="item.affiliations[idx].scheme"
                            :disabled="item.name_type === 'Organizational'"
                            placeholder="ROR"
                            @keydown.enter.prevent
                          />
                        </n-form-item>

                        <n-form-item
                          ignore-path-change
                          label="Scheme URI"
                          :path="`contributors[${index}].affiliations[${idx}]`"
                          class="ml-3 w-full"
                        >
                          <n-input
                            v-model:value="item.affiliations[idx].scheme_uri"
                            placeholder="https://ror.org/"
                            :disabled="item.name_type === 'Organizational'"
                            @keydown.enter.prevent
                          />
                        </n-form-item>
                      </div>
                    </div>
                  </n-dynamic-input>
                </n-form-item>
              </CollapsibleCard>

              <n-button
                class="my-10 w-full"
                dashed
                type="success"
                @click="addContributor"
                :disabled="studyStore.currentStudyRole === 'viewer'"
              >
                <template #icon>
                  <f-icon icon="gridicons:create" />
                </template>

                Add a new contributor
              </n-button>
            </n-card>

            <n-divider />

            <h2 class="managing-organization pb-4">Managing organization</h2>

            <n-card class="bg-gray-50">
              <n-form-item
                label="Name"
                path="managing_organization.name"
                :rule="{
                  message: 'Please enter a valid name.',
                  required: true,
                  trigger: ['blur', 'input'],
                }"
              >
                <n-input
                  v-model:value="moduleData.managing_organization.name"
                  placeholder="California Medical Innovations Institute"
                  clearable
                />
              </n-form-item>

              <n-form-item
                label="Identifier"
                path="managing_organization.identifier"
                :rule="{
                  message: 'Please enter a valid identifier.',
                  required: !!moduleData.managing_organization.identifier_scheme,
                  trigger: ['blur', 'input'],
                }"
              >
                <n-input
                  v-model:value="moduleData.managing_organization.identifier"
                  placeholder="0156zyn36"
                  clearable
                />
              </n-form-item>

              <n-form-item
                label="Identifier Scheme"
                path="managing_organization.identifier_scheme"
                :rule="{
                  message: 'Please enter a valid identifier scheme.',
                  required: !!moduleData.managing_organization.identifier,
                  trigger: ['blur', 'input'],
                }"
              >
                <n-input
                  v-model:value="moduleData.managing_organization.identifier_scheme"
                  placeholder="ROR"
                  clearable
                />
              </n-form-item>

              <n-form-item label="Identifier Scheme URI" path="identifier_scheme_uri">
                <n-input
                  v-model:value="moduleData.managing_organization.identifier_scheme_uri"
                  placeholder="https://ror.org/"
                  clearable
                />
              </n-form-item>
            </n-card>

            <n-divider />

            <h2 class="funders pb-4">Funders</h2>

            <n-card class="bg-gray-50">
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
                      <n-button
                        type="error"
                        secondary
                        :disabled="studyStore.currentStudyRole === 'viewer'"
                      >
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
                  label="Identifier Type"
                  :path="`funders[${index}].identifier_type`"
                  :rule="{
                    message: 'Please select an identifier type',
                    required: true,
                    trigger: ['blur', 'change'],
                  }"
                >
                  <n-select
                    v-model:value="item.identifier_type"
                    placeholder="ROR"
                    clearable
                    :options="FORM_JSON.datasetFunderIdentifierTypeOptions"
                  />
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

              <n-button
                class="my-10 w-full"
                dashed
                type="success"
                @click="addFunder"
                :disabled="studyStore.currentStudyRole === 'viewer'"
              >
                <template #icon>
                  <f-icon icon="gridicons:create" />
                </template>

                Add a new funder
              </n-button>
            </n-card>

            <n-divider />

            <div class="flex justify-between gap-4">
              <n-button
                size="large"
                @click="previousPage"
                type="primary"
                :disabled="studyStore.currentStudyRole === 'viewer'"
              >
                <template #icon>
                  <f-icon icon="ic:round-arrow-back-ios" />
                </template>

                Back
              </n-button>

              <n-button
                size="large"
                type="primary"
                @click="saveMetadata"
                :loading="submitLoading"
                :disabled="studyStore.currentStudyRole === 'viewer'"
              >
                <template #icon>
                  <f-icon icon="ic:round-arrow-forward-ios" />
                </template>

                Next
              </n-button>
            </div>
          </n-form>
        </FadeTransition>
      </div>
    </n-scrollbar>
  </main>
</template>
