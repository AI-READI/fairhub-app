import timezonesJSON from "@/assets/data/timezones.json";

export const timezones = timezonesJSON;

export const baseURL = import.meta.env.VITE_FAIRHUB_API_URL || "http://localhost:5000";
