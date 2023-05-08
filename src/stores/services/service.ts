import type { Person } from "@/stores/publish/study-publish";

export async function fetchParticipants(): Promise<Person[]> {
  const response = await fetch("http://localhost:5000/participants");
  return response.json();
}

export async function fetchStudies(): Promise<any[]> {
  const response = await fetch("http://localhost:5000/studies");
  return response.json();
}
