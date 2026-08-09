import { useCallback, useEffect, useState } from "react";
import { profileApi } from "./profileApi";
import dinosaurs from "../../../data/dinosaurs";   // your existing catalog
import shopItems from "../../../data/shopItems";   // your existing catalog

// Cross-references backend ID lists against your existing frontend data
// files, since names/images/rarity/price only live client-side.
function buildDinosaurCollection(discoveredIds = []) {
  return dinosaurs.map((d) => ({
    id: d.id,
    name: d.name,
    era: d.era,
    rarity: d.rarity,
    imageUrl: d.image,
    unlocked: discoveredIds.includes(d.id),
  }));
}

function buildInventory(purchasedIds = [], equippedItems = {}) {
  return shopItems
    .filter((item) => purchasedIds.includes(item.id))
    .map((item) => ({
      id: item.id,
      name: item.name,
      type: item.category,
      imageUrl: item.image,
      quantity: 1,
      equipped: equippedItems[item.category] === item.id,
    }));
}

export function useProfile() {
  const [raw, setRaw] = useState(null); // last payload from the server
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await profileApi.getDashboard();
      setRaw(data);
    } catch (e) {
      setError(e.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

const profile = raw && {
    username: raw.username,
    email: raw.email,
    avatarUrl: raw.avatarUrl,
    companionId: raw.companion?.companionId,
    companionName: raw.companion?.name,
    equippedItems: raw.equippedItems || {},
    ageGroup: raw.preferences?.ageGroup,
    purpose: raw.preferences?.purpose,
    interests: raw.preferences?.interests || [],
    fullName: raw.fullName || "",
    bio: raw.bio || "",
    rank: `Level ${raw.level} Explorer`,
    level: raw.level,
    xp: raw.xp,
    xpToNext: (raw.level || 1) * 250,
    coins: raw.coins,
    dailyStreak: raw.dailyStreak,
    currentBadge: raw.badges?.[raw.badges.length - 1] || "New Recruit",
    verified: raw.verified,
    joinDate: raw.joinDate,
    online: true,

    stats: raw.stats,
    achievements: (raw.badges || []).map((b, i) => ({
      id: i,
      name: b,
      description: "Milestone unlocked",
      unlocked: true,
    })),
    discoveries: raw.discoveries || [],
    dinosaurCollection: buildDinosaurCollection(raw.discoveredDinosaurIds),
    recentQuizzes: (raw.recentQuizzes || []).map((q) => ({
      id: q.id,
      date: q.date,
      difficulty: q.difficulty || "-",
      topic: q.topic || "-",
      accuracy: q.score,
      xpEarned: q.xpEarned ?? "-",
      coinsEarned: q.coinsEarned ?? "-",
      timeTaken: q.timeTaken ? `${q.timeTaken}s` : "-",
    })),
    dailyMissions: raw.dailyMissions,
    inventory: buildInventory(raw.purchasedItemIds, raw.equippedItems),
    account: raw.account,
    expedition: raw.expedition || [],
  };
  const updateProfile = useCallback(async (patch) => {
    const updated = await profileApi.updateProfile(patch);
    setRaw((prev) => (prev ? { ...prev, ...updated } : prev));
    return updated;
  }, []);

  const claimMission = useCallback(async (missionTitle) => {
    if (!raw) return;
    const result = await profileApi.claimMission(raw.username, missionTitle);
    setRaw((prev) => {
      if (!prev) return prev;
      const list = prev.dailyMissions.list.map((m) =>
        m.title === missionTitle ? { ...m, claimed: true } : m
      );
      return {
        ...prev,
        dailyMissions: { ...prev.dailyMissions, list },
        coins: result.totalCoins ?? prev.coins,
        xp: result.totalXP ?? prev.xp,
        level: result.level ?? prev.level,
        dailyStreak: result.streak ?? prev.dailyStreak,
      };
    });
    return result;
  }, [raw]);

  return { profile, loading, error, refresh, updateProfile, claimMission };
}
