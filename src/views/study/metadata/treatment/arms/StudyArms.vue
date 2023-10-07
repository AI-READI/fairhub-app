<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import type { StudyArms } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const message = useMessage();

const apiLoading = ref(false);

const formRef = ref<FormInst | null>(null);

const moduleData = reactive<StudyArms>({
  arms: [],
  study_type: "",
});

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  apiLoading.value = true;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/arm`, {
    method: "GET",
  });

  apiLoading.value = false;

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: StudyArms = await response.json();

  moduleData.arms = data.arms.map((item) => {
    return {
      ...item,
      origin: "remote",
    };
  });

  moduleData.study_type = data.study_type;
});

const addEntryToArmGroupInterventionList = () => {
  return "";
};

const removeArmGroup = async (id: string) => {
  const item = moduleData.arms.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(`${baseURL}/study/${route.params.studyId}/metadata/arm/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      message.error("Failed to delete arm group");
      throw new Error("Network response was not ok");
    }

    message.success("Arm group deleted successfully");
  }

  moduleData.arms = moduleData.arms.filter((item) => item.id !== id);
};

const addArmGroup = () => {
  moduleData.arms.push({
    id: nanoid(),
    description: "",
    intervention_list: [],
    label: "",
    origin: "local",
    type: null,
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data = moduleData.arms.map((item) => {
        const entry = {
          description: item.description,
          intervention_list:
            moduleData.study_type === "Interventional" ? item.intervention_list : [],
          label: item.label,
          type: moduleData.study_type === "Interventional" ? item.type : null,
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

      const response = await fetch(`${baseURL}/study/${route.params.studyId}/metadata/arm`, {
        body: JSON.stringify(data),
        method: "POST",
      });

      if (!response.ok) {
        message.error("Something went wrong. Please try again later.");
        throw new Error("Network response was not ok");
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
      title="Arms"
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
            title="A study type should be added before you can add study arms."
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
          size="large"
          label-placement="top"
          class="pr-4"
          :disabled="!moduleData.study_type"
        >
          <CollapsibleCard
            v-for="(item, index) in moduleData.arms"
            :key="item.id"
            class="mb-5 shadow-md"
            :title="`Arm ${index + 1}`"
            bordered
          >
            <template #header-extra>
              <n-popconfirm @positive-click="removeArmGroup(item.id)">
                <template #trigger>
                  <n-button type="error" secondary>
                    <template #icon>
                      <f-icon icon="ep:delete" />
                    </template>

                    Remove Arm
                  </n-button>
                </template>

                Are you sure you want to remove this Arm?
              </n-popconfirm>
            </template>

            <n-form-item
              label="Label"
              :path="`arms[${index}].label`"
              :rule="{
                message: 'Please enter an arm group label',
                required: true,
                trigger: ['blur', 'input'],
              }"
            >
              <n-input v-model:value="item.label" placeholder="Lorem Ipsum" clearable />
            </n-form-item>

            <n-form-item label="Description" :path="`arms[${index}].description`">
              <n-input
                v-model:value="item.description"
                placeholder="Lorem Ipsum"
                clearable
                type="textarea"
                :rows="3"
              />
            </n-form-item>

            <n-form-item
              label="Type"
              :path="`arms[${index}].type`"
              v-if="moduleData.study_type == 'Interventional'"
              :rule="{
                message: 'Please select an intervention type',
                required: moduleData.study_type === 'Interventional',
                trigger: ['blur', 'change'],
              }"
            >
              <n-select
                v-model:value="item.type"
                placeholder="Experimental"
                clearable
                :options="FORM_JSON.studyMetadataArmsTypeOptions"
              />
            </n-form-item>

            <n-form-item
              v-if="moduleData.study_type == 'Interventional'"
              label="Interventions"
              :path="`arms[${index}].intervention_list`"
              ignore-path-change
            >
              <!-- outer form item is only used to diplay the label and the required mark -->

              <n-dynamic-input
                v-model:value="item.intervention_list"
                #="{ index: idx, value }"
                :on-create="addEntryToArmGroupInterventionList"
              >
                <n-form-item
                  ignore-path-change
                  :show-label="false"
                  :path="`arms[${index}].intervention_list[${idx}]`"
                  class="w-full"
                >
                  <n-input
                    v-model:value="item.intervention_list[idx]"
                    placeholder="Intervention"
                    @keydown.enter.prevent
                  />
                </n-form-item>
              </n-dynamic-input>
            </n-form-item>
          </CollapsibleCard>

          <n-button
            class="my-10 w-full"
            dashed
            type="success"
            @click="addArmGroup"
            :disabled="!moduleData.study_type"
          >
            <template #icon>
              <f-icon icon="gridicons:create" />
            </template>

            Add an Arm Group
          </n-button>

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
