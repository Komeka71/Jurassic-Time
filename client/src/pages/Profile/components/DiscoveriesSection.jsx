import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck, ShieldQuestion, Fingerprint } from "lucide-react";

// Never fall back to localhost here — in production there's no localhost:3000
// to fall back to, so a missing env var would silently break every image.
// Set VITE_API_URL in your .env (dev) and in your Vercel project settings (prod).
const API_URL = import.meta.env.VITE_API_URL || "";

function resolvePhotoUrl(photoUrl) {
  if (!photoUrl) return null;
  if (/^https?:\/\//i.test(photoUrl)) return photoUrl; // already absolute
  return `${API_URL}${photoUrl}`;
}

function DiscoveryMedia({ photoUrl, alt }) {
  const [failed, setFailed] = useState(false);
  const resolved = resolvePhotoUrl(photoUrl);

  if (!resolved || failed) {
    return (
      <div className="jt-card-media jt-card-media--empty">
        <Fingerprint size={22} />
        <span>No photo</span>
      </div>
    );
  }

  return (
    <div className="jt-card-media">
      <img src={resolved} alt={alt} onError={() => setFailed(true)} />
    </div>
  );
}

export default function DiscoveriesSection({ discoveries = [], onView }) {
  return (
    <div>
      <div className="jt-section-heading">
        <span className="jt-section-title">My Discoveries</span>
        <span className="jt-section-sub">{discoveries.length} logged</span>
      </div>
      <div className="jt-hscroll">
        {discoveries.map((d, i) => (
          <motion.div
            key={d.id ?? d._id ?? i}
            className="jt-card jt-discovery-card"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -4 }}
          >
            <DiscoveryMedia photoUrl={d.photoUrl} alt={d.species} />
            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 6 }}>
              <strong>{d.species}</strong>
              <span style={{ fontSize: 12, color: "var(--jt-cream-dim)" }}>{d.era}</span>
              <span style={{ fontSize: 12, display: "flex", gap: 4, alignItems: "center", color: "var(--jt-cream-dim)" }}>
                <MapPin size={12} /> {d.location}
              </span>
              <span style={{ fontSize: 11, color: "var(--jt-cream-dim)" }}>
                Archive ID: {d.archiveId || "—"}
              </span>
              <span style={{ fontSize: 12, display: "flex", gap: 4, alignItems: "center", color: d.verified ? "var(--jt-teal)" : "var(--jt-amber-2)" }}>
                {d.verified ? <ShieldCheck size={14} /> : <ShieldQuestion size={14} />}
                {d.verified ? "Verified" : "Pending review"}
              </span>
              <span style={{ fontSize: 11, color: "var(--jt-cream-dim)" }}>
                {d.date ? new Date(d.date).toLocaleDateString() : "Date unknown"}
              </span>
              <button
                className="jt-btn-ghost"
                style={{ marginTop: 6, fontSize: 12 }}
                onClick={() => onView?.(d)}
              >
                View
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}