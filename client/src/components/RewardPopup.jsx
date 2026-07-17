import { AnimatePresence, motion } from "framer-motion";

export default function RewardPopup({
  show,
  xp,
  coins,
}) {
  return (
    <AnimatePresence>

      {show && (

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            y: -40,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -70,
          }}
          transition={{
            duration: 1,
          }}
          className="
            absolute
            left-1/2
            top-10
            -translate-x-1/2
            z-50
            pointer-events-none
          "
        >

          <div className="flex gap-3">

            <div
              className="
                rounded-full
                px-4
                py-2

                bg-cyan-500/20
                border
                border-cyan-400/40

                text-cyan-300
                font-bold
              "
            >
              ⭐ +{xp} XP
            </div>

            <div
              className="
                rounded-full
                px-4
                py-2

                bg-yellow-500/20
                border
                border-yellow-400/40

                text-yellow-300
                font-bold
              "
            >
              🪙 +{coins}
            </div>

          </div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}