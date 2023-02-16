<script setup lang="ts">
import {
  DocumentFlowchart24Regular,
  PeopleAdd24Regular,
  PeopleCheckmark16Regular,
  PeopleTeamToolbox24Regular,
  Settings24Regular,
} from "@vicons/fluent";
import { BugReportOutlined, DashboardRound } from "@vicons/material";
import { Help, History, Home2, ListDetails } from "@vicons/tabler";
import type { MenuOption } from "naive-ui";
import { NIcon, NLayoutSider, NMenu, NSpace } from "naive-ui";
import type { Component } from "vue";
import { computed, h, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const sidebarCollapsed = ref(false);

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const route = useRoute();

const hideMenuOptions = computed(() => {
  const hiddenRoutes = ["/studies", "/studies/new"];
  if (hiddenRoutes.includes(route.path)) {
    return false;
  } else {
    return true;
  }
});

// const menuOptions = [
//   {
//     label: "All Studies",
//     key: "hear-the-wind-sing",
//     icon: renderIcon(BookIcon),
//   },
//   {
//     label: "Pinball 1973",
//     key: "pinball-1973",
//     icon: renderIcon(BookIcon),
//     disabled: true,
//     children: [
//       {
//         label: "Rat",
//         key: "rat",
//       },
//     ],
//   },
//   {
//     label: "A Wild Sheep Chase",
//     key: "a-wild-sheep-chase",
//     disabled: true,
//     icon: renderIcon(BookIcon),
//   },
//   {
//     label: "Dance Dance Dance",
//     key: "Dance Dance Dance",
//     icon: renderIcon(BookIcon),
//     children: [
//       {
//         type: "group",
//         label: "People",
//         key: "people",
//         children: [
//           {
//             label: "Narrator",
//             key: "narrator",
//             icon: renderIcon(PersonIcon),
//           },
//           {
//             label: "Sheep Man",
//             key: "sheep-man",
//             icon: renderIcon(PersonIcon),
//           },
//         ],
//       },
//       {
//         label: "Beverage",
//         key: "beverage",
//         icon: renderIcon(WineIcon),
//         children: [
//           {
//             label: "Whisky",
//             key: "whisky",
//           },
//         ],
//       },
//       {
//         label: "Food",
//         key: "food",
//         children: [
//           {
//             label: "Sandwich",
//             key: "sandwich",
//           },
//         ],
//       },
//       {
//         label: "The past increases. The future recedes.",
//         key: "the-past-increases-the-future-recedes",
//       },
//     ],
//   },
// ];

const staticUpperMenuOptions: MenuOption[] = [
  {
    icon: renderIcon(Home2),
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
    icon: renderIcon(ListDetails),
    key: "study-info",
    label: "Study Info",
  },
  {
    icon: renderIcon(PeopleTeamToolbox24Regular),
    key: "participants-and-data",
    label: "Participants and Data",
  },
  {
    icon: renderIcon(PeopleCheckmark16Regular),
    key: "contributors",
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/studies/1/contributors",
          },
        },
        { default: () => "Contributors" }
      ),
  },
  {
    icon: renderIcon(DashboardRound),
    key: "dashboard",
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/dashboard",
          },
        },
        { default: () => "Dashboard" }
      ),
  },
  {
    icon: renderIcon(PeopleAdd24Regular),
    key: "add-participant",
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "add-participant",
            // params: {
            //   lang: "en-US",
            // },
          },
        },
        { default: () => "Add Participant" }
      ),
  },
];

const lowerMenuOptions: MenuOption[] = [
  {
    icon: renderIcon(BugReportOutlined),
    key: "report-an-issue",
    label: "Report an Issue",
  },
  {
    children: [
      {
        icon: renderIcon(DocumentFlowchart24Regular),
        key: "documentation",
        label: "Documentation",
      },
      {
        icon: renderIcon(History),
        key: "changelog",
        label: "Changelog",
      },
    ],
    icon: renderIcon(Help),
    key: "help",
    label: "Help",
  },
  {
    icon: renderIcon(Settings24Regular),
    key: "settings",
    label: "Settings",
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
      <div>
        <n-menu
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :collapsed="sidebarCollapsed"
          :options="staticUpperMenuOptions"
          class="mb-0 pb-0"
        />
        <n-menu
          v-if="hideMenuOptions"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :collapsed="sidebarCollapsed"
          :options="dynamicUpperMenuOptions"
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
