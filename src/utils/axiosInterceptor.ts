import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    // Add your request interception logic here
    // For example, you can add headers or modify the request body.

    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Add your response interception logic here
    // For example, you can modify the response data or handle errors globally.

    return response;
  },
  (error) => {
    // Handle response errors here
    return Promise.reject(error);
  }
);

// Export Axios for use in your Vue components
export default axios;
