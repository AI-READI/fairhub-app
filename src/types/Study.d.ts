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
  acronym: string;
  description: string;
  image: string;
  keywords: string[];
  owner: string; // study owner's id
  role: "owner" | "admin" | "editor" | "viewer";
  size: number;
  updated_on: number;
}

export interface StudyContributor {
  id: string;
  name?: string;
  email_address: string;
  ORCID?: string;
  role: string;
  status: "invited" | "accepted" | "declined";
  token?: string;
  updatedRole: string; // tempRole is used to store the role of the contributor before the user clicks the save button
}

export interface StudyContributors extends Array<StudyContributor> {}

export interface StudyIdentifier {
  id: string;
  identifier: string;
  identifier_domain: string;
  identifier_link: string;
  identifier_type: string | null;
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
  completion_date_type: string | null;
  overall_status: string | null;
  start_date: string | null;
  start_date_type: string | null;
  why_stopped: string;
}

export interface StudySponsors {
  lead_sponsor: {
    name: string;
    identifier: string;
    identifier_scheme: string;
    identifier_scheme_uri: string;
  };
  responsible_party: {
    title: string;
    affiliation: {
      name: string;
      identifier: string;
      identifier_scheme: string;
      scheme_uri: string;
    };
    first_name: string;
    identifier: {
      scheme: string;
      scheme_uri: string;
      value: string;
    };
    last_name: string;
    type: string | null;
  };
}

export interface StudyCollaborator {
  id: string;
  name: string;
  identifier: string;
  identifier_scheme: string;
  identifier_scheme_uri: string;
  origin: string;
}
export interface StudyCollaborators {
  collaborators: StudyCollaborator[];
}

export interface StudyOversightModule {
  fda_regulated_device: string | null;
  fda_regulated_drug: string | null;
  has_dmc: string | null;
  human_subject_review_status: string | null;
}

export interface StudyCondition {
  id: string;
  name: string;
  classification_code: string;
  condition_uri: string;
  origin: string;
  scheme: string;
  scheme_uri: string;
}

export interface StudyConditions {
  conditions: StudyCondition[];
}

export interface StudyKeyword {
  id: string;
  name: string;
  classification_code: string;
  keyword_uri: string;
  origin: string;
  scheme: string;
  scheme_uri: string;
}

export interface StudyKeywords {
  keywords: StudyKeyword[];
}

export interface StudyDesignModuleEnrollmentInfo {
  enrollment_count: number | null;
  enrollment_type: string | null;
}

export interface InterventionalStudyDesignInfo {
  allocation: string | null;
  intervention_model: string | null;
  intervention_model_description: string;
  masking: string | null;
  masking_description: string;
  primary_purpose: string | null;
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
  number_arms: number | null;
  phase_list: string[];
}

export interface ObservationalStudyDesignModule {
  bio_spec_description: string;
  bio_spec_retention: string | null;
  is_patient_registry: string | null;
  target_duration: {
    unit: string | null;
    value: number | null;
  };
}

export interface StudyDesignModule
  extends InterventionalStudyDesignModule,
    ObservationalStudyDesignModule {
  design_info: StudyDesignInfo;
  enrollment_info: StudyDesignModuleEnrollmentInfo;
  study_type: string | null;
}

export interface StudyIntervention {
  id: string;
  name: string;
  description: string;
  origin: string;
  other_name_list: string[];
  type: string | null;
}

export interface StudyInterventions {
  interventions: StudyIntervention[];
}

export interface StudyArm {
  id: string;
  description: string;
  intervention_list: string[];
  label: string;
  origin: string;
  type: string | null;
}

export interface StudyArms {
  arms: StudyArm[];
  study_type: string;
}

export interface StudyEligiblityModule {
  criteria: {
    exclusion_criteria: string[];
    inclusion_criteria: string[];
  };
  gender_based: string | null;
  gender_description: string;
  healthy_volunteers: string | null;
  maximum_age: {
    age: number | null;
    unit: string | null;
  };
  minimum_age: {
    age: number | null;
    unit: string | null;
  };
  sampling_method: string | null;
  sex: string | null;
  study_population: string;
  study_type: string;
}

export interface StudyCentralContact {
  id: string;
  affiliation: string;
  affiliation_identifier: string;
  affiliation_identifier_scheme: string;
  affiliation_identifier_scheme_uri: string;
  degree: string;
  email_address: string;
  first_name: string;
  identifier: string;
  identifier_scheme: string;
  identifier_scheme_uri: string;
  last_name: string;
  origin: string;
  phone: string;
  phone_ext: string;
}

export interface StudyCentralContacts {
  central_contact_list: StudyCentralContact[];
}

export interface StudyOverallOfficial {
  id: string;
  affiliation: string;
  affiliation_identifier: string;
  affiliation_identifier_scheme: string;
  affiliation_identifier_scheme_uri: string;
  degree: string;
  first_name: string;
  identifier: string;
  identifier_scheme: string;
  identifier_scheme_uri: string;
  last_name: string;
  origin: string;
  role: string | null;
}

export interface StudyOverallOfficials {
  overall_official_list: StudyOverallOfficial[];
}

export interface StudyLocationContact {
  email_address: string;
  first_name: string;
  identifier: string;
  identifier_scheme: string;
  identifier_scheme_uri: string;
  last_name: string;
  phone: string;
  phone_ext: string;
  role: string | null;
}

export interface StudyLocation {
  id: string;
  city: string;
  contact_list: StudyLocationContact[];
  country: string | null;
  facility: string;
  identifier: string;
  identifier_scheme: string;
  identifier_scheme_uri: string;
  origin: string;
  state: string;
  status: string | null;
  zip: string;
}

export interface StudyLocations {
  location_list: StudyLocation[];
}

export interface StudyFile {
  id: string;
  name: string;
  content_length: number;
  // created_at: number;
  is_directory: boolean;
  updated_on: number;
}

export interface StudyFiles {
  files: StudyFile[];
}
