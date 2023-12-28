<script setup lang="ts">
import { config, MdEditor } from "md-editor-v3";
import type { FormInst } from "naive-ui";
import loading from "naive-ui/es/_internal/loading";
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

onBeforeMount(async () => {
  const response = await fetch(`${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/rights`, {
    method: "GET",
  });

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  console.log(data);

  moduleData.rights = data.map((item: any) => {
    console.log(item);
    return {
      ...item,
      origin: "remote",
    };
  });
  console.log(moduleData.rights.length);
  if (moduleData.rights.length > 0) {
    draftLicense.value = moduleData.rights[0].license_text;
    console.log(moduleData.rights[0].rights);
    licenseName.value = moduleData.rights[0].rights;
    console.log(licenseName.value);
    displayLicenseEditor.value = true;
  }
});

const removeRight = async (id: string) => {
  const item = moduleData.rights.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/rights/${id}`,
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

  moduleData.rights = moduleData.rights.filter((item) => item.id !== id);
};

const addSubject = () => {
  moduleData.rights.push({
    id: nanoid(),
    identifier: "",
    identifier_scheme: "",
    license_text: "",
    origin: "local",
    rights: "",
    uri: "",
  });
};

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
      console.log(data);

      const response = await fetch(
        `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata/rights`,
        {
          body: JSON.stringify(data),

          method: "POST",
        }
      );

      if (!response.ok) {
        push.error("Something went wrong.");

        throw new Error("Network response was not ok");
      } else {
        push.success("Rights saved successfully.");

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

const updateLicense = async (value: string) => {
  console.log("updateLicense");
  loading.value = true;
  const license = licensesJSON.find((item) => item.name === value);

  if (license) {
    console.log(`${baseURL}/utils/requestjson?url=${encodeURIComponent(license.detailsUrl)}`);
    const response = await fetch(
      `${baseURL}/utils/requestjson?url=${encodeURIComponent(license.detailsUrl)}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );

    if (response.ok) {
      const response_data = await response.json();
      console.log(response_data.licenseText);
      draftLicense.value = response_data.licenseText;
      licenseName.value = license.name;
      displayLicenseEditor.value = true;
      loading.value = false;
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
        console.log(moduleData);
        console.log(moduleData.rights[0]);
        console.log(moduleData.rights[0].rights);
        moduleData.rights[0] = {
          ...moduleData.rights[0],
          identifier: license.licenseId,
          identifier_scheme: "SPDX",
          rights: license.name,
          uri: license.reference,
        };
      }
      console.log(moduleData.rights);
      console.log(license.name);
    } else {
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

    <n-form ref="formRef" :model="moduleData" size="large" label-placement="top" class="pr-4">
      <n-form-item label="Rights" path="rights">
        <n-select
          v-model="licenseName"
          placeholder="MIT License Modern Variant."
          clearable
          :options="licensesJSON.map((option) => ({ label: option.name, value: option.name }))"
          @update:value="updateLicense"
          :value="licenseName !== '' ? licenseName : ''"
        />
      </n-form-item>

      <div v-if="displayLicenseEditor" class="pb-5">
        <MdEditor
          v-model="draftLicense"
          language="en-US"
          preview-theme="github"
          :show-code-row-number="true"
          :sanitize="sanitize"
        />
        <!-- <v-md-editor
          v-model="draftLicense"
          height="800px"
          left-toolbar="undo redo clear | h bold italic strikethrough | ul ol table hr | link"
          right-toolbar="sync-scroll preview fullscreen"
        ></v-md-editor> -->
      </div>
      <!-- <CollapsibleCard
        v-for="(item, index) in moduleData.rights"
        :key="item.id"
        class="mb-5 shadow-md"
        :title="item.rights || `Entry ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removeRight(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove right
              </n-button>
            </template>

            Are you sure you want to remove this right?
          </n-popconfirm>
        </template>

        <n-form-item
          label="Rights Value"
          :path="`rights[${index}].rights`"
          :rule="{
            message: 'Please add the right',
            required: true,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input
            v-model:value="item.rights"
            placeholder="MIT License Modern Variant."
            clearable
          />
        </n-form-item>

        <n-form-item label="Rights URI" :path="`rights[${index}].uri`">
          <n-input
            v-model:value="item.uri"
            placeholder="https://opensource.org/licenses/MIT"
            clearable
          />
        </n-form-item>

        <n-form-item label="Identifier" :path="`rights[${index}].identifier`">
          <n-input v-model:value="item.identifier" placeholder="MIT" clearable />
        </n-form-item>

        <n-form-item label="Identifier Scheme" :path="`rights[${index}].identifier_scheme`">
          <n-input v-model:value="item.identifier_scheme" placeholder="SPDX" clearable />
        </n-form-item>
      </CollapsibleCard>

      <n-button class="my-10 w-full" dashed type="success" @click="addSubject">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add a new right
      </n-button> -->

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
