<script setup lang="ts">
import { faker } from "@faker-js/faker";

import { useSidebarStore } from "@/stores/sidebar";
import { useStudyStore } from "@/stores/study";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const push = usePush();

const sidebarStore = useSidebarStore();
const studyStore = useStudyStore();

const routeParams = {
  studyId: route.params.studyId,
};

const studyId = routeParams.studyId as string;

const loader = ref(false);

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

      loader.value = true;

      const response = await fetch(`${baseURL}/study/${studyId}/dataset`, {
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      loader.value = false;

      if (!response.ok) {
        push.error("Something went wrong.");

        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      console.log(data);

      router.push({
        name: "dataset:metadata:general-information",
        params: { datasetId: data.id, studyId },
      });
      // push.success("Dataset created successfully.");
    } else {
      console.log("error");
      console.log(errors);
    }
  });
};
const previousPage = () => {
  router.push({
    name: "study:all-datasets",
    params: { studyId },
  });
};
</script>

<template>
  <main class="flex h-full w-full flex-col">
    <h1 class="pb-4">Prepare dataset</h1>

    <p>
      You will be guided through all the steps of the publishing process before submitting your
      final version.
    </p>

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

      <div class="flex justify-between gap-4">
        <n-button
          size="large"
          type="primary"
          @click="previousPage"
          :disabled="
            studyStore.currentStudyRole === 'viewer' || studyStore.currentStudyRole === 'editor'
          "
        >
          <template #icon>
            <f-icon icon="ic:round-arrow-back-ios" />
          </template>
          Back
        </n-button>

        <n-button
          size="large"
          type="primary"
          @click="createDataset"
          :loading="loader"
          :disabled="
            studyStore.currentStudyRole === 'viewer' || studyStore.currentStudyRole === 'editor'
          "
        >
          <template #icon>
            <f-icon icon="solar:round-arrow-right-bold" />
          </template>
          Start publish process
        </n-button>
      </div>
    </n-form>
  </main>
</template>
