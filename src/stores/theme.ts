import type { GlobalTheme } from "naive-ui";
import { lightTheme } from "naive-ui";
import type { Ref } from "vue";
import { ref } from "vue";
export const theme: Ref<GlobalTheme> = ref(lightTheme);
