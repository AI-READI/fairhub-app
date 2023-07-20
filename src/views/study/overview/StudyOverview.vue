<script setup lang="ts">
import { useMessage } from "naive-ui";
import { computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useStudyStore } from "@/stores/study";
import { displayHumanFriendlyDateAndTime } from "@/utils/date";

const router = useRouter();
const route = useRoute();
const { error } = useMessage();

const authStore = useAuthStore();
const studyStore = useStudyStore();

const study = computed(() => studyStore.study);

const routeParams = {
  studyId: route.params.studyId as string,
};

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }

  const studyId = routeParams.studyId;

  studyStore.getStudy(studyId);
});

function editStudyDetails() {
  router.push({
    name: "edit-study",
    params: { studyId: routeParams.studyId },
  });
}
</script>

<template>
  <FadeTransition>
    <LottieLoader v-if="studyStore.loading" />

    <main class="flex h-full w-full flex-col space-y-8 pr-6" px-4 v-else>
      <div class="flex items-center justify-between">
        <h2>Study Overview</h2>

        <n-button size="large" type="primary" @click="editStudyDetails">
          <template #icon>
            <f-icon icon="material-symbols:edit" />
          </template>
          Edit Study
        </n-button>
      </div>

      <n-divider />

      <div class="flex w-full justify-between">
        <div class="pr-8">
          <h3>{{ study.title }}</h3>

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
