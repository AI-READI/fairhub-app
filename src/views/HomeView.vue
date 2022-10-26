<script setup lang="ts">
import { NDivider } from "naive-ui";
import { NButton } from "naive-ui";
</script>

<template>
  <main class="flex h-screen w-screen flex-col items-center justify-center">
    <div class="pb-3">
      <Vue3Lottie
        animationLink="https://assets8.lottiefiles.com/private_files/lf30_lbLg6b.json"
        :height="200"
        :width="200"
      />
    </div>
    <h1 class="pb-4 text-center text-4xl font-bold">
      A platform for sharing FAIR and AI-ready datasets
    </h1>
    <p class="text-xl">Coming soon...</p>

    <NDivider class="my-8 w-1/2" />

    <a href="https://fairdataihub.org/blog/bridge2AI-fairdataihub" target="_blank">
      <n-button secondary type="primary" size="large">Learn more about fairhub.io...</n-button>
    </a>
  </main>
</template>
