<script setup lang="ts">
import { NCollapse, NCollapseItem } from "naive-ui";
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
    <div class="studyHome prose">
      <h1 class="header-study">Homepage</h1>
      <n-collapse arrow-placement="right" default-expanded-names="1">
        <n-collapse-item title="Preview" name="1">
          <div>{{ study.description }}</div>
        </n-collapse-item>

        <n-collapse-item title="Files" name="1">
          <div class="files">
            <div>
              <dt class="font-bold">Title</dt>
              <dl>{{ study.title }}</dl>
              <dt class="font-bold">Last updated date</dt>
              <dl>{{ study.lastUpdated }}</dl>
            </div>
            <div>
              <dt class="font-bold">Size</dt>
              <dl>{{ study.size }}</dl>
              <dt class="font-bold">Image</dt>
              <dl>{{ study.image }}</dl>
            </div>
          </div>
        </n-collapse-item>
        <n-collapse-item title="Contributors" name="1">
          <div v-for="contributor in contributors" :key="contributor.email">
            {{ contributor.name }}
          </div>
        </n-collapse-item>
      </n-collapse>
    </div>
  </main>
</template>

<style>
.study {
  display: flex;
  flex-direction: column;
}

.n-collapse-item__header-main {
  font-size: 1rem !important;
  font-weight: 500 !important;
  color: rgb(31, 34, 37) !important;
  justify-content: space-between;
}

.files {
  display: flex;
  gap: 15rem;
}

.studyHome {
  max-width: 48rem;
}

header-study {
  margin-bottom: 2rem !important;
}
</style>
