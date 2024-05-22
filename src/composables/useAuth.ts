import { myMSALObj, state } from "@/config/msalConfig";

export function useAuth() {
  const isAuthenticated = ref(false);

  const login = async () => {
    try {
      // Check if MSAL is initialized before using it

      if (!myMSALObj) {
        console.error("MSAL instance not initialized");
        return;
      }

      await myMSALObj.loginRedirect();

      isAuthenticated.value = true;

      const loginResponse = await myMSALObj.loginRedirect();
      isAuthenticated.value = true;

      console.log("Login success: ", loginResponse);
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  const logout = () => {
    if (!myMSALObj) {
      console.error("MSAL instance not initialized");
      return;
    }

    myMSALObj.logoutRedirect();

    isAuthenticated.value = false;
    console.log("Logout success");
  };

  const handleRedirect = async () => {
    try {
      await myMSALObj.handleRedirectPromise();

      state.isAuthenticated = myMSALObj.getAllAccounts().length > 0;
      state.user = myMSALObj.getAllAccounts()[0];
    } catch (error) {
      console.error("Redirect error: ", error);
    }
  };

  return { handleRedirect, isAuthenticated, login, logout };
}
