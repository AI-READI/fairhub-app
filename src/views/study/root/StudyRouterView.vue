<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useStudyStore } from "@/stores/study";

const route = useRoute();
const router = useRouter();
const push = usePush();

const authStore = useAuthStore();
const studyStore = useStudyStore();

const routeParams = {
  studyId: route.params.studyId as string,
};

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    push.error("You are not logged in.");
    router.push({ name: "home" });
  }

  const studyId = routeParams.studyId;

  studyStore.getStudy(studyId);

  if (route.name && route.name === "study:root") {
    console.log("redirecting to study overview");

    router.push({ name: "study:overview", params: { studyId } });
  }
});
</script>

<template>
  <router-view v-slot="{ Component }" :key="$route.fullPath">
    <transition name="fade" appear mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
