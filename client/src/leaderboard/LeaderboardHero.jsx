import { motion } from "framer-motion";

import {
  Crown,
  Flame,
  Sparkles,
  Trophy,
  TrendingUp,
} from "lucide-react";

/*
========================================
LEADERBOARD HERO
========================================
*/

export default function LeaderboardHero({
  playerRank,
  playerXp,
  playerStreak,
  totalExplorers,
}) {
  return (
    <section
      className="
        relative
        overflow-hidden

        rounded-[36px]

        border
        border-green-500/20

        bg-[#071B12]/90

        shadow-[0_30px_100px_rgba(0,0,0,0.45)]

        px-6
        sm:px-8
        lg:px-12

        py-10
        lg:py-12
      "
    >
      {/* BACKGROUND GLOWS */}

      <div
        className="
          absolute
          -left-24
          top-10

          w-[360px]
          h-[360px]

          rounded-full

          bg-green-500/10

          blur-[110px]

          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -right-20
          -bottom-24

          w-[430px]
          h-[430px]

          rounded-full

          bg-yellow-500/10

          blur-[120px]

          pointer-events-none
        "
      />

      {/* FADED TROPHY */}

      <Trophy
        className="
          absolute

          -right-10
          -bottom-16

          w-[330px]
          h-[330px]

          text-yellow-300/[0.025]

          rotate-[-12deg]

          pointer-events-none
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10

          grid
          grid-cols-1
          lg:grid-cols-[1fr_0.85fr]

          gap-10

          items-center
        "
      >
        {/* LEFT */}

        <div>
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              flex
              items-center
              gap-2

              text-green-300

              text-xs
              font-bold

              uppercase
              tracking-[0.3em]

              mb-5
            "
          >
            <Sparkles size={16} />

            Explorer Rankings
          </motion.div>

          <motion.h2
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
            }}
            className="
              title-font

              text-4xl
              sm:text-5xl
              lg:text-6xl

              leading-[1.05]
            "
          >
            Legends leave
            <span className="text-green-400">
              {" "}
              footprints.
            </span>
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="
              mt-6

              max-w-[620px]

              text-white/55

              text-base
              sm:text-lg

              leading-relaxed
            "
          >
            Every expedition, discovery, and correct
            answer pushes explorers higher through the
            prehistoric ranks. Dino is definitely not
            secretly judging the scores.
          </motion.p>

          {/* HERO MINI STATS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
            }}
            className="
              grid
              grid-cols-2
              sm:grid-cols-3

              gap-3

              mt-8
            "
          >
            {/* RANK */}

            <div
              className="
                rounded-2xl

                bg-green-500/[0.07]

                border
                border-green-500/20

                p-4
              "
            >
              <Crown
                size={19}
                className="
                  text-yellow-300

                  mb-3
                "
              />

              <p
                className="
                  text-2xl
                  font-bold
                "
              >
                #{playerRank}
              </p>

              <p
                className="
                  mt-1

                  text-xs

                  text-white/40
                "
              >
                Your Rank
              </p>
            </div>

            {/* XP */}

            <div
              className="
                rounded-2xl

                bg-green-500/[0.07]

                border
                border-green-500/20

                p-4
              "
            >
              <TrendingUp
                size={19}
                className="
                  text-green-300

                  mb-3
                "
              />

              <p
                className="
                  text-2xl
                  font-bold
                "
              >
                {playerXp.toLocaleString()}
              </p>

              <p
                className="
                  mt-1

                  text-xs

                  text-white/40
                "
              >
                Explorer XP
              </p>
            </div>

            {/* STREAK */}

            <div
              className="
                col-span-2
                sm:col-span-1

                rounded-2xl

                bg-orange-500/[0.06]

                border
                border-orange-500/20

                p-4
              "
            >
              <Flame
                size={19}
                className="
                  text-orange-300

                  mb-3
                "
              />

              <p
                className="
                  text-2xl
                  font-bold
                "
              >
                {playerStreak}
              </p>

              <p
                className="
                  mt-1

                  text-xs

                  text-white/40
                "
              >
                Day Streak
              </p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — RANK CARD */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.92,
            rotate: 2,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 140,
            damping: 18,
          }}
          className="
            relative

            rounded-[30px]

            bg-gradient-to-br
            from-[#102A1B]
            to-[#091B12]

            border
            border-green-500/20

            p-6
            sm:p-8

            shadow-[0_25px_70px_rgba(0,0,0,0.35)]
          "
        >
          {/* CARD GLOW */}

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.5, 0.25],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute

              top-1/2
              left-1/2

              -translate-x-1/2
              -translate-y-1/2

              w-[220px]
              h-[220px]

              rounded-full

              bg-yellow-400/10

              blur-[70px]

              pointer-events-none
            "
          />

          <div
            className="
              relative
              z-10
            "
          >
            <div
              className="
                flex
                items-center
                justify-between

                gap-4
              "
            >
              <div>
                <p
                  className="
                    text-xs
                    font-bold

                    uppercase
                    tracking-[0.25em]

                    text-green-300/55
                  "
                >
                  Current Standing
                </p>

                <h3
                  className="
                    title-font

                    text-3xl
                    sm:text-4xl

                    mt-3
                  "
                >
                  Rank #{playerRank}
                </h3>
              </div>

              <motion.div
                animate={{
                  y: [0, -6, 0],
                  rotate: [-3, 3, -3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  w-16
                  h-16

                  rounded-2xl

                  flex
                  items-center
                  justify-center

                  bg-yellow-500/10

                  border
                  border-yellow-500/25
                "
              >
                <Trophy
                  size={31}
                  className="
                    text-yellow-300
                  "
                />
              </motion.div>
            </div>

            <div
              className="
                mt-8

                h-px

                bg-gradient-to-r
                from-transparent
                via-green-500/20
                to-transparent
              "
            />

            <div
              className="
                flex
                items-end
                justify-between

                gap-5

                mt-7
              "
            >
              <div>
                <p
                  className="
                    text-white/40

                    text-sm
                  "
                >
                  Competing explorers
                </p>

                <p
                  className="
                    mt-2

                    text-3xl
                    font-bold
                  "
                >
                  {totalExplorers}
                </p>
              </div>

              <p
                className="
                  max-w-[180px]

                  text-right

                  text-sm
                  leading-relaxed

                  text-white/40
                "
              >
                🦖 Dino says climbing the ranks builds
                character. Probably.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}