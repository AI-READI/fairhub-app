<script setup lang="ts">
import { NList, NListItem, NThing } from "naive-ui";
import { useRoute } from "vue-router";

import { useStudiesStore } from "@/stores/studies";
const studiesStore = useStudiesStore();
const route = useRoute();

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
  <main class="flex h-full w-full flex-col space-y-8">
    <h1>{{ study.title }}</h1>
    <div>{{ study.description }}</div>
    <n-list hoverable>
      <n-list-item>
        <n-thing title="Name of the Study Owner">
          <div>{{ owner.name }}</div>
        </n-thing>
      </n-list-item>
      <n-list-item>
        <n-thing title="Name of contributors">
          <div v-for="contributor in contributors" :key="contributor.email">
            {{ contributor.name }}
          </div>
        </n-thing>
      </n-list-item>
      <n-list-item>
        <n-thing title="Email of the owner" content-style="margin-top: 10px;">
          <div>{{ owner.email }}</div>
        </n-thing>
      </n-list-item>
      <n-list-item>
        <n-thing title="Study image" content-style="margin-top: 10px;">
          <div>{{ study.image }}</div>
        </n-thing>
      </n-list-item>
      <n-list-item>
        <n-thing title="Last update date" content-style="margin-top: 10px;">
          <div>{{ study.lastUpdated }}</div>
        </n-thing>
      </n-list-item>
    </n-list>
  </main>
</template>

<style>
.study {
  display: flex;
  flex-direction: column;
}
</style>
