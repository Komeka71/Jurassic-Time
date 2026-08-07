// components/profile/ProfileStats.jsx
import { useEffect, useState } from "react";
import {
  Zap,
  TrendingUp,
  Coins,
  CheckCircle2,
  Compass,
  ShieldCheck,
  Landmark,
  Map,
  Flame,
  Award,
} from "lucide-react";
import StatCard from "./shared/StatCard";
import SectionHeading from "./shared/SectionHeading";
import { getStats } from "../../services/profileService";

export default function ProfileStats({ user }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getStats()
.then((data) => setStats(data || {}))
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const data = stats || {};

  const cards = [
    {
      icon: Zap,
      label: "Total XP",
      value: data.totalXp ?? user?.xp ?? 0,
      accent: "amber",
    },
    {
      icon: TrendingUp,
      label: "Current Level",
      value: data.level ?? user?.level ?? 1,
      accent: "amber",
    },
    {
      icon: Coins,
      label: "Coins",
      value: data.coins ?? user?.coins ?? 0,
      accent: "amber",
    },
    {
      icon: CheckCircle2,
      label: "Completed Quizzes",
      value: data.completedQuizzes ?? 0,
      accent: "emerald",
    },
    {
      icon: Compass,
      label: "Discoveries",
      value: data.discoveries ?? 0,
      accent: "amber",
    },
    {
      icon: ShieldCheck,
      label: "Verified Discoveries",
      value: data.verifiedDiscoveries ?? 0,
      accent: "emerald",
    },
    {
      icon: Landmark,
      label: "Museum Visits",
      value: data.museumVisits ?? 0,
      accent: "amber",
    },
    {
      icon: Map,
      label: "Expeditions",
      value: data.expeditions ?? 0,
      accent: "amber",
    },
    {
      icon: Flame,
      label: "Daily Streak",
      value: data.currentStreak ?? user?.currentStreak ?? 0,
      accent: "orange",
    },
    {
      icon: Award,
      label: "Highest Streak",
      value: data.highestStreak ?? user?.highestStreak ?? 0,
      accent: "orange",
    },
  ];

  return (
    <section id="stats" className="scroll-mt-24">
      <SectionHeading
        eyebrow="PROFILE"
        title="Statistics"
        description="Track your exploration, research, and learning progress."
      />

      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-[84px] animate-pulse rounded-xl border border-white/10 bg-black/40"
            />
          ))}
        </div>
      ) : error ? (
        <p className="rounded-xl border border-white/10 bg-black/40 p-6 text-center text-sm text-white/40">
          Statistics are currently unavailable.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {cards.map((card, i) => (
            <StatCard key={card.label} {...card} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}