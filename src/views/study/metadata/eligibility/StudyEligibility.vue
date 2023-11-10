<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";

import FORM_JSON from "@/assets/data/form.json";
import type { StudyEligiblityModule } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const message = useMessage();

const apiLoading = ref(false);

const formRef = ref<FormInst | null>(null);

const moduleData = reactive<StudyEligiblityModule>({
  criteria: {
    exclusion_criteria: [],
    inclusion_criteria: [],
  },
  gender: null,
  gender_based: null,
  gender_description: "",
  healthy_volunteers: null,
  maximum_age: {
    age: null,
    unit: null,
  },
  minimum_age: {
    age: null,
    unit: null,
  },
  sampling_method: null,
  study_population: "",
  study_type: "observational",
});

const rules: FormRules = {
  gender: {
    message: "Please select the gender of the study participants",
    required: true,
    trigger: ["blur", "input"],
  },
  gender_based: {
    message: "Please select if the study was based on gender",
    required: true,
    trigger: ["blur", "input"],
  },
  maximum_age: {
    age: {
      message: "Please enter the maximum age",
      required: true,
      trigger: ["blur", "input"],
      type: "number",
    },
    unit: {
      message: "Please select the unit of the maximum age",
      required: true,
      trigger: ["blur", "input"],
    },
  },
  minimum_age: {
    age: {
      message: "Please enter the minimum age",
      required: true,
      trigger: ["blur", "input"],
      type: "number",
    },
    unit: {
      message: "Please select the unit of the minimum age",
      required: true,
      trigger: ["blur", "input"],
    },
  },
};

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  apiLoading.value = true;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/eligibility`, {
    method: "GET",
  });

  apiLoading.value = false;

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  moduleData.criteria = {
    exclusion_criteria: data.exclusion_criteria,
    inclusion_criteria: data.inclusion_criteria,
  };

  moduleData.gender = data.gender;
  moduleData.gender_based = data.gender_based;
  moduleData.gender_description = data.gender_description;
  moduleData.healthy_volunteers = data.healthy_volunteers;

  moduleData.maximum_age = {
    age: data.maximum_age_value,
    unit: data.maximum_age_unit,
  };

  moduleData.minimum_age = {
    age: data.minimum_age_value,
    unit: data.minimum_age_unit,
  };

  moduleData.sampling_method = data.sampling_method;
  moduleData.study_population = data.study_population;
  moduleData.study_type = data.study_type;
});

const addEntryToCriteria = () => {
  return "";
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data = {
        exclusion_criteria: moduleData.criteria.exclusion_criteria,
        gender: moduleData.gender,
        gender_based: moduleData.gender_based,
        gender_description: moduleData.gender_description || "",
        healthy_volunteers:
          moduleData.study_type === "Interventional" ? moduleData.healthy_volunteers : null,
        inclusion_criteria: moduleData.criteria.inclusion_criteria,
        maximum_age_unit: moduleData.maximum_age.unit,
        maximum_age_value: moduleData.maximum_age.age,
        minimum_age_unit: moduleData.minimum_age.unit,
        minimum_age_value: moduleData.minimum_age.age,
        sampling_method: moduleData.sampling_method || null,
        study_population: moduleData.study_population || "",
      };

      console.log("data", data);

      const response = await fetch(
        `${baseURL}/study/${route.params.studyId}/metadata/eligibility`,
        {
          body: JSON.stringify(data),
          method: "PUT",
        }
      );

      if (!response.ok) {
        message.error("Something went wrong. Please try again later.");

        throw new Error("Network response was not ok");
      } else {
        message.success("Study updated successfully.");

        // refresh page
        router.go(0);
      }
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
      title="Eligibility"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      linkName="study:overview"
      :linkParams="{
        studyId: route.params.studyId,
      }"
    />

    <n-divider />

    <FadeTransition>
      <LottieLoader v-if="apiLoading" />

      <div v-else>
        <div v-if="!moduleData.study_type">
          <n-alert
            title="A study type should be added before you can add eligibility details."
            type="error"
            class=""
          >
            <RouterLink
              :to="{
                name: 'study:metadata:design',
                params: {
                  studyId: route.params.studyId,
                },
              }"
            >
              <n-button size="small" type="info" ghost class="mt-2">
                <template #icon>
                  <f-icon icon="solar:route-linear" />
                </template>

                Add Study Type
              </n-button>
            </RouterLink>
          </n-alert>

          <n-divider />
        </div>

        <n-form
          ref="formRef"
          :model="moduleData"
          :rules="rules"
          size="large"
          :disabled="!moduleData.study_type"
          label-placement="top"
          class="pr-4"
        >
          <h3>Gender</h3>

          <p class="pb-8 pt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia
            voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum
          </p>

          <n-form-item label="Gender" path="gender">
            <n-select
              v-model:value="moduleData.gender"
              placeholder="Female"
              clearable
              :options="FORM_JSON.studyMetadataEligibilityGenderOptions"
            />
          </n-form-item>

          <n-form-item label="Based on Gender?" path="gender_based">
            <n-select
              v-model:value="moduleData.gender_based"
              placeholder="Yes"
              clearable
              :options="FORM_JSON.studyMetadataEligibilityGenderBasedOptions"
            />
          </n-form-item>

          <n-form-item
            label="Description"
            path="gender_description"
            :rule="{
              message: 'Please add a description',
              required: moduleData.gender_based === 'No' ? true : false,
              trigger: ['blur', 'input'],
            }"
          >
            <n-input
              v-model:value="moduleData.gender_description"
              placeholder=""
              type="textarea"
              :rows="2"
              clearable
            />
          </n-form-item>

          <n-divider />

          <h3>Age</h3>

          <p class="pb-8 pt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia
            voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum
          </p>

          <div class="flex w-full items-start space-x-5">
            <n-form-item label="Minimum Age" path="minimum_age.age">
              <n-input-number
                v-model:value="moduleData.minimum_age.age"
                :min="1"
                clearable
                class="w-full"
              />
            </n-form-item>

            <n-form-item label="Age Unit" path="minimum_age.unit" class="min-w-[290px]">
              <n-select
                v-model:value="moduleData.minimum_age.unit"
                placeholder="Weeks"
                clearable
                :options="FORM_JSON.studyMetadataEligibilityAgeUnitOptions"
              />
            </n-form-item>
          </div>

          <div class="flex w-full items-start space-x-5">
            <n-form-item label="Maximum Age" path="maximum_age.age">
              <n-input-number
                v-model:value="moduleData.maximum_age.age"
                :min="1"
                clearable
                class="w-full"
              />
            </n-form-item>

            <n-form-item label="Age Unit" path="maximum_age.unit" class="min-w-[290px]">
              <n-select
                v-model:value="moduleData.maximum_age.unit"
                placeholder="Months"
                clearable
                :options="FORM_JSON.studyMetadataEligibilityAgeUnitOptions"
              />
            </n-form-item>
          </div>

          <n-divider />

          <div v-if="moduleData.study_type === 'Interventional'">
            <h3>Interventional Studies</h3>

            <p class="pb-8 pt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia
              voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum
            </p>

            <n-form-item
              label="Are the volunteers healthy?"
              path="healthy_volunteers"
              :rule="{
                message: 'Please select if the volunteers are healthy',
                required: moduleData.study_type === 'Interventional' ? true : false,
                trigger: ['blur', 'input'],
              }"
            >
              <n-select
                v-model:value="moduleData.healthy_volunteers"
                placeholder="Yes"
                clearable
                :options="FORM_JSON.studyMetadataEligibilityHealthyVolunteersOptions"
              />
            </n-form-item>

            <n-divider />
          </div>

          <h3>Eligibility Criteria</h3>

          <p class="pb-8 pt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia
            voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum
          </p>

          <n-form-item
            label="Inclusion Criteria"
            path="criteria.inclusion_criteria"
            ignore-path-change
            :rule="{
              message: 'Please add at least one inclusion criteria',
              required: true,
              type: 'array',
              trigger: ['blur', 'input'],
            }"
          >
            <!-- outer form item is only used to diplay the label and the required mark -->

            <n-dynamic-input
              v-model:value="moduleData.criteria.inclusion_criteria"
              #="{ index: idx, value }"
              :on-create="addEntryToCriteria"
            >
              <n-form-item
                ignore-path-change
                :show-label="false"
                :path="`criteria.inclusion_criteria[${idx}]`"
                class="w-full"
              >
                <n-input
                  v-model:value="moduleData.criteria.inclusion_criteria[idx]"
                  placeholder="Intervention"
                  @keydown.enter.prevent
                />
              </n-form-item>
            </n-dynamic-input>
          </n-form-item>

          <n-form-item
            label="Exclusion Criteria"
            path="criteria.exclusion_criteria"
            ignore-path-change
            :rule="{
              message: 'Please add at least one exclusion criteria',
              required: true,
              type: 'array',
              trigger: ['blur', 'input'],
            }"
          >
            <!-- outer form item is only used to diplay the label and the required mark -->

            <n-dynamic-input
              v-model:value="moduleData.criteria.exclusion_criteria"
              #="{ index: idx, value }"
              :on-create="addEntryToCriteria"
            >
              <n-form-item
                ignore-path-change
                :show-label="false"
                :path="`criteria.exclusion_criteria[${idx}]`"
                class="w-full"
              >
                <n-input
                  v-model:value="moduleData.criteria.exclusion_criteria[idx]"
                  placeholder="Intervention"
                  @keydown.enter.prevent
                />
              </n-form-item>
            </n-dynamic-input>
          </n-form-item>

          <div v-if="moduleData.study_type === 'observational'">
            <n-divider />

            <h3>Observational Studies</h3>

            <p class="pb-8 pt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia
              voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum
            </p>

            <n-form-item
              label="Study Population"
              path="study_population"
              :rule="{
                message: 'Please add the study population',
                required: moduleData.study_type === 'observational' ? true : false,
                trigger: ['blur', 'input'],
              }"
            >
              <n-input
                v-model:value="moduleData.study_population"
                placeholder="Lorem Ipsum"
                clearable
              />
            </n-form-item>

            <n-form-item
              label="Sampling Method"
              path="sampling_method"
              :rule="{
                message: 'Please add the sampling method',
                required: moduleData.study_type === 'observational' ? true : false,
                trigger: ['blur', 'input'],
              }"
            >
              <n-select
                v-model:value="moduleData.sampling_method"
                placeholder="Probability Sample"
                clearable
                :options="FORM_JSON.studyMetadataEligibilitySamplingMethodOptions"
              />
            </n-form-item>
          </div>

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
      </div>
    </FadeTransition>
  </main>
</template>
