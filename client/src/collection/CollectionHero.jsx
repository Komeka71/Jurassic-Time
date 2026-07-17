import { motion } from "framer-motion";
import {
  BookOpen,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

export default function CollectionHero({
  discoveredCount = 0,
  totalCount = 0,
}) {
  const progress =
    totalCount > 0
      ? Math.round(
          (discoveredCount / totalCount) * 100
        )
      : 0;

  return (
    <section
      className="
        relative
        overflow-hidden

        rounded-[36px]

        border
        border-green-500/20

        bg-[#071B12]/90

        px-6
        sm:px-8
        lg:px-12

        py-10
        lg:py-14

        mb-10

        shadow-[0_30px_100px_rgba(0,0,0,0.45)]
      "
    >
      {/* BACKGROUND GLOW */}

      <div
        className="
          absolute
          -left-24
          -top-24

          w-[380px]
          h-[380px]

          rounded-full

          bg-green-500/10

          blur-[120px]

          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -right-20
          -bottom-32

          w-[420px]
          h-[420px]

          rounded-full

          bg-cyan-500/10

          blur-[130px]

          pointer-events-none
        "
      />

      {/* FOSSIL DECORATION */}

      <motion.div
        animate={{
          rotate: [0, 8, 0, -8, 0],
          y: [0, -8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute

          right-8
          lg:right-20

          top-8

          text-[110px]
          sm:text-[150px]
          lg:text-[190px]

          opacity-[0.035]

          select-none
          pointer-events-none
        "
      >
        🦴
      </motion.div>

      {/* CONTENT */}

      <div
        className="
          relative
          z-10

          grid
          lg:grid-cols-[1fr_0.7fr]

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
              inline-flex
              items-center
              gap-2

              text-green-300

              text-xs
              font-bold

              uppercase
              tracking-[0.3em]
            "
          >
            <Sparkles size={16} />

            Prehistoric Archive
          </motion.div>

          <motion.h1
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

              mt-5

              text-4xl
              sm:text-5xl
              lg:text-6xl

              leading-[1.05]

              text-white
            "
          >
            Every discovery
            <span className="text-green-400">
              {" "}
              leaves a fossil.
            </span>
          </motion.h1>

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

              max-w-[650px]

              text-white/55

              text-base
              sm:text-lg

              leading-relaxed
            "
          >
            Complete expeditions, uncover ancient species,
            and build your personal prehistoric archive.
            Dino is keeping count. Probably.
          </motion.p>
        </div>

        {/* ARCHIVE CARD */}

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
            stiffness: 120,
          }}
          className="
            relative

            rounded-[30px]

            border
            border-green-500/20

            bg-[#0D2518]/80

            backdrop-blur-xl

            p-6
            sm:p-8

            overflow-hidden
          "
        >
          {/* CARD GLOW */}

          <div
            className="
              absolute
              -right-20
              -top-20

              w-52
              h-52

              rounded-full

              bg-green-400/10

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

                mb-7
              "
            >
              <div>
                <p
                  className="
                    text-xs

                    uppercase
                    tracking-[0.2em]

                    text-green-300/50

                    mb-2
                  "
                >
                  Archive Progress
                </p>

                <h2
                  className="
                    title-font

                    text-3xl
                    sm:text-4xl
                  "
                >
                  {progress}% Complete
                </h2>
              </div>

              <div
                className="
                  w-14
                  h-14

                  rounded-2xl

                  flex
                  items-center
                  justify-center

                  bg-green-500/10

                  border
                  border-green-500/20

                  text-green-300
                "
              >
                <BookOpen size={25} />
              </div>
            </div>

            {/* PROGRESS BAR */}

            <div
              className="
                h-3

                rounded-full

                bg-black/30

                overflow-hidden

                mb-6
              "
            >
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.4,
                  ease: "easeOut",
                }}
                className="
                  h-full

                  rounded-full

                  bg-gradient-to-r
                  from-green-600
                  to-emerald-400

                  shadow-[0_0_20px_rgba(74,222,128,0.35)]
                "
              />
            </div>

            {/* STATS */}

            <div
              className="
                grid
                grid-cols-2

                gap-3
              "
            >
              <div
                className="
                  rounded-2xl

                  bg-green-500/5

                  border
                  border-green-500/15

                  p-4
                "
              >
                <p
                  className="
                    text-2xl
                    font-black

                    text-green-300
                  "
                >
                  {discoveredCount}
                </p>

                <p
                  className="
                    mt-1

                    text-xs

                    text-white/45
                  "
                >
                  Species Discovered
                </p>
              </div>

              <div
                className="
                  rounded-2xl

                  bg-white/[0.03]

                  border
                  border-white/10

                  p-4
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2

                    text-2xl
                    font-black

                    text-white/70
                  "
                >
                  <LockKeyhole size={20} />

                  {Math.max(
                    totalCount - discoveredCount,
                    0
                  )}
                </div>

                <p
                  className="
                    mt-1

                    text-xs

                    text-white/45
                  "
                >
                  Species Undiscovered
                </p>
              </div>
            </div>

            <p
              className="
                mt-5

                text-center

                text-xs

                text-white/30
              "
            >
              🦖 Dino says the archive smells ancient.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}