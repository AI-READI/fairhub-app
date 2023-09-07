import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const profile = {
    username: "admin",
    email: "aydan.gasimova2@gmail.com",
    fullname: "Aydan Gasimova",
    image: ` https://api.dicebear.com/5.x/shapes/svg?seed=${Math.random()}`,
    institution: "CALMI2",
    location: "San Diego, CA",
    password: "admin",
    timezone: "America/Los_Angeles",
  };

  return { profile };
});
