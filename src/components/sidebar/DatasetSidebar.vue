<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { MenuOption } from "naive-ui";
import { NLayoutSider, NMenu, NSpace } from "naive-ui";
import { computed, h, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const sidebarCollapsed = ref(false);

function renderIcon(icon: string) {
  return () => h(Icon, { icon });
}

const studyID = computed(() => {
  if (route.params.studyId === undefined) {
    return "null";
  }
  return route.params.studyId;
});

const datasetId = computed(() => {
  if (route.params.datasetId === undefined) {
    return "null";
  }
  return route.params.datasetId;
});

const dynamicUpperMenuOptions: MenuOption[] = [
  {
    icon: renderIcon("ph:list-fill"),
    key: "study:all-datasets",
    label: "All Datasets",
  },
  {
    icon: renderIcon("material-symbols:overview-key-outline"),
    key: "dataset:overview",
    label: "Overview",
  },
];

/**
 * A function that toggles the sidebar
 * @param {boolean} collapsed Event emitted by the sidebar when the collapse button is clicked
 * @returns {void}
 */
const toggleSidebar = (collapsed: boolean) => {
  sidebarCollapsed.value = collapsed;
  return;
};

const navigateTo = (value: string) => {
  console.log("navigateTo", value);
  const routeName = value.split(":")[0];

  if (routeName === "study") {
    router.push({
      name: value,
      params: {
        studyId: studyID.value,
      },
    });

    return;
  }

  if (routeName === "dataset") {
    router.push({
      name: value,
      params: {
        datasetId: datasetId.value,
        studyId: studyID.value,
      },
    });

    return;
  }
};

/**
 * A computed property that returns true if the sidebar should be completely hidden
 * @returns {boolean}
 */
const showSidebar = computed(() => {
  const currentRoute = useRoute();

  const routeName = currentRoute.name as string;

  if (!routeName) {
    return false;
  }

  console.log("routeName", routeName);

  // These routes should not show the sidebar
  const hiddenRoutes = ["dataset:new", "dataset:edit"];

  if (hiddenRoutes.includes(routeName)) {
    return false;
  }

  if (routeName.startsWith("dataset:")) {
    return true;
  }

  return false;
});
</script>

<template>
  <n-layout-sider
    v-if="showSidebar"
    bordered
    show-trigger
    :collapsed="sidebarCollapsed"
    collapse-mode="width"
    :collapsed-width="64"
    :native-scrollbar="true"
    @update:collapsed="toggleSidebar"
    class="h-[calc(100vh-56px)]"
  >
    <n-space vertical justify="space-between" class="h-full">
      <n-menu
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :collapsed="sidebarCollapsed"
        :options="dynamicUpperMenuOptions"
        @update:value="navigateTo"
      />
    </n-space>
  </n-layout-sider>
</template>
