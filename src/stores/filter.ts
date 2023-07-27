import { defineStore } from "pinia";
import { ref } from "vue";

export const useFilterStore = defineStore(
  "filter",
  () => {
    const permissions = ref({
      editor: true,
      owner: true,
      viewer: true,
    });

    const sort = ref("last_updated");

    const sortOrder = ref("asc");

    const updateSort = (key: string) => {
      sort.value = key;
    };

    const toggleSortOrder = () => {
      sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    };

    return { permissions, sort, sortOrder, toggleSortOrder, updateSort };
  },
  {
    persist: { storage: sessionStorage },
  }
);
