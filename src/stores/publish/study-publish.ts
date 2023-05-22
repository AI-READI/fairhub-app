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

export interface Study {
  id: number;
  title: string;
  contributors: Contributor[];
  description: string;
  image: string;
  keywords: string[];
  lastPublished: PublishedVersion;
  lastUpdated: string;
  owner: Owner;
  size: string;
}

export interface PublishedVersion {
  date: string;
  doi: string;
  version: string;
}

export interface Owner {
  name: string;
  email: string;
}

export class StudyVersion {
  public constructor(
    public id: number,
    public contributors: Contributor[] = [
      {
        affiliations: ["Manager"],
        firstname: "Sanjay",
        lastname: "Soundarajan",
        ORCID: "https://orcid.org/0000-0001-7032-2732",
        roles: ["Developer"],
      },
    ],
    public title: string = "",
    public description: string = "",
    public keywords: string[] = [],
    public primaryLanguage: string = "",
    public selectedParticipants: Person[] = []
  ) {}
}
