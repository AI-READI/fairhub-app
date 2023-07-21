import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { ref } from "vue";

import type { Participant } from "@/types/Participant";
import { baseURL } from "@/utils/constants";

export const useParticipantStore = defineStore("participant", () => {
  const allParticipants = ref<Participant[]>([]);
  const loading = ref(false);

  const participant = ref<Participant>();

  const fetchAllParticipants = async (studyId: string) => {
    loading.value = true;
    const response = await fetch(`${baseURL}/study/${studyId}/participants`);

    allParticipants.value = await response.json();

    console.log(allParticipants.value);

    allParticipants.value.forEach((participant) => {
      participant.id = nanoid(5);
    });

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
