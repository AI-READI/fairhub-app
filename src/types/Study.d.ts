import type { StudyContributor } from "./Contributor";

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
  contributors: StudyContributor[];
  description: string;
  image: string;
  keywords: string[];
  last_published: StudyPublishedVersion;
  last_updated: string;
  owner_id: string;
  size: string;
}
