import jwt_decode from "jwt-decode";
import { defineStore } from "pinia";

import type { User } from "@/types/User";
import { baseURL } from "@/utils/constants";

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
    /**
     * TODO: store refresh token in a cookie/local storage
     */
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
      user.value = data.user;
    };

    const setIsAuthenticated = (value: boolean) => {
      isAuthenticated.value = value;
    };

    const login = async (emailAddress: string, password: string) => {
      console.log("signing in");
      console.log(emailAddress, password);

      const response = await fetch(`${baseURL}/auth/login`, {
        body: JSON.stringify({
          email_address: emailAddress,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();

        saveUserInformation(data);

        isAuthenticated.value = true;

        return data;
      } else {
        isAuthenticated.value = false;

        user.value = {
          id: "",
          username: "",
          email_address: "",
          first_name: "",
          last_name: "",
        };

        return null;
      }
    };

    const logout = async () => {
      await fetch(`${baseURL}/auth/logout`, {
        method: "POST",
      });

      isAuthenticated.value = false;

      user.value = {
        id: "",
        username: "",
        email_address: "",
        first_name: "",
        last_name: "",
      };

      router.push("/auth/login");
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
        logout();
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

    const refreshTokens = async () => {
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
        return null;
      }

      const data = await response.json();

      saveUserInformation(data);

      return accessToken.value;
    };

    const getAccessToken = async () => {
      if (accessToken.value) {
        const decodedAccessToken = jwt_decode(accessToken.value) as JWT_TYPE;

        if (decodedAccessToken.exp * 1000 < Date.now()) {
          console.log("access token expired");
          console.log("refreshing access token");

          const token = await refreshTokens();

          return token;
        }

        return accessToken.value;
      } else {
        console.log("no access token");
        console.log("using refresh token");

        const token = await refreshTokens();

        return token;
      }
    };

    const navigateToLogin = () => {
      router.push("/auth/login");
    };

    return {
      isAuthenticated,
      login,
      logout,
      navigateToLogin,
      saveUserInformation,
      setIsAuthenticated,
      user,
    };
  },
  {
    persist: { storage: sessionStorage },
  }
);
