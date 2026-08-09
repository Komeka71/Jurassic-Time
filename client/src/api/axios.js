import axios from "axios";

const api = axios.create({
baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// Automatically attach JWT to every request
api.interceptors.request.use((config) => {
const token = localStorage.getItem("jwt");

if (token) {
config.headers.Authorization = `Bearer ${token}`;
  }

return config;
});

export default api;

// e.g. if baseURL is "http://localhost:3000/api", this gives "http://localhost:3000"
export const SERVER_ORIGIN = api.defaults.baseURL.replace(/\/api\/?$/, "");