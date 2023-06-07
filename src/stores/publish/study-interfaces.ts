export interface Participant {
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

export interface ContributorStudy {
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface Study {
  id: number;
  title: string;
  contributors: ContributorStudy[];
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

// export interface Dataset {
//   id: number;
//   name: string;
//   versions: Version[];
// }

export interface Version {
  id: number;
}

export interface ViewProfile {
  username: string;
  email: string;
  fullname: string;
  image: string;
  institution: string;
  location: string;
  password: string;
  timezone: string;
}

export class Dataset {
  public constructor(
    public id: number = 0,
    public name: string = "",
    public versions: Version[] = []
  ) {}
  static fromObject(obj: any): Dataset {
    return new Dataset(obj.id, obj.name, obj.versions);
  }
  public initial = null;
  findLatestVersion(): number | null {
    return this.versions.length ? Math.max(...this.versions.map((version) => version.id)) : null;
  }
}

export class StudyVersion {
  public constructor(
    public id: number = 0,
    public contributors: Contributor[] = [],
    public title: string = "",
    public description: string = "",
    public keywords: string[] = [],
    public primaryLanguage: string = "",
    public selectedParticipants: Participant[] = []
  ) {}

  static fromObject(obj: any): StudyVersion {
    return new StudyVersion(
      obj.id,
      obj.contributors,
      obj.title,
      obj.description,
      obj.keywords,
      obj.primaryLanguage,
      obj.selectedParticipants
    );
  }
}
