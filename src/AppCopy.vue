<script setup lang="ts">
import { ChartNetwork } from "@vicons/carbon";
import {
  DocumentFlowchart24Regular,
  PeopleAdd24Regular,
  PeopleCheckmark16Regular,
  PeopleTeamToolbox24Regular,
  Settings24Regular,
} from "@vicons/fluent";
import { PersonCircleOutline, SearchSharp } from "@vicons/ionicons5";
import { BugReportOutlined, DashboardRound, LogOutSharp } from "@vicons/material";
import { Help, History, Home2, ListDetails } from "@vicons/tabler";
import type { MenuOption } from "naive-ui";
import {
  NAvatar,
  NDropdown,
  NIcon,
  NInput,
  NLayout,
  NLayoutContent,
  NLayoutSider,
  NMenu,
  NSpace,
} from "naive-ui";
import type { Component } from "vue";
import { h, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";

// eslint-disable-next-line no-undef
const development = process.env.NODE_ENV === "development";

const sidebarCollapsed = ref(false);

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

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

const upperMenuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "home",
          },
        },
        { default: () => "Home" }
      ),
    key: "home",
    icon: renderIcon(Home2),
  },
  {
    label: "Study Info",
    key: "study-info",
    icon: renderIcon(ListDetails),
  },
  {
    label: "Participants and Data",
    key: "participants-and-data",
    icon: renderIcon(PeopleTeamToolbox24Regular),
  },
  {
    label: "Contributors",
    key: "contributors",
    icon: renderIcon(PeopleCheckmark16Regular),
  },
  {
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
    key: "dashboard",
    icon: renderIcon(DashboardRound),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "add-participant",
            params: {
              lang: "en-US",
            },
          },
        },
        { default: () => "Add Participant" }
      ),
    key: "add-participant",
    icon: renderIcon(PeopleAdd24Regular),
  },
];

const lowerMenuOptions: MenuOption[] = [
  {
    label: "Report an Issue",
    key: "report-an-issue",
    icon: renderIcon(BugReportOutlined),
  },
  {
    label: "Help",
    key: "help",
    icon: renderIcon(Help),
    children: [
      {
        label: "Documentation",
        key: "documentation",
        icon: renderIcon(DocumentFlowchart24Regular),
      },
      {
        label: "Changelog",
        key: "changelog",
        icon: renderIcon(History),
      },
    ],
  },
  {
    label: "Settings",
    key: "settings",
    icon: renderIcon(Settings24Regular),
  },
];

const profileOptions = [
  {
    label: "View Profile",
    key: "view-profile",
    icon: renderIcon(PersonCircleOutline),
  },
  {
    label: "Integrations",
    key: "integrations",
    icon: renderIcon(ChartNetwork),
  },
  {
    type: "divider",
    key: "d1",
  },
  {
    label: "Logout",
    key: "logout",
    icon: renderIcon(LogOutSharp),
  },
  // {
  //   label: "Others",
  //   key: "others1",
  //   children: [
  //     {
  //       label: "Jordan Baker",
  //       key: "jordan baker",
  //     },
  //     {
  //       label: "Tom Buchanan",
  //       key: "tom buchanan",
  //     },
  //     {
  //       label: "Others",
  //       key: "others2",
  //       disabled: true,
  //       children: [
  //         {
  //           label: "Chicken",
  //           key: "chicken",
  //         },
  //         {
  //           label: "Beef",
  //           key: "beef",
  //         },
  //       ],
  //     },
  //   ],
  // },
];

const handleSelect = (key: string | number) => {
  console.info(String(key));
};

/**
 * A function that toggles the sidebar
 * @param {boolean} collapsed Event emitted by the sidebar when the collapse button is clicked
 * @returns {void}
 */
const toggleSidebar = (collapsed: boolean) => {
  sidebarCollapsed.value = collapsed;
  return;
};
</script>

<template>
  <div>
    <header :class="{ 'debug-screens': development }">
      <n-space justify="space-between" align="center" class="pl-4 pr-2">
        <h1 class="relative top-0 left-0 p-2 text-4xl font-black">fairhub.io</h1>

        <n-space justify="space-between" align="center">
          <n-input size="large" placeholder="Search">
            <template #suffix>
              <n-icon :component="SearchSharp" />
            </template>
          </n-input>

          <div class="flex justify-center space-x-3">
            <n-dropdown
              :options="profileOptions"
              placement="bottom-start"
              trigger="hover"
              @select="handleSelect"
              :show-arrow="true"
            >
              <n-avatar
                :size="48"
                src="https://api.dicebear.com/5.x/lorelei/svg?seed=fairhubio"
                class="hover:cursor-pointer hover:opacity-80"
              />
            </n-dropdown>
          </div>
        </n-space>
      </n-space>
    </header>

    <n-space vertical size="large" :class="{ 'debug-screens': development }">
      <n-layout has-sider>
        <!-- <div class=""> -->
        <!-- <header :class="{ 'debug-screens': development }" class="flex">
            <h1 class="ml-7 p-2 text-3xl font-black">fairhub.io</h1>
            <button @click="toggleSidebar">toggle</button>
          </header> -->
        <n-layout-sider
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
            <n-menu
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :collapsed="sidebarCollapsed"
              :options="upperMenuOptions"
            />
            <n-menu
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :collapsed="sidebarCollapsed"
              :options="lowerMenuOptions"
              class="pb-4"
            />
          </n-space>
        </n-layout-sider>
        <!-- </div> -->
        <n-layout-content class="h-[calc(100vh-56px)]">
          <RouterView />
        </n-layout-content>
      </n-layout>
    </n-space>
  </div>
  <!-- <header :class="{ 'debug-screens': development }">
    <h1 class="relative top-0 left-0 p-2 text-4xl font-black">fairhub.io</h1>
  </header>
  <RouterView /> -->
</template>

<style scoped></style>
