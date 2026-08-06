import { motion } from "framer-motion";

const themes = {
  1: {
    bubble: `
      bg-gradient-to-br
      from-[#274536]/95
      to-[#1C3328]/95
    `,
    border: "border-green-500/20",
    glow: "shadow-green-900/30",
    tail: "bg-[#1C3328]",
  },

  2: {
    bubble: `
      bg-gradient-to-br
      from-[#4A351E]/95
      to-[#302315]/95
    `,
    border: "border-amber-500/25",
    glow: "shadow-amber-900/30",
    tail: "bg-[#302315]",
  },

  3: {
    bubble: `
      bg-gradient-to-br
      from-[#4A2118]/95
      to-[#2D1510]/95
    `,
    border: "border-red-500/25",
    glow: "shadow-red-900/40",
    tail: "bg-[#2D1510]",
  },

  4: {
    bubble: `
      bg-gradient-to-br
      from-[#16465D]/95
      to-[#0D2D40]/95
    `,
    border: "border-cyan-400/30",
    glow: "shadow-cyan-900/40",
    tail: "bg-[#0D2D40]",
  },

  5: {
    bubble: `
      bg-gradient-to-br
      from-[#4A2A17]/95
      to-[#2D1B10]/95
    `,
    border: "border-orange-500/25",
    glow: "shadow-orange-900/40",
    tail: "bg-[#2D1B10]",
  },
};

export default function SpeechBubble({
  text,
  level = 1,
}) {
  const theme = themes[level] || themes[1];

  return (
    <motion.div
      key={text}
      initial={{
        opacity: 0,
        scale: 0.88,
        y: 10,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className={`
        relative

        w-[230px]
        sm:w-[260px]
        md:w-[280px]

        px-5
        py-3

        rounded-2xl

        ${theme.bubble}

        border
        ${theme.border}

        backdrop-blur-xl

        shadow-xl
        ${theme.glow}

        text-white
        text-center

        text-sm
        sm:text-base

        font-bold
        leading-relaxed
      `}
    >
      {text}

      {/* BUBBLE TAIL */}

      <div
        className={`
          absolute

          left-1/2
          -translate-x-1/2

          -bottom-2

          w-4
          h-4

          rotate-45

          ${theme.tail}

          border-r
          border-b
          ${theme.border}
        `}
      />
    </motion.div>
  );
}