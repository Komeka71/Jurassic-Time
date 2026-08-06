import React from "react";
import { motion } from "framer-motion";
import { Award, Lock } from "lucide-react";

export default function AchievementsGrid({ achievements = [] }) {
  return (
    <div>
      <div className="jt-section-heading">
        <span className="jt-section-title">Achievements</span>
        <span className="jt-section-sub">
          {achievements.filter((a) => a.unlocked).length} / {achievements.length} unlocked
        </span>
      </div>
      <div className="jt-achievements-grid">
        {achievements.map((a, i) => (
          <motion.div
            key={a.id ?? i}
            className={`jt-card jt-badge ${a.unlocked ? "" : "locked"}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            whileHover={a.unlocked ? { scale: 1.04 } : {}}
            title={a.description}
          >
            <div className="jt-stat-icon" style={{ width: 48, height: 48 }}>
              {a.unlocked ? <Award size={22} /> : <Lock size={20} />}
            </div>
            <strong style={{ fontSize: 13 }}>{a.name}</strong>
            <span style={{ fontSize: 11, color: "var(--jt-cream-dim)" }}>{a.description}</span>
            {a.unlocked && a.unlockedDate && (
              <span style={{ fontSize: 10, color: "var(--jt-teal)" }}>
                {new Date(a.unlockedDate).toLocaleDateString()}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
