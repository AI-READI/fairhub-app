<script setup lang="ts">
import axios from "axios";
import { NButton, NDivider } from "naive-ui";
import { ref } from "vue";

const message = ref("");

const pingServer = () => {
  axios.get("https://api-fairhub-io-main.azurewebsites.net/hello").then((res) => {
    message.value = res.data;
  });
};
</script>

<template>
  <main class="flex h-full w-full flex-col items-center justify-center">
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
    <p class="px-2 text-2xl">Coming soon...</p>

    <NDivider class="my-8 w-1/2" />

    <div class="flex space-x-4">
      <n-button secondary type="primary" size="large" @click="pingServer">
        Ping api.fairhub.io
      </n-button>

      <router-link to="/studies">
        <n-button secondary type="primary" size="large"> Go to studies </n-button>
      </router-link>
    </div>

    <span class="py-8 text-lg" v-if="message != ''">
      Response from api.fairhub.io: {{ message }}
    </span>
  </main>
</template>
