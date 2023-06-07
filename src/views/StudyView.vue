<script setup lang="ts">
import type { Ref } from "vue";
import { onBeforeMount, ref } from "vue";
import { provide } from "vue";
import { onBeforeRouteUpdate, RouterView, useRoute } from "vue-router";

import type { Study } from "@/stores/publish/study-interfaces";
import { STUDY_KEY } from "@/stores/publish/study-state";
import { fetchStudy } from "@/stores/services/service";

const route = useRoute();

const routeParams = {
  studyId: route.params.studyId as string,
};

const study: Ref<Study | null> = ref(null);
provide(STUDY_KEY, study);
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
