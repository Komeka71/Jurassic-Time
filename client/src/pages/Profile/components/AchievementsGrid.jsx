// src/pages/Profile/components/AchievementsGrid.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";
import SectionHeading from "./shared/SectionHeading";
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
    <section id="achievements" className="scroll-mt-24 space-y-4">
      <SectionHeading
        eyebrow="Profile"
        title="Achievements"
        description="Milestones earned throughout your Paleora journey."
        meta={!loading ? `${unlockedCount} / ${badges.length} unlocked` : undefined}
      />

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded-xl border border-white/10 bg-black/40" />
          ))}
        </div>
      ) : badges.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-black/40 p-10 text-center backdrop-blur-sm">
          <h3 className="font-serif text-lg font-semibold text-white">No achievements unlocked yet</h3>
          <p className="mt-2 text-sm text-white/40">
            Complete quizzes, expeditions, discoveries, and museum visits to earn badges.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {badges.map((badge) => (
            <div key={badge.id} className="relative">
              <motion.div
                onHoverStart={() => setHovered(badge.id)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ y: -3 }}
                className={`flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-center transition-all duration-300 ${
                  badge.unlocked
                    ? "group border-white/10 bg-black/40 backdrop-blur-sm hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-500/10"
                    : "border-white/10 bg-black/20 opacity-70"
                }`}
              >
                <span className={`text-2xl ${!badge.unlocked ? "opacity-30 grayscale" : ""}`}>
                  {badge.icon}
                </span>

                <span
                  className={`text-[11px] font-medium leading-tight ${
                    badge.unlocked ? "text-white/70" : "text-white/30"
                  }`}
                >
                  {badge.name}
                </span>

                {!badge.unlocked && (
                  <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white/40">
                    <Lock size={10} />
                  </div>
                )}

                {!badge.unlocked && badge.progress != null && (
                  <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-amber-400"
                      style={{ width: `${badge.progress}%` }}
                    />
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
                    className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-40 -translate-x-1/2 rounded-lg border border-white/10 bg-black/90 p-2.5 text-center shadow-lg backdrop-blur-sm"
                  >
                    <p className="text-xs font-medium text-white">{badge.name}</p>
                    <p className="mt-0.5 text-[11px] text-white/40">{badge.description}</p>
                    {!badge.unlocked && badge.progress != null && (
                      <p className="mt-1 text-[11px] text-amber-400">{badge.progress}% complete</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}