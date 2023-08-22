export interface StudyOwner {
  name: string;
  email: string;
  ORCID: string;
}

export interface StudyPublishedVersion {
  date: string;
  doi: string;
  version: string;
}

export interface Study {
  id: string;
  title: string;
  description: string;
  image: string;
  keywords: string[];
  last_updated: string;
  owner: {
    email: string;
    first_name: string;
    last_name: string;
    orcid: string;
  };
  size: string;
}

export interface StudyIdentifier {
  id: string;
  domain: string;
  identifier: string;
  link: string;
  type: string;
}

export interface SecondaryStudyIdentifier extends StudyIdentifier {
  origin: string;
}

export interface StudyIdentificationModule {
  primary: StudyIdentifier;
  secondary: SecondaryStudyIdentifier[];
}

export interface StudyStatusModule {
  completion_date: string | null;
  completion_date_type: string;
  overall_status: string;
  start_date: string;
  start_date_type: string;
  why_stopped: string;
}

export interface StudyResponsibleParty {
  name: string;
  title: string;
  affiliation: string;
  type: string;
}

export interface StudySponsorCollaboratorsModule {
  lead_sponsor_name: string;
  responsible_party: StudyResponsibleParty;
}
