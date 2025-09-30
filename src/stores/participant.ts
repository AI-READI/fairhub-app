import { faker } from "@faker-js/faker";
import { defineStore } from "pinia";
import { ref } from "vue";

import type { Participant } from "@/types/Participant";

export const useParticipantStore = defineStore("participant", () => {
  const allParticipants = ref<Participant[]>([]);
  const loading = ref(false);

  const participant = ref<Participant>();

  const fetchAllParticipants = async (studyId: string) => {
    loading.value = true;
    // const response = await fetch(`${baseURL}/study/${studyId}/participants`);
    console.log(studyId);
    // allParticipants.value = await response.json();

    if (allParticipants.value.length === 0) {
      for (let i = 0; i < 10; i++) {
        const p: Participant = {
          id: faker.string.uuid(),
          address: faker.location.streetAddress(),
          age: faker.number.int({ max: 99, min: 18 }),
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          selected: false,
        };

        allParticipants.value.push(p);
      }
    }

    console.log("participants", allParticipants.value);

    // allParticipants.value.forEach((participant) => {
    //   //   participant.id = nanoid(5);  //was changing on load
    // });

    loading.value = false;
  };

  const getParticipant = async (participantId: string, studyId: string) => {
    loading.value = true;

    // fetch all datasets if not already fetched
    if (allParticipants.value.length === 0) {
      await fetchAllParticipants(studyId);
    }

    const p = allParticipants.value.find((participant) => participant.id === participantId);

    loading.value = false;

    participant.value = p;

    return participant.value;
  };

  return { allParticipants, fetchAllParticipants, getParticipant, loading, participant };
});
