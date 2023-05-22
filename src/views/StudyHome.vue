<script setup lang="ts">
import { NImage, NSpace } from "naive-ui";
import { useRoute, useRouter } from "vue-router";

import { getStudy } from "@/stores/studies";
const router = useRouter();
const route = useRoute();

const routeParams = {
  id: route.params.id.toString(),
};
const study = getStudy(parseInt(routeParams.id));

// const owner = {
//   name: study.owner.name,
//   email: study.owner.email,
//   role: "owner",
//   status: "active",
// };

const navigateToStudy = (id: number) => {
  router.push({ name: "study", params: { id: id.toString() } });
};
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-8">
    <n-space vertical>
      <h1>Dataset overview</h1>
    </n-space>

    <n-space vertical>
      <div
        class="flex w-full cursor-pointer items-start space-x-8 rounded-md px-4 py-3 transition-all hover:border-slate-200"
        :key="study.id"
        @click="navigateToStudy(study.id)"
      >
        <n-image class="studyHome" width="145" :src="study.image" preview-disabled />
        <div class="flex w-full grow flex-col space-y-2 divide-y">
          <div class="flex flex-col space-y-2">
            <n-space justify="space-between"> </n-space>
            <h2>{{ study.title }}</h2>
            <p class="owner text-sm underline underline-offset-1">{{ study.owner.name }}</p>
            <p class="study-description">{{ study.description }}</p>
          </div>
          <p class="pt-2">
            <span class="font-bold">Last Updated: </span>
            <span>{{ study.lastUpdated }}</span>
          </p>

          <div class="align-center flex pt-2">
            <p>
              <span class="font-bold">Latest published version: </span>
              <span v-if="study.lastPublished">
                {{ study.lastPublished.version }}
                ({{ study.lastPublished.date }})
              </span>
              <span v-else>Not published yet</span>
            </p>
          </div>
          <p class="pt-2">
            <span class="font-bold">Published dataset DOI: </span>
            <span v-if="study.lastPublished">
              {{ study.lastPublished.doi }}
            </span>
            <span v-else>Not published yet</span>
          </p>
          <div class="align-center flex pt-2">
            <p>
              <span class="font-bold">Study size: </span>
              <span>{{ study.size }}</span>
            </p>
          </div>
        </div>
      </div>
    </n-space>
  </main>
</template>

<style>
.n-image.studyHome.n-image--preview-disabled img {
  width: 200px;
  height: 210px;
}

.owner {
  margin: 0.5rem 0 0.5rem 0 !important;
}
.study-description {
  margin: 1rem 0 1rem 0 !important;
}
</style>
