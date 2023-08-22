<script setup lang="ts">
import dayjs from "dayjs";
import type { FormInst, FormRules } from "naive-ui";

import type { StudyStatusModule } from "@/types/Study";

const route = useRoute();

const formRef = ref<FormInst | null>(null);

const moduleData = ref<StudyStatusModule>({
  completionDate: null,
  completionDateType: "",
  overallStatus: "",
  startDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  startDateType: "",
  whyStopped: "",
});

const rules: FormRules = {
  completionDate: {
    message: "Please enter a completion date",
    required: false,
    trigger: ["blur", "input"],
  },
  completionDateType: {
    message: "Please select a completion date type",
    required: false,
    trigger: ["blur", "change"],
  },
  overallStatus: {
    message: "Please enter an overall status",
    required: true,
    trigger: ["blur", "input"],
  },
  startDate: {
    message: "Please enter a start date",
    required: true,
    trigger: ["blur", "input"],
  },
  startDateType: {
    message: "Please select a start date type",
    required: true,
    trigger: ["blur", "change"],
  },
  whyStopped: {
    message: "Please enter a reason for stopping",
    required: false,
    trigger: ["blur", "input"],
  },
};

const statusOptions = [
  {
    description: "Study halted prematurely, prior to enrollment of the first participant.",
    label: "Withdrawn",
    value: "Withdrawn",
  },
  {
    description:
      "Participants are currently being recruited, whether or not any participants have yet been enrolled.",
    label: "Recruiting",
    value: "Recruiting",
  },
  {
    description:
      "Study is continuing, meaning participants are receiving an intervention or being examined, but new participants are not currently being recruited or enrolled.",
    label: "Active, not recruiting",
    value: "Active, not recruiting",
  },
  {
    description: "Participants are not yet being recruited.",
    label: "Not yet recruiting",
    value: "Not yet recruiting",
  },
  {
    description: "Study halted prematurely but potentially will resume.",
    label: "Suspended",
    value: "Suspended",
  },
  {
    description: "Participants are being (or will be) selected from a predetermined population.",
    label: "Enrolling by invitation",
    value: "Enrolling by invitation",
  },
  {
    description:
      "The study has concluded normally; participants are no longer receiving an intervention or being examined (that is, last participant's last visit has occurred).",
    label: "Completed",
    value: "Completed",
  },
  {
    description:
      "Study halted prematurely and will not resume; participants are no longer being examined or receiving intervention.",
    label: "Terminated",
    value: "Terminated",
  },
];

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

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      // console.log(data);

      // post to api
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
      linkName="study:overview"
      :linkParams="{
        studyId: route.params.studyId,
      }"
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
      <n-form-item :span="12" label="Overall Status" path="overallStatus">
        <n-select
          v-model:value="moduleData.overallStatus"
          placeholder="Select a status"
          clearable
          :options="statusOptions"
        />
      </n-form-item>

      <n-form-item :span="12" label="Start Date" path="startDate">
        <n-date-picker
          v-model:formatted-value="moduleData.startDate"
          type="date"
          value-format="yyyy-MM-dd HH:mm:ss"
          clearable
        />
      </n-form-item>

      <n-form-item :span="12" label="Start Date Type" path="startDateType">
        <n-select
          v-model:value="moduleData.startDateType"
          placeholder="Select a type"
          clearable
          :options="dateTypeOptions"
        />
      </n-form-item>

      <n-form-item
        :span="12"
        label="Why Stopped"
        path="whyStopped"
        :rule="{
          message: 'Please enter a reason for stopping',
          required:
            moduleData.overallStatus === 'Suspended' ||
            moduleData.overallStatus === 'Terminated' ||
            moduleData.overallStatus === 'Withdrawn'
              ? true
              : false,
          trigger: ['blur', 'input'],
        }"
      >
        <n-input
          v-model:value="moduleData.whyStopped"
          type="textarea"
          placeholder="A brief explanation of the reason(s) why such clinical study was stopped (for a clinical study that is 'Suspended', 'Terminated', or 'Withdrawn' prior to its planned completion as anticipated by the protocol)."
          clearable
        />
      </n-form-item>

      <n-form-item
        :span="12"
        label="Completion Date"
        path="completionDate"
        :rule="{
          message: 'Please enter a completion date',
          required: moduleData.completionDateType ? true : false,
          trigger: ['blur', 'input'],
        }"
      >
        <n-date-picker
          v-model:formatted-value="moduleData.completionDate"
          type="date"
          value-format="yyyy-MM-dd HH:mm:ss"
          clearable
        />
      </n-form-item>

      <n-form-item
        :span="12"
        label="Completion Date Type"
        path="completionDateType"
        :rule="{
          message: 'Please select a completion date type',
          required: moduleData.completionDate ? true : false,
          trigger: ['blur', 'input'],
        }"
      >
        <n-select
          v-model:value="moduleData.completionDateType"
          placeholder="Select a type"
          clearable
          :options="dateTypeOptions"
        />
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
