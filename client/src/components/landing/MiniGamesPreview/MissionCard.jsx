import { motion } from "framer-motion";
import { Footprints, ShieldCheck, Hammer, Clock } from "lucide-react";

const ICONS = {
  footprints: Footprints,
  shield: ShieldCheck,
  hammer: Hammer,
};

export default function MissionCard({ mission, index, onEnter }) {
  const Icon = ICONS[mission.icon] ?? Footprints;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={() => onEnter(mission.route)}
      className="group relative z-10 flex flex-col items-center gap-4 focus:outline-none"
    >
      <div className="relative">
        {/* Level number badge */}
        <div
          className={`absolute -top-3 left-1/2 z-20 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 bg-black/70 text-sm font-bold text-white ${mission.theme.numberRing}`}
        >
          {mission.number}
        </div>

        {/* Circle video preview */}
        <div
          className={`relative h-40 w-40 overflow-hidden rounded-full ring-4 transition-transform duration-300 group-hover:scale-105 md:h-48 md:w-48 ${mission.theme.ring} ${mission.theme.glow}`}
        >
          <video
            src={mission.video}
            poster={mission.poster}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/0" />
        </div>

        {/* Category icon badge, overlapping bottom edge */}
        <div
          className={`absolute -bottom-3 left-1/2 z-20 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-black/40 ${mission.theme.iconBg}`}
        >
          <Icon className="h-5 w-5 text-black/80" strokeWidth={2.5} />
        </div>
      </div>

      {/* Text */}
      <div className="mt-2 flex flex-col items-center gap-1 text-center">
        <h3
          className={`text-sm font-bold uppercase tracking-wide md:text-base ${mission.theme.titleText}`}
        >
          {mission.title}
        </h3>
        <p className="text-xs text-white/50 md:text-sm">{mission.subtitle}</p>
        <div className="mt-1 flex items-center gap-1 text-xs text-white/40">
          <Clock className="h-3.5 w-3.5" />
          <span>{mission.time}</span>
        </div>
      </div>
    </motion.button>
  );
}
