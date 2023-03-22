<script setup lang="ts">
import { NImage, NSpace, useMessage } from "naive-ui";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useStudiesStore } from "@/stores/studies";
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const studiesStore = useStudiesStore();
const { error } = useMessage();
const routeParams = {
  id: route.params.id.toString(),
};
const study = studiesStore.getStudy(parseInt(routeParams.id));

const contributors = study.contributors;

const owner = {
  name: study.owner.name,
  email: study.owner.email,
  role: "owner",
  status: "active",
};
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <n-space vertical>
      <h1>{{ study.title }}</h1>
      <p>{{ study.description }}</p>
    </n-space>

    <n-space vertical>
      <div
        class="flex w-full cursor-pointer items-start space-x-8 rounded-md border border-slate-100 px-4 py-3 transition-all hover:border-slate-200 hover:bg-slate-50"
        :key="study.id"
        @click="navigateToStudy(study.id)"
      >
        <n-image width="100" :src="study.image" preview-disabled />
        <div class="flex w-full grow flex-col space-y-2 divide-y">
          <div class="flex flex-col space-y-2">
            <n-space justify="space-between">
              <h3>{{ study.title }}</h3>
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
                >{{ study.lastPublished.version }} ({{ study.lastPublished.date }})</span
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
    </n-space>
  </main>
</template>
