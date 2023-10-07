import type { Participant } from "./Participant";

export interface Version {
  id: string;
  title: string;
  changelog: string;
  published: boolean;
}

export interface LocalVersion extends Version {
  participants: Participant[];
}
