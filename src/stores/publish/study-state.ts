import type { InjectionKey, Ref } from "vue";

import type { Study } from "@/stores/publish/study-interfaces";
export const STUDY_KEY: InjectionKey<Ref<Study | null>> = Symbol("study");
