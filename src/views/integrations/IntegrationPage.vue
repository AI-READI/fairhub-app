<script setup lang="ts">
import { NButton } from "naive-ui";
import { Vue3Lottie } from "vue3-lottie";

import IntegrationsPageLottie from "@/assets/animations/integrations.json";
</script>

<template>
  <main>
    <h1>Integrations</h1>

    <p class="py-3">Manage the services connected to your Fairhub account</p>

    <div class="mb-8">
      <Vue3Lottie :animationData="IntegrationsPageLottie" :height="300" :width="300" />
    </div>

    <div class="flex justify-center">
      <a href="https://docs.fairhub.io" target="_blank" rel="noopener">
        <n-button type="primary" size="large" disabled>
          <template #icon>
            <f-icon icon="solar:sort-by-time-broken" />
          </template>

          Coming soon...
        </n-button>
      </a>
    </div>
  </main>
</template>
