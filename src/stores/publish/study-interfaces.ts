export interface Participant {
  name: string;
  address: string;
  age: string;
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

export class Wataset {
  public constructor(
    public id: number = 0,
    public name: string = "",
    public latestVersion: number = 0,
    public publishedVersion: number = 0,
    public lastPublished: Date,
    public lastModified: Date
  ) {}
  static fromObject(obj: any): Dataset {
    return new Dataset(
      obj.id,
      obj.name,
      obj.latestVersion,
      obj.publishedVersion,
      new Date(obj.lastPublished),
      new Date(obj.lastModified)
    );
  }
}

export class DatasetVersion {
  public constructor(
    public id: number = 0,
    public contributors: Contributor[] = [],
    public title: string = "",
    public description: string = "",
    public keywords: string[] = [],
    public primaryLanguage: string = "",
    public selectedParticipants: Participant[] = []
  ) {}

  static fromObject(obj: any): DatasetVersion {
    return new DatasetVersion(
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
