<script setup lang="ts">
import "vue3-lottie/dist/style.css";

import { NA, NButton, NP } from "naive-ui";
import { Vue3Lottie } from "vue3-lottie";

import Docs from "../assets/animations/documents_page.json";
</script>

<template>
  <h1>Documentation</h1>
  <n-p>
    We have created a documentation page for each feature in FAIRhub. You can find the documentation
    site by clicking on the button below:
  </n-p>
  <n-button><n-a href="www.docs.fairhub.io" target="_blank">View the Documentation</n-a> </n-button>

  <div><Vue3Lottie :animationData="Docs" :height="400" :width="400" /></div>
</template>

<style>
n-a {
  font-weight: 500;
}
</style>
