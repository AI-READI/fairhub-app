import { defineStore } from "pinia";

import type { Study } from "@/types/Study";
import { baseURL } from "@/utils/constants";

import { useAuthStore } from "./auth";

export const useStudyStore = defineStore("study", () => {
  const authStore = useAuthStore();

  const loading = ref(false);

  const allStudies = ref<Study[]>([]);
  const study = ref<Study>({
    id: "",
    title: "",
    description: "",
    image: "",
    keywords: [],
    owner: "",
    role: "viewer",
    size: 0,
    updated_on: 0,
  });

  const fetchAllStudies = async () => {
    loading.value = true;

    // const response = await axios.get(`${baseURL}/study`, {
    //   withCredentials: true,
    // });

    // if (!response) {
    //   throw new Error("Studies not found");
    // }

    // const studies = response.data;

    const response = await fetch(`${baseURL}/study`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Studies not found");
    }

    const studies = await response.json();

    console.log("response studies", studies);

    allStudies.value = studies as Study[];

    for (const study of allStudies.value) {
      /**
       * TODO: Remove this once we have the user object
       */

      console.log("authStore.user", authStore.user);
      study.owner = authStore.user.id;
      study.role = "owner";
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

    const response = await fetch(`${baseURL}/study/${studyId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Study not found");
    }

    const data = await response.json();

    const s = data as Study;

    study.value = s;

    study.value.owner = authStore.user.id;
    study.value.role = "owner";

    console.log("study", study.value);

    loading.value = false;

    return study.value;
  };

  return { allStudies, fetchAllStudies, getStudy, loading, study };
});
