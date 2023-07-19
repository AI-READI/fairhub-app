<template>
  <div>
    <Vue3Lottie :animationData="LoaderLottieAnimationData" :width="300" :height="300" />
  </div>
</template>

<script setup lang="ts">
import LoaderLottieAnimationData from "@/assets/animations/loader.json";
</script>
