import { motion } from "framer-motion";

// Lightweight ambient layer: god rays, drifting fog, fireflies, dust,
// leaves (reuses the existing /images/landing/leaf.png used in QuizPreview),
// and simple SVG bird silhouettes (no extra image asset required).
// Everything here is decorative/pointer-events-none and cheap (CSS/SVG
// transforms only — no per-frame JS work).
const FIREFLY_COUNT = 10;
const DUST_COUNT = 12;
const LEAF_COUNT = 4;

export default function Ambient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* God rays */}
      <div className="absolute -top-1/4 left-1/4 h-[140%] w-40 rotate-12 bg-gradient-to-b from-amber-100/10 via-amber-100/5 to-transparent blur-2xl" />
      <div className="absolute -top-1/4 right-1/3 h-[140%] w-32 -rotate-6 bg-gradient-to-b from-emerald-100/10 via-emerald-100/5 to-transparent blur-2xl" />

      {/* Drifting fog */}
      <motion.div
        className="absolute -left-1/4 bottom-0 h-72 w-[150%] rounded-full bg-white/5 blur-3xl"
        animate={{ x: ["-5%", "5%", "-5%"] }}
        transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-10 h-56 w-[130%] rounded-full bg-emerald-900/10 blur-3xl"
        animate={{ x: ["5%", "-5%", "5%"] }}
        transition={{ repeat: Infinity, duration: 26, ease: "easeInOut" }}
      />

      {/* Fireflies */}
      {[...Array(FIREFLY_COUNT)].map((_, i) => (
        <motion.span
          key={`firefly-${i}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-amber-200"
          style={{
            left: `${(i * 9.7) % 100}%`,
            top: `${20 + ((i * 13) % 60)}%`,
            boxShadow: "0 0 8px 2px rgba(252,211,77,0.8)",
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, -10, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 6 + (i % 5),
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Drifting dust */}
      {[...Array(DUST_COUNT)].map((_, i) => (
        <motion.span
          key={`dust-${i}`}
          className="absolute h-[3px] w-[3px] rounded-full bg-white/30"
          style={{
            left: `${(i * 6.3) % 100}%`,
            top: `${(i * 17) % 100}%`,
          }}
          animate={{ y: [0, -40], opacity: [0, 0.6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 10 + (i % 6),
            delay: i * 0.5,
            ease: "linear",
          }}
        />
      ))}

      {/* Drifting leaves */}
      {[...Array(LEAF_COUNT)].map((_, i) => (
        <motion.img
          key={`leaf-${i}`}
          src="/images/landing/leaf.png"
          alt=""
          className="absolute w-4 opacity-60"
          style={{ top: `${10 + i * 18}%` }}
          initial={{ x: "-5vw", rotate: 0 }}
          animate={{ x: "105vw", rotate: 360, y: [0, 30, -10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 16 + i * 2,
            delay: i * 3,
            ease: "linear",
          }}
        />
      ))}

      {/* Distant birds */}
      {[...Array(2)].map((_, i) => (
        <motion.svg
          key={`bird-${i}`}
          viewBox="0 0 24 12"
          className="absolute h-3 w-6 opacity-40"
          style={{ top: `${8 + i * 6}%` }}
          initial={{ x: "-10vw" }}
          animate={{ x: "110vw" }}
          transition={{
            repeat: Infinity,
            duration: 30 + i * 8,
            delay: i * 6,
            ease: "linear",
          }}
        >
          <path
            d="M0,8 Q6,0 12,8 Q18,0 24,8"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1.5"
          />
        </motion.svg>
      ))}
    </div>
  );
}
