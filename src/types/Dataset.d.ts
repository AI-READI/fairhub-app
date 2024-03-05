export interface Dataset {
  id: string;
  title: string;
  created_at: number;
  description: string;
  updated_at: number;
}

export interface DatasetTitle {
  id: string;
  title: string;
  origin: string;
  type: "MainTitle" | "AlternativeTitle" | "Subtitle" | "TranslatedTitle" | "Other" | null;
}

export interface DatasetTitles {
  titles: DatasetTitle[];
}

export interface DatasetIdentifier {
  id: string;
  identifier: string;
  origin: string;
  type:
    | "ark"
    | "arxiv"
    | "bibcode"
    | "doi"
    | "ean13"
    | "eissn"
    | "handle"
    | "igsn"
    | "isbn"
    | "issn"
    | "istc"
    | "lissn"
    | "lsid"
    | "pmid"
    | "purl"
    | "upc"
    | "url"
    | "urn"
    | "w3id"
    | null;
}

export interface DatasetIdentifiers {
  identifiers: DatasetIdentifier[];
}

export interface DatasetDescription {
  id: string;
  description: string;
  origin: string;
  type: "Abstract" | "Methods" | "TechnicalInfo" | "Other" | null;
}

export interface DatasetDescriptions {
  descriptions: DatasetDescription[];
}

export interface DatasetPersonAffiliation {
  name: string;
  identifier: string;
  scheme: string;
  scheme_uri: string;
}

export interface DatasetCreator {
  id: string;
  affiliations: DatasetPersonAffiliation[];
  family_name: string;
  given_name: string;
  name_identifier: string;
  name_identifier_scheme: string;
  name_identifier_scheme_uri: string;
  name_type: "Personal" | "Organizational" | null;
  origin: string;
}

export interface DatasetCreators {
  creators: DatasetCreator[];
}

export interface DatasetContributor {
  id: string;
  affiliations: DatasetPersonAffiliation[];
  contributor_type: string | null;
  family_name: string;
  given_name: string;
  name_identifier: string;
  name_identifier_scheme: string;
  name_identifier_scheme_uri: string;
  name_type: "Personal" | "Organizational" | null;
  origin: string;
}

export interface DatasetContributors {
  contributors: DatasetContributor[];
}

export interface DatasetDate {
  id: string;
  date: number | null;
  information: string;
  origin: string;
  type: string | null;
}

export interface DatasetDates {
  dates: DatasetDate[];
}

export interface DatasetManagingOrganization {
  managing_organization_name: string;
  managing_organization_ror_id: string;
}

export interface DatasetDeIdentLevel {
  dates: boolean;
  details: string;
  direct: boolean;
  hipaa: boolean;
  k_anon: boolean;
  nonarr: boolean;
  type: string | null;
}

export interface DatasetConsent {
  details: string;
  genetic_only: boolean;
  geog_restrict: boolean;
  no_methods: boolean;
  noncommercial: boolean;
  research_type: boolean;
  type: string | null;
}

export interface DatasetSubject {
  id: string;
  classification_code: string;
  origin: string;
  scheme: string;
  scheme_uri: string;
  subject: string;
  value_uri: string;
}

export interface DatasetSubjects {
  subjects: DatasetSubject[];
}

export interface DatasetAccess {
  description: string;
  type: string | null;
  url: string;
  url_last_checked: number | null;
}

export interface DatasetRight {
  id: string;
  identifier: string;
  identifier_scheme: string;
  identifier_scheme_uri: string;
  license_text: string;
  origin: string;
  rights: string;
  uri: string;
}

export interface DatasetRights {
  rights: DatasetRight[];
}

export interface DatasetFunder {
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

export interface DatasetFunders {
  funders: DatasetFunder[];
}

export interface DatasetOther {
  acknowledgement: string;
  format: string[];
  language: string | null;
  resource_type: string;
  size: string[];
  standards_followed: string;
}

export interface DatasetRelatedIdentifier {
  id: string;
  identifier: string;
  identifier_type: string | null;
  origin: string;
  related_metadata_scheme: string;
  relation_type: string | null;
  resource_type: string | null;
  scheme_type: string;
  scheme_uri: string;
}

export interface DatasetRelatedIdentifiers {
  related_identifiers: DatasetRelatedIdentifier[];
}

export interface DatasetHealthsheetRecord {
  id: number;
  question: string;
  response: string;
}

export interface DatasetHealthsheetMotivation {
  motivation: DatasetHealthsheetRecord[];
}

export interface DatasetHealthsheetComposition {
  composition: DatasetHealthsheetRecord[];
}

export interface DatasetHealthsheetCollection {
  collection: DatasetHealthsheetRecord[];
}

export interface DatasetHealthsheetPreprocessing {
  preprocessing: DatasetHealthsheetRecord[];
}

export interface DatasetHealthsheetUses {
  uses: DatasetHealthsheetRecord[];
}
export interface DatasetHealthsheetDistribution {
  distribution: DatasetHealthsheetRecord[];
}

export interface DatasetHealthsheetMaintenance {
  maintenance: DatasetHealthsheetRecord[];
}
