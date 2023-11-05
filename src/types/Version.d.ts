import type { StudyOverallOfficial } from "@/types/Study";
import StudyConditions from "@/views/study/metadata/conditions/StudyConditions.vue";

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
  collaborators: VersionStudyCollaborator;
  conditions: StudyConditions;
  contacts: VersionStudyContact[];
  description: VersionStudyDescription;
  design: VersionDesign;
  eligibility: VersionStudyEligibility;
  identification: VersionStudyIdentifier[];
  interventions: VersionStudyIntervention[];
  ipd_sharing: VersionStudyIPDSharing;
  links: VersionStudyLink[];
  locations: VersionStudyLocation[];
  overall_officials: StudyOverallOfficial[];
  oversight: "";
  references: VersionStudyReference[];
  sponsors: VersionStudySponsor;
  status: VersionStudyStatusModule;
}

export interface VersionStudyIPD {
  id: string;
  identifier: string;
  url: string;
}

export interface VersionDesign {
  bio_spec_retention: string;
  design_observational_model_list: [];
  design_time_perspective_list: [];
  enrollment_count: string;
  enrollment_type: string;
  study_type: string;
  target_duration: string;
}

export interface VersionStudyIPDSharing {
  ipd_sharing: string | null;
  time_frame: string;
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
  responsible_party_investigator_name: string;
  responsible_party_type: string;
}

export interface VersionStudyCollaborator {
  lead_sponsor_name: string;
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
  maximum_age_value: number | null;
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
  about: VersionDatasetAbout[];
  access: VersionDatasetAccess;
  consent: VersionDatasetConsent[];
  contributors: VersionDatasetContributor[];
  creator: VersionDatasetCreator[];
  dates: VersionDatasetDates;
  de_identification: VersionDatasetDeIdentifier;
  descriptions: VersionDatasetDescriptions;
  funders: VersionDatasetFunders[];
  identifiers: VersionDatasetIdentifiers[];
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
  origin: string;
  type: string | null;
}

export interface VersionDatasetDescription {
  id: string;
  description: string;
  type: string | null;
}

export interface VersionDatasetPersonAffiliation {
  name: string;
  identifier: string;
  scheme: string;
}

export interface VersionDatasetCreator {
  id: string;
  name: string;
  affiliations: VersionDatasetPersonAffiliation[];
  name_identifier: string;
  name_identifier_scheme: string;
  name_identifier_scheme_uri: string;
  origin: string;
}

export interface VersionDatasetContributor {
  id: string;
  name: string;
  affiliations: VersionDatasetPersonAffiliation[];
  contributor_type: string | null;
  name_identifier: string;
  name_identifier_scheme: string;
  name_identifier_scheme_uri: string;
  name_type: "Personal" | "Organizational" | null;
  origin: string;
}

export interface VersionDatasetContributors {
  contributors: VersionDatasetContributor[];
}

export interface VersionDatasetDate {
  id: string;
  date: number | null;
  information: string;
  origin: string;
  type: string | null;
}

export interface VersionDatasetDates {
  dates: VersionDatasetDate[];
}

export interface VersionDatasetPublisher {
  managing_organization_name: string;
  managing_organization_ror_id: string;
  publisher: string;
}

export interface VersionDatasetRecordKeys {
  details: string;
  type: string | null;
}

export interface VersionDatasetDeIdentLevel {
  dates: boolean;
  details: string;
  direct: boolean;
  type: string | null;
}

export interface VersionDatasetConsent {
  details: string;
  genetic_only: boolean;
  geog_restrict: boolean;
  no_methods: boolean;
  noncommercial: boolean;
  research_type: boolean;
  type: string | null;
}

export interface VersionDatasetSubject {
  id: string;
  classification_code: string;
  origin: string;
  scheme: string;
  scheme_uri: string;
  subject: string;
  value_uri: string;
}

export interface VersionDatasetAccess {
  description: string;
  type: string | null;
  url: string;
  url_last_checked: number | null;
}

export interface VersionDatasetRight {
  id: string;
  identifier: string;
  identifier_scheme: string;
  origin: string;
  rights: string;
  uri: string;
}

export interface VersionDatasetFunder {
  id: string;
  name: string;
  award_number: string;
  award_title: string;
  award_uri: string;
  identifier: string;
  identifier_scheme_uri: string;
  identifier_type: string | null;
  origin: string;
}

export interface VersionDatasetOther {
  acknowledgement: string;
  language: string | null;
  resource_type: string;
  size: string[];
  standards_followed: string;
}

export interface VersionDatasetRelatedItemIdentifier {
  id: string;
  identifier: string;
  metadata_scheme: string;
  origin: string;
  scheme_type: string;
  scheme_uri: string;
  type: string | null;
}

export interface VersionDatasetRelatedItemCreator {
  id: string;
  name: string;
  name_type: string | null;
  origin: string;
}

export interface VersionDatasetRelatedItemContributor {
  id: string;
  name: string;
  contributor_type: string | null;
  name_type: string | null;
  origin: string;
}

export interface VersionDatasetRelatedItemTitle {
  id: string;
  title: string;
  origin: string;
  type: string | null;
}

export interface VersionDatasetRelatedItem {
  id: string;
  contributors: VersionDatasetRelatedItemContributor[];
  creators: VersionDatasetRelatedItemCreator[];
  edition: string;
  identifiers: VersionDatasetRelatedItemIdentifier[];
  number_type: string | null;
  number_value: string;
  origin: string;
  publication_year: number | null;
  publisher: string;
  relation_type: string | null;
  titles: VersionDatasetRelatedItemTitle[];
  type: string | null;
  volume: string;
}
