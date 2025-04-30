<script setup lang="ts">
import { faker } from "@faker-js/faker";

import { useSidebarStore } from "@/stores/sidebar";
import type { DatasetMetadataValidation } from "@/types/Dataset";
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
const responseLoading = ref(false);

const loading = ref(false);

const formRef = ref<FormInst | null>(null);

const version = ref({
  title: faker.commerce.productName(),
});

const moduleData = reactive<DatasetMetadataValidation[]>([]);

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
  responseLoading.value = true;

  const response = await fetch(
    `${baseURL}/study/${studyId}/dataset/${datasetId}/metadata-validation`,
    {
      method: "GET",
    }
  );
  responseLoading.value = false;

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  console.log(data);

  moduleData.splice(0, moduleData.length, ...(data ?? []).map((item: any) => ({ ...item })));

  //
  // aboutList = moduleData.map((item: any) => item.about);
  // datasetSubjects = moduleData.map((item: any) => item.dataset_subjects);
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

function uniqueMetadataIdentifiers(fullMetadata: any) {
  const uniqueIdentifier = new Set();

  const uniqueFields = fullMetadata.filter((field: any) => {
    const key = field.metadata_header; // or field.field if that's your unique identifier
    if (!uniqueIdentifier.has(key)) {
      uniqueIdentifier.add(key);
      return true;
    }
    return false;
  });

  return uniqueFields;
}

const getNamesForHeader = (metadata, header) => {
  return metadata.filter((m) => m.metadata_header === header).map((m) => m.name);
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

    <div class="mr-4 flex gap-2 pb-4" :key="index" v-for="(item, index) in moduleData">
      <n-alert :title="item.message" class="w-full" type="error">
        <div
          class="mb-2 flex text-sm"
          v-for="(field, index) in uniqueMetadataIdentifiers(item.metadata)"
          :key="index"
        >
          <RouterLink
            :to="{
              name: `${item.route_identifier}:${field.route}`,
              params: {
                studyId: routeParams.studyId,
                datasetId: routeParams.datasetId,
              },
              state: {
                missingFields: getNamesForHeader(item.metadata, field.metadata_header),
              },
            }"
          >
            <n-button size="tiny" type="info" ghost>
              Add Missing {{ field.metadata_header }} Details
            </n-button>
          </RouterLink>
        </div>
      </n-alert>
    </div>

    <LottieLoader v-if="responseLoading" />

    <n-form
      v-else
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
        <n-button disabled size="large" type="primary" @click="createVersion" :loading="loading">
          <template #icon>
            <f-icon icon="gridicons:create" />
          </template>
          Create version
        </n-button>
      </div>
    </n-form>
  </main>
</template>
