<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { MenuOption } from "naive-ui";
import { NLayoutSider, NMenu, NSpace } from "naive-ui";
import { computed, h, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const sidebarCollapsed = ref(false);
const route = useRoute();

console.log("route", route);

function renderIcon(icon: string) {
  return () => h(Icon, { icon });
}

const studyID = computed(() => {
  if (route.params.studyId === undefined) {
    return "null";
  }
  return route.params.studyId;
});

const dynamicUpperMenuOptions: MenuOption[] = [
  {
    icon: renderIcon("material-symbols:dataset"),
    key: "publish-dataset",
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "view-datasets",
            params: {
              studyId: studyID.value,
            },
          },
        },
        { default: () => "Datasets" }
      ),
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

const checkForDataset = (value: string) => {
  if (value === "publish-dataset") {
    sidebarCollapsed.value = true;
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

  //Check if the phrase `datasets:` is the start of the route name
  if (routeName.startsWith("datasets:")) {
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
        @update:value="checkForDataset"
      />
    </n-space>
  </n-layout-sider>
</template>
