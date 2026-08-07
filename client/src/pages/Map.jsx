import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import MapNode from "../components/map/MapNode";
import MapPath from "../components/map/MapPath";
import DinoGuide from "../components/DinoGuide";

// import { getUnlockedLevel } from "../utils/playerProgress";

const levels = [
  {
    id: 1,
    title: "Forest Expedition",
  },
  {
    id: 2,
    title: "Fossil Valley",
  },
  {
    id: 3,
    title: "Volcano Ridge",
  },
  {
    id: 4,
    title: "Ice Age",
  },
  {
    id: 5,
    title: "Meteor Crater",
  },
];

export default function Map() {
  const navigate = useNavigate();

// const navigate = useNavigate();

const [unlockedLevel, setUnlockedLevel] = useState(1);

useEffect(() => {
  async function loadPlayerLevel() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/dashboard`, //ll
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        setUnlockedLevel(1);
        return;
      }

      const data = await response.json();

      setUnlockedLevel(data.stats?.level || 1);
    } catch {
      setUnlockedLevel(1);
    }
  }

  loadPlayerLevel();
}, []);
const openLevel = (level) => {
  if (level.id > unlockedLevel) {
    alert(
      `🔒 Reach Level ${level.id} to unlock this expedition!`
    );
    return;
  }

  navigate("/expedition", {
    state: {
      level: level.id,
      title: level.title,
    },
  });
};

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* =========================================
          MAP BACKGROUND VIDEO
      ========================================= */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="
          fixed
          inset-0
          z-0
          w-full
          h-full
          object-cover
          animate-[slowZoom_18s_ease-in-out_infinite]
        "
      >
        <source
          src="/videos/map/island.mp4"
          type="video/mp4"
        />
      </video>

      {/* =========================================
          CINEMATIC DARK OVERLAY
      ========================================= */}

      <div
        className="
          fixed
          inset-0
          z-[1]
          bg-black/55
          pointer-events-none
        "
      />

      {/* =========================================
          JUNGLE DEPTH GRADIENT
      ========================================= */}

      <div
        className="
          fixed
          inset-0
          z-[2]
          bg-gradient-to-b
          from-[#020B14]/50
          via-transparent
          to-[#020B14]/90
          pointer-events-none
        "
      />

      {/* =========================================
          SOFT CENTER GLOW
      ========================================= */}

      <div
        className="
          fixed
          inset-0
          z-[3]
          pointer-events-none

          bg-[radial-gradient(
            circle_at_center,
            rgba(24,226,123,0.08),
            transparent_60%
          )]
        "
      />

      {/* =========================================
          MAP CONTENT
      ========================================= */}

      <div className="relative z-20 p-6 md:p-10">
        {/* TITLE */}

        <motion.h1
          initial={{
            opacity: 0,
            y: -40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            title-font
            text-5xl
            lg:text-6xl
            text-center
            drop-shadow-2xl
            mb-2
          "
        >
          🦖 Jurassic Island
        </motion.h1>

        {/* SUBTITLE */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.3,
          }}
          className="
            text-center
            text-green-200
            tracking-[0.3em]
            uppercase
            mb-12
          "
        >
          Explore the island and uncover every prehistoric mystery
        </motion.p>

        {/* =========================================
            MAP
        ========================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
          }}
          className="
            max-w-5xl
            mx-auto

            flex
            flex-col
            items-center

            mt-8
          "
        >
          {/* =====================================
              LEVEL 5 — METEOR CRATER
          ===================================== */}

          <MapNode
            title={levels[4].title}
            level={levels[4].id}
            unlocked={levels[4].id <= unlockedLevel}
            completed={levels[4].id < unlockedLevel}
            onClick={() => openLevel(levels[4])}
          />

          <MapPath />

          {/* =====================================
              LEVEL 4 — ICE AGE
          ===================================== */}

          <div className="self-start ml-10 lg:ml-24">
            <MapNode
              title={levels[3].title}
              level={levels[3].id}
              unlocked={levels[3].id <= unlockedLevel}
              completed={levels[3].id < unlockedLevel}
              onClick={() => openLevel(levels[3])}
            />
          </div>

          <MapPath />

          {/* =====================================
              LEVEL 3 — VOLCANO RIDGE
          ===================================== */}

          <div className="self-end mr-10 lg:mr-24">
            <MapNode
              title={levels[2].title}
              level={levels[2].id}
              unlocked={levels[2].id <= unlockedLevel}
              completed={levels[2].id < unlockedLevel}
              onClick={() => openLevel(levels[2])}
            />
          </div>

          <MapPath />

          {/* =====================================
              LEVEL 2 — FOSSIL VALLEY
          ===================================== */}

          <div className="self-start ml-10 lg:ml-24">
            <MapNode
              title={levels[1].title}
              level={levels[1].id}
              unlocked={levels[1].id <= unlockedLevel}
              completed={levels[1].id < unlockedLevel}
              onClick={() => openLevel(levels[1])}
            />
          </div>

          <MapPath />

          {/* =====================================
              LEVEL 1 — FOREST EXPEDITION
          ===================================== */}

          <MapNode
            title={levels[0].title}
            level={levels[0].id}
            unlocked={levels[0].id <= unlockedLevel}
            completed={levels[0].id < unlockedLevel}
            onClick={() => openLevel(levels[0])}
          />
        </motion.div>
      </div>

      {/* =========================================
          DESKTOP DINO GUIDE
      ========================================= */}

      <div
        className="
          hidden
          lg:block

          fixed
          bottom-5
          right-6

          z-30
        "
      >
        <DinoGuide
          mood="standing"
          message="🗺️ Choose an expedition! I'll guide you."
        />
      </div>

      {/* =========================================
          MOBILE / TABLET DINO
      ========================================= */}

      <div
        className="
          lg:hidden

          fixed
          bottom-2
          left-1/2
          -translate-x-1/2

          z-30
        "
      >
        <DinoGuide
          mood="standing"
          message="🗺️ Choose your next adventure!"
        />
      </div>
    </div>
  );
}