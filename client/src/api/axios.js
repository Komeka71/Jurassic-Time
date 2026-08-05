import axios from "axios";

// withCredentials lets the browser send/receive the httpOnly "jwt" cookie
// set by the backend. Without this, the cookie-based login won't persist.
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default api;