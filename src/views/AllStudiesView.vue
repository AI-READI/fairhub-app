<script setup lang="ts">
import { AddCircleOutline } from "@vicons/ionicons5";
import { NButton, NIcon, NImage, NSpace, useMessage } from "naive-ui";
import { onBeforeMount } from "vue";
import { RouterLink, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const { error } = useMessage();

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }
});

const studies = [
  {
    id: 1,
    name: "AI-READI",
    description:
      "The AI-READI project seeks to create and share a flagship ethically-sourced dataset of type 2 diabetes.",
    image: `https://fairdataihub.org/images/hero/aireadi-logo.png`,
    size: "2.8 GB",
    lastUpdated: "2023-02-13",
    lastPublished: {
      version: "1.0.0",
      date: "2023-01-13",
      doi: "10.1234/1234",
    },
  },
  {
    id: 2,
    name: "Study 2",
    description: "Study 2 description",
    image: `https://api.dicebear.com/5.x/shapes/svg?seed=${Math.random()}`,
    size: "1.2 GB",
    lastUpdated: "2023-02-05",
  },
];
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-5">
    <n-space justify="space-between">
      <h1>All Studies</h1>
      <RouterLink :to="{ name: 'new-study' }">
        <n-button icon-placement="left" size="large" type="primary">
          <template #icon>
            <n-icon>
              <add-circle-outline />
            </n-icon>
          </template>
          New Study
        </n-button>
      </RouterLink>
    </n-space>

    <div
      class="flex w-full items-start space-x-8 rounded-md border border-slate-100 px-4 py-3 transition-all hover:border-slate-200 hover:bg-slate-50"
      v-for="study in studies"
      :key="study.id"
    >
      <n-image width="100" :src="study.image" />
      <div class="flex w-full grow flex-col space-y-2 divide-y">
        <div class="flex flex-col space-y-2">
          <n-space justify="space-between">
            <h3>{{ study.name }}</h3>
            <span>{{ study.size }}</span>
          </n-space>
          <p>{{ study.description }}</p>
        </div>

        <p class="pt-2">
          <span class="font-bold">Last Updated: </span>
          <span>{{ study.lastUpdated }}</span>
        </p>

        <div class="align-center flex space-x-3 divide-x pt-2">
          <p>
            <span class="font-bold">Latest published version: </span>
            <span v-if="study.lastPublished"
              >{{ study.lastPublished.version }} {{ study.lastPublished.date }}</span
            >
            <span v-else>Not published yet</span>
          </p>

          <p class="pl-2" v-if="study.lastPublished">
            <span class="font-bold">Latest DOI: </span>
            <span class="text-blue-500">{{ study.lastPublished!.doi }}</span>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
