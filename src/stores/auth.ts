import { defineStore } from "pinia";
import { ref } from "vue";

// import { baseURL } from "@/utils/constants";
const baseURL = "http://localhost:3001";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const isAuthenticated = ref(false);
    const accessToken = ref("");
    const refreshToken = ref("");
    const user = ref("");
    const userDetails = ref({
      id: "",
      username: "",
      email_address: "",
      first_name: "",
      last_name: "",
    });

    const router = useRouter();

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

        accessToken.value = data.accessToken;
        refreshToken.value = data.refreshToken;

        user.value = data.user_id;

        userDetails.value = data.context;

        console.log(data);

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

    const navigateToLogin = () => {
      router.push("/auth/login");
    };

    return {
      accessToken,
      isAuthenticated,
      logout,
      navigateToLogin,
      refreshToken,
      setAccessToken,
      setRefreshToken,
      signIn,
      user,
      userDetails,
    };
  },
  {
    persist: { storage: sessionStorage },
  }
);
