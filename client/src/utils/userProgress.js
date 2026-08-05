import api from "../api/axios";

export async function getUserProgress() {
  try {
    const { data } = await api.get("/users/dashboard");

    return {
      loggedIn: true,
      level: data.stats?.level || 1,
      xp: data.stats?.xp || 0,
      coins: data.stats?.coins || 0,
      expeditionLevels: data.stats?.expeditionLevels || [],
      discoveredDinosaurs:
        data.stats?.discoveredDinosaurs || [],
      purchasedItems:
        data.stats?.purchasedItems || [],
    };
  } catch {
    // Guest
    return {
      loggedIn: false,
      level: 1,
      xp: 0,
      coins: 0,
      expeditionLevels: [],
      discoveredDinosaurs: [],
      purchasedItems: [],
    };
  }
}