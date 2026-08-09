import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AnimatedBackground from "../components/background/AnimatedBackground";
import TopBar from "../components/TopBar";
import ExpeditionPanel from "../components/ExpeditionPanel";
import QuestionCard from "../components/QuestionCard";
import DinoGuide from "../components/DinoGuide";
import RewardPopup from "../components/RewardPopup";
import ExpeditionComplete from "../components/ExpeditionComplete";
import TreasureChest from "../components/TreasureChest";
import SideMenu from "../components/SideMenu";
import Chatbot from "../components/chat/Chatbot";
import { useAudio } from "../context/AudioContext";
import { useAuth } from "../context/AuthContext";
import { useGuide } from "../context/GuideContext";
import { getQuestions } from "../api/quizApi";
import { getUserProgress } from "../utils/userProgress";
// import {
//   getPlayerProgress,
//   savePlayerProgress,
//   updateDailyStreak,
//   getPlayerRank,
//   completeLevel,
// } from "../utils/playerProgress";

// >>>>>>> 437461b8231e83b90eb3d3cc010ec8a954a988bc
const API_URL = import.meta.env.VITE_API_URL;

export default function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();
const {
  playEffect,
} = useAudio();

  // Logged-in explorer's real username, or "Guest" while browsing without
  // an account. Guests can still play — their run just isn't tied to a
  // persistent saved profile.
  const { user } = useAuth();
  const USERNAME = user?.username || "Guest";
  const isGuest = !user;
  const {
    level = 1,
    difficulty = "easy",
    topic = "all",
    questionCount,
  } = location.state || {};

  /*
  ========================================
  MENU
  ========================================
  */

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  /*
  ========================================
  DINO
  ========================================
  */

  const [message, setMessage] = useState(
    "Hi Explorer! 👋 Ready to discover dinosaurs?"
  );

  const [mood, setMood] = useState("idle");

  /*
  ========================================
  PLAYER
  ========================================
  */

const [player, setPlayer] = useState({
  coins: 0,
  xp: 0,
  level: 1,
  dailyStreak: 0,
  questionStreak: 0,
  bestQuestionStreak: 0,
});

useEffect(() => {
  async function loadPlayer() {
    const progress = await getUserProgress();

    setPlayer((prev) => ({
      ...prev,
      coins: progress.coins,
      xp: progress.xp,
      level: progress.level,
    }));
  }

  loadPlayer();
}, []);

  const coins = player.coins;

  const xp = player.xp;

  const dailyStreak = player.dailyStreak;

  const questionStreak =
    player.questionStreak;

const rank = (() => {
  if (xp >= 5000) return "Legend";
  if (xp >= 3000) return "Master";
  if (xp >= 1500) return "Explorer";
  if (xp >= 500) return "Ranger";
  return "Beginner";
})();

  /*
  ========================================
  QUIZ STATE
  ========================================
  */

  const [questions, setQuestions] =
    useState([]);

  const [correctAnswers, setCorrectAnswers] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState(null);

  const [submitted, setSubmitted] =
    useState(false);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [showReward, setShowReward] =
    useState(false);

  /*
  ========================================
  QUIZ ANSWER HISTORY
  ========================================
  */

  const [answers, setAnswers] = useState([]);

  /*
  ========================================
  BACKEND SUBMIT STATE
  ========================================
  */

  const [quizSaving, setQuizSaving] =
    useState(false);

  const [quizSaved, setQuizSaved] =
    useState(false);

  const quizSubmittedRef = useRef(false);

  /*
  ========================================
  EXPEDITION STATE
  ========================================
  */

  const [
    expeditionComplete,
    setExpeditionComplete,
  ] = useState(false);

  const [showChest, setShowChest] =
    useState(false);

  const [chestOpened, setChestOpened] =
    useState(false);
const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  /*
  ========================================
  QUIZ START TIME
  ========================================
  */

  const quizStartedAt = useRef(Date.now());

  /*
  ========================================
  GUIDE / CHATBOT QUIZ LOCK
  ========================================

  While the user is actively answering a question (i.e. before the reward
  chest/summary appears), quizActive is set true in GuideContext so the
  Chatbot can lock Paleo out of quiz-answer content on the backend. It's
  reset to false once the chest shows, and again on unmount so leaving the
  page never leaves a stale lock behind.
  */

  const { setQuizActive } = useGuide();

  useEffect(() => {
    setQuizActive(!showChest);
    return () => setQuizActive(false);
  }, [showChest, setQuizActive]);

  /*
  ========================================
  SAVE LOCAL PLAYER
  ========================================
  */

//  useEffect(() => {
//   if (!user) {
//     savePlayerProgress(player);
//   }
// }, [player, user]);

  /*
  ========================================
  LOAD QUESTIONS
  ========================================
  */

  useEffect(() => {
    async function loadQuestions() {
      try {console.log({
  level,
  difficulty,
  topic,
  questionCount,
});
        const data = await getQuestions(
          level,
          difficulty,
          topic,
          questionCount
        );console.log("Questions from API:", data);
console.log("First question:", data[0]);

        setQuestions(data);
      } catch (err) {
        console.error(
          "LOAD QUESTIONS ERROR:",
          err
        );
      }
    }

    loadQuestions();
  }, [
    level,
    difficulty,
    topic,
    questionCount,
  ]);

  /*
  ========================================
  CURRENT QUESTION
  ========================================
  */

  const currentQuestion =
    questions[currentIndex];

  /*
  ========================================
  PROGRESS
  ========================================
  */

  const completedQuestions =
    currentIndex + (submitted ? 1 : 0);

  const progress =
    questions.length === 0
      ? 0
      : (
          completedQuestions /
          questions.length
        ) * 100;

  /*
  ========================================
  ACCURACY
  ========================================
  */

  const accuracy =
    questions.length === 0
      ? 0
      : Math.round(
          (correctAnswers /
            questions.length) *
            100
        );

  /*
  ========================================
  QUESTION DINO MESSAGE
  ========================================
  */

  useEffect(() => {
    if (!currentQuestion) {
      return;
    }

    setMood("lookingAround");

    setMessage(
      currentQuestion.dinoMessage ||
        "👀 Let's investigate this discovery!"
    );
  }, [currentQuestion]);

  /*
  ========================================
  SUBMIT ANSWER
  ========================================
  */

  const handleSubmit = () => {
    if (
      selectedAnswer === null ||
      submitted ||
      !currentQuestion
    ) {
      return;
    }

    setSubmitted(true);
if (
  isGuest &&
  currentIndex >= 1 &&
  !sessionStorage.getItem("guestLoginPromptShown")
) {
  setShowLoginPrompt(true);
  sessionStorage.setItem("guestLoginPromptShown", "true");
}
    const isCorrect =
      selectedAnswer === currentQuestion.answer;

    /*
    ========================================
    SAVE ANSWER FOR BACKEND
    ========================================
    */

    setAnswers((prev) => [
      ...prev,
      {
        questionId:
          currentQuestion._id ||
          currentQuestion.id,

        selectedIndex: selectedAnswer,

        correct: isCorrect,

        hintUsed: null,
      },
    ]);

    /*
    ========================================
    UPDATE DAILY STREAK
    ========================================
    */

    // setPlayer((prev) => {
    //   return updateDailyStreak(prev);
    // });

    /*
    ========================================
    CORRECT ANSWER
    ========================================
    */

    if (isCorrect) {
      setCorrectAnswers(
        (prev) => prev + 1
      );
playEffect("correct");
      setPlayer((prev) => {
        const newQuestionStreak =
          (prev.questionStreak || 0) + 1;

        return {
          ...prev,

          coins:
            prev.coins +
            (currentQuestion.coins || 0),

          xp:
            prev.xp +
            (currentQuestion.xp || 0),

          questionStreak:
            newQuestionStreak,

          bestQuestionStreak: Math.max(
            prev.bestQuestionStreak || 0,
            newQuestionStreak
          ),
        };
      });

      setShowReward(true);

      setTimeout(() => {
        setShowReward(false);
      }, 1000);

      setMood("happyJumps");

      setMessage(
        currentQuestion.correctMessage ||
          "🎉 Amazing! That's absolutely correct!"
      );

      return;
    }

    /*
    ========================================
    WRONG ANSWER
    ========================================
    */

    setPlayer((prev) => ({
      ...prev,

      questionStreak: 0,
    }));
playEffect("wrong");
    setMood("sad");

    setMessage(
      `🦖 Good try! The correct answer was ${
        currentQuestion.options[
          currentQuestion.answer
        ]
      }.`
    );
  };

  /*
  ========================================
  SUBMIT COMPLETE QUIZ TO BACKEND
  ========================================
  */

  const submitQuizToBackend = async () => {
    /*
    Prevent duplicate quiz attempts.

    This matters because the chest button
    can technically be clicked more than once
    during animation / development.
    */

    if (quizSubmittedRef.current) {
      return true;
    }

    quizSubmittedRef.current = true;

    setQuizSaving(true);

    try {
      const timeTaken = Math.max(
        1,
        Math.round(
          (Date.now() -
            quizStartedAt.current) /
            1000
        )
      );

const response = await fetch(`${API_URL}/quiz/submit`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
  body: JSON.stringify({
    topic,
    difficulty,
    answers,
    score: accuracy,
    totalQuestions: questions.length,
    correctAnswers,
    timeTaken,
  }),
});

const data = await response.json();

      // const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Quiz submission failed"
        );
      }

      console.log(
        "✅ QUIZ SAVED TO MONGODB:",
        data
      );

      setQuizSaved(true);

      /*
      ========================================
      SYNC PLAYER WITH MONGODB RESPONSE
      ========================================
      */

      if (data.stats) {
        setPlayer((prev) => ({
          ...prev,

          coins:
            data.stats.coins ??
            prev.coins,

          xp:
            data.stats.xp ??
            prev.xp,

          level:
            data.stats.level ??
            prev.level,

          dailyStreak:
            data.stats.dailyStreak ??
            prev.dailyStreak,

          longestStreak:
            data.stats.longestStreak ??
            prev.longestStreak,
        }));
      }

      return true;
    } catch (err) {
      console.error(
        "❌ QUIZ SUBMIT ERROR:",
        err
      );

      /*
      Allow retry if submission genuinely fails.
      */

      quizSubmittedRef.current = false;

      setMood("thinking");

      setMessage(
        "🤔 Hmm... the fossil records didn't save. Try opening the chest again!"
      );

      return false;
    } finally {
      setQuizSaving(false);
    }
  };

  /*
  ========================================
  NEXT QUESTION
  ========================================
  */

  const nextQuestion = () => {
    if (
      currentIndex <
      questions.length - 1
    ) {
      setMood("walkingRight");

      setMessage(
        "🚶 Follow me! I think I spotted something ahead..."
      );

      setTimeout(() => {
        setCurrentIndex(
          (prev) => prev + 1
        );

        setSelectedAnswer(null);

        setSubmitted(false);

        setMood("lookingAround");

        setMessage(
          "👀 Let's investigate this discovery!"
        );
      }, 900);

      return;
    }

    /*
    ========================================
    FINAL QUESTION COMPLETE
    ========================================
    */

    setShowChest(true);

    setMood("celebrate");

    setMessage(
      "🎁 You discovered an Ancient Fossil Chest!"
    );
  };

  /*
  ========================================
  OPEN TREASURE CHEST
  ========================================
  */

//   const handleChestOpen = async () => {
//     console.log("Chest Clicked");
//     if (quizSaving) {
//       return;
//     }

//     setMood("celebrate");

//     setMessage(
//       "✨ Recording your prehistoric discovery..."
//     );

//     /*
//     ========================================
//     SAVE QUIZ TO MONGODB
//     ========================================
//     */

//     const saved =
//       await submitQuizToBackend();
//  console.log("quiz saved",saved);
//     if (!saved) {
//       return;
//     }
// /*
// ========================================
// UPDATE DAILY MISSIONS
// ========================================
// */


//   headers: {
//     "Content-Type": "application/json",
//   },

//   body: JSON.stringify({
//     expeditions: 1,
//     questions: questions.length,
//     xp: correctAnswers * 20,
//   }),
// });
// console.log("daily progrss updated");
//     /*
//     ========================================
//     COMPLETE LEVEL LOCALLY
//     ========================================
//     */

//     setPlayer((prev) =>
//       completeLevel(prev, level)
//     );
// SoapDispenserDroplet.log("player updated");
//     setTimeout(() => {
//       setMood("loveHappy");
//     }, 1500);

//     setChestOpened(true);
// console.log("chest opened");
//     setExpeditionComplete(true);
//   };
// newwww 


// const handleChestOpen = () => {
//   console.log("Chest Clicked");

//   setChestOpened(true);
//   setExpeditionComplete(true);
// };
const handleChestOpen = async () => {
  console.log("Chest Clicked");

  if (quizSaving) return;

  setMood("celebrate");
  setMessage("✨ Recording your prehistoric discovery...");

  // ============================
  // Save quiz to MongoDB
  // ============================
let saved = true;

if (!isGuest) {
  saved = await submitQuizToBackend();

  console.log("Quiz saved:", saved);

  if (!saved) return;
}

  // ============================
  // Update player locally
  // ============================

  setTimeout(() => {
    setMood("loveHappy");
  }, 1500);

  // ============================
  // Show reward screen IMMEDIATELY
  // ============================
  setChestOpened(true);
  setExpeditionComplete(true);

  console.log("Expedition Complete Screen Opened");

  // ============================
  // Update Daily Missions
  // (Don't block the UI)
  // ============================
 if (!isGuest) {
  try {
const res = await fetch(`${API_URL}/daily/${USERNAME}/progress`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
  body: JSON.stringify({
    expeditions: 1,
    questions: questions.length,
    xp: correctAnswers * 20,
  }),
});

    const data = await res.json();
    console.log("Daily Mission Updated:", data);
  } catch (err) {
    console.error("Daily Mission Update Failed:", err);
  }
}
};

console.log("expedition complete");
  /*
  ========================================
  LOADING
  ========================================
  */

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#08120D] text-white text-2xl">
        🦖 Loading Questions...
      </div>
    );
  }

  /*
  ========================================
  UI
  ========================================
  */

  return (
    <AnimatedBackground level={level}>
{showLoginPrompt && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md">

    <div
      className="
        relative
        w-[92%]
        max-w-lg
        rounded-[32px]
        overflow-hidden
        border border-green-400/30
        bg-gradient-to-b
        from-[#133523]
        to-[#09120D]
        shadow-[0_25px_80px_rgba(0,0,0,.6)]
      "
    >
      {/* Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-green-500/20 blur-[120px]" />

      <div className="relative z-10 p-8">

        {/* Dino Emoji */}
        <div className="flex justify-center mb-5">
          <div
            className="
              w-24
              h-24
              rounded-full
              bg-green-500/10
              border
              border-green-400/30
              flex
              items-center
              justify-center
              text-5xl
            "
          >
            🦖
          </div>
        </div>

        <h2 className="text-3xl font-black text-center text-yellow-300">
          Save Your Progress
        </h2>

        <p className="mt-3 text-center text-gray-300 leading-7">
          You're doing great!
          <br />
          Create a free account so your adventure is never lost.
        </p>

        <div className="mt-7 rounded-2xl bg-black/20 border border-white/10 p-5">

          <div className="grid grid-cols-2 gap-3 text-sm">

            <div>⭐ XP & Levels</div>
            <div>🪙 Coins</div>

            <div>🦕 Collection</div>
            <div>🏆 Leaderboard</div>

            <div>🎯 Daily Missions</div>
            <div>☁️ Cloud Save</div>

          </div>

        </div>

        <div className="mt-8 space-y-3">

          <button
            onClick={() => navigate("/signup")}
            className="
              w-full
              rounded-2xl
              bg-gradient-to-r
              from-green-500
              to-emerald-400
              py-4
              text-lg
              font-bold
              text-black
              hover:scale-[1.02]
              transition
            "
          >
            Create Free Account
          </button>

          <button
            onClick={() => navigate("/login")}
            className="
              w-full
              rounded-2xl
              border
              border-green-400/30
              py-4
              font-semibold
              hover:bg-white/5
              transition
            "
          >
            I already have an account
          </button>

          <button
            onClick={() => setShowLoginPrompt(false)}
            className="
              w-full
              py-2
              text-gray-400
              hover:text-white
              transition
            "
          >
            Continue as Guest →
          </button>

        </div>

      </div>

    </div>

  </div>
)}
      <div className="min-h-screen text-white">

        {/* TOP BAR */}

        <TopBar
          level={level}
          progress={progress}
          coins={coins}
          xp={xp}
          dailyStreak={dailyStreak}
          questionStreak={questionStreak}
          rank={rank}
          onMenuClick={() =>
            setMenuOpen(true)
          }
        />

        {/* SIDE MENU */}

        <SideMenu
          level={level}
          open={menuOpen}
          onClose={() =>
            setMenuOpen(false)
          }
        />

        {/* EXPEDITION PANEL */}

        <ExpeditionPanel
          level={level}
          open={drawerOpen}
          onClose={() =>
            setDrawerOpen(false)
          }
        />

        {/* MAIN CONTENT */}

        <div
          className="
            relative
            max-w-[1400px]
            mx-auto
            px-4
            sm:px-6
            md:px-8
            lg:px-8
            xl:px-12
            py-4
            md:py-6
          "
        >

          {/* QUIZ */}

          <div
            className="
              w-full
              max-w-[760px]
              mx-auto
              lg:mr-0
              xl:mr-6
            "
          >
            <RewardPopup
              show={showReward}
              xp={
                currentQuestion?.xp || 0
              }
              coins={
                currentQuestion?.coins || 0
              }
            />
{/* 
            {showChest ? (
              chestOpened ? (
                <ExpeditionComplete
                  xp={xp}
                  coins={coins}
                  accuracy={accuracy}
                  bestStreak={
                    player.bestQuestionStreak
                  }
                  level={level}
                />
              ) : (
                <TreasureChest
                  onOpen={
                    handleChestOpen
                  }
                />
              )
            ) : (
              <QuestionCard
                level={level}
                question={currentQuestion}
                currentIndex={currentIndex}
                selectedAnswer={
                  selectedAnswer
                }
                setSelectedAnswer={
                  setSelectedAnswer
                }
                setMessage={setMessage}
                setMood={setMood}
                onSubmit={handleSubmit}
                submitted={submitted}
                nextQuestion={nextQuestion}
              />
            )} */}
            {showChest ? (
  chestOpened ? (
    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        bg-black/40
        backdrop-blur-sm
      "
    >
      <ExpeditionComplete
        xp={xp}
        coins={coins}
        accuracy={accuracy}
        bestStreak={player.bestQuestionStreak}
        level={level}
        isGuest={isGuest}
      />
    </div>
  ) : (
    <TreasureChest
      onOpen={handleChestOpen}
    />
  )
) : (
  <QuestionCard
    level={level}
    question={currentQuestion}
    currentIndex={currentIndex}
    selectedAnswer={selectedAnswer}
    setSelectedAnswer={setSelectedAnswer}
    setMessage={setMessage}
    setMood={setMood}
    onSubmit={handleSubmit}
    submitted={submitted}
    nextQuestion={nextQuestion}
  />
)}
          </div>

          {/* DESKTOP DINO */}

          <div
            className="
              hidden
              lg:block
              absolute

              left-2
              xl:left-6
              2xl:left-10

              bottom-4
              xl:bottom-8
              2xl:bottom-10

              z-20
            "
          >
            {!expeditionComplete && (
              <DinoGuide
                mood={mood}
                message={message}
                level={level}
              />
            )}
          </div>

          {/* MOBILE / TABLET DINO */}

          {!expeditionComplete && (
            <div className="flex justify-center mt-2 pb-6 lg:hidden">
              <DinoGuide
                mood={mood}
                message={message}
                level={level}
              />
            </div>
          )}

        </div>
      </div>

      {/* PALEO CHATBOT */}
      <Chatbot page="quiz" />
    </AnimatedBackground>
  );
}