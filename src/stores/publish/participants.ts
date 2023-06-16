import type { InjectionKey, Ref } from "vue";

import type { Participant } from "@/stores/publish/study-interfaces";

export const PARTICIPANTS_KEY: InjectionKey<Ref<Participant[]>> = Symbol("participants");
