import { defineStore } from "pinia";

export const useErrorStore = defineStore(
  "errorFields",
  () => {
    const errorFields = ref<string>("");

    const setErrorFields = (value: string) => {
      errorFields.value = value;
    };

    return {
      errorFields,
      setErrorFields,
    };
  },
  {
    persist: { storage: localStorage },
  }
);
