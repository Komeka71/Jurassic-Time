import { motion } from "framer-motion";
import { Gem, Coins, Bone, Zap } from "lucide-react";

// Now a standalone floating glass card with animated icons instead of
// plain static numbers. Added XP alongside Gems/Coins/Bones per the
// "Coins, Gems, Fossils, XP" ask.
export default function RewardsPanel({ gems = 0, coins = 0, bones = 0, xp = 0 }) {
  const items = [
    {
      icon: Gem,
      value: gems,
      color: "text-cyan-300",
      bg: "bg-cyan-400/10",
      border: "border-cyan-400/30",
      anim: { scale: [1, 1.15, 1] },
    },
    {
      icon: Coins,
      value: coins,
      color: "text-amber-300",
      bg: "bg-amber-400/10",
      border: "border-amber-400/30",
      anim: { rotate: [0, 12, -12, 0] },
    },
    {
      icon: Bone,
      value: bones,
      color: "text-orange-200",
      bg: "bg-orange-400/10",
      border: "border-orange-400/30",
      anim: { rotate: [0, -10, 10, 0] },
    },
    {
      icon: Zap,
      value: xp,
      color: "text-violet-300",
      bg: "bg-violet-400/10",
      border: "border-violet-400/30",
      anim: { opacity: [0.6, 1, 0.6] },
    },
  ];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-black/40 p-5 shadow-[0_0_30px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md md:p-6"
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
        Your Rewards
      </span>
      <div className="grid grid-cols-4 gap-2">
        {items.map(({ icon: Icon, value, color, bg, border, anim }, i) => (
          <div
            key={i}
            className={`flex flex-col items-center gap-1 rounded-xl border py-3 ${border} ${bg}`}
          >
            <motion.div
              animate={anim}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            >
              <Icon className={`h-5 w-5 ${color}`} />
            </motion.div>
            <span className="text-xs font-bold text-white sm:text-sm">{value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
