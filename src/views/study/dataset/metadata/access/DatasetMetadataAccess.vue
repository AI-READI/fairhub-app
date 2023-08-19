<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useDatasetStore } from "@/stores/dataset";

const route = useRoute();
const router = useRouter();
const { error, success } = useMessage();

const authStore = useAuthStore();
const datasetStore = useDatasetStore();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

const datasetResources = ref([]);

onBeforeMount(async () => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }
});
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Access"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      linkName="dataset:overview"
      :linkParams="{ datasetId: routeParams.datasetId, studyId: routeParams.studyId }"
    />

    <n-divider />

    <p class="pb-8 pt-2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam
      ultrices, nunc nisl tincidunt nunc, vitae aliquam nunc nisl sit amet nunc.
    </p>

    <n-list>
      <n-list-item v-for="resource in datasetResources" :key="resource">
        <div class="mb-2 mr-5 flex w-full items-start space-x-5">
          <div class="flex w-full flex-col space-y-2">
            <span class="font-semibold"> Item </span>

            <n-input v-model:value="resource.value" size="large" type="textarea" rows="1" />
          </div>

          <div class="flex flex-col space-y-3">
            <span> &nbsp; </span>

            <n-button>
              <f-icon icon="gridicons:trash" />
            </n-button>
          </div>
        </div>
      </n-list-item>
    </n-list>

    <n-button class="my-10" dashed type="info">
      <template #icon>
        <f-icon icon="gridicons:create" />
      </template>

      Add a item
    </n-button>

    <n-divider />

    <div class="flex justify-start">
      <n-button size="large" type="primary">
        <template #icon>
          <f-icon icon="material-symbols:save" />
        </template>

        Save changes
      </n-button>
    </div>
  </main>
</template>
