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
