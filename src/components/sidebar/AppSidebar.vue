<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { MenuOption } from "naive-ui";
import { NLayoutSider, NMenu, NSpace } from "naive-ui";
import { computed, h, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const sidebarCollapsed = ref(false);
const route = useRoute();

function renderIcon(icon: string) {
  return () => h(Icon, { icon });
}

const studyID = computed(() => {
  if (route.params.studyId === undefined) {
    return "null";
  }
  return route.params.studyId;
});

const hideMenuOptions = computed(() => {
  const hiddenRoutes = [
    "/studies",
    "/studies/new",
    "/settings",
    "/reportIssue",
    "/help/documentation",
    "/help/changelog",
    "/viewProfile",
    "/integrations",
  ];
  if (hiddenRoutes.includes(route.path)) {
    return false;
  } else {
    return true;
  }
});

const staticUpperMenuOptions: MenuOption[] = [
  {
    icon: renderIcon("tabler:home-2"),
    key: "all-studies",
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "all-studies",
          },
        },
        { default: () => "All Studies" }
      ),
  },
];

const dynamicUpperMenuOptions: MenuOption[] = [
  {
    icon: renderIcon("uil:align-left"),
    key: "study-home",
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "study-home",
            params: {
              id: studyID.value,
            },
          },
        },
        { default: () => "Study Home" }
      ),
  },
  {
    icon: renderIcon("fluent:people-team-toolbox-24-regular"),
    key: "study-participants",
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "study-participants",
            params: {
              id: studyID.value,
            },
          },
        },
        { default: () => "Study Participants" }
      ),
  },
  {
    icon: renderIcon("fluent:people-checkmark-24-regular"),
    key: "contributors",
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "study-contributors",
            params: {
              id: studyID.value,
            },
          },
        },
        { default: () => "Study Contributors" }
      ),
  },
  {
    icon: renderIcon("material-symbols:dashboard-rounded"),
    key: "dashboard",
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "dashboard",
            params: {
              id: studyID.value,
            },
          },
        },
        { default: () => "Dashboard" }
      ),
  },
  {
    icon: renderIcon("material-symbols:published-with-changes-rounded"),
    key: "publish-study",
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "publish-select-dataset",
            params: {
              id: studyID.value,
            },
          },
        },
        { default: () => "Publish Datasets" }
      ),
  },
];

// function routerLink(key: string) {
//   if (key !== "publish-study") return;
//   router.push({
//     name: "publish-select-participants",
//     params: { versionId: "v1" },
//   });
// }

const lowerMenuOptions: MenuOption[] = [
  {
    icon: renderIcon("material-symbols:bug-report-outline"),
    key: "report-an-issue",
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/reportIssue",
          },
        },
        { default: () => "Report an Issue" }
      ),
  },
  {
    children: [
      {
        icon: renderIcon("fluent:document-flowchart-24-regular"),
        key: "documentation",
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: "/help/documentation",
              },
            },
            { default: () => "Documentation" }
          ),
      },
      {
        icon: renderIcon("tabler:history"),
        key: "changelog",
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: "/help/changelog",
              },
            },
            { default: () => "Changelog" }
          ),
      },
    ],
    icon: renderIcon("tabler:help"),
    key: "help",
    label: "Help",
  },
  {
    icon: renderIcon("fluent:settings-24-regular"),
    key: "settings",
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "settings",
          },
        },
        { default: () => "Settings" }
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

/**
 * A computed property that returns true if the sidebar should be completely hidden
 * @returns {boolean}
 */
const hideSidebar = computed(() => {
  const currentRoute = useRoute();
  if (currentRoute.path === "/") {
    return false;
  }
  return true;
});
</script>

<template>
  <n-layout-sider
    v-if="hideSidebar"
    bordered
    show-trigger
    :collapsed="sidebarCollapsed"
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :native-scrollbar="true"
    @update:collapsed="toggleSidebar"
    class="h-[calc(100vh-56px)]"
  >
    <n-space vertical justify="space-between" class="h-full">
      <div class="flex flex-col justify-start divide-y">
        <n-menu
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :collapsed="sidebarCollapsed"
          :options="staticUpperMenuOptions"
          class="mb-1 pb-1"
        />
        <n-menu
          v-if="hideMenuOptions"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :collapsed="sidebarCollapsed"
          :options="dynamicUpperMenuOptions"
        />
        <!--             @update:value="routerLink"-->
      </div>

      <n-menu
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :collapsed="sidebarCollapsed"
        :options="lowerMenuOptions"
        class="pb-4"
      />
    </n-space>
  </n-layout-sider>
</template>
