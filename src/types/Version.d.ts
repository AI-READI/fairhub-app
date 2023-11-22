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
  collaborators: VersionStudyCollaborator[];
  conditions: string;
  contacts: VersionStudyContact[];
  description: VersionStudyDescription;
  design: VersionDesign;
  eligibility: VersionStudyEligibility;
  interventions: VersionStudyIntervention[];
  ipd_sharing: VersionStudyIPDSharing;
  links: VersionStudyLink[];
  locations: VersionStudyLocation[];
  overall_officials: VersionStudyOverallOfficial[];
  oversight: "";
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
  name: string;
  affiliation: string;
  role: string;
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
  responsible_party_investigator_name: string | null;
  responsible_party_type: string;
}

export interface VersionStudyCollaborator {
  collaborator_name: [] | null;
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
  gender: string | null;
  gender_based: string | null;
  minimum_age_value: number | null;
}

export interface VersionStudyContact {
  id: string;
  name: string;
  affiliation: string;
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
  publisher: VersionDatasetPublisher;
  record_keys: VersionDatasetRecordKeys;
  related_items: VersionDatasetRelatedItem[];
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
  name: string;
  name_type: "Personal" | "Organizational" | null;
}

export interface VersionDatasetContributor {
  id: string;
  name: string;
  contributor_type: string;
  name_type: "Personal" | "Organizational" | null;
}

export interface VersionDatasetDate {
  id: string;
  date: number | null;
  type: string | null;
}

export interface VersionDatasetPublisher {
  managing_organization_name: string;
  publisher: string;
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
  url: string | null;
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
  award_number: string | null;
  identifier: string;
}

export interface VersionDatasetOther {
  acknowledgement: string;
  language: string | null;
  size: string[];
}

export interface VersionDatasetRelatedItemIdentifier {
  id: string;
  identifier: string;
  type: string | null;
}

export interface VersionDatasetRelatedItemCreator {
  id: string;
  name: string;
  name_type: string | null;
}

export interface VersionDatasetRelatedItemContributor {
  id: string;
  name: string;
  contributor_type: string | null;
  name_type: string | null;
}

export interface VersionDatasetRelatedItemTitle {
  id: string;
  title: string;
  type: string | null;
}

export interface VersionDatasetRelatedItem {
  id: string;
  contributors: VersionDatasetRelatedItemContributor[];
  creators: VersionDatasetRelatedItemCreator[];
  identifiers: VersionDatasetRelatedItemIdentifier[];
  publication_year: number | null;
  publisher: string;
  titles: VersionDatasetRelatedItemTitle[];
  type: string | null;
}
