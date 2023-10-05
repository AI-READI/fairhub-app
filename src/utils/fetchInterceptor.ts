import { baseURL } from "./constants";

// Save the original fetch function for later use
const originalFetch = window.fetch;

// Define your interceptor function
window.fetch = async (url: string, options) => {
  if (!url.startsWith(baseURL)) {
    return originalFetch(url, options);
  }

  console.log("url", url);

  options.credentials = "include";

  // add content type header
  if (!options.headers) {
    options.headers = {};
  }

  // options.headers["Content-Type"] = "text/plain";

  if (options.method && (options.method === "POST" || options.method === "PUT")) {
    options.headers["Content-Type"] = "application/json";
  }

  console.log("options", options);

  // Make the fetch request with the modified URL and options
  const response = await originalFetch(url, options);

  // Modify the response if needed
  // For example, you can check the status code and handle errors here.

  if (response.status === 401 && !url.endsWith("/auth/login")) {
    // Redirect to logout if unauthorized
    window.location.href = "/auth/logout";
  }

  return response;
};
