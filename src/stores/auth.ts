import jwt_decode from "jwt-decode";
import { defineStore } from "pinia";

import type { User } from "@/types/User";

// import { baseURL } from "@/utils/constants";
const baseURL = "http://localhost:3001";

type JWT_TYPE = {
  exp: number;
  iat: number;
  sub: string;
};

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
      // check if refresh token exists
      if (!refreshToken.value) {
        return;
      }

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

    const validateRefreshToken = async () => {
      const response = await fetch(`${baseURL}/auth/validate`, {
        headers: {
          Authorization: `Bearer ${refreshToken.value}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        console.log("error validating refresh token");
        return false;
      }

      return true;
    };

    const getRefreshToken = async () => {
      const decodedRefreshToken = jwt_decode(refreshToken.value) as JWT_TYPE;

      if (decodedRefreshToken.exp * 1000 < Date.now()) {
        // logout user
        logout();

        return null;
      }

      const response = await validateRefreshToken();

      if (!response) {
        logout();
        return null;
      }

      return refreshToken.value;
    };

    const getAccessToken = async () => {
      const decodedAccessToken = jwt_decode(accessToken.value) as JWT_TYPE;

      if (decodedAccessToken.exp * 1000 < Date.now()) {
        console.log("access token expired");
        console.log("refreshing access token");

        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          logout();
          return null;
        }

        const response = await fetch(`${baseURL}/auth/refresh`, {
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
      signIn,
      user,
    };
  },
  {
    persist: { storage: sessionStorage },
  }
);
