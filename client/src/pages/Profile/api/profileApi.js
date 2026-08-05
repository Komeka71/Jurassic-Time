// Uses your existing axios instance (src/api/axios.js) instead of raw fetch,
// so it picks up the same baseURL and withCredentials config every other
// page in your app already uses -- auth here is the JWT httpOnly cookie set
// by /api/auth/login, NOT a bearer token.
import api from "../../../api/axios";

export const profileApi = {
  // Aggregated dashboard payload -- see server/controllers/profile.controller.js
  getDashboard: () => api.get("/users/dashboard").then((r) => r.data),

  // Editing profile fields -- this endpoint already exists in your codebase
  // (server/controllers/userController.js -> updateProfile), so we reuse it
  // rather than inventing a new one.
  updateProfile: (data) => api.put("/users/profile", data).then((r) => r.data),

  uploadAvatar: (file) => {
    const fd = new FormData();
    fd.append("avatar", file);
    return api
      .post("/users/avatar", fd, { headers: { "Content-Type": "multipart/form-data" } })
      .then((r) => r.data);
  },

  // Your daily mission claim route claims by MISSION TITLE, not an id:
  // PATCH /api/daily/:username/claim  Body: { title }
  claimMission: (username, title) =>
    api.patch(`/daily/${encodeURIComponent(username)}/claim`, { title }).then((r) => r.data),

  // Sound-only settings -- the only settings your schema currently supports
  // (UserStats.soundPreferences.music / .effects). darkMode/notifications/
  // language/privacy have no backend field yet -- see profile.css/README note.
  updateSoundPreferences: (username, { music, effects }) =>
    api.patch(`/user/${encodeURIComponent(username)}/sound`, { music, effects }).then((r) => r.data),
};
