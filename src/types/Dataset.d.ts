export interface Dataset {
  id: string;
  title: string;
  description: string;
  latest_version: string;
  primary_language: string;
}

export interface DatasetTitle {
  id: string;
  title: string;
  type: "mainTitle" | "AlternativeTitle" | "Subtitle" | "TranslatedTitle" | "Other";
}

export interface DatasetTitles extends Array<DatasetTitle> {}

export interface DatasetIdentifier {
  id: string;
  identifier: string;
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
