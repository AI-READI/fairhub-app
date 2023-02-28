<script setup lang="ts">
import { NCard } from "naive-ui";
import { useRouter } from "vue-router";

const router = useRouter();

setTimeout(() => {
  router.push({ name: "publish-new-version" });
}, 1000);
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <n-card>
      <div class="flex flex-col items-center pb-3">
        <Vue3Lottie
          animationLink="https://assets2.lottiefiles.com/private_files/lf30_b0iey3ml.json"
          :height="150"
          :width="200"
        />

        <p>Checking for previously published versions of this dataset</p>
      </div>
    </n-card>
  </main>
</template>
