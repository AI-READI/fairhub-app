import timezonesJSON from "@/assets/data/timezones.json";

export const timezones = timezonesJSON;

// export const baseURL = "https://dev.api.fairhub.io";
// export const baseURL = "http://localhost:5000";

export const baseURL =
  process.env.NODE_ENV === "production" ? "https://dev.api.fairhub.io" : "http://localhost:3001";
