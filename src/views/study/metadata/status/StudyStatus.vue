<script setup lang="ts">
import dayjs from "dayjs";
import type { FormInst, FormRules } from "naive-ui";
import { useRouter } from "vue-router";

import FORM_JSON from "@/assets/data/form.json";
import type { StudyStatusModule } from "@/types/Study";
import { baseURL } from "@/utils/constants";
const router = useRouter();
const route = useRoute();
const push = usePush();

const formRef = ref<FormInst | null>(null);

// date type: dayjs().format("YYYY-MM-DD HH:mm:ss")

const moduleData = ref<StudyStatusModule>({
  completion_date: null,
  completion_date_type: null,
  overall_status: null,
  start_date: null,
  start_date_type: null,
  why_stopped: "",
});

const rules: FormRules = {
  overall_status: {
    message: "Please enter an overall status",
    required: true,
    trigger: ["blur", "input"],
  },
  start_date: {
    message: "Please enter a start date",
    required: true,
    trigger: ["blur", "input"],
  },
  start_date_type: {
    message: "Please select a start date type",
    required: true,
    trigger: ["blur", "change"],
  },
};

const dateTypeOptions = [
  {
    label: "Actual",
    value: "Actual",
  },
  {
    label: "Anticipated",
    value: "Anticipated",
  },
];

const loading = ref(false);

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/status`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.value = data;
});

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true;

      const data = {
        completion_date: moduleData.value.completion_date
          ? dayjs(moduleData.value.completion_date).format("YYYY-MM-DD HH:mm:ss")
          : null,
        completion_date_type: moduleData.value.completion_date_type || null,
        overall_status: moduleData.value.overall_status,
        start_date: dayjs(moduleData.value.start_date).format("YYYY-MM-DD HH:mm:ss"),
        start_date_type: moduleData.value.start_date_type,
        why_stopped: moduleData.value.why_stopped || "",
      };

      const response = await fetch(`${baseURL}/study/${route.params.studyId}/metadata/status`, {
        body: JSON.stringify(data),
        method: "PUT",
      });

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
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Status"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      @click="router.go(-1)"
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
      <n-form-item label="Overall Status" path="overall_status">
        <n-select
          v-model:value="moduleData.overall_status"
          placeholder="Recruiting"
          clearable
          :options="FORM_JSON.studyMetadataStatusOptions"
        />
      </n-form-item>

      <n-form-item label="Start Date" path="start_date">
        <n-date-picker
          v-model:formatted-value="moduleData.start_date"
          type="date"
          value-format="yyyy-MM-dd HH:mm:ss"
          clearable
        />
      </n-form-item>

      <n-form-item label="Start Date Type" path="start_date_type">
        <n-select
          v-model:value="moduleData.start_date_type"
          placeholder="Actual"
          clearable
          :options="dateTypeOptions"
        />
      </n-form-item>

      <n-form-item
        label="Why Stopped"
        path="why_stopped"
        :rule="{
          message: 'Please enter a reason for stopping',
          required:
            moduleData.overall_status === 'Suspended' ||
            moduleData.overall_status === 'Terminated' ||
            moduleData.overall_status === 'Withdrawn'
              ? true
              : false,
          trigger: ['blur', 'input'],
        }"
      >
        <n-input
          v-model:value="moduleData.why_stopped"
          type="textarea"
          placeholder="A brief explanation of the reason(s) why such clinical study was stopped (for a clinical study that is 'Suspended', 'Terminated', or 'Withdrawn' prior to its planned completion as anticipated by the protocol)."
          clearable
        />
      </n-form-item>

      <n-form-item
        label="Completion Date"
        path="completion_date"
        :rule="{
          message: 'Please enter a completion date',
          required: moduleData.completion_date_type ? true : false,
          trigger: ['blur', 'input'],
        }"
      >
        <n-date-picker
          v-model:formatted-value="moduleData.completion_date"
          type="date"
          value-format="yyyy-MM-dd HH:mm:ss"
          clearable
        />
      </n-form-item>

      <n-form-item
        label="Completion Date Type"
        path="completion_date_type"
        :rule="{
          message: 'Please select a completion date type',
          required: moduleData.completion_date ? true : false,
          trigger: ['blur', 'input'],
        }"
      >
        <n-select
          v-model:value="moduleData.completion_date_type"
          placeholder="Anticipated"
          clearable
          :options="dateTypeOptions"
        />
      </n-form-item>

      <n-divider />

      <div class="flex justify-start">
        <n-button size="large" type="primary" @click="saveMetadata" :loading="loading">
          <template #icon>
            <f-icon icon="material-symbols:save" />
          </template>

          Save Metadata
        </n-button>
      </div>
    </n-form>
  </main>
</template>
