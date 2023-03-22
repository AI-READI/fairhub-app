import type { UploadFileInfo } from "naive-ui";
import { ref } from "vue";

export const userProfile = ref({
  email: "aydan.gasimova2@gmail.com",
  fileListRef: <UploadFileInfo[]>[
    {
      id: "1",
      name: `https://api.dicebear.com/5.x/shapes/svg?seed=${Math.random()}`,
      status: "finished",
      type: ".png",
    },
  ],
  fullname: "Aydan Gasimova",
  institution: "CALMI2",
  location: "San Diego, CA",
  timezone: "(GMT-11:00) Midway Island",
});
