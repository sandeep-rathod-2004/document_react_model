import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor (optional: for catching 401 errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional: handle logout globally
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
