import { defineStore } from "pinia";

import type { UserProfile } from "@/types/User";
import { baseURL } from "@/utils/constants";

export const useUserStore = defineStore("user", () => {
  const loading = ref(false);

  const profile = ref<UserProfile>({
    username: "",
    email: "",
    fullname: "",
    image: "",
    institution: "",
    location: "",
    password: "",
    timezone: "",
  });

  const fetchProfile = async () => {
    loading.value = true;

    const response = await fetch(`${baseURL}/profile`, {
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

  // const profile = {
  //   username: "admin",
  //   email: "aydan.gasimova2@gmail.com",
  //   fullname: "Aydan Gasimova",
  //   image: ` https://api.dicebear.com/5.x/shapes/svg?seed=${Math.random()}`,
  //   institution: "CALMI2",
  //   location: "San Diego, CA",
  //   password: "admin",
  //   timezone: "America/Los_Angeles",
  // };

  return { fetchProfile, loading, profile };
});
