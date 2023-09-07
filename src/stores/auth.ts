import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const isAuthenticated = ref(false);
    const user = ref("");

    const showLoginModal = ref(false);

    const signIn = (email_address: string, password: string) => {};

    function setLoggedIn() {
      isAuthenticated.value = true;
      user.value = "sanjay@email.org";
    }

    function setLoggedOut() {
      isAuthenticated.value = false;
      user.value = "";
    }

    return { isAuthenticated, setLoggedIn, setLoggedOut, showLoginModal, user };
  },
  {
    persist: { storage: sessionStorage },
  }
);
