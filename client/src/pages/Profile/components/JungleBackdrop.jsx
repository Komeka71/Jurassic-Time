import React, { useMemo } from "react";
import { motion } from "framer-motion";

// Pure CSS/SVG backdrop — works with zero image/video assets.
// If you attach a jungle-bg-loop.mp4, drop a <video> tag at the top of
// .jt-backdrop with autoPlay muted loop playsInline and object-fit: cover.
export default function JungleBackdrop() {
  const leaves = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        left: `${(i * 13 + 5) % 100}%`,
        delay: i * 1.3,
        duration: 14 + (i % 5),
        size: 18 + (i % 4) * 6,
      })),
    []
  );

  const fossils = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        id: i,
        top: `${10 + i * 18}%`,
        left: `${(i * 23 + 8) % 100}%`,
        delay: i * 0.8,
      })),
    []
  );

  return (
    <div className="jt-backdrop" aria-hidden="true">
      <div className="jt-glow-a" />
      <div className="jt-glow-b" />

      {leaves.map((leaf) => (
        <motion.svg
          key={leaf.id}
          className="jt-leaf"
          style={{ left: leaf.left, top: "-40px", width: leaf.size, height: leaf.size }}
          viewBox="0 0 24 24"
          initial={{ y: -40, opacity: 0, rotate: 0 }}
          animate={{ y: "110vh", opacity: [0, 0.6, 0.6, 0], rotate: 360 }}
          transition={{ duration: leaf.duration, delay: leaf.delay, repeat: Infinity, ease: "linear" }}
        >
          <path
            d="M12 2C7 6 4 11 4 15a8 8 0 0016 0c0-4-3-9-8-13z"
            fill="#2ed9a3"
            opacity="0.35"
          />
        </motion.svg>
      ))}

      {fossils.map((f) => (
        <motion.div
          key={f.id}
          className="jt-fossil-particle"
          style={{ top: f.top, left: f.left }}
          animate={{ y: [0, -14, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 6, delay: f.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#e8a33d" strokeWidth="1.4" opacity="0.5" />
            <path d="M8 13c1-3 3-5 6-6M8 9c2 1 3 3 3 6" stroke="#e8a33d" strokeWidth="1.2" opacity="0.5" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
