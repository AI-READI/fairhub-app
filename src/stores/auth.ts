import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);

  function setLoggedIn() {
    isAuthenticated.value = true;
  }

  function setLoggedOut() {
    isAuthenticated.value = false;
  }

  return { isAuthenticated, setLoggedIn, setLoggedOut };
});
