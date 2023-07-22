interface Contributor {
  affiliations: string[];
  firstname: string;
  lastname: string;
  orcid: string;
}

export interface StudyContributor extends Contributor {
  email: string;
  permission: string;
  status: string;
}

export interface VersionContributor extends Contributor {
  id: string;
  roles: string[];
}
