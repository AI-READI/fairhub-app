import { defineStore } from "pinia";
import { ref } from "vue";

export const useSidebarStore = defineStore("sidebar", () => {
  const collapseAppSidebar = ref(false);

  const collapseDatasetSidebar = ref(false);

  const setAppSidebarCollapse = (collapse: boolean) => {
    collapseAppSidebar.value = collapse;
  };

  const setDatasetSidebarCollapse = (collapse: boolean) => {
    collapseDatasetSidebar.value = collapse;
  };

  return {
    collapseAppSidebar,
    collapseDatasetSidebar,
    setAppSidebarCollapse,
    setDatasetSidebarCollapse,
  };
});
