<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { MenuOption } from "naive-ui";
import { NLayoutSider, NMenu, NSpace } from "naive-ui";
import { computed, h, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const sidebarCollapsed = ref(false);

function renderIcon(icon: string) {
  return () => h(Icon, { icon });
}

const route = useRoute();

const studyID = computed(() => {
  if (route.params.id === undefined) {
    return "null";
  }
  return route.params.id;
});

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
    icon: renderIcon("tabler:list-details"),
    key: "study-info",
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/studyInfo",
          },
        },
        { default: () => "Study Info" }
      ),
  },
  {
    icon: renderIcon("fluent:people-team-toolbox-24-regular"),
    key: "participants-and-data",
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/participantsdata",
          },
        },
        { default: () => "Participants and Data" }
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
        { default: () => "Contributors" }
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
            path: "/dashboard",
          },
        },
        { default: () => "Dashboard" }
      ),
  },
  {
    icon: renderIcon("fluent:people-add-24-regular"),
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
  {
    icon: renderIcon("material-symbols:published-with-changes-rounded"),
    key: "publish-study",
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "publish-study",
            params: {
              id: studyID.value,
            },
          },
        },
        { default: () => "Publish Study" }
      ),
  },
];

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
            path: "/settings",
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
