import { defineStore } from "pinia";
import { ref } from "vue";

export const useStudiesStore = defineStore(
  "studies",
  () => {
    const studies = ref([
      {
        id: 1,
        title: "AI-READI",
        contributors: [
          {
            name: "Bill Sanders",
            email: "bill.sanders@email.org",
            role: "editor",
            status: "invited",
          },
          {
            name: "Dolores Chambers",
            email: "dolores.chambers@email.org",
            role: "viewer",
            status: "invited",
          },
          {
            name: "Bhavesh Patel",
            email: "bhavesh.patel@email.org",
            role: "editor",
            status: "active",
          },
        ],
        description:
          "The AI-READI project seeks to create and share a flagship ethically-sourced dataset of type 2 diabetes.",
        image: `https://fairdataihub.org/images/hero/aireadi-logo.png`,
        lastPublished: {
          date: "2023-01-13",
          doi: "10.1234/1234",
          version: "v1.0.0",
        },
        lastUpdated: "2023-02-13",
        owner: {
          name: "Sanjay Soundarajan",
          email: "sanjay@email.org",
        },
        size: "2.8 GB",
      },
      {
        id: 2,
        title: "Study 2",
        contributors: [
          {
            name: "Sanjay Soundarajan",
            email: "sanjay@email.org",
            role: "owner",
            status: "active",
          },
          {
            name: "Bill Sanders",
            email: "bill.sanders@email.org",
            role: "editor",
            status: "invited",
          },
          {
            name: "Dolores Chambers",
            email: "dolores.chambers@email.org",
            role: "viewer",
            status: "invited",
          },
          {
            name: "Bhavesh Patel",
            email: "bhavesh.patel@email.org",
            role: "editor",
            status: "active",
          },
        ],
        description: "Study 2 description",
        image: `https://api.dicebear.com/5.x/shapes/svg?seed=${Math.random()}`,
        lastUpdated: "2023-02-05",
        owner: {
          name: "Sanjay Soundarajan",
          email: "sanjay@email.org",
        },
        size: "1.2 GB",
      },
    ]);

    const getStudy = (id: number) => {
      // Check if study exists
      const study = studies.value.find((study) => study.id === id);

      if (!study) {
        throw new Error("Study not found");
      }

      return study;
    };

    return { getStudy, studies };
  },
  {}
);
