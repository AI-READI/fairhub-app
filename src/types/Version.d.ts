import { VersionContributor } from "./Contributor";
import { Participant } from "./Participant";

export interface Version {
  id: string;
  title: string;
  contributors: VersionContributor[];
  description: string;
  keywords: string[];
  primaryLanguage: string;
  selectedParticipants: Participant[];
}
