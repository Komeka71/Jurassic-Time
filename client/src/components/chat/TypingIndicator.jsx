// components/chat/TypingIndicator.jsx

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div
        className="
          w-10
          h-10

          rounded-full

          bg-emerald-500/10

          border
          border-white/10

          flex
          items-center
          justify-center

          shrink-0
        "
      >
        <Sparkles
          size={18}
          className="text-emerald-400"
        />
      </div>

      <div
        className="
          bg-[#13191B]

          border
          border-white/5

          rounded-2xl
          rounded-bl-md

          px-4
          py-3

          flex
          gap-2
          items-center
        "
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -5, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
            }}
            className="
              w-2
              h-2

              rounded-full

              bg-emerald-400
            "
          />
        ))}
      </div>
    </div>
  );
}