import axios from "axios";

const baseURL = __DEV__
  ? "http://192.168.1.102:8080"
  : "https://ecowork-api.onrender.com";

export const api = axios.create({
  baseURL,
  timeout: 8000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);