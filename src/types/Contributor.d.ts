interface Contributor {
  affiliations: string[];
  firstname: string;
  lastname: string;
  ORCID: string;
}

export interface StudyContributor extends Contributor {
  email: string;
  permission: string;
  status: string;
}

export interface VersionContributor extends Contributor {
  roles: string[];
}
