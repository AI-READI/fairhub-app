import { defineStore } from "pinia";

import type { UserProfile } from "@/types/User";
import { baseURL } from "@/utils/constants";

export const useUserStore = defineStore("user", () => {
  const loading = ref(false);

  const profile = ref<UserProfile>({
    username: "",
    email_address: "",
    first_name: "",
    institution: "",
    last_name: "",
    location: "",
    password: "",
    profile_image: "",
    timezone: "",
    value: undefined,
  });

  const fetchProfile = async () => {
    loading.value = true;

    const response = await fetch(`${baseURL}/user/profile`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("User not found");
    }

    const user = await response.json();

    console.log("response user", user);

    profile.value = user as UserProfile;

    loading.value = false;
    console.log("profile", profile);
    return profile;
  };

  const updateProfile = async (profile: UserProfile) => {
    loading.value = true;

    const response = await fetch(`${baseURL}/user/profile`, {
      body: JSON.stringify(profile),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    if (!response.ok) {
      throw new Error("User not found");
    }

    const user = await response.json();

    console.log("response user", user);

    profile.value = user as UserProfile;

    loading.value = false;
    console.log("profile", profile);
    return profile;
  };

  return { fetchProfile, loading, profile, updateProfile };
});
