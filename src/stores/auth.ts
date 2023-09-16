import jwt_decode from "jwt-decode";
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

    const saveUserInformation = (data: any) => {
      accessToken.value = data.accessToken;
      refreshToken.value = data.refreshToken;

      user.value = data.user_id;

      userDetails.value = data.context;
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
        user.value = "";
      }
    };

    const logout = async () => {
      // TODO: call logout endpoint on server to blacklist refresh token

      accessToken.value = "";
      refreshToken.value = "";
      user.value = "";
      isAuthenticated.value = false;
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
      userDetails,
    };
  },
  {
    persist: { storage: sessionStorage },
  }
);
