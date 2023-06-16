import type { FormItemRule } from "naive-ui";
import type { FormRules } from "naive-ui";
import type { InjectionKey, Ref } from "vue";
import { ref } from "vue";

import type { Dataset } from "@/stores/publish/study-interfaces";

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

export const contributorRules: FormRules = {
  affiliations: [
    {
      required: true,
      trigger: ["blur", "change"],
      validator: (rule: FormItemRule, value) => {
        if (value !== null && value.length > 0) {
          return Promise.resolve();
        }
        return Promise.reject("Please select at least one affiliation");
      },
    },
  ],
  firstname: [
    {
      message: "Please input a first name",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  lastname: [
    {
      message: "Please add a last name",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  ORCID: [
    {
      message: "Please add a valid ORCID number",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  roles: [
    {
      required: true,
      trigger: ["blur", "change"],
      validator: (rule: FormItemRule, value) => {
        if (value !== null && value.length > 0) {
          return Promise.resolve();
        }
        return Promise.reject("Please select at least one role");
      },
    },
  ],
};
// export const studyPublish:Ref<StudyVersion> = ref(new StudyVersion(0));

export const STUDYPUBLISH_KEY: InjectionKey<null> = Symbol("studyPublish");

export const DATASETS_KEY: InjectionKey<Ref<Dataset[]>> = Symbol("datasets");

export const DATASET_KEY: InjectionKey<Ref<Dataset>> = Symbol("dataset");
