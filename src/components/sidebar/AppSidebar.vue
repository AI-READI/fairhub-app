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
    icon: renderIcon("material-symbols:overview-key-rounded"),
    key: "study-overview",
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "study-overview",
            params: {
              studyId: studyID.value,
            },
          },
        },
        { default: () => "Overview" }
      ),
  },
  {
    children: [
      {
        icon: renderIcon("tabler:id"),
        key: "study-metadata-identification",
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "study-metadata-identification",
                params: {
                  studyId: studyID.value,
                },
              },
            },
            { default: () => "Identification" }
          ),
      },
      {
        icon: renderIcon("pajamas:status"),
        key: "study-metadata-status",
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "study-metadata-status",
                params: {
                  studyId: studyID.value,
                },
              },
            },
            { default: () => "Status" }
          ),
      },
      {
        icon: renderIcon("carbon:user-sponsor"),
        key: "study-metadata-sponsors",
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "study-metadata-sponsors",
                params: {
                  studyId: studyID.value,
                },
              },
            },
            { default: () => "Sponsors" }
          ),
      },
      {
        icon: renderIcon("carbon:collaborate"),
        key: "study-metadata-collaborators",
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "study-metadata-collaborators",
                params: {
                  studyId: studyID.value,
                },
              },
            },
            { default: () => "Collaborators" }
          ),
      },
      {
        icon: renderIcon("ic:baseline-local-police"),
        key: "study-metadata-oversight",
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "study-metadata-oversight",
                params: {
                  studyId: studyID.value,
                },
              },
            },
            { default: () => "Oversight" }
          ),
      },
      {
        icon: renderIcon("material-symbols:description"),
        key: "study-metadata-description",
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "study-metadata-description",
                params: {
                  studyId: studyID.value,
                },
              },
            },
            { default: () => "Description" }
          ),
      },
      {
        icon: renderIcon("material-symbols:conditions-rounded"),
        key: "study-metadata-conditions",
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "study-metadata-conditions",
                params: {
                  studyId: studyID.value,
                },
              },
            },
            { default: () => "Conditions" }
          ),
      },
      {
        icon: renderIcon("iconoir:design-pencil"),
        key: "study-metadata-design",
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "study-metadata-design",
                params: {
                  studyId: studyID.value,
                },
              },
            },
            { default: () => "Design" }
          ),
      },
      {
        icon: renderIcon("mdi:drugs"),
        key: "study-metadata-interventions",
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "study-metadata-interventions",
                params: {
                  studyId: studyID.value,
                },
              },
            },
            { default: () => "Interventions" }
          ),
      },
      {
        icon: renderIcon("icon-park-outline:permissions"),
        key: "study-metadata-eligibility",
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "study-metadata-eligibility",
                params: {
                  studyId: studyID.value,
                },
              },
            },
            { default: () => "Eligibility" }
          ),
      },
      {
        icon: renderIcon("teenyicons:contact-outline"),
        key: "study-metadata-contacts",
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "study-metadata-contacts",
                params: {
                  studyId: studyID.value,
                },
              },
            },
            { default: () => "Contacts" }
          ),
      },
      {
        icon: renderIcon("icons8:share"),
        key: "study-metadata-ipd-sharing",
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "study-metadata-ipd-sharing",
                params: {
                  studyId: studyID.value,
                },
              },
            },
            { default: () => "IPD Sharing" }
          ),
      },
      {
        icon: renderIcon("zondicons:book-reference"),
        key: "study-metadata-references",
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "study-metadata-references",
                params: {
                  studyId: studyID.value,
                },
              },
            },
            { default: () => "References" }
          ),
      },
    ],
    icon: renderIcon("ooui:view-details-ltr"),
    key: "study-metadata",
    label: "Metadata",
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
              studyId: studyID.value,
            },
          },
        },
        { default: () => "Participants" }
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
              studyId: studyID.value,
            },
          },
        },
        { default: () => "Contributors" }
      ),
  },
  {
    icon: renderIcon("ph:files-fill"),
    key: "files",
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "study-files",
            params: {
              studyId: studyID.value,
            },
          },
        },
        { default: () => "Files" }
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
              studyId: studyID.value,
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
              studyId: studyID.value,
            },
          },
        },
        { default: () => "Publish" }
      ),
  },
];

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
