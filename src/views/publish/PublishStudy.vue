<script setup lang="ts">
import { useMessage } from "naive-ui";
import { onBeforeMount } from "vue";
import { onBeforeRouteUpdate, RouterView, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const { error } = useMessage();

function checkAuth() {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }
}

onBeforeMount(() => {
  checkAuth();
});

onBeforeRouteUpdate((to) => {
  // if (from.params.studyId !== to.params.studyId) {
  //
  // }
  if (to.name === "publish") {
    checkAuth();
  }
});
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <router-view />
  </main>
</template>
