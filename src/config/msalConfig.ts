import type { AccountInfo, RedirectRequest } from "@azure/msal-browser";
import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    authority: "https://aireadi.b2clogin.com/aireadi.onmicrosoft.com/b2c_1_fairhub-app-test-calmi",
    clientId: "0736646d-b5b9-4545-b8e6-5f150141f563",
    postLogoutUri: "http://localhost:3000",
    redirectUri: "http://localhost:3000/auth/verify",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const graphScopes: RedirectRequest = {
  scopes: ["user.read"],
};

export const state = reactive({
  isAuthenticated: false,
  user: null as AccountInfo | null,
});

export const myMSALObj = new PublicClientApplication(msalConfig);
