<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { filesize } from "filesize";
import type { DataTableColumns } from "naive-ui";
import { NDivider } from "naive-ui";

import type { Directory } from "@/types/Study";
import { baseURL } from "@/utils/constants";

const push = usePush();
const route = useRoute();
const router = useRouter();
const directory = ref<Directory[]>([]);
const studyId = route.params.studyId;
const getLoading = ref(false);
const selectedFolderPath = ref(route.query.path?.toString() || "");

const columns = ref<DataTableColumns>([
  {
    title: "Name",
    key: "name",
    render(row: any) {
      return h("div", { class: "flex items-center space-x-2" }, [
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
                navigateToFolder(`${selectedFolderPath.value}/${row.name}`);
              }
            },
          },
          splitPath(row.name).pop()
        ),
      ]);
    },
  },
  {
    title: "Updated",
    key: "updated_on",
    render(row: any) {
      const date = new Date(row.updated_on + "Z");
      return date.toLocaleString(); // or toLocaleDateString() / toLocaleTimeString()
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

const splitPath = (path: string) => {
  return path.split("/").filter((item) => item);
};

const currentFolderPath = computed(() => {
  return splitPath(selectedFolderPath.value);
});

const fetchDirectory = async (folderPath: string = "") => {
  const response = await fetch(
    `${baseURL}/study/${studyId}/files?path=${encodeURIComponent(folderPath)}`,
    { method: "GET" }
  );

  if (!response.ok) {
    push.error("Something went wrong.");
    getLoading.value = false;

    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  directory.value = (data ?? []).map((item: any) => ({
    ...item,
    origin: "remote",
  }));
};

const navigateToFolder = async (folderPath: string = "") => {
  getLoading.value = true;

  // Update browser URL query param without reloading the page
  const query = { ...route.query };
  if (folderPath) {
    query.path = folderPath;
  } else {
    delete query.path;
  }
  router.push({ query });

  await fetchDirectory(folderPath);
  selectedFolderPath.value = folderPath;

  getLoading.value = false;
};

onBeforeMount(async () => {
  getLoading.value = true;
  await fetchDirectory(selectedFolderPath.value);
  getLoading.value = false;
});
</script>

<template>
  <main class="flex h-full w-full flex-col pr-6">
    <PageBackNavigationHeader
      title="Uploaded Files"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      linkName="study:overview"
      :linkParams="{
        studyId: route.params.studyId,
      }"
    />

    <n-divider />

    <n-breadcrumb class="mb-5">
      <n-breadcrumb-item @click="navigateToFolder('')">
        <f-icon icon="iconamoon:home-duotone" width="23" color="0284c7" height="20" />

        <span> {{ studyId }}</span>
      </n-breadcrumb-item>

      <n-breadcrumb-item
        v-for="(item, index) in currentFolderPath"
        :key="index"
        @click="navigateToFolder(currentFolderPath.slice(0, index + 1).join('/'))"
      >
        {{ item }}
      </n-breadcrumb-item>
    </n-breadcrumb>

    <FadeTransition>
      <LottieLoader v-if="getLoading" />

      <n-data-table :columns="columns" :data="directory" :bordered="false" v-else />
    </FadeTransition>
  </main>
</template>
