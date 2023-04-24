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
        ORCID: "https://orcid.org/0000-0001-7032-2732",
        roles: ["Author", "Developer"],
      },
    ],
    public title: string = "",
    public description: string = "",
    public keywords: string[] = [],
    public primaryLanguage: string = "",
    public selectedParticipants: Person[] = []
  ) {}
}
