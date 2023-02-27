<script setup lang="ts">
import { NCard } from "naive-ui";
import { ref } from "vue";

const checkingForPreviousVersions = ref(true);

setTimeout(() => {
  checkingForPreviousVersions.value = false;
}, 3000);
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <n-card v-if="checkingForPreviousVersions">
      <div class="flex flex-col items-center pb-3">
        <Vue3Lottie
          animationLink="https://assets2.lottiefiles.com/private_files/lf30_b0iey3ml.json"
          :height="200"
          :width="200"
        />

        <p>Checking for previously published versions of this dataset</p>
      </div>
    </n-card>
    <div v-else></div>
  </main>
</template>
