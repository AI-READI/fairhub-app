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

export interface StudyDesignModuleEnrollmentInfo {
  enrollment_count: number;
  enrollment_type: string;
}

export interface InterventionalStudyDesignInfo {
  allocation: string;
  intervention_model: string;
  intervention_model_description: string;
  masking: string;
  masking_description: string;
  primary_purpose: string;
  who_masked_list: string[];
}
export interface ObservationalStudyDesignInfo {
  observational_model_list: string[];
  time_perspective_list: string[];
}

export interface StudyDesignInfo
  extends InterventionalStudyDesignInfo,
    ObservationalStudyDesignInfo {}

export interface InterventionalStudyDesignModule {
  number_arms: number;
  phase_list: string[];
}

export interface ObservationalStudyDesignModule {
  bio_spec_description: string;
  bio_spec_retention: string;
  number_groups_cohorts: number;
  target_duration: string;
}

export interface StudyDesignModule
  extends InterventionalStudyDesignModule,
    ObservationalStudyDesignModule {
  design_info: StudyDesignInfo;
  enrollment_info: StudyDesignModuleEnrollmentInfo;
  study_type: string;
}
