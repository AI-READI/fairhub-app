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
  type: "MainTitle" | "AlternativeTitle" | "Subtitle" | "TranslatedTitle" | "Other";
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
    | "other";
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
    | "Other";
}

export interface DatasetDescriptions extends Array<DatasetDescription> {}

export interface DatasetPersonAffiliation {
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
  name_type: "Personal" | "Organizational";
  origin: string;
}

export interface DatasetCreators {
  creators: DatasetCreator[];
}
