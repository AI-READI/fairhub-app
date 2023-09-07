import { faker } from "@faker-js/faker";
import { defineStore } from "pinia";
import { ref } from "vue";

import type { Study } from "@/types/Study";
import { baseURL } from "@/utils/constants";

export const useStudyStore = defineStore(
  "study",
  () => {
    const allStudies = ref<Study[]>([]);
    const loading = ref(false);

    const study = ref<Study>({
      id: "",
      title: "",
      description: "",
      image: "",
      keywords: [],
      last_updated: "",
      owner: {
        email: "",
        first_name: "",
        last_name: "",
        orcid: "",
      },
      size: "",
    });

    const fetchAllStudies = async () => {
      loading.value = true;

      const response = await fetch(`${baseURL}/study`);

      // check for errors
      if (!response.ok) {
        throw new Error("Studies not found  ");
      }

      allStudies.value = await response.json();

      for (const study of allStudies.value) {
        study.owner = {
          email: "sanjay@email.org",
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          orcid: faker.string.uuid(),
        };
      }

      // if (allStudies.value.length === 0) {
      //   for (let i = 0; i < 5; i++) {
      //     const s: Study = {
      //       id: faker.string.uuid(),
      //       title: faker.lorem.sentence(),
      //       description: faker.lorem.paragraph(),
      //       image: faker.image.urlPicsumPhotos(),
      //       keywords: Array.from({ length: 3 }, () => faker.lorem.word()),
      //       last_updated: faker.date.past().toISOString(),
      //       owner: {
      //         email: "sanjay@email.org",
      //         first_name: faker.person.firstName(),
      //         last_name: faker.person.lastName(),
      //         orcid: faker.string.uuid(),
      //       },
      //       size: "4 GB",
      //     };
      //     allStudies.value.push(s);
      //   }
      // }

      console.log("studies", allStudies.value);

      // allStudies.value.forEach((study) => {
      //   study.size = `${Math.round(Math.random() * 100)} MB`;
      // });

      /** Sort by name for now */
      allStudies.value.sort((a, b) => a.title.localeCompare(b.title));

      loading.value = false;
    };

    const getStudy = async (studyId: string) => {
      loading.value = true;

      const response = await fetch(`${baseURL}/study/${studyId}`);

      // check for errors
      if (!response.ok) {
        throw new Error("Study not found");
      }

      const s = await response.json();

      study.value = s;

      study.value.owner = {
        email: "sanjay@email.org",
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        orcid: faker.string.uuid(),
      };

      loading.value = false;

      return study.value;
    };

    return { allStudies, fetchAllStudies, getStudy, loading, study };
  },
  {
    persist: { storage: sessionStorage },
  }
);
