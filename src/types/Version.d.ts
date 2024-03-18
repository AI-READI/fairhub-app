export interface Version {
  id: string;
  title: string;
  changelog: string;
  created_at: number;
  doi: string;
  published: boolean;
  published_on: number;
  updated_on: number;
}

export interface VersionStudyMetadata {
  arms: VersionStudyArm[];
  available_ipd: VersionStudyIPD[];
  central_contacts: VersionStudyCentralContact[];
  collaborators: VersionStudyCollaborators[];
  conditions: VersionStudyConditions[];
  description: VersionStudyDescription;
  design: VersionDesign;
  eligibility: VersionStudyEligibility;
  interventions: VersionStudyIntervention[];
  ipd_sharing: VersionStudyIPDSharing;
  keywords: VersionStudyKeywords[];
  links: VersionStudyLink[];
  locations: VersionStudyLocation[];
  overall_officials: VersionStudyOverallOfficial[];
  oversight: VersionStudyOversight;
  primary_identifier: VersionStudyIdentifier | null;
  references: VersionStudyReference[];
  secondary_identifiers: VersionStudyIdentifier[];
  sponsors: VersionStudySponsor;
  status: VersionStudyStatusModule;
}

export interface VersionStudyIPD {
  id: string;
  identifier: string;
  url: string;
}

export interface VersionStudyOverallOfficial {
  id: string;
  affiliation: string;
  first_name: string;
  last_name: string;
}

export interface VersionStudyOversight {
  fda_regulated_device: string | null;
  fda_regulated_drug: string | null;
  has_dmc: string | null;
  human_subject_review_status: string | null;
}

export interface VersionDesign {
  bio_spec_retention: string;
  design_allocation: string | null;
  design_intervention_model: string | null;
  design_intervention_model_description: string;
  design_masking: string | null;
  design_observational_model_list: [] | null;
  design_primary_purpose: string | null;
  design_time_perspective_list: [] | null;
  design_who_masked_list: [] | null;
  enrollment_count: string | null;
  enrollment_type: string | null;
  number_arms: number | null;
  number_groups_cohorts: number | null;
  phase_list: [] | null;
  study_type: string | null;
  target_duration: string | null;
}

export interface VersionStudyIPDSharing {
  ipd_sharing: string | null;
  ipd_sharing_info_type_list: [] | null;
}

export interface VersionStudyReference {
  id: string;
  citation: string;
  identifier: string;
}

export interface VersionStudyLink {
  id: string;
  title: string;
  url: string;
}

export interface VersionStudyIPD {
  id: string;
  identifier: string;
  url: string;
}

export interface VersionStudyLocation {
  id: string;
  country: string | null;
  facility: string;
}

export interface VersionStudyIdentifier {
  id: string;
  identifier: string;
  identifier_type: string | null;
}

export interface VersionStudyStatusModule {
  overall_status: string | null;
  start_date: string | null;
}

export interface VersionStudySponsor {
  lead_sponsor_name: string;
  responsible_party_investigator_first_name: string;
  responsible_party_investigator_last_name: string;
  responsible_party_type: string;
}

export interface VersionStudyCollaborators {
  name: string;
}

export interface VersionStudyKeywords {
  name: string;
}

export interface VersionStudyConditions {
  name: string;
}

export interface VersionStudyIntervention {
  id: string;
  name: string;
  type: string | null;
}

export interface VersionStudyArm {
  id: string;
  label: string;
}

export interface VersionStudyEligibility {
  gender_based: string | null;
  maximum_age_value: number | null;
  sex: string | null;
}

export interface VersionStudyCentralContact {
  id: string;
  affiliation: string;
  email_address: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export interface VersionStudyDescription {
  brief_summary: string;
}

export interface VersionDatasetMetadata {
  about: VersionDatasetAbout;
  access: VersionDatasetAccess;
  consent: VersionDatasetConsent;
  contributors: VersionDatasetContributor[];
  creators: VersionDatasetCreator[];
  dates: VersionDatasetDate[];
  de_identification: VersionDatasetDeIdentifier;
  descriptions: VersionDatasetDescriptions[];
  funders: VersionDatasetFunders[];
  identifiers: VersionDatasetIdentifier[];
  managing_organization: VersionDatasetManagingOrganization;
  record_keys: VersionDatasetRecordKeys;
  related_identifier: VersionDatasetRelatedIdentifier[];
  rights: VersionDatasetRights[];
  subjects: VersionDatasetSubjects[];
  titles: VersionDatasetTitles[];
}

export interface VersionDatasetIdentifier {
  id: string;
  identifier: string;
  type: string | null;
}

export interface VersionDatasetAbout {
  id: string;
  language: string | null;
  resource_type: string | null;
  size: [] | null;
}

export interface VersionDatasetDescriptions {
  id: string;
  description: string;
  type: string | null;
}

// export interface VersionDatasetPersonAffiliation {
//   name: string;
//   identifier: string;
//   scheme: string;
// }

export interface VersionDatasetCreator {
  id: string;
  first_name: string;
  last_name: string;
  name_type: "Personal" | "Organizational" | null;
}

export interface VersionDatasetContributor {
  id: string;
  contributor_type: string;
  first_name: string;
  last_name: string;
  name_type: "Personal" | "Organizational" | null;
}

export interface VersionDatasetDate {
  id: string;
  date: number | null;
  type: string | null;
}

export interface VersionDatasetManagingOrganization {
  name: string;
}

export interface VersionDatasetRecordKeys {
  details: string;
  key_type: string | null;
}

export interface VersionDatasetDeIdentifier {
  dates: boolean;
  details: string;
  direct: boolean;
  type: string | null;
}

export interface VersionDatasetConsent {
  details: string;
  noncommercial: boolean;
  research_type: boolean;
}

export interface VersionDatasetSubjects {
  id: string;
  subject: string;
}

export interface VersionDatasetAccess {
  description: string;
  type: string | null;
  url: string;
  url_last_checked: number | null;
}

export interface VersionDatasetRights {
  id: string;
  identifier: string | null;
  rights: string;
}

export interface VersionDatasetFunders {
  id: string;
  name: string;
  award_number: string;
  identifier: string;
}

//
// export interface VersionDatasetOther {
//   acknowledgement: string;
//   language: string | null;
//   size: string[];
// }

export interface VersionDatasetRelatedIdentifier {
  id: string;
  identifier: string;
  relation_type: string;
  resource_type: string;
}
