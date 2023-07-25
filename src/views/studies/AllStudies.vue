<script setup lang="ts">
import { useMessage } from "naive-ui";
import { computed, onBeforeMount } from "vue";
import { RouterLink, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useStudyStore } from "@/stores/study";
import { displayHumanFriendlyDateAndTime } from "@/utils/date";

const router = useRouter();
const { error } = useMessage();

const authStore = useAuthStore();
const studyStore = useStudyStore();

const studies = computed(() => studyStore.allStudies);

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });

    return;
  }

  studyStore.fetchAllStudies();
});

/**
 * TODO: add dataset filters like pennsieve
 */

const navigateToStudy = (studyId: string) => {
  router.push({ name: "study-overview", params: { studyId } });
};
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-4 pr-6">
    <n-space justify="space-between">
      <h2>All Studies</h2>

      <RouterLink :to="{ name: 'new-study' }">
        <n-button size="large" type="primary">
          <template #icon>
            <f-icon icon="ion:add-circle-outline" />
          </template>
          New Study
        </n-button>
      </RouterLink>
    </n-space>

    <FadeTransition>
      <LottieLoader v-if="studyStore.loading" />
      <div v-else>
        <div
          class="my-3 flex w-full cursor-pointer items-center rounded-md border border-slate-100 shadow-sm transition-all hover:border-slate-200 hover:bg-slate-50"
          v-for="study in studies"
          :key="study.id"
          @click="navigateToStudy(study.id)"
        >
          <div class="flex h-full w-[200px] items-center">
            <img :src="study.image" class="h-full w-full object-cover" />
          </div>

          <div class="flex w-full grow flex-col space-y-2 px-6 py-3">
            <div class="flex flex-col space-y-2">
              <div class="flex justify-between pt-2">
                <h3>{{ study.title }}</h3>
                <span> {{ study.size }} </span>
              </div>

              <n-divider />

              <p>{{ study.description }}</p>
            </div>

            <n-divider />

            <p class="pt-2">
              <span class="font-bold"> Last updated: </span>
              <span> {{ displayHumanFriendlyDateAndTime(study.last_updated) }} </span>
            </p>

            <!-- needs last_published and last_published.doi -->

            <!-- <n-divider />
              
             <div class="align-center flex space-x-3 divide-x pt-2">
              <p>
                <span class="font-bold"> Latest published version: </span>
                <span v-if="study.last_published">
                  {{ study.last_published.version }} ({{ study.last_published.date }})
                </span>

                <span v-else> Not published yet </span>
              </p>

              <p class="pl-2" v-if="study.last_published">
                <span class="font-bold"> Latest DOI: </span>
                <span class="text-blue-500"> {{ study.last_published!.doi }} </span>
              </p>
            </div> -->
          </div>
        </div>
      </div>
    </FadeTransition>
  </main>
</template>
