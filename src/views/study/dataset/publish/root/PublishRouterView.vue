<script setup lang="ts">
import { useMessage } from "naive-ui";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useSidebarStore } from "@/stores/sidebar";
import { useVersionStore } from "@/stores/version";

const route = useRoute();
const router = useRouter();
const { error } = useMessage();

const authStore = useAuthStore();
const versionStore = useVersionStore();
const sidebarStore = useSidebarStore();

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
  versionId: route.params.versionId as string,
};

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }

  sidebarStore.setAppSidebarCollapse(true);

  const studyId = routeParams.studyId;
  const datasetId = routeParams.datasetId;
  const versionId = routeParams.versionId;

  versionStore.getVersion(versionId);

  if (route.name && route.name === "dataset:publish:root") {
    console.log("redirecting to datset overview");

    router.push({
      name: "dataset:publish:participants",
      params: { datasetId, studyId, versionId },
    });
  }
});

const steps = [
  { title: "Participants", description: "", route: "dataset:publish:participants" },
  {
    title: "Study Metadata",
    description: "",
    route: "dataset:publish:study-metadata",
  },
  {
    title: "Dataset Metadata",
    description: "",
    route: "dataset:publish:dataset-metadata",
  },
  {
    title: "Publish Dataset",
    description: "",
    route: "dataset:publish:final",
  },
];

const current = computed(() => steps.findIndex((step) => step.route === route.name) + 1);
</script>

<template>
  <div>
    <div v-if="route.name != 'dataset:publish:versions'">
      <n-steps :current="current" class="px-2 py-2">
        <n-step
          v-for="step in steps"
          :key="step.title"
          :title="step.title"
          :description="step.description"
        />
      </n-steps>

      <n-divider dashed />
    </div>

    <router-view v-slot="{ Component }" :key="$route.fullPath">
      <transition name="fade" appear mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
