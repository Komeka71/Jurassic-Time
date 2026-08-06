import { motion } from "framer-motion";

const images = {
  1: "/images/map/forest.png",
  2: "/images/map/fossil.png",
  3: "/images/map/volcano.png",
  4: "/images/map/ice.png",
  5: "/images/map/meteor.png",
};

const difficulty = {
  1: "Easy",
  2: "Easy",
  3: "Medium",
  4: "Hard",
  5: "Legendary",
};

export default function MapNode({
  title,
  level,
  unlocked,
  completed,
  onClick,
}) {
  return (
    <motion.div
      animate={
        unlocked
          ? {
              y: [0, -8, 0],
            }
          : {}
      }
      transition={{
        repeat: Infinity,
        duration: 3,
      }}
      whileHover={unlocked ? { scale: 1.05 } : {}}
      whileTap={unlocked ? { scale: 0.98 } : {}}
      onClick={unlocked ? onClick : undefined}
      className={`
        w-[220px]
        rounded-3xl
        overflow-hidden
        cursor-pointer

        backdrop-blur-xl

        transition-all

        ${
          unlocked
            ? "bg-black/45 border border-green-400 shadow-green-500/20 shadow-2xl"
            : "bg-black/60 border border-gray-700 opacity-50"
        }
      `}
    >
      <img
        src={images[level]}
        className="w-full h-36 object-cover"
        alt=""
      />

      <div className="p-5">

        <div className="flex justify-between items-center">

          <h2 className="font-bold text-lg">
            {title}
          </h2>

          {completed ? "✅" : unlocked ? "⭐" : "🔒"}

        </div>

        <p className="text-green-300 text-sm mt-2">
          {difficulty[level]}
        </p>

        <button
          disabled={!unlocked}
          className={`
            mt-5

            w-full

            rounded-xl

            py-3

            font-bold

            transition

            ${
              unlocked
                ? "bg-green-500 hover:bg-green-400"
                : "bg-gray-700"
            }
          `}
        >
          {completed
            ? "Replay"
            : unlocked
            ? "Explore →"
            : "Locked"}
        </button>

      </div>
    </motion.div>
  );
}