<script setup lang="ts">
import { useMessage } from "naive-ui";
import { computed, onBeforeMount, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";

import FadeTransition from "@/components/transitions/FadeTransition.vue";
import { useAuthStore } from "@/stores/auth";
import { useFilterStore } from "@/stores/filter";
import { useStudyStore } from "@/stores/study";
import { displayHumanFriendlyDateAndTime } from "@/utils/date";

const router = useRouter();
const { error, info } = useMessage();

const authStore = useAuthStore();
const filterStore = useFilterStore();
const studyStore = useStudyStore();

const studies = computed(() => {
  const allStudies = studyStore.allStudies;

  const filteredStudies = [];

  // filter for permissions
  for (const study of allStudies) {
    const permissions = filterStore.permissions;

    if (permissions.owner) {
      console.log("owner", study.owner.email, authStore.user);
      if (study.owner.email === authStore.user) {
        filteredStudies.push(study);
      }
    }
  }

  // sort the studies based on the sort option

  /**
   * TODO: Implement sorting (type error with a and b)
   */

  filteredStudies.sort((a, b) => {
    if (sortOption.value === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortOption.value === "last_updated") {
      return new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime();
    } else if (sortOption.value === "size") {
      return b.size - a.size;
    }
  });

  if (sortOrder.value === "desc") {
    filteredStudies.reverse();
  }

  console.log("sorted filtered studies", filteredStudies);

  return filteredStudies;
});

const sortOption = computed(() => filterStore.sort);
const sortOrder = computed(() => filterStore.sortOrder);

const updateSort = (sort: string) => {
  filterStore.updateSort(sort);
};

const toggleSortOrder = () => {
  filterStore.toggleSortOrder();
};

const sortOptions = [
  { key: "title", label: "Title" },
  { key: "last_updated", label: "Last Updated" },
  { key: "size", label: "Size" },
];

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });

    return;
  }

  studyStore.fetchAllStudies();
});

onMounted(() => {
  info("Your workspace is being loaded. Please wait...");
});

const navigateToStudy = (studyId: string) => {
  router.push({ name: "study:overview", params: { studyId } });
};
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-4 px-6">
    <n-space justify="space-between">
      <h2>All Studies</h2>

      <RouterLink :to="{ name: 'studies:new-study' }">
        <n-button size="large" type="primary">
          <template #icon>
            <f-icon icon="ion:add-circle-outline" />
          </template>
          New Study
        </n-button>
      </RouterLink>
    </n-space>

    <div>
      <div class="flex items-center space-x-3 border-t pt-4">
        <n-popover trigger="click" placement="bottom-start">
          <template #trigger>
            <n-button strong tertiary type="info">
              <template #icon>
                <n-icon>
                  <f-icon icon="icon-park-outline:permissions" height="20" />
                </n-icon>
              </template>
              Permission
            </n-button>
          </template>

          <n-space vertical>
            <n-space>
              <n-switch size="small" v-model:value="filterStore.permissions.owner" />
              <span class="text-sm font-medium"> Owner </span>
            </n-space>

            <n-space>
              <n-switch size="small" v-model:value="filterStore.permissions.editor" />
              <span class="text-sm font-medium"> Editor </span>
            </n-space>

            <n-space>
              <n-switch size="small" v-model:value="filterStore.permissions.viewer" />
              <span class="text-sm font-medium"> Viewer </span>
            </n-space>
          </n-space>
        </n-popover>

        <n-divider vertical />

        <n-popover trigger="click" placement="bottom-start" class="w-[180px]">
          <template #trigger>
            <n-button strong tertiary type="info">
              <template #icon>
                <n-icon>
                  <f-icon icon="iconoir:sort" height="20" />
                </n-icon>
              </template>
              Sort
            </n-button>
          </template>

          <n-space vertical>
            <div
              v-for="option in sortOptions"
              :key="option.key"
              @click="updateSort(option.key)"
              class="flex cursor-pointer items-center justify-between space-x-4 rounded-md p-2 transition-all hover:bg-slate-100"
            >
              <span class="text-sm font-medium"> {{ option.label }} </span>

              <FadeTransition>
                <f-icon
                  icon="mdi:tick"
                  height="20"
                  class="text-sky-400"
                  v-if="sortOption === option.key"
                />
              </FadeTransition>
            </div>
          </n-space>
        </n-popover>

        <n-button @click="toggleSortOrder" text type="info">
          <n-icon>
            <f-icon :icon="sortOrder === 'asc' ? 'bi:sort-up' : 'bi:sort-down'" height="20" />
          </n-icon>
        </n-button>
      </div>

      <n-divider />

      <FadeTransition>
        <LottieLoader v-if="studyStore.loading" />

        <TransitionGroup name="fade" tag="ul" class="list-none p-0" v-else>
          <li
            class="my-5 flex w-full cursor-pointer items-start rounded-md border border-slate-100 shadow-sm transition-all hover:border-slate-200 hover:bg-slate-50 hover:shadow-md"
            v-for="study in studies"
            :key="study.id"
            @click="navigateToStudy(study.id)"
          >
            <div class="flex h-full w-[200px] items-center">
              <img :src="study.image" class="h-full w-full rounded-l-md object-cover" />
            </div>

            <div class="flex h-full w-full grow flex-col space-y-2 px-6 py-3">
              <div class="flex flex-col space-y-2">
                <div class="flex justify-between pt-2">
                  <h3>{{ study.title }}</h3>
                  <span> {{ study.size }} </span>
                </div>

                <n-divider v-if="study.description" />

                <p v-if="study.description">{{ study.description }}</p>
              </div>

              <n-divider />

              <p class="pt-2">
                <span class="font-bold"> Last updated: </span>
                <span> {{ displayHumanFriendlyDateAndTime(study.updated_on) }} </span>
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
          </li>
        </TransitionGroup>
      </FadeTransition>
    </div>
  </main>
</template>
