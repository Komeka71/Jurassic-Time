

import { AnimatePresence, motion } from "framer-motion";

export default function SpeechBubble({ text }) {
  return (
    <motion.div
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
        },
      }}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={text}
          initial={{
            opacity: 0,
            y: 12,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -10,
            scale: 0.96,
          }}
          transition={{
            duration: 0.28,
          }}
          className="
            relative

            w-[205px]
            min-h-[68px]

            overflow-hidden

            rounded-[24px]

            bg-[#0d1710]/95
            backdrop-blur-2xl

            border
            border-green-700/40

            shadow-[0_12px_35px_rgba(0,0,0,.45)]
            shadow-green-900/20

            px-4
            py-3

            select-none
          "
        >
          {/* Glow */}
          <div
            className="
              absolute
              inset-0

              rounded-[24px]

              bg-gradient-to-br
              from-green-500/5
              via-transparent
              to-transparent
            "
          />

          {/* Top Highlight */}
          <div
            className="
              absolute
              top-0
              left-0

              h-[1px]
              w-full

              bg-gradient-to-r
              from-transparent
              via-green-300/60
              to-transparent
            "
          />

          {/* Green Status Dot */}
          <div
            className="
              absolute
              top-3
              left-3

              h-2
              w-2

              rounded-full

              bg-green-400

              shadow-[0_0_10px_rgba(74,222,128,.9)]
            "
          />

          {/* Text */}
          <p
            className="
              relative
              z-10

              text-center

              text-[13px]
              leading-5

              font-medium

              text-green-50
            "
          >
            {text}
          </p>

          {/* Pointer */}
          <div
            className="
              absolute

              left-1/2
              -translate-x-1/2

              -bottom-[8px]

              h-[18px]
              w-[18px]

              rotate-45

              bg-[#0d1710]

              border-r
              border-b
              border-green-700/40
            "
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}