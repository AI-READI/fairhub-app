export interface Person {
  name: string;
  address: string;
  age: string;
}

export interface Contributor {
  affiliation: [];
  firstname: string;
  lastname: string;
  ORCID: string;
  role: string;
}

export class Study {
  public constructor(
    public contributors: Contributor[] = [],
    public title: string = "",
    public description: string = "",
    public keywords: string[] = [],
    public primaryLanguage: string = "",
    public selectedParticipants: Person[] = []
  ) {}
}
