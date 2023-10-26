import { defineStore } from "pinia";

import type { User } from "@/types/User";
import { baseURL } from "@/utils/constants";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const isAuthenticated = ref(false);

    const user = ref<User>({
      id: "",
      username: "",
      email_address: "",
      first_name: "",
      last_name: "",
    });

    const router = useRouter();

    const saveUserInformation = (data: any) => {
      console.log("saving user information", data);
      user.value.email_address = data.email_address;
      user.value.first_name = data.first_name;
      user.value.id = data.id;
      user.value.last_name = data.last_name;
      user.value.username = data.username;
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

      navigateToLogin();
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
    persist: { storage: localStorage },
  }
);
