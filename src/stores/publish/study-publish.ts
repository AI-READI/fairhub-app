export interface Person {
  name: string;
  address: string;
  age: string;
}

export interface Contributor {
  affiliations: string[];
  firstname: string;
  lastname: string;
  ORCID: string;
  roles: string[];
}

export class Study {
  public constructor(
    public id: number,
    public contributors: Contributor[] = [
      {
        affiliations: ["manager"],
        firstname: "John",
        lastname: "Doe",
        ORCID: "N123456789",
        roles: ["Author", "developer"],
      },
    ],
    public title: string = "",
    public description: string = "",
    public keywords: string[] = [],
    public primaryLanguage: string = "",
    public selectedParticipants: Person[] = []
  ) {}
}
