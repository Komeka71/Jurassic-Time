import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gift, CheckCircle2 } from "lucide-react";

export default function DailyMissions({ missions = [], onClaim }) {
  const [claiming, setClaiming] = useState(null);

  // Claims are keyed by mission TITLE (matches PATCH /api/daily/:username/claim),
  // not a generic id.
  const handleClaim = async (title) => {
    setClaiming(title);
    try {
      await onClaim(title);
    } finally {
      setClaiming(null);
    }
  };

  return (
    <div>
      <div className="jt-section-heading">
        <span className="jt-section-title">Daily Missions</span>
        <span className="jt-section-sub">Resets in {missions.resetLabel || "24h"}</span>
      </div>
      <div className="jt-card" style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        {(missions.list || missions).map?.((m, i) => {
          const pct = Math.min(100, Math.round((m.progress / m.target) * 100));
          const done = pct >= 100;
          return (
            <motion.div
              key={m.id ?? i}
              className={`jt-mission-row ${done ? "completed" : ""}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                  <span>{m.title}</span>
                  <span style={{ color: "var(--jt-cream-dim)" }}>{m.progress}/{m.target}</span>
                </div>
                <div className="jt-progress-track" style={{ marginTop: 6 }}>
                  <div className="jt-progress-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
              {done ? (
                m.claimed ? (
                  <span style={{ display: "flex", gap: 4, alignItems: "center", color: "var(--jt-teal)", fontSize: 13 }}>
                    <CheckCircle2 size={16} /> Claimed
                  </span>
                ) : (
                  <button
                    className="jt-btn-amber"
                    disabled={claiming === m.title}
                    onClick={() => handleClaim(m.title)}
                    style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 12, padding: "8px 14px" }}
                  >
                    <Gift size={14} /> {claiming === m.title ? "Claiming…" : "Claim"}
                  </button>
                )
              ) : null}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
