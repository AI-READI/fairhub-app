import timezonesJSON from "@/assets/data/timezones.json";

export const timezones = timezonesJSON;

export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api-fairhub-io.azurewebsites.net"
    : "http://localhost:5000";
