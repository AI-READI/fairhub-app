import jwt_decode from "jwt-decode";
import { defineStore } from "pinia";

import type { User } from "@/types/User";

// import { baseURL } from "@/utils/constants";
const baseURL = "http://localhost:3001";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const isAuthenticated = ref(false);

    const accessToken = ref("");
    const refreshToken = ref("");

    const user = ref<User>({
      id: "",
      username: "",
      email_address: "",
      first_name: "",
      last_name: "",
    });

    const router = useRouter();

    const saveUserInformation = (data: any) => {
      accessToken.value = data.accessToken;
      refreshToken.value = data.refreshToken;

      user.value = data.user;
    };

    const signIn = async (emailAddress: string, password: string) => {
      console.log("signing in");
      console.log(emailAddress, password);

      const response = await fetch(`${baseURL}/auth/login`, {
        body: JSON.stringify({ emailAddress, password }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();

        console.log(data);

        saveUserInformation(data);

        isAuthenticated.value = true;
      } else {
        isAuthenticated.value = false;

        user.value = {
          id: "",
          username: "",
          email_address: "",
          first_name: "",
          last_name: "",
        };
      }
    };

    const logout = async () => {
      const response = await fetch(`${baseURL}/auth/logout`, {
        headers: {
          Authorization: `Bearer ${refreshToken.value}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        console.log("error logging out");
        return;
      }

      accessToken.value = "";
      refreshToken.value = "";

      isAuthenticated.value = false;

      user.value = {
        id: "",
        username: "",
        email_address: "",
        first_name: "",
        last_name: "",
      };
    };

    const setRefreshToken = (token: string) => {
      refreshToken.value = token;
    };

    const getRefreshToken = () => {
      // TODO: update type
      const decodedRefreshToken = jwt_decode(refreshToken.value) as any;

      if (decodedRefreshToken.exp * 1000 < Date.now()) {
        // logout user
        logout();

        return null;
      }

      return refreshToken.value;
    };

    const setAccessToken = (token: string) => {
      accessToken.value = token;
    };

    const getAccessToken = async () => {
      // TODO: update type
      const decodedAccessToken = jwt_decode(accessToken.value) as any;

      if (decodedAccessToken.exp * 1000 < Date.now()) {
        const refreshToken = getRefreshToken();

        // todo: check if refresh token is valid
        // await fetch(`${baseURL}/auth/validate`, {});

        if (!refreshToken) {
          logout();
          return null;
        }

        const response = await fetch(`${baseURL}/auth/refresh`, {
          body: JSON.stringify({}),
          headers: {
            Authorization: `Bearer ${refreshToken}`,
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        if (!response.ok) {
          logout();
        }

        const data = await response.json();

        console.log(data);

        saveUserInformation(data);

        return accessToken.value;
      }

      return accessToken.value;
    };

    const navigateToLogin = () => {
      router.push("/auth/login");
    };

    return {
      accessToken,
      getAccessToken,
      isAuthenticated,
      logout,
      navigateToLogin,
      refreshToken,
      setAccessToken,
      setRefreshToken,
      signIn,
      user,
    };
  },
  {
    persist: { storage: sessionStorage },
  }
);
