import { defineStore } from "pinia";

export const useAlertStore = defineStore(
  "alertStore",
  () => {
    const showAlert = ref(false);

    const setShowAlert = (value: boolean) => {
      showAlert.value = value;
    };

    return { setShowAlert, showAlert };
  },
  {
    persist: { storage: localStorage },
  }
);
