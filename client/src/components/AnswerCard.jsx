import { motion } from "framer-motion";

const themes = {
  1: {
    default:
      "bg-[#203328]/90 border-[#3B5B41] hover:border-green-400 hover:bg-[#294233]/95",

    selected:
      "bg-gradient-to-r from-green-700 to-emerald-600 border-green-300 shadow-lg shadow-green-500/30",

    faded:
      "bg-[#203328]/90 border-[#3B5B41]",
  },

  2: {
    default:
      "bg-[#30261A]/90 border-[#5E4728] hover:border-amber-400 hover:bg-[#3B2D1C]/95",

    selected:
      "bg-gradient-to-r from-amber-700 to-yellow-600 border-amber-300 shadow-lg shadow-amber-500/30",

    faded:
      "bg-[#30261A]/90 border-[#5E4728]",
  },

  3: {
    default:
      "bg-[#321B16]/90 border-[#663126] hover:border-orange-500 hover:bg-[#432019]/95",

    selected:
      "bg-gradient-to-r from-red-700 via-orange-600 to-red-600 border-orange-300 shadow-lg shadow-orange-500/30",

    faded:
      "bg-[#321B16]/90 border-[#663126]",
  },

  4: {
    default:
      "bg-[#172F40]/90 border-[#31566D] hover:border-cyan-400 hover:bg-[#1D3D52]/95",

    selected:
      "bg-gradient-to-r from-cyan-700 via-sky-600 to-blue-600 border-cyan-300 shadow-lg shadow-cyan-500/30",

    faded:
      "bg-[#172F40]/90 border-[#31566D]",
  },

  5: {
    default:
      "bg-[#2A211B]/90 border-[#59402E] hover:border-orange-400 hover:bg-[#38291F]/95",

    selected:
      "bg-gradient-to-r from-orange-700 via-amber-600 to-orange-500 border-orange-300 shadow-lg shadow-orange-500/30",

    faded:
      "bg-[#2A211B]/90 border-[#59402E]",
  },
};

export default function AnswerCard({
  level = 1,
  option,
  index,
  answer,
  submitted,
  selected,
  onClick,
}) {
  const theme = themes[level] || themes[1];

  return (
    <motion.button
      onClick={!submitted ? onClick : undefined}
      disabled={submitted}
      whileHover={
        !submitted
          ? {
              scale: 1.02,
              x: 6,
            }
          : {}
      }
      whileTap={
        !submitted
          ? {
              scale: 0.98,
            }
          : {}
      }
      className={`
        w-full
        rounded-2xl

        px-5
        md:px-6

        py-3
        md:py-4

        text-left

        text-base
        md:text-lg

        font-medium
        text-white

        transition-all
        duration-300

        border

        ${
          submitted
            ? index === answer
              ? `
                  bg-gradient-to-r
                  from-green-600
                  to-emerald-500

                  border-green-300

                  shadow-lg
                  shadow-green-500/30
                `
              : selected
              ? `
                  bg-gradient-to-r
                  from-red-600
                  to-red-500

                  border-red-300

                  shadow-lg
                  shadow-red-500/20
                `
              : `
                  ${theme.faded}
                  opacity-60
                `
            : selected
            ? theme.selected
            : theme.default
        }
      `}
    >
      {option}
    </motion.button>
  );
}