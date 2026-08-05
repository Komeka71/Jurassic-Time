import { motion } from "framer-motion";

import {
  Crown,
  Flame,
  Sparkles,
  Trophy,
} from "lucide-react";

/*
========================================
PODIUM CONFIG
========================================
*/

const podiumConfig = {
  1: {
    label: "1st",
    medal: "🥇",

    order: "order-1 lg:order-2",

    platformHeight:
      "h-[230px] sm:h-[260px] lg:h-[310px]",

    stone:
      "from-[#4A4F2A] via-[#30391F] to-[#172515]",

    border:
      "border-yellow-400/35",

    rank:
      "text-yellow-300",

    xp:
      "text-yellow-200",

    glow:
      "bg-yellow-400/20",

    avatar:
      "border-yellow-400/40 bg-yellow-500/10",

    delay: 0.15,
  },

  2: {
    label: "2nd",
    medal: "🥈",

    order: "order-2 lg:order-1",

    platformHeight:
      "h-[180px] sm:h-[210px] lg:h-[235px]",

    stone:
      "from-[#40554A] via-[#293B31] to-[#14251B]",

    border:
      "border-slate-200/25",

    rank:
      "text-slate-200",

    xp:
      "text-slate-200",

    glow:
      "bg-slate-200/10",

    avatar:
      "border-slate-200/30 bg-slate-200/10",

    delay: 0.3,
  },

  3: {
    label: "3rd",
    medal: "🥉",

    order: "order-3",

    platformHeight:
      "h-[150px] sm:h-[180px] lg:h-[200px]",

    stone:
      "from-[#604023] via-[#3B2D1B] to-[#1F2115]",

    border:
      "border-orange-400/30",

    rank:
      "text-orange-300",

    xp:
      "text-orange-200",

    glow:
      "bg-orange-400/10",

    avatar:
      "border-orange-400/30 bg-orange-500/10",

    delay: 0.45,
  },
};

/*
========================================
FLOATING LEAF
========================================
*/

function FloatingLeaf({
  className,
  delay = 0,
  duration = 6,
}) {
  return (
    <motion.div
      initial={{
        y: -20,
        rotate: 0,
        opacity: 0,
      }}
      animate={{
        y: [0, 120, 240],
        x: [0, 25, -10],
        rotate: [0, 180, 360],
        opacity: [0, 0.6, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      className={`
        absolute
        z-10

        text-green-400/40

        pointer-events-none

        ${className}
      `}
    >
      🍃
    </motion.div>
  );
}

/*
========================================
FIREFLY
========================================
*/

function Firefly({
  className,
  delay = 0,
}) {
  return (
    <motion.div
      animate={{
        opacity: [0.15, 1, 0.15],
        scale: [0.7, 1.4, 0.7],
        y: [0, -15, 0],
      }}
      transition={{
        duration: 2.5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`
        absolute

        w-1.5
        h-1.5

        rounded-full

        bg-yellow-200

        shadow-[0_0_15px_rgba(254,240,138,0.9)]

        pointer-events-none

        ${className}
      `}
    />
  );
}

/*
========================================
PLAYER
========================================
*/

function PodiumPlayer({
  player,
  rank,
}) {
  const config = podiumConfig[rank];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 80,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: config.delay,
        type: "spring",
        stiffness: 120,
        damping: 17,
      }}
      className={`
        ${config.order}

        relative

        flex
        flex-col
        items-center
        justify-end

        min-w-0
      `}
    >
      {/* PLAYER AREA */}

      <motion.div
        whileHover={{
          y: -8,
        }}
        className="
          relative
          z-30

          flex
          flex-col
          items-center

          w-full

          px-3
        "
      >
        {/* WINNER CROWN */}

        {rank === 1 && (
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [-6, 6, -6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              mb-2

              text-yellow-300

              drop-shadow-[0_0_18px_rgba(250,204,21,0.5)]
            "
          >
            <Crown
              size={45}
              strokeWidth={1.8}
            />
          </motion.div>
        )}

        {/* MEDAL */}

        <motion.div
          animate={
            rank === 1
              ? {
                  scale: [1, 1.1, 1],
                }
              : undefined
          }
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="
            mb-3

            text-3xl
          "
        >
          {config.medal}
        </motion.div>

        {/* AVATAR */}

        <motion.div
          whileHover={{
            scale: 1.08,
            rotate: rank === 1 ? 3 : -3,
          }}
          className={`
            relative

            w-20
            h-20

            sm:w-24
            sm:h-24

            lg:w-28
            lg:h-28

            rounded-[30px]

            flex
            items-center
            justify-center

            border
            ${config.avatar}

            backdrop-blur-xl

            text-4xl
            sm:text-5xl

            shadow-[0_20px_50px_rgba(0,0,0,0.45)]
          `}
        >
          <div
            className={`
              absolute

              inset-0

              rounded-[30px]

              ${config.glow}

              blur-2xl
            `}
          />

          <span className="relative z-10">
            {player.avatar}
          </span>
        </motion.div>

        {/* NAME */}

        <h3
          className="
            title-font

            mt-4

            max-w-full

            text-xl
            sm:text-2xl
            lg:text-3xl

            text-white

            truncate
          "
        >
          {player.name}
        </h3>

        {/* TITLE */}

        <p
          className="
            mt-1

            max-w-full

            text-[9px]
            sm:text-[10px]

            uppercase
            tracking-[0.15em]

            text-white/40

            truncate
          "
        >
          {player.title}
        </p>

        {/* XP */}

        <div
          className={`
            mt-3

            flex
            items-center
            gap-2

            ${config.xp}

            text-sm
            sm:text-base

            font-black
          `}
        >
          <Sparkles size={15} />

          {player.xp.toLocaleString()} XP
        </div>

        {/* MINI STATS */}

        <div
          className="
            flex
            items-center
            justify-center

            gap-4

            mt-3
            mb-5

            text-xs
          "
        >
          <div
            className="
              flex
              items-center
              gap-1.5

              text-orange-300
            "
          >
            <Flame size={14} />

            <span className="font-bold">
              {player.streak}
            </span>
          </div>

          <div
            className="
              w-px
              h-4

              bg-white/10
            "
          />

          <div
            className="
              flex
              items-center
              gap-1.5

              text-green-300
            "
          >
            <Trophy size={14} />

            <span className="font-bold">
              {player.discoveries}
            </span>
          </div>
        </div>
      </motion.div>

      {/* STONE PODIUM */}

      <motion.div
        initial={{
          scaleY: 0,
        }}
        animate={{
          scaleY: 1,
        }}
        transition={{
          delay: config.delay + 0.15,
          duration: 0.7,
          type: "spring",
          stiffness: 100,
          damping: 16,
        }}
        style={{
          transformOrigin: "bottom",
        }}
        className={`
          relative

          w-full

          ${config.platformHeight}

          rounded-t-[32px]

          overflow-hidden

          border
          border-b-0

          ${config.border}

          bg-gradient-to-b
          ${config.stone}

          shadow-[0_-15px_45px_rgba(0,0,0,0.25),0_30px_60px_rgba(0,0,0,0.45)]
        `}
      >
        {/* STONE TOP EDGE */}

        <div
          className="
            absolute

            top-0
            left-0
            right-0

            h-5

            bg-white/[0.06]

            border-b
            border-black/20
          "
        />

        {/* ROCK TEXTURE */}

        <div
          className="
            absolute

            top-[20%]
            left-[12%]

            w-16
            h-8

            rounded-[50%]

            border-t
            border-white/10

            rotate-[-8deg]
          "
        />

        <div
          className="
            absolute

            bottom-[18%]
            right-[10%]

            w-20
            h-10

            rounded-[50%]

            border-t
            border-black/30

            rotate-[10deg]
          "
        />

        <div
          className="
            absolute

            top-[45%]
            right-[20%]

            w-10
            h-16

            border-l
            border-black/20

            rotate-[20deg]
          "
        />

        {/* MOSS TOP */}

        <div
          className="
            absolute

            top-0
            left-0
            right-0

            h-4

            bg-gradient-to-r
            from-green-800/60
            via-green-400/40
            to-emerald-900/60

            blur-[1px]
          "
        />

        {/* LEFT VINE */}

        <motion.div
          animate={{
            rotate: [-3, 3, -3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute

            top-1
            left-2

            text-3xl

            origin-top
          "
        >
          🌿
        </motion.div>

        {/* RIGHT VINE */}

        <motion.div
          animate={{
            rotate: [4, -4, 4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute

            top-3
            right-1

            text-3xl

            origin-top

            scale-x-[-1]
          "
        >
          🌿
        </motion.div>

        {/* CARVED RANK */}

        <div
          className="
            absolute

            inset-0

            flex
            flex-col
            items-center
            justify-center
          "
        >
          <motion.div
            animate={
              rank === 1
                ? {
                    scale: [1, 1.04, 1],
                  }
                : undefined
            }
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className={`
              title-font

              text-[90px]
              sm:text-[110px]
              lg:text-[140px]

              leading-none

              ${config.rank}

              opacity-80

              drop-shadow-[0_5px_0_rgba(0,0,0,0.4)]
            `}
          >
            {rank}
          </motion.div>

          <p
            className="
              mt-2

              text-[9px]
              sm:text-[10px]

              uppercase
              tracking-[0.3em]

              text-white/35
            "
          >
            Explorer Rank
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
const isSafari =
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const ext = isSafari ? "mov" : "webm";
/*
========================================
PODIUM
========================================
*/

export default function Podium({
  players = [],
}) {
  const topThree = players.slice(0, 3);

if (players.length < 3) {
  return null;
}

  return (
    <section
      className="
        relative

        mt-10
        mb-12
      "
    >
      {/* SECTION HEADER */}

      <div
        className="
          flex
          flex-col
          sm:flex-row

          sm:items-end
          sm:justify-between

          gap-4

          mb-7
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-2

              text-yellow-300

              text-xs
              font-bold

              uppercase
              tracking-[0.3em]
            "
          >
            <Trophy size={16} />

            Hall of Legends
          </div>

          <h2
            className="
              title-font

              mt-3

              text-3xl
              sm:text-4xl
            "
          >
            Top Explorers
          </h2>
        </div>

        <p
          className="
            max-w-[420px]

            text-sm
            leading-relaxed

            text-white/40
          "
        >
          The three explorers currently leaving the
          deepest footprints across Jurassic Time.
        </p>
      </div>

      {/* JUNGLE STAGE */}

      <div
        className="
          relative

          min-h-[650px]

          rounded-[38px]

          overflow-hidden

          border
          border-green-500/20

          bg-gradient-to-b
          from-[#071D12]
          via-[#082116]
          to-[#041009]

          shadow-[0_30px_100px_rgba(0,0,0,0.4)]
        "
      >
        {/* JUNGLE GLOWS */}

        <div
          className="
            absolute

            -top-40
            left-[25%]

            w-[500px]
            h-[500px]

            rounded-full

            bg-green-500/10

            blur-[140px]
          "
        />

        <div
          className="
            absolute

            bottom-0
            right-0

            w-[450px]
            h-[450px]

            rounded-full

            bg-yellow-500/[0.06]

            blur-[120px]
          "
        />

        {/* BACKGROUND JUNGLE SILHOUETTES */}

        <div
          className="
            absolute

            bottom-0
            left-0
            right-0

            h-[55%]

            opacity-20

            bg-[radial-gradient(ellipse_at_bottom_left,rgba(34,197,94,0.45),transparent_35%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.35),transparent_38%)]
          "
        />

        {/* TOP VINES */}

        <motion.div
          animate={{
            rotate: [-1, 2, -1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute

            -top-3
            left-3

            text-6xl
            sm:text-8xl

            origin-top-left

            opacity-60
          "
        >
          🌿
        </motion.div>

        <motion.div
          animate={{
            rotate: [1, -2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute

            -top-3
            right-3

            text-6xl
            sm:text-8xl

            origin-top-right

            scale-x-[-1]

            opacity-60
          "
        >
          🌿
        </motion.div>

        {/* LEAVES */}

        <FloatingLeaf
          className="top-10 left-[12%]"
          delay={0}
          duration={7}
        />

        <FloatingLeaf
          className="top-2 left-[65%]"
          delay={2}
          duration={8}
        />

        <FloatingLeaf
          className="top-20 right-[10%]"
          delay={4}
          duration={6}
        />

        {/* FIREFLIES */}

        <Firefly
          className="top-[18%] left-[18%]"
          delay={0}
        />

        <Firefly
          className="top-[30%] left-[44%]"
          delay={1}
        />

        <Firefly
          className="top-[16%] right-[20%]"
          delay={2}
        />

        <Firefly
          className="top-[45%] right-[8%]"
          delay={0.7}
        />

        <Firefly
          className="top-[38%] left-[7%]"
          delay={1.5}
        />

        {/* DINO COMPANION */}

        <div
          className="
            hidden
            lg:block

            absolute
            z-30

            bottom-0
            left-1/2

            -translate-x-1/2

            pointer-events-none
          "
        >
        <motion.video
  src={`/videos/dino/celebrate.${ext}`}
  autoPlay
  muted
  loop
  playsInline
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              w-[180px]
              xl:w-[210px]

              max-h-[220px]

              object-contain

              drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)]
            "
          />
        </div>

        {/* PODIUMS */}

        <div
          className="
            relative
            z-20

            min-h-[650px]

            grid
            grid-cols-1
            lg:grid-cols-3

            items-end

            gap-4
            lg:gap-2

            px-5
            sm:px-8
            lg:px-10

            pt-24
          "
        >
          {topThree[1] && (
  <PodiumPlayer
    player={topThree[1]}
    rank={2}
  />
)}

{topThree[0] && (
  <PodiumPlayer
    player={topThree[0]}
    rank={1}
  />
)}

{topThree[2] && (
  <PodiumPlayer
    player={topThree[2]}
    rank={3}
  />
)}
        </div>

        {/* GROUND MIST */}

        <div
          className="
            absolute
            z-40

            bottom-0
            left-0
            right-0

            h-20

            bg-gradient-to-t
            from-[#041009]
            to-transparent

            pointer-events-none
          "
        />
      </div>
    </section>
  );
}