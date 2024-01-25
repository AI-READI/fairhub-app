<script setup lang="ts">
import { config, MdEditor } from "md-editor-v3";
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";

import licensesJSON from "@/assets/data/licenses.json";
import type { DatasetRights } from "@/types/Dataset";
import { baseURL } from "@/utils/constants";
import { sanitize } from "@/utils/helpers";
import TargetBlankExtension from "@/utils/TargetBlankExtension";

config({
  editorConfig: {
    languageUserDefined: {
      "en-US": {
        footer: {
          markdownTotal: "Character Count",
          scrollAuto: "Scroll Auto",
        },
      },
    },
  },
  markdownItConfig(md) {
    md.use(TargetBlankExtension);
  },
});

const route = useRoute();
const router = useRouter();
const push = usePush();
const displayLicenseEditor = ref(false);
const draftLicense = ref("");
const licenseName = ref("");

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const studyId = routeParams.studyId;
const datasetId = routeParams.datasetId;

const formRef = ref<FormInst | null>(null);

const moduleData = reactive<DatasetRights>({
  rights: [],
});

const responseLoading = ref(false);
const submitLoading = ref(false);
const getLicenseLoading = ref(false);

onBeforeMount(async () => {
  responseLoading.value = true;

  const response = await fetch(`${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/rights`, {
    method: "GET",
  });

  responseLoading.value = false;

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.rights = data.map((item: any) => {
    console.log(item);
    return {
      ...item,
      origin: "remote",
    };
  });

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
      const data: any = moduleData.rights.map((item) => {
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
      });

      submitLoading.value = true;

      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/rights`,
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
        push.success("Rights saved successfully.");

        // refresh page
        router.go(0);
      }
    } else {
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
      title="Rights"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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
