// @ts-nocheck
import { baseURL } from "./constants";

// Save the original fetch function for later use
const originalFetch = window.fetch as typeof fetch;

// Define your interceptor function
window.fetch = async (url: string, options?: RequestInit): Promise<Response> => {
  if (!url.startsWith(baseURL)) {
    return originalFetch(url, options);
  }

  options = options || {};
  options.credentials = "include";

  // add content type header
  if (!options.headers) {
    options.headers = {};
  }

  if (options.method && (options.method === "POST" || options.method === "PUT")) {
    options.headers["Content-Type"] = "application/json";
  }

  // Make the fetch request with the modified URL and options
  const response = await originalFetch(url, options);

  // Modify the response

  if (response.status === 401 && !url.endsWith("/auth/login")) {
    // Redirect to logout if unauthorized
    window.location.href = "/auth/logout";
  }

  return response;
};
