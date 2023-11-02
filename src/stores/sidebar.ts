import { defineStore } from "pinia";
import { ref } from "vue";

export const useSidebarStore = defineStore("sidebar", () => {
  const collapseAppSidebar = ref(false);

  const collapseDatasetSidebar = ref(false);

  const setAppSidebarCollapsed = (collapse: boolean) => {
    collapseAppSidebar.value = collapse;
  };

  const setDatasetSidebarCollapsed = (collapse: boolean) => {
    collapseDatasetSidebar.value = collapse;
  };

  return {
    collapseAppSidebar,
    collapseDatasetSidebar,
    setAppSidebarCollapsed,
    setDatasetSidebarCollapsed,
  };
});
