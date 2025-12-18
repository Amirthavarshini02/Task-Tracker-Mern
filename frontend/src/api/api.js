import axios from "axios";

// Fallback logic: if VITE_API_URL is missing, use localhost
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"||"https://task-tracker-mern-1.onrender.com";

const API = axios.create({
  baseURL: BASE_URL + "/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;