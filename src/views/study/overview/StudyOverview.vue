<script setup lang="ts">
import { filesize } from "filesize";

import { useAuthStore } from "@/stores/auth";
import { useStudyStore } from "@/stores/study";
import type { Study } from "@/types/Study";
import { displayHumanFriendlyDateAndTime } from "@/utils/date";

const router = useRouter();
const route = useRoute();
const push = usePush();

const authStore = useAuthStore();
const studyStore = useStudyStore();

const study: Ref<Study> = computed(() => studyStore.study);

const routeParams = {
  studyId: route.params.studyId as string,
};

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    push.error("You are not logged in.");
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

    <main class="flex h-full w-full flex-col space-y-8 pr-6" v-else>
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
            <n-tag type="warning">{{ filesize(study.size || 0) }}</n-tag>
          </n-space>

          <p class="py-4">
            <span class="font-bold">Last updated: </span>

            <span>{{ displayHumanFriendlyDateAndTime(study.updated_on) }}</span>
          </p>
        </div>

        <n-image :src="study.image" width="200" height="200" />
      </div>
    </main>
  </FadeTransition>
</template>
