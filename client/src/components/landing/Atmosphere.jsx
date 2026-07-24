import { motion } from "framer-motion";

const particles = [...Array(18)];

export default function Atmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-yellow-100/40"

          style={{
            width: Math.random() * 5 + 2,
            height: Math.random() * 5 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: "blur(1px)",
          }}

          animate={{
            y: [-20, -120],
            opacity: [0, 0.8, 0],
            x: [
              0,
              Math.random() * 25 - 12,
              Math.random() * 25 - 12,
            ],
          }}

          transition={{
            duration: Math.random() * 8 + 8,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}