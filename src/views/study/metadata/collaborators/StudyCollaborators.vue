<script setup lang="ts">
import type { FormInst } from "naive-ui";
import { nanoid } from "nanoid";
const route = useRoute();

const formRef = ref<FormInst | null>(null);

type Collaborator = {
  id: string;
  name: string;
};

const moduleData = ref<Collaborator[]>([
  {
    id: nanoid(),
    name: "Frieda Reiss",
  },
  {
    id: nanoid(),
    name: "Grisha Yeager",
  },
]);

const addCollaborator = () => {
  moduleData.value.push({
    id: nanoid(),
    name: "",
  });
};

const removeCollaborator = (id: string) => {
  const collaborators = moduleData.value;

  const index = collaborators.findIndex((collaborator) => collaborator.id === id);

  collaborators.splice(index, 1);
};

const saveMetadata = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      // remove empty collaborators
      const collaborators = moduleData.value.filter((collaborator) => collaborator.name !== "");

      // remove collaborators with duplicate names
      const uniqueCollaborators = collaborators.filter(
        (collaborator, index, self) => index === self.findIndex((c) => c.name === collaborator.name)
      );

      console.log("collaborators", uniqueCollaborators);

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
      linkName="study:overview"
      :linkParams="{
        studyId: route.params.studyId,
      }"
    />

    <n-divider />

    <p class="pb-8 pt-2">
      Other organizations (if any) providing support. Support may include funding, design,
      implementation, data analysis or reporting. The responsible party is responsible for
      confirming all collaborators before listing them.
    </p>

    <n-form ref="formRef" :model="moduleData" size="large" label-placement="top" class="pr-4">
      <n-form-item
        v-for="collaborator in moduleData"
        :key="collaborator.id"
        label="Full Name"
        path="collaborator.name"
      >
        <n-input v-model:value="collaborator.name" placeholder="Historia Reiss" />

        <n-popconfirm @positive-click="removeCollaborator(collaborator.id)">
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
