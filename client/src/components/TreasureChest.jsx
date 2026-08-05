import { motion } from "framer-motion";

export default function TreasureChest({ onOpen }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">

      <motion.div
  animate={{
    rotate: [-4, 4, -4],
    scale: [1, 1.08, 1],
    y: [0, -8, 0],
  }}
  transition={{
    duration: 1.2,
    repeat: Infinity,
  }}
  whileHover={{
    scale: 1.15,
  }}
  whileTap={{
    scale: 0.9,
    rotate: 15,
  }}
  onClick={onOpen}
  className="
    cursor-pointer
    select-none
    text-[180px]
    drop-shadow-[0_0_35px_rgba(255,215,0,0.5)]
  "
>
  <img src="/images/treasure-chest/chest.jpg" height="180" width="180" alt="Treasure Chest" />
</motion.div>

      <h2
  className="
    mt-6
    text-4xl
    font-bold
    bg-gradient-to-r
    from-yellow-300
    to-orange-400
    bg-clip-text
    text-transparent
  "
>

        Ancient Fossil Chest

      </h2>

      <p className="text-gray-300 mt-3">

        Tap to reveal your rewards!

      </p>

    </div>
  );
}