



import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import DinoGuide from "../guide/DinoGuide";
import TeacherBubble from "./TeacherBubble";
import QuestionBoard from "./QuestionBoard";
import AnswerGrid from "./AnswerGrid";
import AcademyButton from "./AcademyButton";

import useChalkWriter from "./useChalkWriter";

export default function QuizPreview() {
  const chalk = useChalkWriter();

  const [showQuiz, setShowQuiz] = useState(false);

  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  const [teacherMessage, setTeacherMessage] = useState(
    "📚 Read the question carefully!"
  );

  const [showAcademyButton, setShowAcademyButton] = useState(false);

  // Show classroom after intro animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuiz(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  // Reset state when next question starts
useEffect(() => {
  if (!chalk.finished) {
    setSelected(null);
    setAnswered(false);
    setCorrect(false);
  }
}, [chalk.currentIndex, chalk.finished]);
const handleSelect = (index) => {
  if (answered) return;

  setSelected(index);

  const isCorrect = index === chalk.answer;

  setCorrect(isCorrect);
  setAnswered(true);

  if (isCorrect) {
    setTeacherMessage("🎉 Excellent! That's correct!");
  } else {
    setTeacherMessage(
      `❌ Not quite! The correct answer is "${chalk.options[chalk.answer]}".`
    );
  }

  setTimeout(() => {
    // LAST QUESTION
    if (chalk.isLastQuestion) {
      chalk.nextQuestion();

      setTimeout(() => {
        setTeacherMessage(
          "🎉 Wonderful work! You've completed today's classroom lesson."
        );

        setTimeout(() => {
          setTeacherMessage(
            "📚 Want to practice more and earn XP? Enter the PaleoVerse Academy!"
          );

          setShowAcademyButton(true);
        }, 2500);
      }, 600);

      return;
    }

    // NORMAL QUESTIONS
    chalk.nextQuestion();
    setTeacherMessage("📚 Read the question carefully!");
  }, 2200);
};


    return (
    <section className="relative overflow-visible bg-[#06151A]">
      {/* Atmospheric Transition */}

      <div
  className="
    absolute
    inset-x-0
    top-0
    h-40
    z-10
    pointer-events-none
  "
  style={{
    background:
      "linear-gradient(to bottom, rgba(6,21,26,1), rgba(6,21,26,.45), transparent)",
  }}
/><div className="absolute -top-36 left-0 w-full h-40 z-20 pointer-events-none overflow-hidden">
  {/* Fade from Map */}
  <div
    className="absolute inset-0"
    style={{
      background: `
        linear-gradient(
          to bottom,
          rgba(7,18,34,0) 0%,
          rgba(8,24,38,.35) 30%,
          rgba(8,24,38,.75) 65%,
          rgba(6,21,26,1) 100%
        )
      `,
    }}
  />

  {/* Soft Fog */}
  <div
    className="
      absolute
      inset-0

      bg-gradient-to-b
      from-cyan-300/5
      via-transparent
      to-transparent

      blur-2xl
    "
  />

  {/* Leaves */}
  {[...Array(10)].map((_, i) => (
    <motion.img
      key={i}
      src="/images/landing/leaf.png"
      alt=""
      initial={{
        x: -80,
        opacity: 0,
        rotate: Math.random() * 180,
      }}
      animate={{
        x: ["0vw", "110vw"],
        y: [20, 55, 10],
        rotate: [0, 180, 360],
        opacity: [0, 0.8, 0.8, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 9 + Math.random() * 3,
        delay: i * 0.4,
        ease: "linear",
      }}
      className="absolute w-5 opacity-70"
      style={{
        top: `${Math.random() * 100}%`,
      }}
    />
  ))}
</div>
      <div className="relative">
        {/* Classroom */}
        {/* Desktop & Tablet */}
<video
  src="/videos/academy/classroom.mp4"
  autoPlay
  muted
  loop
  playsInline
  className="hidden md:block w-full h-auto object-cover select-none"
/>

{/* Mobile */}
<video
  src="/videos/academy/classroomMobile2.mp4"
  autoPlay
  muted
  loop
  playsInline
className="
  block
  md:hidden

  w-full
  h-auto

  object-contain

  select-none
"
style={{
  objectPosition: "center top",
}}
/>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35" />

        {/* Bottom Fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#06151A]" />

        {/* Teacher */}
        <TeacherBubble message={teacherMessage} />

        {/* Blackboard */}
        <QuestionBoard
          lesson={chalk.lesson}
          title={chalk.title}
          question={chalk.question}
        />

        {/* Quiz */}
        {showQuiz && (
          <div
            className="
  absolute
  left-1/2
  -translate-x-1/2
bottom-[9%]
sm:bottom-[6%]
md:bottom-[2%]
lg:bottom-[1%]
  z-20

  flex
  flex-col
  items-center

  w-full
px-2
sm:px-0
"
          >
            {/* Hide answers once demo is finished */}
            {!chalk.finished && (
              <AnswerGrid
                options={chalk.options}
                selected={selected}
                answered={answered}
                correctAnswer={chalk.answer}
                onSelect={handleSelect}
              />
            )}

            {/* Show Academy CTA only after all demo questions */}
{chalk.finished && showAcademyButton && (              <div
               className="
 mt-5
sm:mt-8
md:mt-10
lg:mt-12

  flex
  justify-center
  items-center

  w-full

  px-4
"
              >
                <AcademyButton />
              </div>
            )}
          </div>
        )}

        {/* Dino */}
        <div
  className="
absolute

right-1
sm:right-2
md:right-4
lg:right-8

bottom-3
sm:bottom-8
md:bottom-6
lg:bottom-8

origin-bottom-right

scale-[0.44]
sm:scale-[0.56]
md:scale-[0.72]
lg:scale-[0.9]
xl:scale-[1.2]
2xl:scale-[1.05]

z-30

pointer-events-none
"
>
  <DinoGuide />
</div>
      </div>

      <div className="h-20 md:h-36" />
    </section>
  );
}