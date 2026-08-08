// src/pages/Profile/components/AchievementsGrid.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";
import { getProfile } from "../../../services/profileService";

export default function AchievementsGrid() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    getProfile()
      .then((data) => setBadges(data.badges || []))
      .catch((err) => {
        console.error(err);
        setBadges([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div>
      <div className="jt-section-heading">
        <span className="jt-section-title">Achievements</span>
        <span className="jt-section-sub">
          {loading ? "" : `${unlockedCount} / ${badges.length} unlocked`}
        </span>
      </div>

      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 14 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="jt-card" style={{ aspectRatio: "1 / 1" }} />
          ))}
        </div>
      ) : badges.length === 0 ? (
        <div className="jt-card" style={{ padding: 32, textAlign: "center" }}>
          <strong>No achievements unlocked yet</strong>
          <p style={{ marginTop: 8, fontSize: 13, color: "var(--jt-cream-dim)" }}>
            Complete quizzes, expeditions, discoveries, and museum visits to earn badges.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 14 }}>
          {badges.map((badge) => (
            <div key={badge.id} style={{ position: "relative" }}>
              <motion.div
                onHoverStart={() => setHovered(badge.id)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ y: -3 }}
                className="jt-card"
                style={{
                  aspectRatio: "1 / 1",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  padding: 12,
                  textAlign: "center",
                  opacity: badge.unlocked ? 1 : 0.6,
                }}
              >
                <span style={{ fontSize: 22, filter: badge.unlocked ? "none" : "grayscale(1)", opacity: badge.unlocked ? 1 : 0.4 }}>
                  {badge.icon}
                </span>
                <span style={{ fontSize: 11, fontWeight: 500, color: "var(--jt-cream-dim)" }}>
                  {badge.name}
                </span>

                {!badge.unlocked && (
                  <div
                    style={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0,0,0,0.5)",
                      color: "var(--jt-cream-dim)",
                    }}
                  >
                    <Lock size={10} />
                  </div>
                )}

                {!badge.unlocked && badge.progress != null && (
                  <div style={{ marginTop: 4, height: 4, width: "100%", borderRadius: 999, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${badge.progress}%`, background: "var(--jt-amber-2)" }} />
                  </div>
                )}
              </motion.div>

              <AnimatePresence>
                {hovered === badge.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="jt-card"
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "100%",
                      transform: "translateX(-50%)",
                      marginTop: 8,
                      width: 160,
                      padding: 10,
                      textAlign: "center",
                      zIndex: 20,
                      pointerEvents: "none",
                    }}
                  >
                    <p style={{ fontSize: 12, fontWeight: 500 }}>{badge.name}</p>
                    <p style={{ marginTop: 2, fontSize: 11, color: "var(--jt-cream-dim)" }}>{badge.description}</p>
                    {!badge.unlocked && badge.progress != null && (
                      <p style={{ marginTop: 4, fontSize: 11, color: "var(--jt-amber-2)" }}>
                        {badge.progress}% complete
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}