<script setup lang="ts">
import { useMessage } from "naive-ui";
import type { Ref } from "vue";
import { computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useStudyStore } from "@/stores/study";
import type { Study } from "@/types/Study";
import { displayHumanFriendlyDateAndTime } from "@/utils/date";

const router = useRouter();
const route = useRoute();
const { error } = useMessage();

const authStore = useAuthStore();
const studyStore = useStudyStore();

const study: Ref<Study> = computed(() => studyStore.study);

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

const editStudyDetails = () => {
  router.push({
    name: "study:edit",
    params: { studyId: routeParams.studyId },
  });
};
</script>

<template>
  <FadeTransition>
    <LottieLoader v-if="studyStore.loading" />

    <main class="flex h-full w-full flex-col space-y-8 pr-6" px-4 v-else>
      <div class="flex items-center justify-between">
        <h1>Overview</h1>

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
          <h2>{{ study.title }}</h2>

          <p class="py-4">{{ study.description }}</p>

          <n-space>
            <n-tag>{{ study.owner.first_name }} {{ study.owner.last_name }}</n-tag>
            <n-tag type="warning">{{ study.size }}</n-tag>
          </n-space>

          <p class="py-4">
            <span class="font-bold">Last updated: </span>
            <span>{{ displayHumanFriendlyDateAndTime(study.last_updated) }}</span>
          </p>

          <!-- <p>
            <span class="font-bold">Latest published version: </span>
            <span v-if="study.last_published">
              {{ study.last_published.version }}
              ({{ study.last_published.date }})
            </span>
            <span v-else>Study not published yet</span>
          </p>

          <p v-if="study.last_published">
            <span class="font-bold">Study DOI: </span>
            <span v-if="study.last_published">
              {{ study.last_published.doi }}
            </span>
            <span v-else>Not published yet</span>
          </p> -->
        </div>

        <n-image :src="study.image" width="200" height="200" />
      </div>

      <n-divider />

      <h2>Files</h2>

      <n-space vertical>
        <n-skeleton height="40px" width="33%" />
        <n-skeleton height="40px" width="66%" :sharp="false" />
        <n-skeleton height="40px" width="66%" :sharp="false" />
        <n-skeleton height="40px" width="33%" />
        <n-skeleton height="40px" width="66%" :sharp="false" />
        <n-skeleton height="40px" width="33%" />
        <n-skeleton height="40px" width="66%" :sharp="false" />
      </n-space>
    </main>
  </FadeTransition>
</template>
