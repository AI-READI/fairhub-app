<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { MenuInst, MenuOption } from "naive-ui";
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
    icon: renderIcon("material-symbols:overview-key-outline"),
    key: "dataset:overview",
    label: "Overview",
  },
  {
    children: [
      {
        icon: renderIcon("mdi:identifier"),
        key: "dataset:metadata:identifiers",
        label: "Identifiers",
      },
      {
        icon: renderIcon("fluent:text-case-title-16-filled"),
        key: "dataset:metadata:title",
        label: "Titles",
      },
      {
        icon: renderIcon("material-symbols:description-outline"),
        key: "dataset:metadata:descriptions",
        label: "Descriptions",
      },
      {
        // contains both creators and contributors
        icon: renderIcon("fa6-solid:person"),
        key: "dataset:metadata:creators",
        label: "Creators",
      },
      {
        icon: renderIcon("ic:baseline-people"),
        key: "dataset:metadata:contributors",
        label: "Contributors",
      },
      {
        icon: renderIcon("solar:calendar-date-outline"),
        key: "dataset:metadata:dates",
        label: "Dates",
      },
      {
        // also contains publication year
        icon: renderIcon("octicon:organization-16"),
        key: "dataset:metadata:publisher",
        label: "Publisher",
      },
      {
        icon: renderIcon("solar:key-bold-duotone"),
        key: "dataset:metadata:record-keys",
        label: "Record Keys",
      },
      {
        icon: renderIcon("tabler:id-badge-off"),
        key: "dataset:metadata:de-identification",
        label: "De-identification",
      },
      {
        icon: renderIcon("icon-park-twotone:permissions"),
        key: "dataset:metadata:consent",
        label: "Consent",
      },
      {
        icon: renderIcon("ep:list"),
        key: "dataset:metadata:subjects",
        label: "Subjects",
      },
      {
        icon: renderIcon("mdi:cloud-access"),
        key: "dataset:metadata:access",
        label: "Access",
      },
      {
        icon: renderIcon("icon-park-twotone:right-user"),
        key: "dataset:metadata:rights",
        label: "Rights",
      },
      {
        icon: renderIcon("solar:hand-money-linear"),
        key: "dataset:metadata:funders",
        label: "Funders",
      },
      {
        icon: renderIcon("fluent-mdl2:relationship"),
        key: "dataset:metadata:related-items",
        label: "Related Items",
      },
      {
        // language, managing organization, size goes in here
        icon: renderIcon("pajamas:overview"),
        key: "dataset:metadata:about",
        label: "About",
      },
    ],
    icon: renderIcon("ooui:view-details-ltr"),
    key: "dataset:metadata",
    label: "Metadata",
  },
  {
    children: [
      {
        icon: renderIcon("mdi:file-document-edit-outline"),
        key: "dataset:healthsheet:motivation",
        label: "Motivation",
      },
      {
        icon: renderIcon("mdi:file-document-edit-outline"),
        key: "dataset:healthsheet:composition",
        label: "Composition",
      },
      {
        icon: renderIcon("mdi:file-document-edit-outline"),
        key: "dataset:healthsheet:collection",
        label: "Collection",
      },
      {
        icon: renderIcon("mdi:file-document-edit-outline"),
        key: "dataset:healthsheet:preprocessing ",
        label: "Preprocessing ",
      },
      {
        icon: renderIcon("mdi:file-document-edit-outline"),
        key: "dataset:healthsheet:uses",
        label: "Uses",
      },
      {
        icon: renderIcon("mdi:file-document-edit-outline"),
        key: "dataset:healthsheet:distribution",
        label: "Distribution",
      },
      {
        icon: renderIcon("mdi:file-document-edit-outline"),
        key: "dataset:healthsheet:maintenance",
        label: "Maintenance",
      },
    ],
    icon: renderIcon("mdi:file-document-edit-outline"),
    key: "dataset:healthsheet",
    label: "Healthsheet",
  },
  {
    icon: renderIcon("entypo:publish"),
    key: "dataset:publish:versions",
    label: "Publish",
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

  // if (routeName === "study") {
  //   router.push({
  //     name: value,
  //     params: {
  //       studyId: studyID.value,
  //     },
  //   });

  //   return;
  // }

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

  console.log("routeName", routeName, route.path);

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

const selectedKeyRef = ref("1");
const menuInstRef = ref<MenuInst | null>(null);

const selectAndExpand = (key: string) => {
  selectedKeyRef.value = key;
  menuInstRef.value?.showOption(key);
};

router.beforeEach((to) => {
  if (typeof to.name !== "string") return;
  const name: string = to.meta && to.meta.menuItem ? (to.meta.menuItem as string) : to.name;
  selectAndExpand(name);
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
        ref="menuInstRef"
        v-model:value="selectedKeyRef"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :default-expanded-keys="['dataset:metadata']"
        :collapsed="sidebarCollapsed"
        :options="dynamicUpperMenuOptions"
        @update:value="navigateTo"
      />
    </n-space>
  </n-layout-sider>
</template>
