import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import MissionCard from "./MissionCard";
import MissionPath from "./MissionPath";
import ExpeditionProgress from "./ExpeditionProgress";
import DailyBonusCard from "./DailyBonusCard";
import RewardsPanel from "./RewardsPanel";
import { missions } from "./missionsData";

// "Training Grounds — Choose Your Adventure" mini-games hub preview.
// Mascot / speech bubble intentionally left out — added separately later.
export default function MiniGamesPreview({
  currentRank = "Explorer",
  rewards = { gems: 120, coins: 2450, bones: 8 },
  onClaimDailyBonus,
}) {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#07120c]">
      {/* Atmospheric fade from the section above */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32"
        style={{
          background:
            "linear-gradient(to bottom, #06151A 0%, rgba(6,21,26,0.4) 40%, transparent 100%)",
        }}
      />

      {/* Background video with poster fallback */}
      <div className="absolute inset-0 z-0">
        <video
          src="/videos/minigames/minigamesbg.mp4"
          poster="/images/minigames/training-map-bg.png"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#07120c]" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
        {/* Header */}
        <div className="mb-20 flex flex-col items-center gap-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400 md:text-sm"
          >
            Training Grounds
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold uppercase tracking-wide md:text-6xl"
          >
            <span className="block text-white">Choose Your</span>
            <span className="block bg-gradient-to-r from-emerald-300 via-amber-200 to-orange-300 bg-clip-text text-transparent">
              Adventure
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-sm text-white/60 md:text-base"
          >
            Travel through prehistoric worlds, solve mysteries, restore
            history and uncover fossils before entering the PaleoVerse.
          </motion.p>
        </div>

        {/* Mission circles */}
        <div className="relative flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:justify-between">
          <MissionPath />
          {missions.map((mission, index) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              index={index}
              onEnter={navigate}
            />
          ))}
        </div>

        {/* Expedition progress / daily bonus / rewards bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-24 grid grid-cols-1 gap-8 rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-md md:grid-cols-3 md:gap-6 md:p-8"
        >
          <ExpeditionProgress currentRank={currentRank} />
          <DailyBonusCard onClaim={onClaimDailyBonus} />
          <RewardsPanel {...rewards} />
        </motion.div>
      </div>
    </section>
  );
}
