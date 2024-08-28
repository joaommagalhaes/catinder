import axios from "axios";
import { API_TOKEN } from "@env";

const api = axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = ` ${API_TOKEN}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error globally
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Error response:", error.response.data);
    } else if (error.request) {
      // Request was made but no response was received
      console.error("Error request:", error.request);
    } else {
      // Something happened while setting up the request
      console.error("Error message:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
