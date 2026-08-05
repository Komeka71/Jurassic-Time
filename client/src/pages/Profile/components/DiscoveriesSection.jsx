import React from "react";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck, ShieldQuestion } from "lucide-react";

export default function DiscoveriesSection({ discoveries = [] }) {
  return (
    <div>
      <div className="jt-section-heading">
        <span className="jt-section-title">My Discoveries</span>
        <span className="jt-section-sub">{discoveries.length} logged</span>
      </div>
      <div className="jt-hscroll">
        {discoveries.map((d, i) => (
          <motion.div
            key={d.id ?? i}
            className="jt-card jt-discovery-card"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -4 }}
          >
            <div className="jt-card-media">
              {d.photoUrl ? <img src={d.photoUrl} alt={d.species} /> : <span>No photo</span>}
            </div>
            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 6 }}>
              <strong>{d.species}</strong>
              <span style={{ fontSize: 12, color: "var(--jt-cream-dim)" }}>{d.era}</span>
              <span style={{ fontSize: 12, display: "flex", gap: 4, alignItems: "center", color: "var(--jt-cream-dim)" }}>
                <MapPin size={12} /> {d.location}
              </span>
              <span style={{ fontSize: 11, color: "var(--jt-cream-dim)" }}>Archive ID: {d.archiveId}</span>
              <span style={{ fontSize: 12, display: "flex", gap: 4, alignItems: "center", color: d.verified ? "var(--jt-teal)" : "var(--jt-amber-2)" }}>
                {d.verified ? <ShieldCheck size={14} /> : <ShieldQuestion size={14} />}
                {d.verified ? "Verified" : "Pending review"}
              </span>
              <span style={{ fontSize: 11, color: "var(--jt-cream-dim)" }}>{new Date(d.date).toLocaleDateString()}</span>
              <button className="jt-btn-ghost" style={{ marginTop: 6, fontSize: 12 }}>View</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
