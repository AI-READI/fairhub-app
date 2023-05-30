<script setup lang="ts">
import { onBeforeMount } from "vue";
import { onBeforeRouteUpdate, RouterView, useRoute } from "vue-router";

import { study } from "@/stores/publish/study-state";
import { fetchStudy } from "@/stores/services/service";

const route = useRoute();

const routeParams = {
  studyId: route.params.studyId as string,
};

function verifyStudy() {
  fetchStudy(parseInt(routeParams.studyId)).then((p) => (study.value = p));
}

onBeforeMount(() => {
  verifyStudy();
});

onBeforeRouteUpdate((to, from) => {
  if (from.params.studyId !== to.params.studyId) {
    verifyStudy();
  }
});
</script>

<template>
  <router-view />
</template>
