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

export interface StudyContributor {
  affiliations: string[];
  email: string;
  firstname: string;
  lastname: string;
  ORCID: string;
  permission: string;
  roles: string[];
  status: string;
}

export interface Study {
  id: string;
  title: string;
  contributors: StudyContributor[];
  description: string;
  image: string;
  keywords: string[];
  lastPublished: StudyPublishedVersion;
  lastUpdated: string;
  owner: StudyOwner;
  size: string;
}
