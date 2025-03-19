<script setup lang="ts">
import { MdEditor } from "md-editor-v3";
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import licensesJSON from "@/assets/data/licenses.json";
import { useStudyStore } from "@/stores/study";
import { DatasetAccessRights } from "@/types/Dataset";
import { baseURL } from "@/utils/constants";
import { sanitize } from "@/utils/helpers";

const route = useRoute();
const push = usePush();

const studyStore = useStudyStore();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const studyId = routeParams.studyId;
const datasetId = routeParams.datasetId;

const displayLicenseEditor = ref(false);
const draftLicense = ref("");
const licenseName = ref("");

const moduleData = reactive<DatasetAccessRights>({
  access: {
    description: "",
    type: null,
    url: "",
    url_last_checked: null,
  },
  rights: [],
});
const responseLoading = ref(false);
const submitLoading = ref(false);
const getLicenseLoading = ref(false);

const formRef = ref<FormInst | null>(null);

const rules: FormRules = {
  description: {
    message: "Please enter a description",
    required: true,
    trigger: ["blur", "input"],
  },
  type: {
    message: "Please select a type",
    required: true,
    trigger: ["blur", "input"],
  },
};

onBeforeMount(async () => {
  responseLoading.value = true;

  const response = await fetch(
    `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/access-rights`,
    {
      method: "GET",
    }
  );

  responseLoading.value = false;

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.access = {
    description: data.access.description,
    type: data.access.type,
    url: data.access.url,
    url_last_checked: data.access.url_last_checked,
  };

  moduleData.rights = (data.rights ?? []).map((item: any) => ({
    ...item,
    origin: "remote",
  }));

  if (moduleData.rights.length > 0) {
    draftLicense.value = moduleData.rights[0].license_text;

    licenseName.value = moduleData.rights[0].rights;

    displayLicenseEditor.value = true;
  }
});

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      submitLoading.value = true;

      const data: any = {
        access: {
          description: moduleData.access.description,
          type: moduleData.access.type,
          url: moduleData.access.url || "",
          url_last_checked: moduleData.access.url_last_checked || null,
        },
        rights: moduleData.rights.map((item) => {
          const entry = {
            identifier: item.identifier || "",
            identifier_scheme: draftLicense.value !== "" ? "SPDX" : "",
            license_text: draftLicense.value || "",
            rights: item.rights,
            uri: item.uri || "",
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

      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/access-rights`,
        {
          body: JSON.stringify(data),
          method: "POST",
        }
      );

      submitLoading.value = false;

      if (!response.ok) {
        push.error({
          title: "Failed to save status",
          message: "Something went wrong. Please try again later.",
        });

        throw new Error("Network response was not ok");
      }

      push.success("Access details were saved successfully");

      console.log("success");
    } else {
      console.log("error");
      console.log(errors);
    }
  });
};

const updateLicense = async (value: string) => {
  displayLicenseEditor.value = false;
  const license = licensesJSON.find((item) => item.name === value);
  getLicenseLoading.value = true;

  if (license) {
    getLicenseLoading.value = true;
    const response = await fetch(
      `${baseURL}/utils/requestjson?url=${encodeURIComponent(license.detailsUrl)}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );

    getLicenseLoading.value = false;

    if (response.ok) {
      const response_data = await response.json();

      draftLicense.value = response_data.licenseText;
      licenseName.value = license.name;
      displayLicenseEditor.value = true;

      if (moduleData.rights.length === 0) {
        moduleData.rights.push({
          id: nanoid(),
          identifier: license.licenseId,
          identifier_scheme: "SPDX",
          identifier_scheme_uri: "https://spdx.org/licenses/",
          license_text: draftLicense.value,
          origin: "local",
          rights: license.name,
          uri: license.reference,
        });
      } else {
        moduleData.rights[0] = {
          ...moduleData.rights[0],
          identifier: license.licenseId,
          identifier_scheme: "SPDX",
          identifier_scheme_uri: "https://spdx.org/licenses/",
          rights: license.name,
          uri: license.reference,
        };
      }
    } else {
      getLicenseLoading.value = false;
      console.error("Failed to fetch license details:", response.status, response.statusText);
    }
  }
};
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Access & Rights"
      description=""
      linkName="dataset:overview"
      :linkParams="{ studyId: routeParams.studyId, datasetId: routeParams.datasetId }"
    />

    <n-divider />

    <FadeTransition>
      <LottieLoader v-if="responseLoading" />

      <n-form
        ref="formRef"
        :model="moduleData"
        size="small"
        :disabled="studyStore.currentStudyRole === 'viewer'"
        label-placement="top"
        class="pr-4"
        v-else
      >
        <h2 class="pb-4">Access</h2>

        <n-card class="bg-gray-50">
          <n-form-item label="Type" path="type">
            <n-select
              v-model:value="moduleData.access.type"
              placeholder="Public On Screen Access and Download"
              clearable
              :options="FORM_JSON.datasetAccessTypeOptions"
            />
          </n-form-item>

          <n-form-item label="Description" path="description">
            <n-input
              v-model:value="moduleData.access.description"
              placeholder="A textual description of the access being offered, for example identifying the groups to which access is granted, the criteria on which a case-by-case decision would be based, any further restrictions on on-screen access, etc."
              type="textarea"
              clearable
            />
          </n-form-item>

          <n-form-item label="URL" path="url">
            <n-input
              v-model:value="moduleData.access.url"
              placeholder="A url of a web page that provides details of the accesss available, possibly including the practical details required or a form to use to apply for access."
              clearable
            />
          </n-form-item>

          <n-form-item label="URL Last Checked" path="url_last_checked">
            <n-date-picker
              v-model:value="moduleData.access.url_last_checked"
              type="date"
              clearable
            />
          </n-form-item>
        </n-card>

        <n-divider />

        <h2 class="pb-4">Rights</h2>

        <n-card class="bg-gray-50">
          <n-form-item label="Rights" path="rights">
            <n-select
              v-model="licenseName"
              placeholder="MIT License Modern Variant."
              clearable
              filterable
              :options="licensesJSON.map((option) => ({ label: option.name, value: option.name }))"
              @update:value="updateLicense"
              :value="licenseName !== '' ? licenseName : ''"
              :rule="{
                required: true,
                message: 'Please select a license',
                trigger: ['blur', 'change'],
              }"
            />
          </n-form-item>

          <FadeTransition>
            <LottieLoader v-if="getLicenseLoading" />

            <div>
              <div v-if="displayLicenseEditor" class="pb-5">
                <MdEditor
                  v-model="draftLicense"
                  language="en-US"
                  preview-theme="github"
                  :show-code-row-number="true"
                  :sanitize="sanitize"
                />
              </div>
            </div>
          </FadeTransition>
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

            Save Metadata
          </n-button>
        </div>
      </n-form>
    </FadeTransition>
  </main>
</template>
