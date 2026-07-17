import AnswerCard from "./AnswerCard";
import FactCard from "./FactCard";
import StoryBanner from "./StoryBanner";

const themes = {
  1: {
    card: "bg-[#101816]/75",
    border: "border-[#3A5C46]",
    accent: "bg-[#59D97D]",
    expedition: "text-[#7BE495]",
    submit: "from-green-600 via-emerald-500 to-green-500",
    next: "from-cyan-600 to-blue-500",
    difficulty:
      "bg-green-500/10 border-green-500/30 text-green-300",
    xp:
      "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
  },

  2: {
    card: "bg-[#241A12]/75",
    border: "border-yellow-700/40",
    accent: "bg-yellow-500",
    expedition: "text-yellow-300",
    submit: "from-yellow-700 via-amber-500 to-yellow-400",
    next: "from-yellow-600 to-orange-500",
    difficulty:
      "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
    xp:
      "bg-orange-500/10 border-orange-500/30 text-orange-300",
  },

  3: {
    card: "bg-[#26130E]/75",
    border: "border-red-700/40",
    accent: "bg-red-500",
    expedition: "text-red-300",
    submit: "from-red-700 via-orange-600 to-red-500",
    next: "from-orange-600 to-red-500",
    difficulty:
      "bg-red-500/10 border-red-500/30 text-red-300",
    xp:
      "bg-orange-500/10 border-orange-500/30 text-orange-300",
  },

  4: {
    card: "bg-[#122A39]/75",
    border: "border-cyan-600/40",
    accent: "bg-cyan-400",
    expedition: "text-cyan-300",
    submit: "from-cyan-700 via-blue-500 to-cyan-400",
    next: "from-blue-600 to-cyan-500",
    difficulty:
      "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
    xp:
      "bg-blue-500/10 border-blue-500/30 text-blue-300",
  },

  5: {
    card: "bg-[#161514]/80",
    border: "border-orange-500/30",
    accent: "bg-orange-500",
    expedition: "text-orange-300",
    submit: "from-orange-700 via-amber-500 to-orange-400",
    next: "from-amber-600 to-orange-500",
    difficulty:
      "bg-orange-500/10 border-orange-500/30 text-orange-300",
    xp:
      "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
  },
};

export default function QuestionCard({
  level = 1,
  question,
  currentIndex,
  submitted,
  selectedAnswer,
  setSelectedAnswer,
  setMessage,
  setMood,
  onSubmit,
  nextQuestion,
}) {
  const theme = themes[level] || themes[1];

  return (
    <div
      className={`
        rounded-[32px]
        ${theme.card}
        ${theme.border}
        backdrop-blur-2xl
        border
        p-5
        sm:p-6
        md:p-8
        shadow-[0_25px_80px_rgba(0,0,0,0.55)]
      `}
    >
      {/* Expedition */}
      <div className="mb-5 md:mb-7 flex items-center gap-3">

        <div
          className={`
            h-[2px]
            w-10
            rounded-full
            ${theme.accent}
          `}
        />

        <span
          className={`
            body-font
            ${theme.expedition}
            uppercase
            tracking-[0.35em]
            text-xs
            font-bold
          `}
        >
          {question.expedition}
        </span>

      </div>

      <StoryBanner
      level={level}
        story={question.story}
      />

      {/* Question */}

      <h1
        className="
          title-font
          text-2xl
          sm:text-3xl
          md:text-[2.3rem]
          font-bold
          leading-[1.15]
          tracking-tight
          mb-6
          md:mb-10
          text-white
        "
      >
        {question.text}
      </h1>

      {/* Chips */}

      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-6 md:mb-8">

        <div
          className={`
            px-3
            py-1.5
            rounded-full
            border
            text-sm
            font-medium
            ${theme.difficulty}
          `}
        >
          🌱 {question.difficulty}
        </div>

        <div
          className={`
            px-3
            py-1.5
            rounded-full
            border
            text-sm
            font-medium
            ${theme.xp}
          `}
        >
          ⭐ +{question.xp} XP
        </div>

        <div
          className="
            px-3
            py-1.5
            rounded-full
            bg-orange-500/10
            border
            border-orange-500/30
            text-orange-300
            text-sm
            font-medium
          "
        >
          ⏱ 25 sec
        </div>

      </div>

      {/* Answers */}

      <div className="space-y-3 md:space-y-5">

        {question.options.map((option, index) => (

          <AnswerCard
            key={index}
          level={level}

            index={index}
            answer={question.answer}
            submitted={submitted}
            option={option}
            selected={selectedAnswer === index}
            onClick={() => {
              setSelectedAnswer(index);
              setMessage("🤔 Hmm... I wonder if that's correct...");
              setMood("thinking");
            }}
          />

        ))}

      </div>

      <FactCard
      level={level}
        question={question}
        submitted={submitted}
      />
            {/* Submit / Next Button */}

      {!submitted ? (

        <button
          onClick={onSubmit}
          className={`
            mt-6
            md:mt-10
            w-full

            rounded-2xl

            py-3
            md:py-4

            text-lg
            md:text-xl

            font-bold
            text-white

            bg-gradient-to-r
            ${theme.submit}

            hover:scale-[1.02]
            active:scale-[0.98]

            transition-all
            duration-300

            shadow-xl
          `}
        >
          Submit
        </button>

      ) : (

        <button
          onClick={nextQuestion}
          className={`
            mt-6
            md:mt-10
            w-full

            rounded-2xl

            py-3
            md:py-4

            text-lg
            md:text-xl

            font-bold
            text-white

            bg-gradient-to-r
            ${theme.next}

            hover:scale-[1.02]
            active:scale-[0.98]

            transition-all
            duration-300

            shadow-xl
          `}
        >
          Next Question →
        </button>

      )}

    </div>
  );
}