<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";

import FORM_JSON from "@/assets/data/form.json";
import type { StudyInterventions } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const message = useMessage();

const formRef = ref<FormInst | null>(null);

const moduleData = reactive<StudyInterventions>({
  interventions: [],
});

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/intervention`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  console.log(data);

  moduleData.interventions = data.map((item: any) => {
    return {
      ...item,
      origin: "remote",
    };
  });
});

const dynamicInputRule = {
  trigger: ["blur", "input"],
  validator: (rule: unknown, value: string) => {
    if (!value || value === "") {
      return new Error("Please enter a value for this field");
    }
    return true;
  },
};

const addEntryToArmGroupLabelList = () => {
  return "";
};

const addEntryToOtherNameList = () => {
  return "";
};

const removeIntervention = async (id: string) => {
  const item = moduleData.interventions.find((item) => item.id === id);

  if (item && item.origin === "remote") {
    const response = await fetch(
      `${baseURL}/study/${route.params.studyId}/metadata/intervention/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      message.error("Failed to delete intervention");
      throw new Error("Network response was not ok");
    }

    message.success("Intervention deleted successfully");
  }

  moduleData.interventions = moduleData.interventions.filter((item) => item.id !== id);
};

const addIntervention = () => {
  moduleData.interventions.push({
    id: nanoid(),
    name: "",
    arm_group_label_list: [],
    description: "",
    origin: "local",
    other_name_list: [],
    type: null,
  });
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data: any = moduleData.interventions.map((item) => {
        const entry = {
          name: item.name || "",
          arm_group_label_list: item.arm_group_label_list || [],
          description: item.description || "",
          other_name_list: item.other_name_list || [],
          type: item.type,
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

      const response = await fetch(
        `${baseURL}/study/${route.params.studyId}/metadata/intervention`,
        {
          body: JSON.stringify(data),

          method: "POST",
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
      title="Interventions"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      linkName="study:overview"
      :linkParams="{
        studyId: route.params.studyId,
      }"
    />

    <n-divider />

    <n-form ref="formRef" :model="moduleData" size="large" label-placement="top" class="pr-4">
      <CollapsibleCard
        v-for="(item, index) in moduleData.interventions"
        :key="item.id"
        class="mb-5 shadow-md"
        :title="`Intervention ${index + 1}`"
        bordered
      >
        <template #header-extra>
          <n-popconfirm @positive-click="removeIntervention(item.id)">
            <template #trigger>
              <n-button type="error" secondary>
                <template #icon>
                  <f-icon icon="ep:delete" />
                </template>

                Remove Intervention
              </n-button>
            </template>

            Are you sure you want to remove this intervention?
          </n-popconfirm>
        </template>

        <n-form-item
          label="Type"
          :path="`interventions[${index}].type`"
          :rule="{
            message: 'Please select an intervention type',
            required: true,
            trigger: ['blur', 'change'],
          }"
        >
          <n-select
            v-model:value="item.type"
            placeholder="Drug"
            clearable
            :options="FORM_JSON.studyMetadataInterventionsTypeOptions"
          />
        </n-form-item>

        <n-form-item
          label="Name"
          :path="`interventions[${index}].name`"
          :rule="{
            message: 'Please enter an intervention name',
            required: true,
            trigger: ['blur', 'input'],
          }"
        >
          <n-input v-model:value="item.name" placeholder="Lorem Ipsum" clearable />
        </n-form-item>

        <n-form-item label="Description" :path="`intervention_list[${index}].description`">
          <n-input
            v-model:value="item.description"
            placeholder="Lorem Ipsum"
            clearable
            type="textarea"
            :rows="3"
          />
        </n-form-item>

        <n-form-item
          label="Arm Group Labels"
          :path="`interventions[${index}].arm_group_label_list`"
          ignore-path-change
          :rule="{
            message: 'Please add at least one arm group label',
            required: true,
            type: 'array',
            trigger: ['blur', 'input'],
          }"
        >
          <!-- outer form item is only used to diplay the label and the required mark -->

          <n-dynamic-input
            v-model:value="item.arm_group_label_list"
            #="{ index: idx, value }"
            :on-create="addEntryToArmGroupLabelList"
          >
            <n-form-item
              ignore-path-change
              :show-label="false"
              :path="`interventions[${index}].arm_group_label_list[${idx}]`"
              :rule="dynamicInputRule"
              class="w-full"
            >
              <n-input
                v-model:value="item.arm_group_label_list[idx]"
                placeholder="Name"
                @keydown.enter.prevent
              />
            </n-form-item>
          </n-dynamic-input>
        </n-form-item>

        <n-form-item label="Other Names">
          <!-- outer form item is only used to diplay the label -->

          <n-dynamic-input
            v-model:value="item.other_name_list"
            #="{ index: idx, value }"
            :on-create="addEntryToOtherNameList"
          >
            <n-form-item
              ignore-path-change
              :show-label="false"
              :path="`interventions[${index}].other_name_list[${idx}]`"
              class="w-full"
            >
              <n-input
                v-model:value="item.other_name_list[idx]"
                placeholder="Name"
                @keydown.enter.prevent
              />
            </n-form-item>
          </n-dynamic-input>
        </n-form-item>
      </CollapsibleCard>

      <n-button class="my-10 w-full" dashed type="success" @click="addIntervention">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add an Intervention
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
  </main>
</template>
