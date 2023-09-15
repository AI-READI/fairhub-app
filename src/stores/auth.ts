import { defineStore } from "pinia";
import { ref } from "vue";

import { baseURL } from "@/utils/constants";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const isAuthenticated = ref(false);
    const accessToken = ref("");
    const refreshToken = ref("");
    const user = ref("");

    const showLoginModal = ref(false);

    const signIn = async (email_address: string, password: string) => {
      const response = await fetch(`${baseURL}/auth/login`, {
        body: JSON.stringify({ email_address, password }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();

        accessToken.value = data.access_token;
        refreshToken.value = data.refresh_token;

        user.value = data.user_id;

        isAuthenticated.value = true;
      } else {
        isAuthenticated.value = false;
        user.value = "";
      }
    };

    const logout = async () => {
      accessToken.value = "";
      refreshToken.value = "";
      user.value = "";
      isAuthenticated.value = false;
    };

    const setAccessToken = (token: string) => {
      accessToken.value = token;
    };

    const setRefreshToken = (token: string) => {
      refreshToken.value = token;
    };

    return {
      accessToken,
      isAuthenticated,
      logout,
      refreshToken,
      setAccessToken,
      setRefreshToken,
      showLoginModal,
      signIn,
      user,
    };
  },
  {
    persist: { storage: sessionStorage },
  }
);
