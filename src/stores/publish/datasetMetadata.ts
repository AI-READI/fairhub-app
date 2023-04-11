import type { FormItemRule } from "naive-ui";
import { ref } from "vue";

export const formValue = ref({
  title: "",
  description: "",
  keywords: [],
  primaryLanguage: "",
});

export const rules = ref({
  title: {
    message: "Please add a Dataset Title",
    required: true,
    trigger: ["input"],
  },
  description: {
    message: "Please add a Dataset Description",
    required: true,
    trigger: ["input"],
  },
  keywords: [
    {
      required: true,
      trigger: ["blur", "change"],
      validator: (rule: FormItemRule, value: Array<string>) => {
        if (value !== null && value.length > 0) {
          return Promise.resolve();
        }
        return Promise.reject("Please select at least one keyword");
      },
    },
  ],
  primaryLanguage: {
    message: "Please select a primary language",
    required: true,
    trigger: ["blur", "change"],
  },
});
