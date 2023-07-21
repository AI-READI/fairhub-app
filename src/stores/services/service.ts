import type { Study, ViewProfile } from "@/stores/publish/study-interfaces";
import { DatasetVersion, Wataset } from "@/stores/publish/study-interfaces";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api-fairhub-io.azurewebsites.net"
    : "http://localhost:5000";

// const deploymentURL=''
export async function fetchViewProfile(): Promise<ViewProfile[]> {
  const response = await fetch(`${baseURL}viewProfile}`);
  return response.json();
}

// today this has to be set up 1st TODO
export async function fetchStudy(studyId: number): Promise<Study> {
  const response = await fetch(`${baseURL}/study/${studyId}`);
  return response.json();
}

export async function fetchDatasets(studyId: number): Promise<Dataset[]> {
  const response = await fetch(`${baseURL}/study/${studyId}/dataset`);
  return (await response.json()).map((d: Dataset) => Wataset.fromObject(d));
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
    `${baseURL}/study/${studyId}/dataset/${datasetId}/version/${versionId}`
  );
  return DatasetVersion.fromObject(await response.json());
}
