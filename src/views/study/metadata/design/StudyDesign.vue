<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";

import FORM_JSON from "@/assets/data/form.json";
import type { StudyDesignModule } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const message = useMessage();

const formRef = ref<FormInst | null>(null);

const moduleData: StudyDesignModule = reactive({
  bio_spec_description: "",
  bio_spec_retention: null,
  design_info: {
    allocation: null,
    intervention_model: null,
    intervention_model_description: "",
    masking: null,
    masking_description: "",
    observational_model_list: [],
    primary_purpose: null,
    time_perspective_list: [],
    who_masked_list: [],
  },
  enrollment_info: {
    enrollment_count: null,
    enrollment_type: null,
  },
  number_arms: null,
  number_groups_cohorts: null,
  phase_list: [],
  study_type: null,
  target_duration: "",
});

const rules: FormRules = {
  enrollment_info: {
    enrollment_count: {
      message: "Please enter a number",
      required: true,
      trigger: ["blur", "input"],
      type: "number",
    },
    enrollment_type: {
      message: "Please select an enrollment type",
      required: true,
      trigger: ["blur", "change"],
    },
  },
  study_type: {
    message: "Please select a study type",
    required: true,
    trigger: ["blur", "change"],
  },
};

const isInterventionalStudy = computed(() => moduleData.study_type === "Interventional");
const isObservationalStudy = computed(() => moduleData.study_type === "Observational");

const maskingOptions = [
  {
    label: "None (Open Label)",
    value: "None (Open Label)",
  },
  {
    label: "Blinded (no details)",
    value: "Blinded (no details)",
  },
  {
    label: "Single",
    value: "Single",
  },
  {
    label: "Double",
    value: "Double",
  },
  {
    label: "Triple",
    value: "Triple",
  },
  {
    label: "Quadruple",
    value: "Quadruple",
  },
  {
    label: "N/A",
    value: "N/A",
  },
];

const whoMaskedOptions = [
  {
    label: "Participant",
    value: "Participant",
  },
  {
    label: "Care Provider",
    value: "Care Provider",
  },
  {
    label: "Investigator",
    value: "Investigator",
  },
  {
    label: "Outcomes Assessor",
    value: "Outcomes Assessor",
  },
];

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/design`, {
    method: "GET",
  });

  console.log(response);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.study_type = data.study_type;

  moduleData.design_info.allocation = data.design_allocation;
  moduleData.design_info.intervention_model = data.design_intervention_model;
  moduleData.design_info.intervention_model_description =
    data.design_intervention_model_description;
  moduleData.design_info.primary_purpose = data.design_primary_purpose;

  moduleData.design_info.masking = data.design_masking;
  moduleData.design_info.masking_description = data.design_masking_description;
  moduleData.design_info.who_masked_list = data.design_who_masked_list;

  moduleData.phase_list = data.phase_list;

  moduleData.number_arms = data.number_arms;

  moduleData.design_info.observational_model_list = data.design_observational_model_list;

  moduleData.design_info.time_perspective_list = data.design_time_perspective_list;

  moduleData.bio_spec_retention = data.bio_spec_retention;

  moduleData.bio_spec_description = data.bio_spec_description;

  moduleData.target_duration = data.target_duration;

  moduleData.number_groups_cohorts = data.number_groups_cohorts;

  moduleData.enrollment_info.enrollment_count = data.enrollment_count;

  moduleData.enrollment_info.enrollment_type = data.enrollment_type;

  console.log("moduleData", moduleData);
});

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      if (moduleData.study_type === "Interventional") {
        /**
         * * Custom check since the inbuilt validation doesn't seem to catch/show min value errors
         * TODO: create a custom rule for this
         */
        if (moduleData.number_arms && moduleData.number_arms <= 0) {
          message.error("Number of arms must be greater than 0.");
          return;
        }
      }

      const data = {
        bio_spec_description: isObservationalStudy ? moduleData.bio_spec_description : "",
        bio_spec_retention: isObservationalStudy ? moduleData.bio_spec_retention : null,

        design_allocation: isInterventionalStudy ? moduleData.design_info.allocation : null,

        design_intervention_model: isInterventionalStudy
          ? moduleData.design_info.intervention_model
          : null,
        design_intervention_model_description: isInterventionalStudy
          ? moduleData.design_info.intervention_model_description
          : null,

        design_masking: isInterventionalStudy ? moduleData.design_info.masking : null,
        design_masking_description: isInterventionalStudy
          ? moduleData.design_info.masking_description
          : "",

        design_observational_model_list: isObservationalStudy
          ? moduleData.design_info.observational_model_list
          : [],

        design_primary_purpose: isInterventionalStudy
          ? moduleData.design_info.primary_purpose
          : null,

        design_time_perspective_list: isObservationalStudy
          ? moduleData.design_info.time_perspective_list
          : [],

        design_who_masked_list: isInterventionalStudy
          ? moduleData.design_info.who_masked_list
          : null,

        enrollment_count: moduleData.enrollment_info.enrollment_count,
        enrollment_type: moduleData.enrollment_info.enrollment_type,

        number_arms: moduleData.study_type === "Interventional" ? moduleData.number_arms : null,
        number_groups_cohorts: isObservationalStudy ? moduleData.number_groups_cohorts : null,

        phase_list: moduleData.study_type === "Interventional" ? moduleData.phase_list : [],

        study_type: moduleData.study_type,

        target_duration: isObservationalStudy ? moduleData.target_duration : "",
      };

      const response = await fetch(`${baseURL}/study/${route.params.studyId}/metadata/design`, {
        body: JSON.stringify(data),
        method: "PUT",
      });

      if (!response.ok) {
        message.error("Something went wrong.");
        return;
      } else {
        message.success("Study updated successfully.");

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
      title="Design"
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
      <h3>Study Type</h3>

      <p class="pb-8 pt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
        voluptatem, quibusdam, quos voluptas quae quas voluptatum
      </p>

      <n-form-item label="Type" path="study_type">
        <n-select
          v-model:value="moduleData.study_type"
          placeholder="Interventional"
          clearable
          :options="FORM_JSON.studyMetadataStudyTypeOptions"
        />
      </n-form-item>

      <n-divider v-if="moduleData.study_type" />

      <h3 v-if="moduleData.study_type">Design Info</h3>

      <p v-if="moduleData.study_type" class="pb-8 pt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
        voluptatem, quibusdam, quos voluptas quae quas voluptatum
      </p>

      <n-form-item
        v-if="isInterventionalStudy"
        label="Allocation"
        path="design_info.allocation"
        :rule="{
          message: 'Please select the method of assigning participants to treatment groups',
          required: isInterventionalStudy,
          trigger: ['blur', 'input'],
        }"
      >
        <n-select
          v-model:value="moduleData.design_info.allocation"
          placeholder="Randomized"
          clearable
          :options="FORM_JSON.studyMetadataAllocationOptions"
        />
      </n-form-item>

      <n-form-item
        v-if="isInterventionalStudy"
        label="Intervention Model"
        path="design_info.intervention_model"
        :rule="{
          message: 'Please select the strategy for assigning interventions to participants',
          required: isInterventionalStudy,
          trigger: ['blur', 'input'],
        }"
      >
        <n-select
          v-model:value="moduleData.design_info.intervention_model"
          placeholder="Treatment"
          clearable
          :options="FORM_JSON.studyMetadataInterventionModelOptions"
        />
      </n-form-item>

      <n-form-item
        v-if="isInterventionalStudy"
        label="Intervention Model Description"
        path="design_info.intervention_model_description"
      >
        <n-input
          v-model:value="moduleData.design_info.intervention_model_description"
          type="textarea"
          :rows="2"
          placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
          clearable
        />
      </n-form-item>

      <n-form-item
        v-if="isInterventionalStudy"
        label="Primary Purpose"
        path="design_info.primary_purpose"
        :rule="{
          message: 'Please select the main purpose of the study',
          required: isInterventionalStudy,
          trigger: ['blur', 'input'],
        }"
      >
        <n-select
          v-model:value="moduleData.design_info.primary_purpose"
          placeholder="Single Group Assignment"
          clearable
          :options="FORM_JSON.studyMetadataPrimaryPurposeOptions"
        />
      </n-form-item>

      <n-form-item
        v-if="isObservationalStudy"
        label="Observational Models"
        path="design_info.observational_model_list"
        :rule="{
          message:
            'Please select the primary strategy for participant identification and follow-up',
          required: isObservationalStudy,
          type: 'array',
          trigger: ['blur', 'input'],
        }"
      >
        <n-select
          v-model:value="moduleData.design_info.observational_model_list"
          placeholder="Cohort"
          clearable
          multiple
          :options="FORM_JSON.studyMetadataObservationalModelsOptions"
        />
      </n-form-item>

      <n-form-item
        v-if="isObservationalStudy"
        label="Time Perspective"
        path="design_info.time_perspective_list"
        :rule="{
          message: 'Please select the approach to classifying the timing of observations',
          required: isObservationalStudy,
          type: 'array',
          trigger: ['blur', 'input'],
        }"
      >
        <n-select
          v-model:value="moduleData.design_info.time_perspective_list"
          placeholder="Retrospective"
          clearable
          multiple
          :options="FORM_JSON.studyMetadataTimePerspectiveOptions"
        />
      </n-form-item>

      <n-divider />

      <div v-if="isInterventionalStudy">
        <h3>Masking</h3>

        <p class="pb-8 pt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
          voluptatem, quibusdam, quos voluptas quae quas voluptatum
        </p>

        <n-form-item
          label="Masking"
          path="design_info.masking"
          :rule="{
            message: 'Please select the masking type',
            required: isInterventionalStudy,
            trigger: ['blur', 'input'],
          }"
        >
          <n-select
            v-model:value="moduleData.design_info.masking"
            placeholder="Single"
            clearable
            :options="maskingOptions"
          />
        </n-form-item>

        <n-form-item label="Description" path="design_info.masking_description">
          <n-input
            v-model:value="moduleData.design_info.masking_description"
            type="textarea"
            :rows="2"
            placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
            clearable
          />
        </n-form-item>

        <n-form-item
          label="Who Masked?"
          path="design_info.who_masked_list"
          :rule="{
            message: 'Please select who was masked',
            type: 'array',
            required: isInterventionalStudy,
            trigger: ['blur', 'input'],
          }"
        >
          <n-select
            v-model:value="moduleData.design_info.who_masked_list"
            placeholder="Care Provider"
            clearable
            multiple
            :options="whoMaskedOptions"
          />
        </n-form-item>

        <n-divider />
      </div>

      <div v-if="isInterventionalStudy">
        <h3>Phase</h3>

        <p class="pb-8 pt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
          voluptatem, quibusdam, quos voluptas quae quas voluptatum
        </p>

        <n-form-item
          label="Phase"
          path="phase_list"
          :rule="{
            message: 'Please select the phase',
            type: 'array',
            required: isInterventionalStudy,
            trigger: ['blur', 'input'],
          }"
        >
          <n-select
            v-model:value="moduleData.phase_list"
            placeholder="Phase 1"
            clearable
            multiple
            :options="FORM_JSON.studyMetadataPhaseOptions"
          />
        </n-form-item>

        <n-divider />
      </div>

      <div v-if="isObservationalStudy">
        <h3>Bio Specification</h3>

        <p class="pb-8 pt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
          voluptatem, quibusdam, quos voluptas quae quas voluptatum
        </p>

        <n-form-item
          label="Retention"
          path="bio_spec_retention"
          :rule="{
            message:
              'Please indicate if samples of material from research participants are retained in a biorepository',
            required: isObservationalStudy,
            trigger: ['blur', 'input'],
          }"
        >
          <n-select
            v-model:value="moduleData.bio_spec_retention"
            placeholder="Samples With DNA"
            clearable
            :options="FORM_JSON.studyMetadataBioSpecRetentionOptions"
          />
        </n-form-item>

        <n-form-item label="Description" path="bio_spec_description">
          <n-input
            v-model:value="moduleData.bio_spec_description"
            type="textarea"
            :rows="2"
            placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
            clearable
          />
        </n-form-item>

        <n-divider />
      </div>

      <h3>Enrollment Information</h3>

      <p class="pb-8 pt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus,
        voluptatem, quibusdam, quos voluptas quae quas voluptatum
      </p>

      <n-form-item
        label="Total number of participants to be enrolled"
        path="enrollment_info.enrollment_count"
      >
        <n-input-number
          v-model:value="moduleData.enrollment_info.enrollment_count"
          clearable
          class="w-full"
        />
      </n-form-item>

      <n-form-item label="Type" path="enrollment_info.enrollment_type">
        <n-select
          v-model:value="moduleData.enrollment_info.enrollment_type"
          placeholder="Actual"
          clearable
          :options="FORM_JSON.studyMetadataEnrollmentTypeOptions"
        />
      </n-form-item>

      <n-form-item
        v-if="isInterventionalStudy"
        label="Number of Arms"
        path="number_arms"
        :rule="{
          message: 'Please enter the number of arms in the clinical trial',
          required: isInterventionalStudy,
          trigger: ['blur', 'input'],
          type: 'number',
        }"
      >
        <n-input-number v-model:value="moduleData.number_arms" :min="1" clearable class="w-full" />
      </n-form-item>

      <n-form-item
        v-if="isObservationalStudy"
        label="Target Duration"
        path="target_duration"
        :rule="{
          message:
            'Please enter the anticipated time period over which each participant is to be followed.',
          required: isObservationalStudy,
          trigger: ['blur', 'input'],
        }"
      >
        <n-input v-model:value="moduleData.target_duration" placeholder="5 Days" clearable />
      </n-form-item>

      <n-form-item
        v-if="isObservationalStudy"
        label="Number of study groups/cohorts"
        path="number_groups_cohorts"
        :rule="{
          type: 'number',
          message: 'Please enter the number of study groups/cohorts',
          required: isObservationalStudy,
          trigger: ['blur', 'input'],
        }"
      >
        <n-input-number
          v-model:value="moduleData.number_groups_cohorts"
          clearable
          class="w-full"
          :min="1"
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
