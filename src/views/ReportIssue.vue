<script setup lang="ts">
import "vue3-lottie/dist/style.css";

import { NA, NButton, NP } from "naive-ui";
import { Vue3Lottie } from "vue3-lottie";

import Issue from "../assets/animations/report_issue.json";
</script>

<template>
  <div class="issue">
    <div
      class="inner flex h-full w-full max-w-screen-lg flex-col items-center justify-center p-3 pr-5"
    >
      <div class="flex h-full w-full flex-col">
        <h1>Report an issue</h1>

        <Vue3Lottie :animationData="Issue" :height="300" :width="350" />

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
  </div>
</template>

<style>
.issue {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.issue h1 {
  font-weight: 800;
  font-size: 2.25em;
  margin-top: 0;
  margin-bottom: 0.8888889em;
  line-height: 1.1111111;
}

.inner {
  max-width: 48rem;
}
</style>
