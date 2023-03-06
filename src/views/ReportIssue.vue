<script setup lang="ts">
import "vue3-lottie/dist/style.css";

import { NA, NButton, NP } from "naive-ui";
import { Vue3Lottie } from "vue3-lottie";

import Issue from "../assets/animations/report_issue.json";
</script>

<template>
  <div class="flex h-full w-full max-w-screen-lg flex-col items-center justify-center p-3 pr-5">
    <div class="flex h-full w-full flex-col">
      <h1 class="pt-5 pb-1 text-3xl font-bold text-slate-700">Contact Us</h1>

      <Vue3Lottie :animationData="Issue" :height="400" :width="500" />

      <n-p>
        If you have any issues with FAIRhub, please create an issue on GitHub. For any other
        questions, please contact us at using the links below.
      </n-p>

      <div class="flex h-full w-full flex-col items-center justify-start">
        <div class="flex items-center justify-center space-x-4">
          <n-button>
            <n-a href="https://github.com/AI-READI/fairhub.io/issues/new"
              >I have an issue with FAIRhub</n-a
            >
          </n-button>
          <n-button>
            <n-a href="https://fairdataihub.org/contact-us">Send us a message</n-a>
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>
