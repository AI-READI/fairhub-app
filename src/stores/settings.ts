import type { GlobalTheme } from "naive-ui";
import { darkTheme, lightTheme } from "naive-ui";
import { defineStore } from "pinia";
import type { Ref } from "vue";
import { ref } from "vue";

export const theme: Ref<GlobalTheme> = ref(lightTheme);

export const useSettingsStore = defineStore("settings", () => {
  const currentTheme = ref("light");

  const updateTheme = (newTheme: string) => {
    if (newTheme === "light") {
      currentTheme.value = "light";
      theme.value = lightTheme;
    } else {
      currentTheme.value = "dark";
      theme.value = darkTheme;
    }
  };

  return { currentTheme, updateTheme };
});
