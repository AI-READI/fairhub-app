import type { Participant, Study, ViewProfile } from "@/stores/publish/study-interfaces";
import { Dataset, DatasetVersion } from "@/stores/publish/study-interfaces";
export async function fetchViewProfile(): Promise<ViewProfile[]> {
  const response = await fetch(`https://api-fairhub-io-staging.azurewebsites.net/viewProfile}`);
  return response.json();
}

export async function fetchParticipants(studyId: number): Promise<Participant[]> {
  const response = await fetch(
    `https://api-fairhub-io-staging.azurewebsites.net/study/${studyId}/participants`
  );
  return response.json();
}

export async function fetchStudies(): Promise<Study[]> {
  const response = await fetch("https://api-fairhub-io-staging.azurewebsites.net/study");
  return response.json();
}

// today this has to be set up 1st TODO
export async function fetchStudy(studyId: number): Promise<Study> {
  const response = await fetch(`https://api-fairhub-io-staging.azurewebsites.net/study/${studyId}`);
  return response.json();
}

export async function fetchDatasets(studyId: number): Promise<Dataset[]> {
  const response = await fetch(
    `https://api-fairhub-io-staging.azurewebsites.net/study/${studyId}/dataset`
  );
  return (await response.json()).map((d: Dataset) => Dataset.fromObject(d));
}

// export async function fetchDataset(studyId: number): Promise<Dataset> {
//   const response = await fetch(`http://localhost:5000/study/${studyId}/dataset`);
//   return (await response.json()).map((d: Dataset) => Dataset.fromObject(d));
// }

export async function fetchDatasetVersion(
  studyId: number,
  datasetId: number,
  versionId: number
): Promise<DatasetVersion> {
  const response = await fetch(
    `https://api-fairhub-io-staging.azurewebsites.net/study/${studyId}/dataset/${datasetId}/version/${versionId}`
  );
  return DatasetVersion.fromObject(await response.json());
}

// export async function postParticipants(studyId:number): any {
//   const response = await fetch(`http://localhost:5000/study`);
//   return 'nothing'
// }
