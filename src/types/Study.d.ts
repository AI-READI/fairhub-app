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
  updatedRole: string; // tempRole is used to store the role of the contributor before the user clicks the save button
}

export interface StudyContributors extends Array<StudyContributor> {}

export interface StudyIdentifier {
  id: string;
  domain: string;
  identifier: string;
  link: string;
  type: string | null;
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

export interface StudyResponsibleParty {
  name: string;
  title: string;
  affiliation: string;
  type: string | null;
}

export interface StudySponsorCollaboratorsModule {
  lead_sponsor_name: string;
  responsible_party: StudyResponsibleParty;
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
  number_groups_cohorts: number | null;
  target_duration: string;
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
  arm_group_label_list: string[];
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
  gender: string | null;
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
  study_population: string;
  study_type: string;
}

export interface StudyContact {
  id: string;
  name: string;
  affiliation: string;
  email_address: string;
  origin: string;
  phone: string;
  phone_ext: string;
}

export interface StudyContacts {
  central_contact_list: StudyContact[];
}

export interface StudyOverallOfficial {
  id: string;
  name: string;
  affiliation: string;
  origin: string;
  role: string | null;
}

export interface StudyOverallOfficials {
  overall_official_list: StudyOverallOfficial[];
}

export interface StudyLocationContact extends Omit<StudyContact, "affiliation"> {}

export interface StudyLocation {
  id: string;
  city: string;
  contact_list: StudyLocationContact[];
  country: string | null;
  facility: string;
  origin: string;
  state: string;
  status: string | null;
  zip: string;
}

export interface StudyLocations {
  location_list: StudyLocation[];
}

export interface StudyContactsLocationsModule {
  central_contact_list: StudyContact[];
  location_list: StudyLocation[];
  overall_official_list: StudyOverallOfficial[];
}

export interface StudyIPDSharing {
  access_criteria: string;
  description: string;
  info_type_list: string[];
  ipd_sharing: string | null;
  time_frame: string;
  url: string;
}

export interface StudyReference {
  id: string;
  citation: string;
  identifier: string;
  origin: string;
  type: string | null;
}

export interface StudyReferences {
  reference_list: StudyReference[];
}

export interface StudyLink {
  id: string;
  label: string;
  origin: string;
  url: string;
}

export interface StudyLinks {
  link_list: StudyLink[];
}

export interface StudyIPD {
  id: string;
  comment: string;
  identifier: string;
  origin: string;
  type: string | null;
  url: string;
}

export interface StudyIPDs {
  ipd_list: StudyIPD[];
}

export interface StudyReferencesModule {
  ipd_list: StudyIPD[];
  link_list: StudyLink[];
  reference_list: StudyReference[];
}
