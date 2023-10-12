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

export interface DatasetTitles extends Array<DatasetTitle> {}

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
    | "other"
    | null;
}

export interface DatasetIdentifiers extends Array<DatasetIdentifier> {}

export interface DatasetDescription {
  id: string;
  description: string;
  origin: string;
  type:
    | "Abstract"
    | "Methods"
    | "SeriesInformation"
    | "TableOfContents"
    | "TechnicalInfo"
    | "Other"
    | null;
}

export interface DatasetDescriptions extends Array<DatasetDescription> {}

export interface DatasetPersonAffiliation {
  name: string;
  identifier: string;
  scheme: string;
  scheme_uri: string;
}

export interface DatasetCreator {
  id: string;
  name: string;
  affiliations: DatasetPersonAffiliation[];
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
  name: string;
  affiliations: DatasetPersonAffiliation[];
  contributor_type: string | null;
  name_identifier: string;
  name_identifier_scheme: string;
  name_identifier_scheme_uri: string;
  name_type: "Personal" | "Organizational";
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

export interface DatasetRecordKeys {
  details: string;
  type: string | null;
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
  origin: string;
  rights: string;
  uri: string;
}

export interface DatasetRights {
  rights: DatasetRight[];
}
