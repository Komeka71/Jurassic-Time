import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  Backpack,
  Gift,
  Menu,
  ShoppingBag,
  Sparkles,
  Trophy,
  UserRound,
} from "lucide-react";

import SideMenu from "../components/SideMenu";

/*
========================================
CAMP ACTIONS
========================================
*/
const isSafari =
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const ext = isSafari ? "mov" : "webm";
const mainActions = [
  {
    id: "merchant",
    eyebrow: "Expedition Supplies",
    title: "Merchant Tent",
    description:
      "Trade fossil coins for rare gear, relics, and prehistoric companions.",
    icon: ShoppingBag,
    path: "/shop",
    mood: "pointing",
    message: "The merchant has shiny things. I checked twice.",
  },
  {
    id: "treasure",
    eyebrow: "Recovered Treasures",
    title: "Treasure Vault",
    description:
      "Inspect the mysterious rewards recovered during your expeditions.",
    icon: Gift,
    path: null,
    mood: "looking",
    message: "I heard something moving in that chest. Probably fine.",
  },
  {
    id: "wheel",
    eyebrow: "Dino's Questionable Idea",
    title: "Lucky Fossil Wheel",
    description:
      "Test your expedition luck and uncover a surprise prehistoric reward.",
    icon: Sparkles,
    path: null,
    mood: "happyJumps",
    message: "SPIN IT! Responsible decision-making can wait.",
  },
];

const explorerActions = [
  {
    id: "collection",
    title: "Prehistoric Archive",
    description: "Revisit every species you have discovered.",
    icon: Backpack,
    path: "/collection",
    mood: "thinking",
    message: "I counted the fossils. Then forgot the number.",
  },
  {
    id: "achievements",
    title: "Field Achievements",
    description: "Track the milestones earned across your expeditions.",
    icon: Trophy,
    path: "/achievements",
    mood: "celebrate",
    message: "Look at all those achievements! Mostly your work.",
  },
  {
    id: "profile",
    title: "Explorer Record",
    description: "Review your rank, XP, streak, and expedition history.",
    icon: UserRound,
    path: "/profile",
    mood: "wave",
    message: "Ah yes. My favourite explorer's classified record.",
  },
];

/*
========================================
CAMP
========================================
*/

export default function Camp() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const [mood, setMood] = useState("camp");

  const [message, setMessage] = useState(
    "Welcome back, Explorer! I definitely didn't eat your supplies."
  );

  /*
  ========================================
  INITIAL DINO MOOD
  ========================================
  */

  useEffect(() => {
    const timer = setTimeout(() => {
      setMood("idle");

      setMessage(
        "Camp is quiet today. Suspiciously quiet."
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  /*
  ========================================
  DINO REACTION
  ========================================
  */

  const reactToAction = (action) => {
    setMood(action.mood);
    setMessage(action.message);
  };

  /*
  ========================================
  OPEN ACTION
  ========================================
  */

  const openAction = (action) => {
    reactToAction(action);

    if (action.path) {
      setTimeout(() => {
        navigate(action.path);
      }, 250);

      return;
    }

    if (action.id === "treasure") {
      setMood("looking");

      setMessage(
        "The Treasure Vault is being secured. Dino is guarding it."
      );

      return;
    }

    if (action.id === "wheel") {
      setMood("happyJumps");

      setMessage(
        "The Lucky Fossil Wheel is almost ready. I demand the first spin."
      );
    }
  };

  /*
  ========================================
  UI
  ========================================
  */

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-x-hidden

        bg-[#041009]
        text-white
      "
    >
      {/* BACKGROUND VIDEO */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="
          fixed
          inset-0

          w-full
          h-full

          object-cover

          opacity-35

          pointer-events-none
        "
      >
        <source
  src={`/videos/dino/${mood}.${ext}`}
  type={
    isSafari
      ? 'video/mp4; codecs="hvc1"'
      : "video/webm"
  }
/>
      </video>

      {/* BACKGROUND OVERLAYS */}

      <div
        className="
          fixed
          inset-0

          bg-[#041009]/75

          pointer-events-none
        "
      />

      <div
        className="
          fixed
          inset-0

          bg-[radial-gradient(circle_at_75%_25%,rgba(34,197,94,0.18),transparent_35%),radial-gradient(circle_at_15%_70%,rgba(245,158,11,0.10),transparent_30%)]

          pointer-events-none
        "
      />

      <div
        className="
          fixed
          inset-x-0
          bottom-0

          h-[35vh]

          bg-gradient-to-t
          from-[#041009]
          to-transparent

          pointer-events-none
        "
      />

      {/* SIDE MENU */}

      <SideMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        level={1}
      />

      {/* HEADER */}

      <header
        className="
          relative
          z-30

          sticky
          top-0

          min-h-20

          px-4
          sm:px-6
          lg:px-10

          flex
          items-center
          justify-between

          bg-[#06140D]/85

          backdrop-blur-2xl

          border-b
          border-green-500/20
        "
      >
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.92,
            }}
            onClick={() => setMenuOpen(true)}
            className="
              w-12
              h-12

              rounded-2xl

              flex
              items-center
              justify-center

              bg-green-500/10

              border
              border-green-500/30
            "
            aria-label="Open explorer menu"
          >
            <Menu size={22} />
          </motion.button>

          <div>
            <h1
              className="
                title-font
                text-2xl
                sm:text-3xl
              "
            >
              Explorer Camp
            </h1>

            <p
              className="
                hidden
                sm:block

                text-xs

                uppercase
                tracking-[0.25em]

                text-green-300/60
              "
            >
              Prehistoric Base Camp
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={() => navigate("/map")}
          className="
            px-4
            sm:px-5

            py-3

            rounded-2xl

            bg-green-500/10

            border
            border-green-500/25

            text-sm
            font-semibold

            text-green-200

            hover:bg-green-500/15

            transition
          "
        >
          Return to Island
        </motion.button>
      </header>

      {/* CONTENT */}

      <main
        className="
          relative
          z-10

          max-w-[1400px]
          mx-auto

          px-4
          sm:px-6
          lg:px-10

          py-10
        "
      >
        {/* HERO */}

        <section
          className="
            relative

            min-h-[540px]

            rounded-[36px]

            overflow-hidden

            border
            border-green-500/25

            bg-[#062014]/80

            backdrop-blur-xl

            shadow-[0_35px_100px_rgba(0,0,0,0.45)]
          "
        >
          {/* HERO GLOWS */}

          <div
            className="
              absolute
              -top-32
              -right-20

              w-[550px]
              h-[550px]

              rounded-full

              bg-green-500/15

              blur-[150px]

              pointer-events-none
            "
          />

          <div
            className="
              absolute
              -bottom-40
              left-10

              w-[450px]
              h-[450px]

              rounded-full

              bg-amber-500/10

              blur-[150px]

              pointer-events-none
            "
          />

          <div
            className="
              relative
              z-10

              min-h-[540px]

              grid
              lg:grid-cols-[1.1fr_0.9fr]

              items-center

              gap-8

              px-7
              sm:px-10
              lg:px-14

              py-12
            "
          >
            {/* HERO TEXT */}

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              <p
                className="
                  text-xs
                  sm:text-sm

                  uppercase
                  tracking-[0.3em]

                  font-bold

                  text-green-300
                "
              >
                ✣ Explorer Base Camp
              </p>

              <h2
                className="
                  title-font

                  mt-6

                  text-5xl
                  sm:text-6xl
                  lg:text-7xl

                  leading-[0.98]
                "
              >
                Rest where the wild{" "}
                <span className="text-green-400">
                  still remembers.
                </span>
              </h2>

              <p
                className="
                  mt-7

                  max-w-2xl

                  text-base
                  sm:text-lg

                  leading-8

                  text-white/55
                "
              >
                Return from the expedition, inspect your
                treasures, and prepare for what waits beyond
                the trees.
              </p>

              <motion.button
                whileHover={{
                  x: 5,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() => navigate("/map")}
                className="
                  mt-9

                  inline-flex
                  items-center
                  gap-3

                  px-6
                  py-4

                  rounded-2xl

                  bg-green-500

                  text-[#041009]

                  font-bold

                  shadow-lg
                  shadow-green-500/20
                "
              >
                Begin Next Expedition

                <ArrowRight size={20} />
              </motion.button>
            </motion.div>

            {/* DINO */}

            <div
              className="
                relative

                min-h-[400px]

                flex
                items-end
                justify-center
              "
            >
              {/* SPEECH */}

              <motion.div
                key={message}
                initial={{
                  opacity: 0,
                  y: 10,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                className="
                  absolute
                  top-2
                  left-1/2
                  -translate-x-1/2

                  z-20

                  w-[270px]
                  sm:w-[320px]

                  px-6
                  py-5

                  rounded-[24px]

                  bg-[#F2FFF4]

                  text-[#092015]

                  text-center

                  font-bold

                  shadow-[0_20px_60px_rgba(0,0,0,0.3)]
                "
              >
                🦖 {message}

                <div
                  className="
                    absolute
                    -bottom-3
                    left-1/2
                    -translate-x-1/2

                    w-6
                    h-6

                    rotate-45

                    bg-[#F2FFF4]
                  "
                />
              </motion.div>

              {/* DINO GLOW */}

              <div
                className="
                  absolute
                  bottom-8

                  w-[330px]
                  h-[330px]

                  rounded-full

                  bg-green-400/15

                  blur-[80px]
                "
              />

              {/* DINO VIDEO */}

              <motion.video
                key={mood}
                autoPlay
                muted
                loop
                playsInline
                initial={{
                  opacity: 0,
                  scale: 0.94,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -5, 0],
                }}
                transition={{
                  opacity: {
                    duration: 0.3,
                  },
                  scale: {
                    duration: 0.3,
                  },
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="
                  relative
                  z-10

                  w-[330px]
                  sm:w-[400px]
                  lg:w-[470px]

                  max-h-[430px]

                  object-contain

                  drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]
                "
              >
                <source
                  src={`/videos/dino/${mood}.mov`}
                  type="video/quicktime"
                />
              </motion.video>
            </div>
          </div>
        </section>

        {/* MAIN CAMP ACTIONS */}

        <section className="mt-16">
          <div
            className="
              flex
              flex-col
              md:flex-row

              md:items-end
              md:justify-between

              gap-5

              mb-8
            "
          >
            <div>
              <p
                className="
                  text-xs

                  uppercase
                  tracking-[0.3em]

                  font-bold

                  text-green-300
                "
              >
                ✣ Camp Facilities
              </p>

              <h2
                className="
                  title-font

                  mt-3

                  text-4xl
                  sm:text-5xl
                "
              >
                Prepare for the wild.
              </h2>
            </div>

            <p
              className="
                max-w-md

                text-white/45

                leading-7
              "
            >
              Trade supplies, inspect recovered treasure,
              and test Dino's highly scientific understanding
              of luck.
            </p>
          </div>

          <div
            className="
              grid

              grid-cols-1
              lg:grid-cols-3

              gap-5
            "
          >
            {mainActions.map((action, index) => {
              const Icon = action.icon;

              return (
                <motion.button
                  key={action.id}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -7,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onMouseEnter={() =>
                    reactToAction(action)
                  }
                  onFocus={() =>
                    reactToAction(action)
                  }
                  onClick={() =>
                    openAction(action)
                  }
                  className="
                    group

                    relative

                    min-h-[300px]

                    overflow-hidden

                    rounded-[30px]

                    p-8

                    text-left

                    bg-[#082116]/85

                    border
                    border-green-500/20

                    hover:border-green-400/45

                    shadow-[0_25px_70px_rgba(0,0,0,0.25)]

                    transition
                  "
                >
                  <div
                    className="
                      absolute
                      -right-20
                      -bottom-20

                      w-[260px]
                      h-[260px]

                      rounded-full

                      bg-green-500/10

                      blur-[80px]

                      group-hover:bg-green-500/20

                      transition
                    "
                  />

                  <div
                    className="
                      relative
                      z-10

                      h-full

                      flex
                      flex-col
                    "
                  >
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
                      <Icon size={25} />
                    </div>

                    <p
                      className="
                        mt-8

                        text-[11px]

                        uppercase
                        tracking-[0.25em]

                        font-bold

                        text-green-300/60
                      "
                    >
                      {action.eyebrow}
                    </p>

                    <h3
                      className="
                        title-font

                        mt-3

                        text-3xl
                      "
                    >
                      {action.title}
                    </h3>

                    <p
                      className="
                        mt-4

                        leading-7

                        text-white/45
                      "
                    >
                      {action.description}
                    </p>

                    <div
                      className="
                        mt-auto
                        pt-8

                        flex
                        items-center
                        gap-2

                        text-green-300

                        font-semibold
                      "
                    >
                      Enter Facility

                      <ArrowRight
                        size={18}
                        className="
                          transition-transform

                          group-hover:translate-x-2
                        "
                      />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* EXPLORER CORNER */}

        <section className="mt-20 mb-10">
          <div className="mb-8">
            <p
              className="
                text-xs

                uppercase
                tracking-[0.3em]

                font-bold

                text-amber-300
              "
            >
              ✦ Explorer's Corner
            </p>

            <h2
              className="
                title-font

                mt-3

                text-4xl
                sm:text-5xl
              "
            >
              Your expedition lives here.
            </h2>
          </div>

          <div
            className="
              grid

              grid-cols-1
              md:grid-cols-3

              gap-5
            "
          >
            {explorerActions.map((action) => {
              const Icon = action.icon;

              return (
                <motion.button
                  key={action.id}
                  whileHover={{
                    y: -5,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onMouseEnter={() =>
                    reactToAction(action)
                  }
                  onFocus={() =>
                    reactToAction(action)
                  }
                  onClick={() =>
                    openAction(action)
                  }
                  className="
                    group

                    p-7

                    rounded-[26px]

                    text-left

                    bg-black/25

                    backdrop-blur-xl

                    border
                    border-white/10

                    hover:border-green-500/35
                    hover:bg-green-500/5

                    transition
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      justify-between

                      gap-5
                    "
                  >
                    <div
                      className="
                        w-12
                        h-12

                        rounded-2xl

                        flex
                        items-center
                        justify-center

                        bg-green-500/10

                        text-green-300
                      "
                    >
                      <Icon size={22} />
                    </div>

                    <ArrowRight
                      size={19}
                      className="
                        text-white/25

                        transition

                        group-hover:text-green-300
                        group-hover:translate-x-1
                      "
                    />
                  </div>

                  <h3
                    className="
                      title-font

                      mt-7

                      text-2xl
                    "
                  >
                    {action.title}
                  </h3>

                  <p
                    className="
                      mt-3

                      leading-7

                      text-white/40
                    "
                  >
                    {action.description}
                  </p>
                </motion.button>
              );
            })}
          </div>

          <p
            className="
              mt-12

              text-center

              text-xs

              text-white/25
            "
          >
            🦖 Dino says camp rules are mostly suggestions.
          </p>
        </section>
      </main>
    </div>
  );
}