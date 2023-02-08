<script setup lang="ts">
import { NImage, NSpace } from "naive-ui";
</script>

<template>
  <main class="flex h-full w-full flex-col">
    <div class="mx-auto flex w-full max-w-screen-xl justify-between pt-8">
      <n-space mode="vertical" class="max-w-screen-sm">
        <h1 class="pb-4 text-4xl font-bold">A platform for sharing FAIR and AI-ready datasets</h1>

        <p>
          Revolutionize the way you store and manage your research data with our cutting-edge
          platform. Our platform offers secure, scalable, and easy-to-use solutions for researchers
          and organizations, ensuring your data is always accessible, organized, and protected. Say
          goodbye to the hassle of manual data management and experience the power of advanced
          technology to advance your research. Sign up now and start exploring the limitless
          possibilities of our research data storage platform.
        </p>
      </n-space>

      <n-image
        src="https://images.unsplash.com/photo-1674420628423-bf7a338af32d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80"
        alt=""
        width="400"
        class=""
      />
    </div>
  </main>
</template>
