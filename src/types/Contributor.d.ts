interface Contributor {
  affiliations: string[];
  first_name: string;
  last_name: string;
  orcid: string;
}

export interface StudyContributor extends Contributor {
  email: string;
  permission: string;
  status: "active" | "invited";
}

export interface VersionContributor extends Contributor {
  id: string;
  roles: string[];
}
