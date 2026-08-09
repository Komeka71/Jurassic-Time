// components/profile/AchievementsSection.jsx

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";
import SectionHeading from "./shared/SectionHeading";
import { getProfile } from "../../services/profileService";

export default function AchievementsSection() {
  const [badges, setBadges] = useState([]);
  const [hovered, setHovered] = useState(null);
useEffect(() => {
  getProfile()
    .then((data) => {
      setBadges(data.badges || []);
    })
    .catch((err) => {
      console.error(err);
      setBadges([]);
    });
}, []);

  return (
    <section id="achievements" className="space-y-4">
      <SectionHeading
        eyebrow="PROFILE"
        title="Achievements"
        description="Milestones earned throughout your Paleora journey."
      />

      {badges.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-stone-900/60 p-10 text-center backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white">
            No achievements unlocked yet
          </h3>

          <p className="mt-2 text-sm text-stone-400">
            Complete quizzes, expeditions, discoveries, and museum visits to
            earn badges.
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
                    ? "group border-white/10 bg-stone-900/70 backdrop-blur-sm hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-500/10"
                    : "border-white/10 bg-stone-950 opacity-70"
                }`}
              >
                <span
                  className={`text-2xl ${
                    !badge.unlocked ? "opacity-30 grayscale" : ""
                  }`}
                >
                  {badge.icon}
                </span>

                <span
                  className={`text-[11px] font-medium leading-tight ${
                    badge.unlocked
                      ? "text-stone-300"
                      : "text-stone-600"
                  }`}
                >
                  {badge.name}
                </span>

                {!badge.unlocked && (
                  <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-stone-900 text-stone-600">
                    <Lock size={10} />
                  </div>
                )}

                {!badge.unlocked && badge.progress != null && (
                  <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-stone-800">
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
                    className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-40 -translate-x-1/2 rounded-lg border border-stone-800 bg-stone-950 p-2.5 text-center shadow-lg"
                  >
                    <p className="text-xs font-medium text-white">
                      {badge.name}
                    </p>

                    <p className="mt-0.5 text-[11px] text-stone-400">
                      {badge.description}
                    </p>

                    {!badge.unlocked && badge.progress != null && (
                      <p className="mt-1 text-[11px] text-amber-400">
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
    </section>
  );
}