<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { filesize } from "filesize";
import type { DataTableColumns } from "naive-ui";

import type { StudyFile, StudyFiles } from "@/types/Study";
import { baseURL } from "@/utils/constants";
import { displayHumanFriendlyDateAndTime } from "@/utils/date";

const route = useRoute();
const push = usePush();

const directory = ref<StudyFiles>({
  files: [],
});

const columns = ref<DataTableColumns>([
  {
    title: "",
    key: "icon",
    render(row: any) {
      return h(Icon, {
        height: 24,
        icon: row.is_directory ? "flat-color-icons:folder" : "flat-color-icons:file",
        width: 24,
      });
    },
  },
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Updated",
    key: "updated_on",
    render(row: any) {
      return displayHumanFriendlyDateAndTime(row.updated_on);
    },
  },
  {
    title: "Size",
    key: "content_length",
    render(row: any) {
      return filesize(row.content_length) !== "0 B" ? filesize(row.content_length) : "-";
    },
  },
]);

const getLoading = ref(false);

onBeforeMount(async () => {
  getLoading.value = true;

  const studyId = route.params.studyId;

  const response = await fetch(`${baseURL}/study/${studyId}/files`, {
    method: "GET",
  });

  if (!response.ok) {
    push.error("Something went wrong.");
    throw new Error("Network response was not ok");
  }

  const data: StudyFile[] = await response.json();

  const processedData = data.map((file: any) => {
    return {
      ...file,
    };
  });

  directory.value = {
    files: processedData,
  };

  getLoading.value = false;
});
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Files"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod quia voluptatibus, voluptatem, quibusdam, quos voluptas quae quas voluptatum"
      linkName="study:overview"
      :linkParams="{
        studyId: route.params.studyId,
      }"
    />

    <n-divider />

    <FadeTransition>
      <LottieLoader v-if="getLoading" />

      <n-data-table :columns="columns" :data="directory.files" :bordered="false" v-else />
    </FadeTransition>

    <pre>{{ directory }}</pre>
  </main>
</template>
