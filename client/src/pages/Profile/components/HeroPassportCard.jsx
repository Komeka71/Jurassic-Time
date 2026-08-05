import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Camera, Pencil, Coins, Flame } from "lucide-react";

function xpPercent(xp, xpToNext) {
  if (!xpToNext) return 0;
  return Math.min(100, Math.round((xp / xpToNext) * 100));
}

export default function HeroPassportCard({ profile, onEdit }) {
  const { username, email, avatarUrl, rank, level, xp, xpToNext, coins, dailyStreak, currentBadge, verified, joinDate, online } = profile;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="jt-card-gradient-border"
    >
      <div className="jt-card-inner" style={{ padding: "28px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
          {/* Avatar */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              style={{
                width: 108,
                height: 108,
                borderRadius: "50%",
                padding: 3,
                background: "linear-gradient(135deg, var(--jt-amber), var(--jt-teal))",
              }}
            >
              <img
                src={avatarUrl || "/default-avatar.png"}
                alt={username}
                style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", background: "var(--jt-moss)" }}
              />
            </div>
            <span
              title={online ? "Online" : "Offline"}
              style={{
                position: "absolute",
                bottom: 6,
                right: 6,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: online ? "var(--jt-teal)" : "#6b7280",
                border: "3px solid var(--jt-bg-2)",
              }}
            />
            <button
              className="jt-btn-ghost"
              style={{ position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)", padding: "4px 8px", fontSize: 11, display: "flex", gap: 4, alignItems: "center" }}
              onClick={onEdit}
              aria-label="Change avatar"
            >
              <Camera size={12} /> Change
            </button>
          </div>

          {/* Identity */}
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <h1 className="jt-serif" style={{ fontSize: 26, margin: 0 }}>{username}</h1>
              {verified && <BadgeCheck size={20} color="var(--jt-teal)" />}
            </div>
            <p style={{ margin: "4px 0", color: "var(--jt-cream-dim)", fontSize: 14 }}>{email}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "10px 0" }}>
              <Tag>{rank}</Tag>
              <Tag>Level {level}</Tag>
              <Tag>{currentBadge}</Tag>
              <Tag>Joined {new Date(joinDate).toLocaleDateString()}</Tag>
            </div>

            <div style={{ maxWidth: 360 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--jt-cream-dim)", marginBottom: 4 }}>
                <span>XP</span>
                <span>{xp} / {xpToNext}</span>
              </div>
              <div className="jt-progress-track">
                <motion.div
                  className="jt-progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercent(xp, xpToNext)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Coins / streak / edit */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
            <div style={{ display: "flex", gap: 14 }}>
              <MiniStat icon={<Coins size={16} color="var(--jt-amber-2)" />} value={coins} />
              <MiniStat icon={<Flame size={16} color="#f97316" />} value={`${dailyStreak}d`} />
            </div>
            <button className="jt-btn-amber" onClick={onEdit} style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <Pencil size={14} /> Edit Profile
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Tag({ children }) {
  return (
    <span
      style={{
        fontSize: 12,
        padding: "4px 10px",
        borderRadius: 999,
        background: "rgba(232, 163, 61, 0.14)",
        color: "var(--jt-amber-2)",
        border: "1px solid rgba(232, 163, 61, 0.3)",
      }}
    >
      {children}
    </span>
  );
}

function MiniStat({ icon, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
      {icon}
      <span>{value}</span>
    </div>
  );
}
