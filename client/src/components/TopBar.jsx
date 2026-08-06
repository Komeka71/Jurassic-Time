import {
  Menu,
  Coins,
  Flame,
  Trophy,
  CalendarDays,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

const themes = {
  1: {
    bg: "bg-[#102817]/90",
    border: "border-green-700/40",
    accent:
      "from-[#18E27B] via-[#26F2A2] to-[#4BE5FF]",
    card: "bg-[#15261E]",
  },

  2: {
    bg: "bg-[#2A1D12]/90",
    border: "border-yellow-700/40",
    accent:
      "from-[#FFD54F] via-[#FFC107] to-[#FF9800]",
    card: "bg-[#2F2317]",
  },

  3: {
    bg: "bg-[#31140C]/90",
    border: "border-red-700/40",
    accent:
      "from-[#ff512f] via-[#ff6a00] to-[#ff9800]",
    card: "bg-[#3A1C12]",
  },

  4: {
    bg: "bg-[#102C45]/90",
    border: "border-cyan-500/40",
    accent:
      "from-[#7dd3fc] via-[#38bdf8] to-[#22d3ee]",
    card: "bg-[#15364D]",
  },

  5: {
    bg: "bg-[#181310]/90",
    border: "border-orange-500/30",
    accent:
      "from-[#FF7A18] via-[#FFB347] to-[#FFD54F]",
    card: "bg-[#231A14]",
  },
};

const levelNames = [
  "",
  "🌿 Forest Expedition",
  "🦴 Fossil Valley",
  "🌋 Volcano Ridge",
  "❄ Ice Age",
  "☄ Meteor Crater",
];

export default function TopBar({
  level = 1,
  progress = 0,
  coins = 0,
  xp = 0,
  dailyStreak = 0,
  questionStreak = 0,
  rank = "Bronze",
  onMenuClick,
}) {
  const theme = themes[level] || themes[1];

  const safeProgress = Math.min(
    100,
    Math.max(0, progress)
  );

  return (
    <header
      className={`
        sticky
        top-0
        z-50

        h-16
        md:h-20

        px-3
        sm:px-4
        md:px-8

        flex
        items-center
        justify-between

        ${theme.bg}

        backdrop-blur-2xl

        border-b
        ${theme.border}

        shadow-[0_10px_40px_rgba(0,0,0,.35)]
      `}
    >
      {/* ========================================
          LEFT
      ======================================== */}

      <div className="flex items-center gap-2 sm:gap-3 md:gap-5">

        {/* MENU */}

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onMenuClick}
          className={`
            w-10
            h-10

            md:w-12
            md:h-12

            rounded-2xl

            ${theme.card}

            border
            ${theme.border}

            flex
            items-center
            justify-center

            transition
          `}
        >
          <Menu
            size={22}
            color="white"
          />
        </motion.button>

        {/* COINS */}

        <motion.div
          whileHover={{ y: -2 }}
          title="Dino Coins"
          className={`
            flex
            items-center
            gap-2

            px-3
            sm:px-4
            md:px-5

            py-2
            md:py-3

            rounded-2xl

            ${theme.card}

            border
            ${theme.border}
          `}
        >
          <Coins
            size={20}
            color="#FFD54F"
          />

          <AnimatePresence mode="wait">
            <motion.span
              key={coins}
              initial={{
                y: -10,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 10,
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              className="font-bold text-base md:text-lg"
            >
              {coins}
            </motion.span>
          </AnimatePresence>
        </motion.div>

      </div>

      {/* ========================================
          CENTER
      ======================================== */}

      <div className="hidden md:flex items-center gap-3 lg:gap-5">

        {/* LEVEL */}

        <span className="font-bold text-base lg:text-lg tracking-wide whitespace-nowrap">
          {levelNames[level] || levelNames[1]}
        </span>

        {/* PROGRESS BAR */}

        <div
          className={`
            w-[180px]
            lg:w-[350px]
            xl:w-[420px]

            h-4

            rounded-full
            overflow-hidden

            ${theme.card}

            border
            ${theme.border}
          `}
        >
          <motion.div
            initial={false}
            animate={{
              width: `${safeProgress}%`,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className={`
              h-full
              rounded-full

              bg-gradient-to-r
              ${theme.accent}

              shadow-[0_0_18px_rgba(255,255,255,.25)]
            `}
          />
        </div>

        {/* PROGRESS % */}

        <AnimatePresence mode="wait">
          <motion.span
            key={Math.round(safeProgress)}
            initial={{
              y: -5,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: 5,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              hidden
              lg:block

              min-w-[45px]

              font-semibold
              text-white/90
            "
          >
            {Math.round(safeProgress)}%
          </motion.span>
        </AnimatePresence>

      </div>

      {/* ========================================
          RIGHT
      ======================================== */}

      <div className="flex items-center gap-2 md:gap-3">

        {/* QUESTION STREAK */}

        <motion.div
          whileHover={{
            y: -2,
            scale: 1.03,
          }}
          title="Correct Answer Streak"
          className={`
            hidden
            sm:flex

            items-center
            gap-2

            px-3
            md:px-4

            py-2
            md:py-3

            rounded-2xl

            ${theme.card}

            border
            ${theme.border}
          `}
        >
          <Flame
            size={18}
            color="#ff8a00"
          />

          <AnimatePresence mode="wait">
            <motion.span
              key={questionStreak}
              initial={{
                scale: 0.6,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 1.3,
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              className="font-semibold"
            >
              {questionStreak}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* DAILY STREAK */}

        <motion.div
          whileHover={{
            y: -2,
            scale: 1.03,
          }}
          title="Daily Explorer Streak"
          className={`
            hidden
            lg:flex

            items-center
            gap-2

            px-3
            md:px-4

            py-2
            md:py-3

            rounded-2xl

            ${theme.card}

            border
            ${theme.border}
          `}
        >
          <CalendarDays
            size={18}
            color="#4BE5FF"
          />

          <AnimatePresence mode="wait">
            <motion.span
              key={dailyStreak}
              initial={{
                scale: 0.6,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              className="font-semibold"
            >
              {dailyStreak}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* RANK */}

        <motion.div
          whileHover={{
            y: -2,
            scale: 1.03,
          }}
          title={`${xp} XP`}
          className={`
            hidden
            md:flex

            items-center
            gap-2

            px-4
            py-3

            rounded-2xl

            ${theme.card}

            border
            ${theme.border}
          `}
        >
          <Trophy
            size={20}
            color="#FFD54F"
          />

          <motion.span
            key={rank}
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            className="font-semibold whitespace-nowrap"
          >
            {rank}
          </motion.span>
        </motion.div>

      </div>
    </header>
  );
}