import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Footprints, ShieldCheck, Hammer, Clock, ArrowRight } from "lucide-react";

const ICONS = {
  footprints: Footprints,
  shield: ShieldCheck,
  hammer: Hammer,
};

function DifficultyBars({ level, fillClass }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={`h-1.5 w-4 rounded-full transition-colors ${
            n <= level ? fillClass : "bg-white/15"
          }`}
        />
      ))}
    </div>
  );
}

export default function MissionCard({ mission, index, onEnter }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);
  const Icon = ICONS[mission.icon] ?? Footprints;

  // Keep the video always mounted (just paused + transparent) instead of
  // mounting/unmounting it on hover — that was causing the reload flash.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [hovered]);

  return (
    <div
      className={`relative flex flex-col items-center ${hovered ? "z-40" : "z-10"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Idle floating wrapper */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4 + index * 0.4,
          delay: index * 0.3,
          ease: "easeInOut",
        }}
        className="relative"
      >
        {/* Level number badge */}
        <div
          className={`absolute -top-3 left-1/2 z-20 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 bg-black/70 text-sm font-bold text-white ${mission.theme.numberRing}`}
        >
          {mission.number}
        </div>

        {/* Circle preview */}
        <motion.button
          type="button"
          onClick={() => onEnter(mission.route)}
          whileHover={{ scale: 1.06, y: -6 }}
          whileTap={{ scale: 0.97 }}
          animate={{ boxShadow: hovered ? mission.theme.glowHover : mission.theme.glowIdle }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`relative block h-40 w-40 overflow-hidden rounded-full border-2 md:h-48 md:w-48 ${mission.theme.border}`}
        >
          {/* Poster and video both stay mounted; only opacity + playback toggle */}
          <img
            src={mission.poster}
            alt={mission.title}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              hovered ? "opacity-0" : "opacity-100"
            }`}
          />
          <video
            ref={videoRef}
            src={mission.video}
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="absolute inset-0 bg-black/10 transition-colors duration-300" />
        </motion.button>

        {/* Category icon badge */}
        <div
          className={`absolute -bottom-3 left-1/2 z-20 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-black/40 ${mission.theme.iconBg}`}
        >
          <Icon className="h-5 w-5 text-black/80" strokeWidth={2.5} />
        </div>
      </motion.div>

      {/* Title */}
      <h3
        className={`mt-5 text-sm font-bold uppercase tracking-wide md:text-base ${mission.theme.titleText}`}
      >
        {mission.title}
      </h3>

      {/* Hover detail card — absolutely positioned so it never shifts layout */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-full z-50 mt-3 w-64 rounded-2xl border border-white/15 bg-black/70 p-4 shadow-2xl backdrop-blur-xl"
          >
            <span className="text-[11px] font-semibold uppercase tracking-wide text-white/50">
              {mission.subtitle}
            </span>
            <p className="mt-1.5 text-xs leading-relaxed text-white/70">
              {mission.description}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[11px] text-white/50">
                <Clock className="h-3.5 w-3.5" />
                {mission.time}
              </div>
              <DifficultyBars
                level={mission.difficulty}
                fillClass={mission.theme.difficultyFill}
              />
            </div>
            <button
              type="button"
              onClick={() => onEnter(mission.route)}
              className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide text-black/80 transition hover:brightness-110 ${mission.theme.iconBg}`}
            >
              Explore
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}