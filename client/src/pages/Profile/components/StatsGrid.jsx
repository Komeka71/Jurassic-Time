import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  Sparkles, Coins, Trophy, Target, Percent, Flame,
  BarChart3, Compass, PawPrint, Award, Clock, Medal,
} from "lucide-react";

const ICONS = {
  xp: Sparkles,
  coins: Coins,
  level: Trophy,
  quizAttempts: Target,
  accuracy: Percent,
  bestStreak: Flame,
  dailyStreak: BarChart3,
  leaderboardRank: Medal,
  discoveries: Compass,
  dinosaursCollected: PawPrint,
  achievementsUnlocked: Award,
  hoursPlayed: Clock,
};

const LABELS = {
  xp: "XP",
  coins: "Coins",
  level: "Level",
  quizAttempts: "Quiz Attempts",
  accuracy: "Accuracy",
  bestStreak: "Best Streak",
  dailyStreak: "Daily Streak",
  leaderboardRank: "Leaderboard Rank",
  discoveries: "Discoveries",
  dinosaursCollected: "Dinosaurs Collected",
  achievementsUnlocked: "Achievements",
  hoursPlayed: "Hours Played",
};

function Counter({ value, suffix = "" }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());
  const [display, setDisplay] = React.useState("0");

  React.useEffect(() => {
    const controls = animate(mv, value, { duration: 1.1, ease: "easeOut" });
    const unsub = rounded.on("change", setDisplay);
    return () => { controls.stop(); unsub(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span>{display}{suffix}</span>;
}

export default function StatsGrid({ stats }) {
  const entries = Object.entries(stats || {}).filter(([key]) => ICONS[key]);

  return (
    <div>
      <div className="jt-section-heading">
        <span className="jt-section-title">Field Stats</span>
        <span className="jt-section-sub">Live from your explorer record</span>
      </div>
      <div className="jt-stats-grid">
        {entries.map(([key, value], i) => {
          const Icon = ICONS[key];
          const suffix = key === "accuracy" ? "%" : key === "leaderboardRank" ? "" : "";
          return (
            <motion.div
              key={key}
              className="jt-card jt-stat-card"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(232,163,61,0.18)" }}
            >
              <div className="jt-stat-icon"><Icon size={20} /></div>
              <div className="jt-stat-value">
                <Counter value={typeof value === "number" ? value : 0} suffix={suffix} />
              </div>
              <div className="jt-stat-label">{LABELS[key]}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
