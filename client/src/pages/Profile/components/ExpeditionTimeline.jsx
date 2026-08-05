import React from "react";
import { motion } from "framer-motion";
import { Check, Lock } from "lucide-react";

export default function ExpeditionTimeline({ levels = [] }) {
  return (
    <div>
      <div className="jt-section-heading">
        <span className="jt-section-title">Expedition Progress</span>
        <span className="jt-section-sub">Your journey through Jurassic Time</span>
      </div>
      <div className="jt-card" style={{ padding: 20 }}>
        <div className="jt-timeline">
          {levels.map((lvl, i) => (
            <motion.div
              key={lvl.id ?? i}
              className="jt-timeline-node"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className={`jt-timeline-dot ${lvl.status}`}>
                {lvl.status === "completed" && <Check size={18} />}
                {lvl.status === "locked" && <Lock size={16} />}
                {lvl.status === "current" && lvl.number}
              </div>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{lvl.name || `Level ${lvl.number}`}</span>
              {lvl.status === "current" && <span style={{ fontSize: 11, color: "var(--jt-amber-2)" }}>In progress</span>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
