<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { MenuOption } from "naive-ui";
import { NLayoutSider, NMenu, NSpace } from "naive-ui";
import { computed, h } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

import { useSidebarStore } from "@/stores/sidebar";

const route = useRoute();
const router = useRouter();

const sidebarStore = useSidebarStore();

const sidebarCollapsed = computed(() => sidebarStore.collapseAppSidebar);

function renderIcon(icon: string) {
  return () => h(Icon, { icon });
}

const studyID = computed(() => {
  if (!route.params.studyId) {
    return "null";
  }

  return route.params.studyId;
});

const hideMenuOptions = computed(() => {
  const hiddenRoutes = [
    "/studies",
    "/studies/new",
    "/settings",
    "/help/report-issue",
    "/help/documentation",
    "/help/changelog",
    "/profile",
    "/integrations",
  ];
  if (hiddenRoutes.includes(route.path)) {
    return false;
  } else {
    return true;
  }
});

const UpperMenuOptions = computed(() => [
  {
    icon: renderIcon("tabler:home-2"),
    key: "studies:all-studies",
    label: "All Studies",
  },
  {
    icon: renderIcon("material-symbols:overview-key-rounded"),
    key: "study:overview",
    label: "Overview",
    show: hideMenuOptions.value,
  },
  {
    children: [
      {
        icon: renderIcon("tabler:id"),
        key: "study:metadata:identification",
        label: "Identification",
      },
      {
        icon: renderIcon("pajamas:status"),
        key: "study:metadata:status",
        label: "Status",
      },
      {
        icon: renderIcon("carbon:user-sponsor"),
        key: "study:metadata:sponsors",
        label: "Sponsors",
      },
      {
        icon: renderIcon("carbon:collaborate"),
        key: "study:metadata:collaborators",
        label: "Collaborators",
      },
      {
        icon: renderIcon("ic:baseline-local-police"),
        key: "study:metadata:oversight",
        label: "Oversight",
      },
      {
        icon: renderIcon("material-symbols:description"),
        key: "study:metadata:description",
        label: "Description",
      },
      {
        icon: renderIcon("material-symbols:conditions-rounded"),
        key: "study:metadata:conditions",
        label: "Conditions",
      },
      {
        icon: renderIcon("iconoir:design-pencil"),
        key: "study:metadata:design",
        label: "Design",
      },
      {
        icon: renderIcon("mdi:drugs"),
        key: "study:metadata:interventions",
        label: "Interventions",
      },
      {
        icon: renderIcon("icon-park-outline:permissions"),
        key: "study:metadata:eligibility",
        label: "Eligibility",
      },
      {
        icon: renderIcon("teenyicons:contact-outline"),
        key: "study:metadata:contacts",
        label: "Contacts",
      },
      {
        icon: renderIcon("icons8:share"),
        key: "study:metadata:ipd-sharing",
        label: "IPD Sharing",
      },
      {
        icon: renderIcon("zondicons:book-reference"),
        key: "study:metadata:references",
        label: "References",
      },
    ],
    icon: renderIcon("ooui:view-details-ltr"),
    key: "study:metadata",
    label: "Metadata",
    show: hideMenuOptions.value,
  },
  {
    icon: renderIcon("fluent:people-team-toolbox-24-regular"),
    key: "study:participants",
    label: "Participants",
    show: hideMenuOptions.value,
  },
  {
    icon: renderIcon("fluent:people-checkmark-24-regular"),
    key: "study:contributors",
    label: "Contributors",
    show: hideMenuOptions.value,
  },
  {
    icon: renderIcon("ph:files-fill"),
    key: "study:files",
    label: "Files",
    show: hideMenuOptions.value,
  },
  {
    icon: renderIcon("material-symbols:dashboard-rounded"),
    key: "study:dashboard",
    label: "Dashboard",
    show: hideMenuOptions.value,
  },
  {
    icon: renderIcon("material-symbols:dataset"),
    key: "study:all-datasets",
    label: "Datasets",
    show: hideMenuOptions.value,
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
              studyId: studyID.value,
            },
          },
        },
        { default: () => "Publish" }
      ),
    show: false,
  },
]);

const lowerMenuOptions: MenuOption[] = [
  {
    children: [
      {
        icon: renderIcon("material-symbols:bug-report-outline"),
        key: "report-issue",
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: "/help/report-issue",
              },
            },
            { default: () => "Report an Issue" }
          ),
      },
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
            name: "all-settings",
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
  sidebarStore.setAppSidebarCollapse(collapsed);
  return;
};

const navigateTo = (value: string) => {
  const routeName = value.split(":")[0];

  if (routeName === "studies") {
    sidebarStore.setAppSidebarCollapse(false);

    router.push({
      name: value,
    });

    return;
  }

  if (routeName === "study") {
    sidebarStore.setAppSidebarCollapse(false);

    router.push({
      name: value,
      params: {
        studyId: studyID.value,
      },
    });

    return;
  }

  if (routeName === "datasets") {
    sidebarStore.setAppSidebarCollapse(false);

    router.push({
      name: value,
      params: {
        studyId: studyID.value,
      },
    });

    return;
  }

  if (routeName === "dataset") {
    sidebarStore.setAppSidebarCollapse(true);

    return;
  }
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

const defaultExpandedKeys = computed(() => {
  const currentRoute = useRoute();

  if (currentRoute.name) {
    const name = currentRoute.name as string;

    console.log("appsidebar-name", name, name.startsWith("study:metadata"));

    if (name.startsWith("study:metadata")) {
      return ["study:metadata"];
    }
  }
  return [];
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
    :native-scrollbar="true"
    @update:collapsed="toggleSidebar"
    class="z-10 h-[calc(100vh-56px)]"
  >
    <n-space vertical justify="space-between" class="h-full">
      <div class="flex flex-col justify-start divide-y">
        <n-menu
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :default-expanded-keys="defaultExpandedKeys"
          :collapsed="sidebarCollapsed"
          :options="UpperMenuOptions"
          @update:value="navigateTo"
        />
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
