<script setup lang="ts">
import ErrorAnimationJSON from "@/assets/animations/404.json";
</script>

<template>
  <div class="mx-auto flex max-w-screen-lg flex-col justify-start pt-20">
    <Vue3Lottie
      :animationData="ErrorAnimationJSON"
      :height="250"
      :width="300"
      class="!mx-0"
      :loop="1"
    />

    <n-space vertical>
      <h1 class="pb-2 text-5xl font-bold">Ooops! Page Not Found</h1>

      <p class="max-w-screen-md pb-5 text-2xl font-medium text-slate-500">
        This page doesn't exist or some other error occurred. We suggest you to go back to the home
        page.
      </p>

      <RouterLink :to="{ name: 'home' }">
        <n-button size="large" type="info">
          <template #icon>
            <f-icon icon="ic:round-home" />
          </template>
          Back to Home
        </n-button>
      </RouterLink>
    </n-space>
  </div>
</template>
