import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://weddingbackend-xo5q.onrender.com",
  // baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default apiClient;