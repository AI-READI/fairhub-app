<script setup lang="ts">
import { NButton } from "naive-ui";
import { Vue3Lottie } from "vue3-lottie";

import IssueLottieAnimation from "@/assets/animations/report_issue.json";
</script>

<template>
  <div class="flex h-full w-full flex-col">
    <h1>Report an issue</h1>

    <p class="py-3">
      If you have any issues with FAIRhub, please create an issue on GitHub. For any other
      questions, please contact us at using the links below.
    </p>

    <Vue3Lottie :animationData="IssueLottieAnimation" :height="300" :width="300" />

    <div class="flex justify-center space-x-4">
      <a
        href="https://github.com/AI-READI/fairhub.io/issues/new"
        target="_blank"
        rel="noopener noreferrer"
      >
        <n-button type="primary" size="large">
          <template #icon>
            <f-icon icon="pajamas:issue-type-incident" />
          </template>

          I have an issue with FAIRhub
        </n-button>
      </a>

      <a href="https://fairdataihub.org/contact-us" target="_blank" rel="noopener">
        <n-button strong secondary type="primary" size="large">
          <template #icon>
            <f-icon icon="iconamoon:send-bold" />
          </template>

          Send us a message
        </n-button>
      </a>
    </div>
  </div>
</template>
