import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import DinoGuide from "../components/DinoGuide";
import Particles from "../components/background/Particles";
import { Menu } from "lucide-react";
import SideMenu from "../components/SideMenu";
/*
========================================
LEVEL THEMES
========================================
*/

const themes = {
  1: {
    page: "bg-[#07140D]",
    card: "bg-[#101816]/90",
    border: "border-green-700/40",

    accent: "bg-green-500",
    accentHover: "hover:bg-green-500/20",

    button:
      "from-green-600 via-emerald-500 to-green-400",

    glow: "shadow-green-500/20",

    text: "text-green-300",

    icon: "🌿",

    mood: "lookingAround",

    message:
      "🌿 The forest is waiting! Choose your challenge.",
  },

  2: {
    page: "bg-[#171006]",
    card: "bg-[#21170E]/90",
    border: "border-amber-700/40",

    accent: "bg-amber-500",
    accentHover: "hover:bg-amber-500/20",

    button:
      "from-yellow-700 via-amber-500 to-orange-400",

    glow: "shadow-amber-500/20",

    text: "text-amber-300",

    icon: "🦴",

    mood: "pointingRight",

    message:
      "🦴 Fossils ahead! Let's prepare our expedition.",
  },

  3: {
    page: "bg-[#160805]",
    card: "bg-[#21100B]/90",
    border: "border-red-700/40",

    accent: "bg-red-600",
    accentHover: "hover:bg-red-500/20",

    button:
      "from-red-700 via-orange-600 to-orange-400",

    glow: "shadow-red-500/20",

    text: "text-orange-300",

    icon: "🌋",

    mood: "roar",

    message:
      "🌋 Careful... the volcano is active!",
  },

  4: {
    page: "bg-[#071521]",
    card: "bg-[#0D2230]/90",
    border: "border-cyan-500/40",

    accent: "bg-cyan-500",
    accentHover: "hover:bg-cyan-500/20",

    button:
      "from-cyan-700 via-blue-500 to-cyan-400",

    glow: "shadow-cyan-500/20",

    text: "text-cyan-300",

    icon: "❄️",

    mood: "shushing",

    message:
      "❄️ Brrr! Pick your Ice Age challenge.",
  },

  5: {
    page: "bg-[#130D08]",
    card: "bg-[#1B1511]/90",
    border: "border-orange-500/40",

    accent: "bg-orange-500",
    accentHover: "hover:bg-orange-500/20",

    button:
      "from-orange-700 via-orange-500 to-amber-400",

    glow: "shadow-orange-500/20",

    text: "text-orange-300",

    icon: "☄️",

    mood: "lookingAround",

    message:
      "☄️ The crater awaits, Explorer!",
  },
};

/*
========================================
COMPONENT
========================================
*/

export default function ExpeditionSelect() {
  const navigate = useNavigate();
  const location = useLocation();
const [menuOpen, setMenuOpen] = useState(false);
const [unlockedLevel, setUnlockedLevel] = useState(1);
  const requestedLevel = location.state?.level || 1;

const level = Math.min(requestedLevel, unlockedLevel);

  const levelTitle =
    location.state?.title || "Forest Expedition";

  const theme = themes[level] || themes[1];

  const [difficulty, setDifficulty] = useState("easy");

const [topic, setTopic] = useState("mixed");

  const [questionCount, setQuestionCount] =
    useState(10);
useEffect(() => {
  async function loadPlayerLevel() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/dashboard`, //ll
        {
          credentials: "include",
        }
      );

      if (!response.ok) return;

      const data = await response.json();

      if (data?.stats?.level) {
        setUnlockedLevel(data.stats.level);
      }
    } catch (err) {
      console.log("Guest mode");
    }
  }

  loadPlayerLevel();
}, []);
  const topics = [
  "carnivores",
  "herbivores",
  "jurassic",
  "triassic",
  "mixed",
];
  return (
    <div
      className={`
        relative
        min-h-screen
        overflow-hidden
        text-white

        ${theme.page}
      `}
    >
      {/* EXPEDITION PARTICLES */}

<div
  className="
    absolute
    inset-0
    z-[5]
    pointer-events-none
    overflow-hidden
  "
>
  <Particles level={level} />
</div>
{/* HAMBURGER MENU BUTTON */}

<motion.button
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  whileHover={{
    scale: 1.08,
    rotate: -3,
  }}
  whileTap={{ scale: 0.92 }}
  onClick={() => setMenuOpen(true)}
  className="
    fixed
    top-6
    left-6
    z-40

    w-12
    h-12

    md:w-14
    md:h-14

    rounded-2xl

    flex
    items-center
    justify-center

    bg-black/30
    backdrop-blur-xl

    border
    border-white/15

    text-white

    shadow-[0_15px_40px_rgba(0,0,0,0.35)]

    hover:bg-white/10
    hover:border-white/25

    transition
  "
  aria-label="Open explorer menu"
>
  <Menu size={24} />
</motion.button>
      {/* BACKGROUND GLOW */}

      <div
        className={`
          absolute
          -top-[250px]
          right-[10%]

          w-[600px]
          h-[600px]

          rounded-full

          ${theme.accent}

          opacity-[0.06]
          blur-[160px]

          pointer-events-none
        `}
      />

      {/* MAIN */}

      <div
        className="
          relative
          z-10

          min-h-screen

          flex
          items-center
          justify-center

          px-5
          py-10

          lg:px-12
        "
      >
        <div
          className="
            w-full
            max-w-[1400px]

            grid
            lg:grid-cols-[0.8fr_1.2fr]

            items-center

            gap-6
            lg:gap-12
          "
        >
          {/* ================================= */}
          {/* DINO */}
          {/* ================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              hidden
              lg:flex

              items-center
              justify-center
            "
          >
            <DinoGuide
              mood={theme.mood}
              message={theme.message}
            />
          </motion.div>

          {/* ================================= */}
          {/* EXPEDITION CARD */}
          {/* ================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className={`
              w-full

              rounded-[32px]

              ${theme.card}

              backdrop-blur-2xl

              border
              ${theme.border}

              p-6
              sm:p-8
              md:p-10

              shadow-[0_30px_100px_rgba(0,0,0,0.55)]
            `}
          >
            {/* TITLE */}

            <div className="text-center mb-8">
              <motion.div
                initial={{
                  scale: 0.5,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.3,
                }}
                className="text-4xl mb-3"
              >
                {theme.icon}
              </motion.div>

              <h1
                className="
                  title-font

                  text-4xl
                  sm:text-5xl

                  text-white
                "
              >
                {levelTitle}
              </h1>

              <p
                className={`
                  mt-3
                  text-sm
                  tracking-[0.25em]
                  uppercase

                  ${theme.text}
                `}
              >
                Prepare your expedition
              </p>
            </div>

            {/* ================================= */}
            {/* DIFFICULTY */}
            {/* ================================= */}

            <h2 className="text-lg font-bold mb-4">
              Difficulty
            </h2>

            <div
              className="
                grid
                grid-cols-3
                gap-3
                md:gap-4

                mb-8
              "
            >
             {["easy", "medium", "hard"].map((item) => (
                  <motion.button
                    key={item.charAt(0).toUpperCase() + item.slice(1)}
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    onClick={() =>
                      setDifficulty(item)
                    }
                    className={`
                      rounded-xl

                      py-3

                      font-semibold

                      border

                      transition-all
                      duration-300

                      ${
                        difficulty === item
                          ? `${theme.accent} ${theme.border} shadow-lg ${theme.glow}`
                          : `bg-white/5 border-white/10 ${theme.accentHover}`
                      }
                    `}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </motion.button>
                )
              )}
            </div>

            {/* ================================= */}
            {/* TOPIC */}
            {/* ================================= */}

            <h2 className="text-lg font-bold mb-4">
              Topic
            </h2>

            <div
              className="
                grid
                grid-cols-2

                gap-3
                md:gap-4

                mb-8
              "
            >
              {topics.map((item) => (
                <motion.button
                  key={item}
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={() =>
                    setTopic(item)
                  }
                  className={`
                    rounded-xl

                    py-3

                    font-medium

                    border

                    transition-all
                    duration-300

                    ${
                      topic === item
                        ? `${theme.accent} ${theme.border} shadow-lg ${theme.glow}`
                        : `bg-white/5 border-white/10 ${theme.accentHover}`
                    }
                  `}
                >
                  {item}
                </motion.button>
              ))}
            </div>

            {/* ================================= */}
            {/* NUMBER OF QUESTIONS */}
            {/* ================================= */}

            <h2 className="text-lg font-bold mb-4">
              Number of Questions
            </h2>

            <div
              className="
                grid
                grid-cols-3

                gap-3
                md:gap-4

                mb-10
              "
            >
              {[5, 10, 20].map((count) => (
                <motion.button
                  key={count}
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  onClick={() =>
                    setQuestionCount(count)
                  }
                  className={`
                    rounded-xl

                    py-3

                    font-semibold

                    border

                    transition-all
                    duration-300

                    ${
                      questionCount === count
                        ? `${theme.accent} ${theme.border} shadow-lg ${theme.glow}`
                        : `bg-white/5 border-white/10 ${theme.accentHover}`
                    }
                  `}
                >
                  {count}
                </motion.button>
              ))}
            </div>

            {/* ================================= */}
            {/* START */}
            {/* ================================= */}

            <motion.button
              whileHover={{
                scale: 1.02,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
             onClick={() => {
  if (level > unlockedLevel) {
    alert(`🔒 Reach Level ${level} to unlock this expedition!`);
    return;
  }

  const difficultyMap = {
    1: "easy",
    2: "easy",
    3: "medium",
    4: "hard",
    5: "boss",
  };

  navigate("/quiz", {
    state: {
      level,
      levelTitle,
      difficulty: difficultyMap[level],
      topic,
      questionCount,
    },
  });
}}
              className={`
                w-full

                rounded-2xl

                py-4

                text-lg
                md:text-xl

                font-bold

                bg-gradient-to-r
                ${theme.button}

                shadow-xl
                ${theme.glow}

                transition
              `}
            >
              ▶ Start Expedition
            </motion.button>
          </motion.div>

          {/* MOBILE DINO */}

          <div
            className="
              lg:hidden

              flex
              justify-center

              mt-4
            "
          >
            <DinoGuide
              mood={theme.mood}
              message={theme.message}
            />
          </div>
        </div>
      </div>
      {/* GLOBAL SIDE MENU */}

<SideMenu
  open={menuOpen}
  onClose={() => setMenuOpen(false)}
/>
    </div>
  );
}