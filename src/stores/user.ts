import { ref } from "vue";

export const userProfile = ref({
  username: "admin",
  email: "aydan.gasimova2@gmail.com",
  fullname: "Aydan Gasimova",
  image: ` https://api.dicebear.com/5.x/shapes/svg?seed=${Math.random()}`,
  institution: "CALMI2",
  location: "San Diego, CA",
  password: "admin",
  timezone: "(GMT-11:00) Midway Island",
});
