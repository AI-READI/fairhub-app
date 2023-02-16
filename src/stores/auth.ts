import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const isAuthenticated = ref(false);
    const user = ref("");

    function setLoggedIn() {
      isAuthenticated.value = true;
      user.value = "sanjay@email.org";
    }

    function setLoggedOut() {
      isAuthenticated.value = false;
      user.value = "";
    }

    return { isAuthenticated, setLoggedIn, setLoggedOut, user };
  },
  {
    persist: { storage: sessionStorage },
  }
);
