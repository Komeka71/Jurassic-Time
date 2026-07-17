import { motion } from "framer-motion";

import {
  Flame,
  Footprints,
  Sparkles,
} from "lucide-react";

/*
========================================
LEADERBOARD ROW
========================================
*/

export default function LeaderboardRow({
  player,
  rank,
  index = 0,
  isCurrentPlayer = false,
}) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        x: -25,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: index * 0.05,
      }}
      whileHover={{
        x: 5,
        scale: 1.005,
      }}
      className={`
        group

        relative

        grid
        grid-cols-[54px_1fr_auto]
        md:grid-cols-[70px_1fr_130px_110px_150px]

        gap-3
        md:gap-5

        items-center

        min-h-[92px]

        px-4
        sm:px-5
        md:px-6

        py-4

        rounded-[24px]

        border

        overflow-hidden

        transition

        ${
          isCurrentPlayer
            ? `
              bg-green-500/[0.09]

              border-green-400/35

              shadow-[0_15px_50px_rgba(34,197,94,0.1)]
            `
            : `
              bg-[#0D2117]/85

              border-green-500/15

              hover:border-green-500/30
            `
        }
      `}
    >
      {/* CURRENT PLAYER GLOW */}

      {isCurrentPlayer && (
        <motion.div
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute

            -left-20
            top-1/2

            -translate-y-1/2

            w-56
            h-56

            rounded-full

            bg-green-400/15

            blur-[70px]

            pointer-events-none
          "
        />
      )}

      {/* RANK */}

      <div
        className="
          relative
          z-10

          flex
          items-center
          justify-center
        "
      >
        <motion.div
          whileHover={{
            rotate: -5,
            scale: 1.08,
          }}
          className={`
            w-11
            h-11

            md:w-12
            md:h-12

            rounded-2xl

            flex
            items-center
            justify-center

            border

            font-black

            ${
              isCurrentPlayer
                ? `
                  bg-green-500/15

                  border-green-400/30

                  text-green-300
                `
                : `
                  bg-white/[0.04]

                  border-white/[0.07]

                  text-white/55
                `
            }
          `}
        >
          #{rank}
        </motion.div>
      </div>

      {/* PLAYER */}

      <div
        className="
          relative
          z-10

          flex
          items-center

          gap-4

          min-w-0
        "
      >
        {/* AVATAR */}

        <motion.div
          whileHover={{
            scale: 1.08,
            rotate: 4,
          }}
          className={`
            shrink-0

            w-14
            h-14

            rounded-[18px]

            flex
            items-center
            justify-center

            text-3xl

            border

            ${
              isCurrentPlayer
                ? `
                  bg-green-500/15

                  border-green-400/30
                `
                : `
                  bg-green-500/[0.07]

                  border-green-500/15
                `
            }
          `}
        >
          {player.avatar}
        </motion.div>

        {/* NAME */}

        <div className="min-w-0">
          <div
            className="
              flex
              items-center

              gap-2

              min-w-0
            "
          >
            <h3
              className="
                truncate

                text-base
                sm:text-lg

                font-bold

                text-white
              "
            >
              {player.name}
            </h3>

            {isCurrentPlayer && (
              <span
                className="
                  shrink-0

                  px-2
                  py-1

                  rounded-lg

                  bg-green-500/15

                  border
                  border-green-400/25

                  text-[9px]
                  font-black

                  uppercase
                  tracking-[0.16em]

                  text-green-300
                "
              >
                You
              </span>
            )}
          </div>

          <p
            className="
              mt-1

              truncate

              text-xs

              text-white/35
            "
          >
            {player.title}
          </p>
        </div>
      </div>

      {/* LEVEL */}

      <div
        className="
          relative
          z-10

          hidden
          md:block
        "
      >
        <p
          className="
            text-xs

            uppercase
            tracking-[0.15em]

            text-white/30
          "
        >
          Expedition
        </p>

        <p
          className="
            mt-2

            font-bold

            text-green-300
          "
        >
          Level {player.level}
        </p>
      </div>

      {/* STREAK */}

      <div
        className="
          relative
          z-10

          hidden
          md:flex

          items-center
          gap-2

          text-orange-300
        "
      >
        <Flame size={18} />

        <div>
          <p className="font-bold">
            {player.streak}
          </p>

          <p
            className="
              text-[10px]

              uppercase
              tracking-[0.12em]

              text-white/30
            "
          >
            Streak
          </p>
        </div>
      </div>

      {/* XP */}

      <div
        className="
          relative
          z-10

          flex
          items-center
          justify-end

          gap-2

          text-right
        "
      >
        <Sparkles
          size={18}
          className="
            hidden
            sm:block

            text-yellow-300
          "
        />

        <div>
          <p
            className="
              font-black

              text-yellow-200
            "
          >
            {player.xp.toLocaleString()}
          </p>

          <p
            className="
              text-[10px]

              uppercase
              tracking-[0.12em]

              text-white/30
            "
          >
            XP
          </p>
        </div>
      </div>

      {/* MOBILE BOTTOM STATS */}

      <div
        className="
          relative
          z-10

          col-start-2
          col-span-2

          md:hidden

          flex
          items-center

          gap-4

          pt-1
        "
      >
        <div
          className="
            flex
            items-center
            gap-2

            text-xs

            text-green-300/70
          "
        >
          <Footprints size={14} />

          Level {player.level}
        </div>

        <div
          className="
            flex
            items-center
            gap-2

            text-xs

            text-orange-300/70
          "
        >
          <Flame size={14} />

          {player.streak} day streak
        </div>
      </div>
    </motion.article>
  );
}