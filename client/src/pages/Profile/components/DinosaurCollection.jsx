import React from "react";
import { motion } from "framer-motion";

const RARITY_COLOR = {
  common: "#9ca3af",
  rare: "#2ed9a3",
  epic: "#a78bfa",
  legendary: "#e8a33d",
};

export default function DinosaurCollection({ dinosaurs = [] }) {
  const total = dinosaurs.length;
  const unlocked = dinosaurs.filter((d) => d.unlocked).length;
  const pct = total ? Math.round((unlocked / total) * 100) : 0;

  return (
    <div>
      <div className="jt-section-heading">
        <span className="jt-section-title">Dinosaur Collection</span>
        <span className="jt-section-sub">{unlocked}/{total} unlocked ({pct}%)</span>
      </div>
      <div className="jt-hscroll">
        {dinosaurs.map((d, i) => (
          <motion.div
            key={d.id ?? i}
            className="jt-card jt-dino-card"
            style={{ opacity: d.unlocked ? 1 : 0.5 }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: d.unlocked ? 1 : 0.5, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="jt-card-media" style={{ filter: d.unlocked ? "none" : "grayscale(1)" }}>
              {d.imageUrl ? <img src={d.imageUrl} alt={d.name} /> : <span>?</span>}
            </div>
            <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 4 }}>
              <strong>{d.unlocked ? d.name : "???"}</strong>
              <span style={{ fontSize: 12, color: "var(--jt-cream-dim)" }}>{d.era}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: RARITY_COLOR[d.rarity] || "#fff" }}>
                {d.rarity?.toUpperCase()}
              </span>
              {d.unlocked && d.unlockedDate && (
                <span style={{ fontSize: 11, color: "var(--jt-cream-dim)" }}>
                  Unlocked {new Date(d.unlockedDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
