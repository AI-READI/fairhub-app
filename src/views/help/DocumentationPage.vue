<script setup lang="ts">
import { NButton } from "naive-ui";
import { Vue3Lottie } from "vue3-lottie";

import DocumentationPageLottie from "@/assets/animations/documents_page.json";
</script>

<template>
  <main>
    <h1>Documentation</h1>

    <p class="py-3">If need more information about FairHub, you can view the documentation here.</p>

    <div class="mb-8">
      <Vue3Lottie :animationData="DocumentationPageLottie" :height="300" :width="300" />
    </div>

    <div class="flex justify-center">
      <a href="https://docs.fairhub.io" target="_blank" rel="noopener">
        <n-button type="primary" size="large">
          <template #icon>
            <f-icon icon="fluent-mdl2:documentation" />
          </template>

          View the Documentation
        </n-button>
      </a>
    </div>
  </main>
</template>
