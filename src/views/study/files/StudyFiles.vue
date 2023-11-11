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
  // {
  //   title: "",
  //   key: "icon",
  //   render(row: any) {
  //     return h(Icon, {
  //       height: 24,
  //       icon: row.is_directory ? "flat-color-icons:folder" : "flat-color-icons:file",
  //       width: 24,
  //     });
  //   },
  // },
  {
    title: "Name",
    key: "name",
    render(row: any) {
      return h(
        "div",
        {
          class: "flex items-center space-x-2",
        },
        [
          h(Icon, {
            height: 24,
            icon: row.is_directory ? "flat-color-icons:folder" : "flat-color-icons:file",
            width: 24,
          }),
          h(
            "span",
            {
              class: {
                "text-blue-500 cursor-pointer hover:underline hover:text-blue-700 transition-colors":
                  row.is_directory,
                "text-gray-500": !row.is_directory,
              },
              onClick: () => {
                if (row.is_directory) {
                  navigateToFolder(row.name);
                }
              },
            },
            splitPath(row.name).pop()
          ),
        ]
      );
    },
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
const selectedFolderPath = ref("");

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

const splitPath = (path: string) => {
  return path.split("/").filter((item) => item);
};

const currentFolderPath = computed(() => {
  return splitPath(selectedFolderPath.value);
});

const navigateToFolder = async (folderPath: string = "") => {
  getLoading.value = true;

  selectedFolderPath.value = folderPath;

  const studyId = route.params.studyId;

  const response = await fetch(
    `${baseURL}/study/${studyId}/files?path=${encodeURIComponent(folderPath)}`,
    {
      method: "GET",
    }
  );

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
};
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Files"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      linkName="study:overview"
      :linkParams="{
        studyId: route.params.studyId,
      }"
    />

    <n-divider />

    <n-breadcrumb class="mb-5">
      <n-breadcrumb-item @click="navigateToFolder('/')">
        <f-icon icon="iconamoon:home-duotone" />

        <span> pooled-data-pilot </span>
      </n-breadcrumb-item>

      <n-breadcrumb-item
        v-for="(item, index) in currentFolderPath"
        :key="index"
        @click="navigateToFolder(currentFolderPath.filter((_, i) => i <= index).join('/'))"
      >
        {{ item }}
      </n-breadcrumb-item>
    </n-breadcrumb>

    <FadeTransition>
      <LottieLoader v-if="getLoading" />

      <n-data-table :columns="columns" :data="directory.files" :bordered="false" v-else />
    </FadeTransition>
  </main>
</template>
