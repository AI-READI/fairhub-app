<script setup lang="ts">
import { NButton, NImage } from "naive-ui";
</script>

<template>
  <main class="flex h-full w-full flex-col">
    <div class="mx-auto flex h-full w-full max-w-screen-xl items-center justify-between space-x-5">
      <div class="flex max-w-screen-md flex-col">
        <h1 class="pb-4 text-5xl font-bold">
          Your new home for sharing FAIR and AI-ready datasets
        </h1>

        <p class="text-lg">
          fairhub.io is a community-driven platform for sharing FAIR and AI-ready datasets. This
          platform has been built from the ground up to be a more FAIR alternative to the current
          data sharing platforms. Your clincal research data can be shared with the world in a way
          that accessible for both future researchers and machine learning applications.
        </p>

        <div class="w-max pt-4">
          <n-button type="primary" size="large" class="w-full"> Start a study </n-button>
        </div>
      </div>

      <n-image src="https://i.imgur.com/qZXbRGF.jpg" alt="" width="400" preview-disabled />
    </div>
  </main>
</template>
