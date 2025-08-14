import axios from "axios";

// Optionally set VITE_API_URL in a .env, else default:
const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" }
});

export const calculateTax = (payload) => api.post("/tax/calculate", payload);
