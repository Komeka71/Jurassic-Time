import { AnimatePresence, motion } from "framer-motion";

import {
  CalendarDays,
  Dna,
  MapPin,
  Ruler,
  Sparkles,
  Weight,
  X,
} from "lucide-react";

/*
========================================
RARITY STYLES
========================================
*/

const rarityStyles = {
  Common:
    "bg-green-500/10 border-green-500/30 text-green-300",

  Rare:
    "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",

  Epic:
    "bg-purple-500/10 border-purple-500/30 text-purple-300",

  Legendary:
    "bg-orange-500/10 border-orange-500/30 text-orange-300",
};

/*
========================================
STAT CARD
========================================
*/

function StatCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-2xl

        bg-white/[0.04]

        border
        border-white/[0.07]

        px-4
        py-4
      "
    >
      <div
        className="
          flex
          items-center
          gap-2

          mb-2

          text-green-300/60
        "
      >
        <Icon size={16} />

        <span
          className="
            text-[10px]

            uppercase
            tracking-[0.18em]

            font-bold
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          text-sm
          sm:text-base

          font-semibold

          text-white/85
        "
      >
        {value}
      </p>
    </div>
  );
}

/*
========================================
DINO INSPECT MODAL
========================================
*/

export default function DinoInspectModal({
  dinosaur,
  onClose,
}) {
  return (
    <AnimatePresence>
      {dinosaur && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="
            fixed
            inset-0
            z-[100]

            flex
            items-center
            justify-center

            p-4
            sm:p-6

            bg-black/80

            backdrop-blur-xl
          "
          onClick={onClose}
        >
          {/* MODAL */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 35,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              y: 25,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 24,
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
            className="
              relative

              w-full
              max-w-5xl

              max-h-[90vh]

              overflow-y-auto

              rounded-[34px]

              bg-[#071A11]

              border
              border-green-500/25

              shadow-[0_40px_120px_rgba(0,0,0,0.7)]
            "
          >
            {/* BACKGROUND GLOW */}

            <div
              className="
                absolute
                inset-0

                bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.16),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.1),transparent_40%)]

                pointer-events-none
              "
            />

            {/* CLOSE */}

            <motion.button
              whileHover={{
                rotate: 90,
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.9,
              }}
              onClick={onClose}
              className="
                absolute
                z-30

                top-5
                right-5

                w-12
                h-12

                rounded-2xl

                flex
                items-center
                justify-center

                bg-black/30

                border
                border-white/10

                backdrop-blur-xl

                text-white/60

                hover:text-white
              "
            >
              <X size={22} />
            </motion.button>

            {/* CONTENT */}

            <div
              className="
                relative
                z-10

                grid
                grid-cols-1
                lg:grid-cols-[0.9fr_1.1fr]
              "
            >
              {/* LEFT — DINOSAUR */}

              <div
                className="
                  relative

                  min-h-[430px]
                  lg:min-h-[650px]

                  p-6
                  sm:p-10

                  flex
                  items-center
                  justify-center

                  overflow-hidden

                  border-b
                  lg:border-b-0
                  lg:border-r

                  border-green-500/15
                "
              >
                {/* ERA TEXT */}

                <div
                  className="
                    absolute

                    top-8
                    left-8

                    text-[clamp(3rem,7vw,6rem)]

                    title-font

                    text-white/[0.025]

                    whitespace-nowrap

                    select-none
                  "
                >
                  {dinosaur.era}
                </div>

                {/* GLOW */}

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

                    w-[70%]
                    aspect-square

                    rounded-full

                    bg-green-400/15

                    blur-[80px]
                  "
                />

                {/* GROUND SHADOW */}

                <div
                  className="
                    absolute

                    bottom-[22%]

                    w-[55%]
                    h-10

                    rounded-full

                    bg-black/50

                    blur-2xl
                  "
                />

                {/* DINOSAUR IMAGE */}

                <motion.img
                  src={dinosaur.image}
                  alt={dinosaur.name}
                  initial={{
                    scale: 0.8,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    y: [0, -8, 0],
                  }}
                  transition={{
                    scale: {
                      type: "spring",
                      stiffness: 180,
                      damping: 18,
                    },

                    opacity: {
                      duration: 0.4,
                    },

                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="
                    relative
                    z-10

                    w-[92%]
                    max-h-[520px]

                    object-contain

                    drop-shadow-[0_35px_40px_rgba(0,0,0,0.55)]

                    select-none
                  "
                />

                {/* RARITY */}

                <div
                  className={`
                    absolute

                    top-7
                    right-7

                    px-4
                    py-2

                    rounded-full

                    border

                    text-xs
                    font-bold

                    ${rarityStyles[dinosaur.rarity]}
                  `}
                >
                  ✦ {dinosaur.rarity}
                </div>
              </div>

              {/* RIGHT — INFORMATION */}

              <div
                className="
                  p-6
                  sm:p-10
                  lg:p-12
                "
              >
                {/* LABEL */}

                <div
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
                  <Dna size={17} />

                  Species Discovery
                </div>

                {/* NAME */}

                <h2
                  className="
                    title-font

                    text-4xl
                    sm:text-5xl
                    lg:text-6xl

                    leading-none
                  "
                >
                  {dinosaur.name}
                </h2>

                {/* NICKNAME */}

                <p
                  className="
                    mt-3

                    text-lg

                    text-green-300/60
                  "
                >
                  "{dinosaur.nickname}"
                </p>

                {/* DESCRIPTION */}

                <p
                  className="
                    mt-7

                    text-white/60

                    leading-relaxed
                  "
                >
                  {dinosaur.description}
                </p>

                {/* STATS */}

                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2

                    gap-3

                    mt-8
                  "
                >
                  <StatCard
                    icon={CalendarDays}
                    label="Era"
                    value={dinosaur.era}
                  />

                  <StatCard
                    icon={MapPin}
                    label="Discovered In"
                    value={dinosaur.location}
                  />

                  <StatCard
                    icon={Ruler}
                    label="Length"
                    value={dinosaur.length}
                  />

                  <StatCard
                    icon={Weight}
                    label="Weight"
                    value={dinosaur.weight}
                  />
                </div>

                {/* FUN FACT */}

                <div
                  className="
                    mt-8

                    rounded-[24px]

                    bg-green-500/[0.07]

                    border
                    border-green-500/20

                    p-5
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2

                      mb-3

                      text-green-300
                    "
                  >
                    <Sparkles size={18} />

                    <span
                      className="
                        text-xs
                        font-bold

                        uppercase
                        tracking-[0.2em]
                      "
                    >
                      Dino Field Note
                    </span>
                  </div>

                  <p
                    className="
                      text-sm
                      sm:text-base

                      leading-relaxed

                      text-white/65
                    "
                  >
                    🦖 {dinosaur.funFact}
                  </p>
                </div>

                {/* DISCOVERY */}

                <div
                  className="
                    mt-6

                    flex
                    items-center
                    justify-between

                    gap-4

                    px-5
                    py-4

                    rounded-2xl

                    bg-black/20

                    border
                    border-white/[0.06]
                  "
                >
                  <span
                    className="
                      text-sm

                      text-white/40
                    "
                  >
                    Expedition Discovery
                  </span>

                  <span
                    className="
                      text-sm
                      font-bold

                      text-green-300
                    "
                  >
                    Level {dinosaur.discoveredAtLevel}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}