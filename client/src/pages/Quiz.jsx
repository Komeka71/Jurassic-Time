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
import { useAudio } from "../context/AudioContext";
import { useAuth } from "../context/AuthContext";
import { getQuestions } from "../api/quizApi";

import {
  getPlayerProgress,
  savePlayerProgress,
  updateDailyStreak,
  getPlayerRank,
  completeLevel,
} from "../utils/playerProgress";

const API_URL = "http://localhost:3000";

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

const [player, setPlayer] = useState(() => {
  if (user) {
    return {
      coins: 0,
      xp: 0,
      level: 1,
      dailyStreak: 0,
      questionStreak: 0,
      bestQuestionStreak: 0,
    };
  }

  return getPlayerProgress();
});

  const coins = player.coins;

  const xp = player.xp;

  const dailyStreak = player.dailyStreak;

  const questionStreak =
    player.questionStreak;

  const rank = getPlayerRank(xp);

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
  SAVE LOCAL PLAYER
  ========================================
  */

 useEffect(() => {
  if (!user) {
    savePlayerProgress(player);
  }
}, [player, user]);

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
// Guests are prompted after answering 2 questions
if (isGuest && currentIndex >= 1) {
  setShowLoginPrompt(true);
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

    setPlayer((prev) => {
      return updateDailyStreak(prev);
    });

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

      const response = await fetch(
        `${API_URL}/api/quiz/submit`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
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
        }
      );

      const data = await response.json();

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

// await fetch(`${API_URL}/api/daily/shreya/progress`, {
//   method: "PATCH",

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
  const saved = await submitQuizToBackend();

  console.log("Quiz saved:", saved);

  if (!saved) return;

  // ============================
  // Update player locally
  // ============================
  setPlayer((prev) => completeLevel(prev, level));

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
  try {
    const res = await fetch(`${API_URL}/api/daily/shreya/progress`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
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
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <div className="w-[90%] max-w-md rounded-3xl border border-yellow-500 bg-[#10281C] p-8 text-center shadow-2xl">

      <div className="text-6xl mb-4">🦖</div>

      <h2 className="text-3xl font-bold text-yellow-300 mb-3">
        Save Your Jurassic Adventure!
      </h2>

      <p className="text-gray-200 mb-6">
        Create an account to permanently save your:
      </p>

      <div className="text-left text-green-300 mb-8 space-y-2">
        <div>✅ XP & Levels</div>
        <div>✅ Coins</div>
        <div>✅ Dinosaur Collection</div>
        <div>✅ Daily Missions</div>
        <div>✅ Leaderboard Rank</div>
      </div>

      <div className="flex flex-col gap-3">

        <button
          onClick={() => navigate("/login")}
          className="rounded-xl bg-green-600 py-3 font-bold hover:bg-green-700 transition"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="rounded-xl bg-blue-600 py-3 font-bold hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <button
          onClick={() => setShowLoginPrompt(false)}
          className="rounded-xl border border-gray-500 py-3 hover:bg-white/10 transition"
        >
          Continue as Guest
        </button>

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
    </AnimatedBackground>
  );
}