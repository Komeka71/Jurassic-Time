import { motion } from "framer-motion";

export default function AnswerGrid({
  options = [],
  selected,
  answered,
  correctAnswer,
  onSelect,
}) {
  return (
    <div
      className="
        w-[90%]
        max-w-[340px]

        sm:w-[92%]
        sm:max-w-[700px]

        lg:w-[760px]

        grid
        grid-cols-1
        sm:grid-cols-2

        gap-2.5
        sm:gap-5

        mx-auto
      "
    >
      {options.map((option, index) => {
        const isSelected = selected === index;
        const isCorrect = index === correctAnswer;

        let state = "default";

        if (answered) {
          if (isCorrect) state = "correct";
          else if (isSelected) state = "wrong";
        } else if (isSelected) {
          state = "selected";
        }

        return (
          <motion.button
            key={option}
            whileHover={!answered ? { scale: 1.03, y: -2 } : {}}
            whileTap={!answered ? { scale: 0.98 } : {}}
            disabled={answered}
            onClick={() => onSelect(index)}
            className={`
              group
              flex
              items-center

              gap-3
              sm:gap-4

              h-[50px]
              sm:h-[68px]
              lg:h-[74px]

              rounded-xl
              sm:rounded-2xl
              lg:rounded-3xl

              border
              backdrop-blur-xl

              px-4
              sm:px-8

              transition-all
              duration-500

              ${
                state === "correct"
                  ? "border-green-400 bg-green-500/20 shadow-lg shadow-green-500/30"
                  : state === "wrong"
                  ? "border-red-400 bg-red-500/20 shadow-lg shadow-red-500/30"
                  : state === "selected"
                  ? "border-cyan-400 bg-cyan-500/15 shadow-lg shadow-cyan-500/20"
                  : "border-white/10 bg-black/40 hover:border-cyan-400/40 hover:bg-cyan-500/10"
              }
            `}
          >
            {/* Radio */}
            <div
              className={`
                flex
                items-center
                justify-center

                h-4
                w-4

                sm:h-6
                sm:w-6

                rounded-full
                border-2
                transition-all

                ${
                  state === "correct"
                    ? "border-green-400"
                    : state === "wrong"
                    ? "border-red-400"
                    : state === "selected"
                    ? "border-cyan-400"
                    : "border-white/60 group-hover:border-cyan-400"
                }
              `}
            >
              <div
                className={`
                  h-2
                  w-2

                  sm:h-3
                  sm:w-3

                  rounded-full
                  transition-all

                  ${
                    state === "correct"
                      ? "bg-green-400"
                      : state === "wrong"
                      ? "bg-red-400"
                      : state === "selected"
                      ? "bg-cyan-400"
                      : "bg-transparent"
                  }
                `}
              />
            </div>

            {/* Text */}
            <span
              className={`
                flex-1

                text-left

                text-[15px]
                sm:text-lg
                lg:text-xl

                font-semibold
                leading-tight

                ${
                  state === "correct"
                    ? "text-green-100"
                    : state === "wrong"
                    ? "text-red-100"
                    : "text-white"
                }
              `}
            >
              {option}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}