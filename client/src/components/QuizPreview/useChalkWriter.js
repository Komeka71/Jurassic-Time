// import { useEffect, useState } from "react";
// import { questions } from "./questions";

// export default function useChalkWriter() {
//   const [index, setIndex] = useState(0);
//   const [displayed, setDisplayed] = useState("");
//   const [finished, setFinished] = useState(false);

//   const current = questions[index];

//   const isLastQuestion = index === questions.length - 1;

//   const nextQuestion = () => {
//     let j = current.question.length;

//     const erasing = setInterval(() => {
//       j--;

//       setDisplayed(current.question.slice(0, j));

//       if (j <= 0) {
//         clearInterval(erasing);

//         if (isLastQuestion) {
//           setFinished(true);
//         } else {
//           setIndex((prev) => prev + 1);
//         }
//       }
//     }, 30);
//   };

//   useEffect(() => {
//     let i = 0;

//     setDisplayed("");

//     const writing = setInterval(() => {
//       i++;

//       setDisplayed(current.question.slice(0, i));

//       if (i >= current.question.length) {
//         clearInterval(writing);
//       }
//     }, 55);

//     return () => clearInterval(writing);
//   }, [index]);

//   return {
//     lesson: current.lesson,
//     title: current.title,
//     question: displayed,

//     options: current.options,
//     answer: current.answer,
//     fact: current.fact,

//     currentIndex: index,
//     isLastQuestion,
//     finished,

//     nextQuestion,
//   };
// }


import { useEffect, useState } from "react";
import { questions } from "./questions";

export default function useChalkWriter() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [finished, setFinished] = useState(false);

  // Custom text shown after the quiz is over
  const [customBoardText, setCustomBoardText] = useState(null);

  const current = questions[index];

  const isLastQuestion = index === questions.length - 1;

  const nextQuestion = () => {
    let j = displayed.length;

    const erasing = setInterval(() => {
      j--;

      setDisplayed(displayed.slice(0, j));

      if (j <= 0) {
        clearInterval(erasing);

        if (isLastQuestion) {
          setFinished(true);
        } else {
          setIndex((prev) => prev + 1);
        }
      }
    }, 30);
  };

  // Typewriter effect
  useEffect(() => {
    if (finished) return;

    let i = 0;

    setDisplayed("");

    const writing = setInterval(() => {
      i++;

      setDisplayed(current.question.slice(0, i));

      if (i >= current.question.length) {
        clearInterval(writing);
      }
    }, 55);

    return () => clearInterval(writing);
  }, [index, finished]);

  return {
    lesson: finished ? "LESSON COMPLETE" : current.lesson,

    title: finished
      ? "Congratulations!"
      : current.title,

    question: customBoardText ?? displayed,

    options: current.options,
    answer: current.answer,
    fact: current.fact,

    currentIndex: index,

    isLastQuestion,
    finished,

    customBoardText,
    setCustomBoardText,

    nextQuestion,
  };
}