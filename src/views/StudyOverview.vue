<script setup lang="ts">
import { NSkeleton, NSpace, useMessage } from "naive-ui";
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useStudiesStore } from "@/stores/studies";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const studiesStore = useStudiesStore();
const { error } = useMessage();

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }
});

const routeParams = {
  id: route.params.id.toString(),
};

const study = studiesStore.getStudy(parseInt(routeParams.id));
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <n-space vertical>
      <h1>{{ study.title }}</h1>
      <p>{{ study.description }}</p>
    </n-space>

    <n-space vertical>
      <n-skeleton height="40px" width="66%" :sharp="false" />
      <n-skeleton height="40px" width="66%" :sharp="false" />
      <n-skeleton height="40px" width="33%" />
      <n-skeleton height="40px" width="66%" :sharp="false" />
      <n-skeleton text height="40px" :repeat="2" style="width: 60%" />
      <n-skeleton text height="40px" style="width: 60%" />
      <n-skeleton height="40px" width="33%" />
    </n-space>
  </main>
</template>
