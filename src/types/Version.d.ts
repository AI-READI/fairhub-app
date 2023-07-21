export interface Version {
  id: string;
  title: string;
  contributors: Contributor[];
  description: string;
  keywords: string[];
  primaryLanguage: string;
  selectedParticipants: Participant[];
}
