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
  if (to.name === "publish") {
    checkAuth();
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
