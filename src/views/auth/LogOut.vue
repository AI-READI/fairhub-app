<script setup lang="ts">
import LottieLoader from "@/components/loader/LottieLoader.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const push = usePush();

onBeforeMount(() => {
  authStore.logout();
});

push.info("You have been logged out");

// The LogOut component is a simple component that logs the user out and redirects them to the login page.
</script>

<template>
  <LottieLoader />
</template>
