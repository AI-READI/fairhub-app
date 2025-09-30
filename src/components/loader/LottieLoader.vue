<script setup lang="ts">
import LoaderLottieAnimationData from "@/assets/animations/loader.json";

defineProps({
  height: {
    default: 300,
    required: false,
    type: Number,
  },

  width: {
    default: 300,
    required: false,
    type: Number,
  },
});
</script>

<template>
  <div>
    <Vue3Lottie :animationData="LoaderLottieAnimationData" :width="width" :height="height" />
  </div>
</template>
