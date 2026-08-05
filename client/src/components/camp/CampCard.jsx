import { motion } from "framer-motion";

export default function CampCard({
  icon,
  title,
  subtitle,
  onClick,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.04,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
      className="
        cursor-pointer
        rounded-3xl
        bg-black/40
        backdrop-blur-xl
        border
        border-green-700/50
        p-6
        shadow-2xl
        transition-all
      "
    >
      <div className="text-5xl mb-4">
        {icon}
      </div>

      <h2 className="text-2xl font-bold text-white">
        {title}
      </h2>

      <p className="text-green-200 mt-2">
        {subtitle}
      </p>
    </motion.div>
  );
}