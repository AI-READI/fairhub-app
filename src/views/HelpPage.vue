<script setup lang="ts">
import "vue3-lottie/dist/style.css";

import { Vue3Lottie } from "vue3-lottie";

import Help from "../assets/animations/help.json";
</script>

<template>
  <h1>Help</h1>
  <div>
    <Vue3Lottie :animationData="Help" :height="700" :width="500" />
  </div>
</template>
