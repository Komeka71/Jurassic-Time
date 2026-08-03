
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const options = [
  "Triassic",
  "Jurassic",
  "Cretaceous",
  "Ice Age",
];

export default function QuizOptions({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="
            relative

            w-[95%]
            sm:w-[92%]
            md:w-[88%]
            lg:w-[82%]
            xl:w-[76%]

            max-w-[1180px]

            rounded-[30px]

            border border-white/10

            bg-[linear-gradient(180deg,rgba(9,28,27,.82),rgba(5,19,19,.92))]

            backdrop-blur-2xl

            shadow-[0_35px_90px_rgba(0,0,0,.45)]

            px-8
            py-7
-translate-y-10
            overflow-hidden
          "
        >
          {/* Background Glow */}

          <div
            className="
              absolute
              -top-36
              left-1/2
              h-80
              w-80
              -translate-x-1/2

              rounded-full

              bg-emerald-400/10

              blur-[110px]

              pointer-events-none
            "
          />

          {/* Header */}

          <div className="relative z-10 mb-6 flex items-center justify-between">

            <div>

              <p className="text-[11px] uppercase tracking-[0.45em] text-emerald-300/70">
                QUICK CHALLENGE
              </p>

              <h2 className="mt-2 text-xl font-semibold text-white">
                Choose an Era
              </h2>

            </div>

            <div
              className="
                flex
                items-center
                gap-2

                rounded-full

                bg-emerald-500/15

                px-4
                py-2

                text-sm
                font-semibold

                text-emerald-300
              "
            >
              <Sparkles size={16} />
              +25 XP
            </div>

          </div>

          {/* Content */}

<div className="max-w-[760px] mx-auto">
            {/* LEFT */}

            <div className="grid grid-cols-2 gap-4">

              {options.map((option) => (

                <motion.button
                  key={option}
                  whileHover={{
                    y: -3,
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="
                    group

                    flex
                    items-center
                    gap-4

                    rounded-2xl

                    border
                    border-white/10

                    bg-white/[0.05]

                    px-5
                    py-5

                    transition-all
                    duration-300

                    hover:border-emerald-400/40
                    hover:bg-emerald-500/10
                  "
                >

                  {/* Radio */}

                  <div
                    className="
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center

                      rounded-full

                      border-2
                      border-white/60

                      transition-all

                      group-hover:border-emerald-400
                    "
                  >

                    <div
                      className="
                        h-3
                        w-3

                        rounded-full

                        bg-transparent

                        transition-all

                        group-hover:bg-emerald-400
                      "
                    />

                  </div>

                  <span className="text-lg font-semibold text-white">
                    {option}
                  </span>

                </motion.button>

              ))}

            </div>
                        {/* RIGHT CTA */}
<div className="mt-8 flex justify-center">
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="
      w-full
      max-w-[420px]

      rounded-2xl

      bg-gradient-to-r
    from-emerald-500
via-emerald-600
to-green-700

      py-5

      text-xl
      font-bold
      text-[#06261b]

      shadow-xl
      shadow-emerald-500/30
    "
  >
    <div className="flex items-center justify-center gap-3">
  Start Expedition
  <ArrowRight size={22} />
</div>
  </motion.button>
</div>

          </div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}