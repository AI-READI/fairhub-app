<script setup lang="ts">
import type { Ref } from "vue";
import { onBeforeMount, ref } from "vue";
import { provide } from "vue";
import { onBeforeRouteUpdate, RouterView, useRoute } from "vue-router";

import { PARTICIPANTS_KEY } from "@/stores/publish/participants";
import type { Study } from "@/stores/publish/study-interfaces";
import type { Participant } from "@/stores/publish/study-interfaces";
import { STUDY_KEY } from "@/stores/publish/study-state";
import { fetchParticipants, fetchStudy } from "@/stores/services/service";

const route = useRoute();

const routeParams = {
  studyId: route.params.studyId as string,
};

const study: Ref<Study | null> = ref(null);
const participants: Ref<Participant[]> = ref([]);

provide(PARTICIPANTS_KEY, participants);
provide(STUDY_KEY, study);
function verifyStudy() {
  fetchStudy(parseInt(routeParams.studyId)).then((p) => (study.value = p));
  fetchParticipants(parseInt(routeParams.studyId)).then((p) => (participants.value = p));
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
