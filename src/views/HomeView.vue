<script setup lang="ts">
import { NImage, NSpace } from "naive-ui";
</script>

<template>
  <main class="flex h-full w-full flex-col">
    <div class="mx-auto flex h-full w-full max-w-screen-xl items-center justify-between space-x-5">
      <n-space mode="vertical" class="max-w-screen-md">
        <h1 class="pb-4 text-5xl font-bold">
          Your new home for sharing FAIR and AI-ready datasets
        </h1>

        <p>
          Revolutionize the way you store and manage your research data with our cutting-edge
          platform. Our platform offers secure, scalable, and easy-to-use solutions for researchers
          and organizations, ensuring your data is always accessible, organized, and protected. Say
          goodbye to the hassle of manual data management and experience the power of advanced
          technology to advance your research. Sign up now and start exploring the limitless
          possibilities of our research data storage platform.
        </p>
      </n-space>

      <n-image src="https://i.imgur.com/qZXbRGF.jpg" alt="" width="400" class="" />
    </div>
  </main>
</template>
