<script setup lang="ts">
import { useSidebarStore } from "@/stores/sidebar";
import type { Version } from "@/types/Version";
// import { baseURL } from "@/utils/constants";
const baseURL = "http://localhost:3001/api";
import { displayHumanFriendlyDateAndTime } from "@/utils/date";

const route = useRoute();
const push = usePush();
const router = useRouter();

const sidebarStore = useSidebarStore();

const loading = ref(true);
const versions = ref<Version[]>([]);

const routeParams = {
  datasetId: route.params.datasetId as string,
  studyId: route.params.studyId as string,
};

onBeforeMount(async () => {
  const studyId = routeParams.studyId as string;
  const datasetId = routeParams.datasetId as string;

  sidebarStore.setAppSidebarCollapsed(true);
  sidebarStore.setDatasetSidebarCollapsed(false);

  const response = await fetch(`${baseURL}/study/${studyId}/dataset/${datasetId}/version`, {
    method: "GET",
  });

  loading.value = false;

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  versions.value = data;
});

const deleteVersion = async (id: string) => {
  const response = await fetch(
    `${baseURL}/study/${routeParams.studyId}/dataset/${routeParams.datasetId}/version/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    push.error("Something went wrong.");

    throw new Error("Network response was not ok");
  }

  push.success("Version deleted successfully");

  // reload page
  router.go(0);
};
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <n-space justify="space-between">
      <h2>All Versions</h2>

      <RouterLink
        :to="{
          name: 'dataset:publish:versions:new',
        }"
      >
        <n-button size="large" type="primary">
          <template #icon>
            <f-icon icon="ion:add-circle-outline" />
          </template>
          Create a new version
        </n-button>
      </RouterLink>
    </n-space>

    <n-divider />

    <FadeTransition>
      <div class="flex flex-col items-center" v-if="loading">
        <Vue3Lottie
          animationLink="https://assets2.lottiefiles.com/private_files/lf30_b0iey3ml.json"
          :height="150"
          :width="200"
        />

        <p class="flex justify-center">Checking for previously published datasets...</p>
      </div>

      <div class="flex w-full flex-col" v-else>
        <FadeTransition>
          <div v-if="versions.length === 0" class="my-8">
            <Vue3Lottie
              animationLink="https://assets8.lottiefiles.com/packages/lf20_tmsiddoc.json"
              :height="150"
              :width="150"
            />

            <p class="text-center">We could not any versions of this dataset.</p>
          </div>

          <div v-else>
            <h3>Unpublished versions</h3>

            <p class="py-2">
              Any releases that have not been published will be listed here. You can continue to
              edit these versions until they are published.
            </p>

            <div class="py-4">
              <n-card
                v-for="version in versions"
                :key="version.id"
                :title="version.title"
                v-show="!version.published"
              >
                <template #header-extra>
                  {{ displayHumanFriendlyDateAndTime(version.updated_on) }}
                </template>

                Some details about the version

                <template #action>
                  <div class="flex w-full items-center justify-between space-x-3">
                    <RouterLink
                      :to="{
                        name: 'dataset:publish:version:participants',
                        params: {
                          versionId: version.id,
                          datasetId: routeParams.datasetId,
                          studyId: routeParams.studyId,
                        },
                      }"
                    >
                      <n-button strong secondary type="info">
                        <template #icon>
                          <f-icon icon="material-symbols:resume" />
                        </template>
                        Resume working on this version
                      </n-button>
                    </RouterLink>

                    <n-popconfirm @positive-click="deleteVersion(version.id)">
                      <template #trigger>
                        <n-button strong secondary type="error">
                          <template #icon>
                            <f-icon icon="ph:trash-fill" />
                          </template>
                          Discard this version
                        </n-button>
                      </template>
                      Are you sure you want to discard this version?
                    </n-popconfirm>
                  </div>
                </template>
              </n-card>
            </div>

            <h3 class="pt-6">Published versions</h3>

            <p class="py-2">Published versions of this dataset are listed here.</p>

            <div class="py-4">
              <n-card
                v-for="version in versions"
                :key="version.id"
                :title="version.title"
                v-show="version.published"
              >
                <template #header-extra>
                  {{ displayHumanFriendlyDateAndTime(version.published_on) }}
                </template>

                Some details about the version

                <template #action>
                  <n-button type="info">
                    <template #icon>
                      <f-icon icon="ph:eye-fill" />
                    </template>

                    View dataset on discover.fairhub.io
                  </n-button>
                </template>
              </n-card>
            </div>
          </div>
        </FadeTransition>
      </div>
    </FadeTransition>
  </main>
</template>
