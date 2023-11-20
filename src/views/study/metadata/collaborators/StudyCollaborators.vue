<script setup lang="ts">
import type { FormInst } from "naive-ui";

import { getBackParams, getBackRoute } from "@/stores/nav";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const message = useMessage();

const formRef = ref<FormInst | null>(null);

const moduleData = ref<string[]>([]);

onBeforeMount(async () => {
  const studyId = route.params.studyId;

  const response = await fetch(`${baseURL}/study/${studyId}/metadata/collaborators`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  moduleData.value = await response.json();
});

const addCollaborator = () => {
  moduleData.value.push("");
};

const removeCollaborator = (index: number) => {
  moduleData.value.splice(index, 1);
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      // remove empty collaborators
      const collaborators = moduleData.value.filter((collaborator) => collaborator !== "");

      // remove collaborators with duplicate names
      const uniqueCollaborators = [...new Set(collaborators)];

      const response = await fetch(
        `${baseURL}/study/${route.params.studyId}/metadata/collaborators`,
        {
          body: JSON.stringify(uniqueCollaborators),
          method: "PUT",
        }
      );

      if (!response.ok) {
        message.error("Something went wrong.");
        return;
      } else {
        message.success("Study updated successfully.");
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
      title="Collaborators"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      :linkName="getBackRoute()"
      :linkParams="getBackParams()"
    />

    <n-divider />

    <p class="pb-8 pt-2">
      Other organizations (if any) providing support. Support may include funding, design,
      implementation, data analysis or reporting. The responsible party is responsible for
      confirming all collaborators before listing them.
    </p>

    <n-form ref="formRef" :model="moduleData" size="large" label-placement="top" class="pr-4">
      <n-form-item
        v-for="(collaborator, index) in moduleData"
        :key="index"
        label="Full Name"
        path="collaborator"
      >
        <n-input v-model:value="moduleData[index]" placeholder="Historia Reiss" />

        <n-popconfirm @positive-click="removeCollaborator(index)">
          <template #trigger>
            <n-button class="ml-5">
              <f-icon icon="gridicons:trash" />
            </n-button>
          </template>

          Are you sure you want to remove this collaborator?
        </n-popconfirm>
      </n-form-item>

      <n-button class="mb-10 w-full" dashed type="success" @click="addCollaborator">
        <template #icon>
          <f-icon icon="gridicons:create" />
        </template>

        Add a Collaborator
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
