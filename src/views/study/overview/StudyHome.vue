<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useStudyStore } from "@/stores/study";
import { displayHumanFriendlyDateAndTime } from "@/utils/date";

const router = useRouter();
const route = useRoute();

const studyStore = useStudyStore();

const study = computed(() => studyStore.study);

const routeParams = {
  studyId: route.params.studyId as string,
};

onBeforeMount(() => {
  const studyId = routeParams.studyId;

  studyStore.getStudy(studyId);
});

const navigateToStudy = (id: string) => {
  router.push({ name: "study", params: { id: id.toString() } });
};

function updateStudy() {
  router.push({
    name: "update-study",
    params: { studyId: routeParams.studyId },
  });
}
</script>

<template>
  <FadeTransition>
    <LottieLoader v-if="studyStore.loading" />

    <main class="flex h-full w-full flex-col space-y-8 px-6" px-4 v-else>
      <div class="flex items-center justify-between">
        <h2>Study Overview</h2>

        <n-button size="large" type="primary">
          <template #icon>
            <f-icon icon="material-symbols:edit" />
          </template>
          Edit Study
        </n-button>
      </div>

      <n-divider />

      <div class="flex w-full justify-start">
        <div class="pr-8">
          <h2>{{ study.title }}</h2>

          <p class="py-4">{{ study.description }}</p>

          <n-space>
            <n-tag>{{ study.owner.email }}</n-tag>
            <n-tag type="warning">{{ study.size }}</n-tag>
          </n-space>

          <p class="py-4">
            <span class="font-bold">Last updated: </span>
            <span>{{ displayHumanFriendlyDateAndTime(study.lastUpdated) }}</span>
          </p>

          <p>
            <span class="font-bold">Latest published version: </span>
            <span v-if="study.lastPublished">
              {{ study.lastPublished.version }}
              ({{ study.lastPublished.date }})
            </span>
            <span v-else>Study not published yet</span>
          </p>

          <p v-if="study.lastPublished">
            <span class="font-bold">Study DOI: </span>
            <span v-if="study.lastPublished">
              {{ study.lastPublished.doi }}
            </span>
            <span v-else>Not published yet</span>
          </p>
        </div>

        <n-image :src="study.image" width="200" height="200" />
      </div>
    </main>
  </FadeTransition>
</template>
