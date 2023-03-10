<script setup lang="ts">
import "vue3-lottie/dist/style.css";

import { NA, NButton, NP } from "naive-ui";
import { Vue3Lottie } from "vue3-lottie";

import Docs from "../assets/animations/documents_page.json";
</script>

<template>
  <div class="docs">
    <div class="row">
      <h1 class="docs-header">Documentation</h1>
      <n-p>
        We have created a documentation page for each feature in FAIRhub. You can find the
        documentation site by clicking on the button below:
      </n-p>
      <div><Vue3Lottie :animationData="Docs" :height="400" :width="400" /></div>
    </div>
    <div class="docs-button">
      <n-button>
        <n-a href="www.docs.fairhub.io" target="_blank">View the Documentation</n-a>
      </n-button>
    </div>
  </div>
</template>

<style>
.docs {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.row {
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.docs-header {
  padding-top: 2rem;
}

.docs-button {
  padding-top: 2rem;
}
</style>
