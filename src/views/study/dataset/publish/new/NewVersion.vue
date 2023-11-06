<script setup lang="ts">
import { faker } from "@faker-js/faker";

import { useSidebarStore } from "@/stores/sidebar";
import { baseURL } from "@/utils/constants";

const route = useRoute();
const router = useRouter();
const push = usePush();

const sidebarStore = useSidebarStore();

const routeParams = {
  datasetId: route.params.datasetId,
  studyId: route.params.studyId,
};

const studyId = routeParams.studyId as string;
const datasetId = routeParams.datasetId as string;

const loading = ref(false);

const formRef = ref<FormInst | null>(null);

const version = ref({
  title: faker.commerce.productName(),
});

const rules: FormRules = {
  title: [
    {
      message: "Please add a dataset title",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
};

onBeforeMount(async () => {
  sidebarStore.setAppSidebarCollapsed(true);
});

const createVersion = (e: MouseEvent) => {
  e.preventDefault();

  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const body = {
        title: version.value.title,
      };

      loading.value = true;

      const response = await fetch(`${baseURL}/study/${studyId}/dataset/${datasetId}/version`, {
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      loading.value = false;

      if (!response.ok) {
        push.error("Something went wrong.");

        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      console.log(data);

      push.success("New draft version created successfully");

      router.push({
        name: "dataset:publish:version:participants",
        params: { datasetId, studyId, versionId: data.id },
      });
    } else {
      console.log("error");
      console.log(errors);
    }
  });
};
</script>

<template>
  <main class="flex h-full w-full flex-col">
    <PageBackNavigationHeader
      title="Create a new version for this dataset"
      description=""
      linkName="dataset:publish:versions"
      :linkParams="{ studyId: routeParams.studyId, datasetId: routeParams.datasetId }"
    />

    <n-divider />

    <n-form
      ref="formRef"
      :model="version"
      :rules="rules"
      size="large"
      label-placement="top"
      class="pr-4"
    >
      <n-form-item label="Title" path="title">
        <n-input v-model:value="version.title" placeholder="Add a version title" />
      </n-form-item>

      <n-divider />

      <div class="flex justify-start">
        <n-button size="large" type="primary" @click="createVersion" :loading="loading">
          <template #icon>
            <f-icon icon="gridicons:create" />
          </template>
          Create version
        </n-button>
      </div>
    </n-form>
  </main>
</template>
