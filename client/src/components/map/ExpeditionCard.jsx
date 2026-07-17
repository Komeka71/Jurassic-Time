import { motion } from "framer-motion";

export default function ExpeditionCard({
  title,
  subtitle,
  image,
  unlocked,
  completed,
  onClick,
}) {
  return (
    <motion.div
      whileHover={unlocked ? { scale: 1.05, y: -8 } : {}}
      whileTap={unlocked ? { scale: 0.98 } : {}}
      onClick={unlocked ? onClick : undefined}
      className={`
        w-[220px]
        rounded-3xl
        overflow-hidden
        cursor-pointer

        backdrop-blur-xl

        border

        ${
          unlocked
            ? "border-green-400 bg-black/35"
            : "border-gray-600 bg-black/60"
        }

        shadow-2xl
        transition-all
      `}
    >
      <img
        src={image}
        alt={title}
        className="h-36 w-full object-cover"
      />

      <div className="p-5">

        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>

        <p className="text-gray-300 mt-1">
          {subtitle}
        </p>

        <div className="mt-5">

          {completed ? (

            <div className="text-green-400 font-bold">
              ✅ Completed
            </div>

          ) : unlocked ? (

            <button
              className="
                w-full

                py-3

                rounded-xl

                bg-green-500

                font-bold

                hover:bg-green-400
              "
            >
              Explore →
            </button>

          ) : (

            <div className="text-gray-400">
              🔒 Locked
            </div>

          )}

        </div>

      </div>
    </motion.div>
  );
}