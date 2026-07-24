import { motion } from "framer-motion";

export default function QuestionBoard({
  lesson,
  title,
  question,
}) {
  const lessonComplete = lesson === "LESSON COMPLETE";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        absolute

        left-1/2
        -translate-x-1/2
top-[33%]
sm:top-[31%]
md:top-[24%]
lg:top-[25%]
xl:top-[26%]
        w-[90%]
        sm:w-[72%]
        md:w-[55%]
        lg:w-[42%]
        xl:w-[38%]

        text-center
        pointer-events-none
        text-[#F8F4E8]
      "
    >
      {/* Lesson */}
      <p
        className="
          uppercase
          tracking-[0.22em]

          text-[8px]
          sm:text-xs
          md:text-sm

          opacity-90
        "
        style={{
          fontFamily: "Caveat",
          textShadow: "0 0 4px rgba(255,255,255,.25)",
        }}
      >
        {lesson}
      </p>

      {/* Title */}
      <h2
        className="
          mt-1
          sm:mt-2

          font-semibold

          text-lg
          sm:text-3xl
          md:text-4xl
          lg:text-[30px]
        "
        style={{
          fontFamily: "Caveat",
          textShadow: "0 0 8px rgba(255,255,255,.18)",
        }}
      >
        {title}
      </h2>

      {/* Divider */}
      <div className="mx-auto mt-2 sm:mt-3 h-[2px] w-[55%] rounded-full bg-white/70" />

      {/* Question */}
      <div
        className="
          mt-5
          sm:mt-8

          whitespace-pre-wrap

          font-semibold

          text-[26px]
          sm:text-3xl
          md:text-4xl
          lg:text-[54px]

          leading-tight

          min-h-[90px]
          sm:min-h-[110px]
          lg:min-h-[150px]

          px-2
        "
        style={{
          fontFamily: "Caveat",
          textShadow: "0 0 6px rgba(255,255,255,.18)",
        }}
      >
        {question}

        {!lessonComplete && (
          <span className="animate-pulse">|</span>
        )}
      </div>
    </motion.div>
  );
}