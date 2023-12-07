<script setup lang="ts">
import { faker } from "@faker-js/faker";

import { useSidebarStore } from "@/stores/sidebar";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const push = usePush();

const sidebarStore = useSidebarStore();

const routeParams = {
  studyId: route.params.studyId,
};

const studyId = routeParams.studyId as string;

onBeforeMount(async () => {
  sidebarStore.setAppSidebarCollapsed(false);
});

const formRef = ref<FormInst | null>(null);

const dataset = ref({
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
});

const rules: FormRules = {
  title: [
    {
      message: "Please add a dataset title",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  description: [
    {
      message: "Please input a dataset description",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
};

const createDataset = (e: MouseEvent) => {
  e.preventDefault();

  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const body = {
        title: dataset.value.title,
        description: dataset.value.description,
      };

      const response = await fetch(`${baseURL}/study/${studyId}/dataset`, {
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        push.error("Something went wrong.");

        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      console.log(data);

      router.push({ name: "dataset:overview", params: { datasetId: data.id, studyId } });
      push.success("Dataset created successfully.");
    } else {
      console.log("error");
      console.log(errors);
    }
  });
};
</script>

<template>
  <main class="flex h-full w-full flex-col">
    <h1>Create a new dataset</h1>

    <n-divider />

    <n-form
      ref="formRef"
      :model="dataset"
      :rules="rules"
      size="large"
      label-placement="top"
      class="pr-4"
    >
      <n-form-item label="Title" path="title">
        <n-input v-model:value="dataset.title" placeholder="Add a dataset title" />
      </n-form-item>

      <n-form-item label="Description" path="description">
        <n-input
          v-model:value="dataset.description"
          placeholder="Add a dataset description"
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 5,
          }"
        />
      </n-form-item>

      <n-divider />

      <div class="flex justify-start">
        <n-button size="large" type="primary" @click="createDataset">
          <template #icon>
            <f-icon icon="gridicons:create" />
          </template>
          Create Dataset
        </n-button>
      </div>
    </n-form>
  </main>
</template>
