<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";

import FORM_JSON from "@/assets/data/form.json";
import { getBackParams, getBackRoute } from "@/stores/nav";
import type { StudyIPDSharing } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const push = usePush();

const formRef = ref<FormInst | null>(null);

const moduleData = reactive<StudyIPDSharing>({
  access_criteria: "",
  description: "",
  info_type_list: [],
  ipd_sharing: null,
  time_frame: "",
  url: "",
});

const rules: FormRules = {
  ipd_sharing: {
    message: "Please select an option",
    required: true,
    trigger: ["blur", "change"],
  },
};

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/ipdsharing`, {
    method: "GET",
  });

  console.log(response);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.access_criteria = data.ipd_sharing_access_criteria;
  moduleData.description = data.ipd_sharing_description;
  moduleData.info_type_list = data.ipd_sharing_info_type_list;
  moduleData.ipd_sharing = data.ipd_sharing;
  moduleData.time_frame = data.ipd_sharing_time_frame;
  moduleData.url = data.ipd_sharing_url;
});

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data = {
        ipd_sharing: moduleData.ipd_sharing,
        ipd_sharing_access_criteria: moduleData.access_criteria || "",
        ipd_sharing_description: moduleData.description || "",
        ipd_sharing_info_type_list: moduleData.info_type_list || [],
        ipd_sharing_time_frame: moduleData.time_frame || "",
        ipd_sharing_url: moduleData.url || "",
      };

      const response = await fetch(`${baseURL}/study/${route.params.studyId}/metadata/ipdsharing`, {
        body: JSON.stringify(data),

        method: "PUT",
      });

      if (!response.ok) {
        push.error("Something went wrong.");
        return;
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
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="IPD Sharing"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      :linkName="getBackRoute()"
      :linkParams="getBackParams()"
    />

    <n-divider />

    <n-form
      ref="formRef"
      :model="moduleData"
      :rules="rules"
      size="large"
      label-placement="top"
      class="pr-4"
    >
      <n-form-item
        label="Is there a plan to share Individual Participant Data(IPD)?"
        path="ipd_sharing"
      >
        <n-select
          v-model:value="moduleData.ipd_sharing"
          placeholder="Yes"
          clearable
          :options="FORM_JSON.studyMetadataIPDSharingOptions"
        />
      </n-form-item>

      <n-form-item
        label="Description"
        path="description"
        :rule="{
          message: 'Please enter a description',
          required: moduleData.ipd_sharing === 'Yes' ? true : false,
          trigger: ['blur', 'input'],
        }"
      >
        <n-input
          v-model:value="moduleData.description"
          type="textarea"
          :rows="3"
          placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
          clearable
        />
      </n-form-item>

      <n-form-item
        label="Type"
        path="info_type_list"
        :rule="{
          type: 'array',
          message: 'Please select at least one option',
          required: moduleData.ipd_sharing === 'Yes' ? true : false,
          trigger: ['blur', 'input'],
        }"
      >
        <n-select
          v-model:value="moduleData.info_type_list"
          placeholder="Study Protocol"
          clearable
          multiple
          :options="FORM_JSON.studyMetadataIPDSharingInfoTypeOptions"
        />
      </n-form-item>

      <n-form-item
        label="Time Frame"
        path="time_frame"
        :rule="{
          message: 'Please enter a time frame',
          required: moduleData.ipd_sharing === 'Yes' ? true : false,
          trigger: ['blur', 'input'],
        }"
      >
        <n-input
          v-model:value="moduleData.time_frame"
          placeholder="Starting in Janauary 2025"
          clearable
        />
      </n-form-item>

      <n-form-item
        label="Access Criteria"
        path="access_criteria"
        :rule="{
          message: 'Please enter access criteria',
          required: moduleData.ipd_sharing === 'Yes' ? true : false,
          trigger: ['blur', 'input'],
        }"
      >
        <n-input
          v-model:value="moduleData.access_criteria"
          placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia"
          clearable
        />
      </n-form-item>

      <n-form-item
        label="URL"
        path="url"
        :rule="{
          message: 'Please enter an URL',
          required: moduleData.ipd_sharing === 'Yes' ? true : false,
          trigger: ['blur', 'input'],
        }"
      >
        <n-input v-model:value="moduleData.url" placeholder="https://nih.org" clearable />
      </n-form-item>

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
