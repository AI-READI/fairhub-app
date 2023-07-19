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
