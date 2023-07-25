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
  last_updated: string;
  owner: {
    email: string;
    first_name: string;
    last_name: string;
    orcid: string;
  };
  size: string;
}
