<script setup lang="ts">
import { RouterView } from "vue-router";

// eslint-disable-next-line no-undef
const development = process.env.NODE_ENV === "development";
</script>

<template>
  <header :class="{ 'debug-screens': development }">
    <h1 class="fixed top-0 left-0 p-2 text-4xl font-black">fairhub.io</h1>
  </header>
  <RouterView />
</template>

<style scoped></style>
