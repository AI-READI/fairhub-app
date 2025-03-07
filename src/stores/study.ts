import { defineStore } from "pinia";

import type { Study } from "@/types/Study";
import { baseURL } from "@/utils/constants";

export const useStudyStore = defineStore("study", () => {
  const loading = ref(false);

  const allStudies = ref<Study[]>([]);
  const study = ref<Study>({
    id: "",
    title: "",
    created_at: 0,
    description: "",
    image: "",
    keywords: [],
    owner: "",
    role: "viewer",
    short_description: "",
    size: 0,
    updated_on: 0,
  });
  const currentStudyRole = ref("");

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

    // console.log("response studies", studies);

    allStudies.value = studies as Study[];

    // if (allStudies.value.length === 0) {
    //   for (let i = 0; i < 5; i++) {
    //     const s: Study = {
    //       id: faker.string.uuid(),
    //       title: faker.lorem.sentence(),
    //       acronym: faker.lorem.word(),
    //       description: faker.lorem.paragraph(),
    //       image: faker.image.urlPicsumPhotos(),
    //       keywords: Array.from({ length: 3 }, () => faker.lorem.word()),
    //       owner: "test@mail.com",
    //       role: "viewer",
    //       updated_on: faker.date.past().getTime(),
    //     };
    //     allStudies.value.push(s);
    //   }
    // }

    /** Sort by name for now */
    // allStudies.value.sort((a, b) => a.title.localeCompare(b.title));

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

    currentStudyRole.value = s.role;

    // study.value.owner = s.owner_id;
    // console.log("response study", study.value);

    // console.log("study", study.value);

    loading.value = false;

    return study.value;
  };

  const getStudyRole = async (studyId: string) => {
    loading.value = true;

    // Fetch all studies if there are none
    if (allStudies.value.length === 0) {
      await fetchAllStudies();
    }
    const study = allStudies.value.find((study) => study.id === studyId);

    currentStudyRole.value = study?.role || "";
    return currentStudyRole.value;
  };

  return { allStudies, currentStudyRole, fetchAllStudies, getStudy, getStudyRole, loading, study };
});
