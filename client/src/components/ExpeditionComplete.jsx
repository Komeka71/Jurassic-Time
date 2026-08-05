import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useNavigate, useLocation } from "react-router-dom";
import { unlockNextLevel } from "../utils/progress";
// import { useNavigate } from "react-router-dom";
//import { unlockNextLevel } from "../utils/progress";
// import { unlockNextLevel } from "../utils/progress";

export default function ExpeditionComplete({
  xp,
  coins,
  accuracy,
  bestStreak,
  level,
  isGuest = false,
}) {
    // const navigate = useNavigate();
    const isSafari =
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const ext = isSafari ? "mov" : "webm";
    const width = window.innerWidth;
const height = window.innerHeight;
const navigate = useNavigate();
const location = useLocation();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="
        max-w-5xl
        mx-auto
        rounded-[32px]
        bg-[#101816]/90
        backdrop-blur-xl
        border
        border-green-900/40
        p-10
        text-center
        shadow-2xl
      "
    >
        <Confetti
  width={width}
  height={height}
  numberOfPieces={220}
  recycle={false}
  gravity={0.22}
/>
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="title-font text-5xl mb-3"
      >
        🏆 Expedition Complete!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="text-gray-300 text-lg"
      >
        Your dinosaur adventure is complete!
      </motion.p>



{/* <div className="mt-10 grid lg:grid-cols-[220px_1fr] gap-8 items-center"> */}
{/* <div className="mt-10 grid lg:grid-cols-[300px_1fr] gap-10 items-center"> */}
  {/* Dino */}
  {/* <div className="mt-10 grid lg:grid-cols-[300px_1fr] gap-10 items-center min-h-[320px]"> */}
<div className="mt-10 grid lg:grid-cols-[280px_1.3fr] gap-12 items-center min-h-[320px]">
  <motion.div
    initial={{ x: -40, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{
      delay: 0.4,
      type: "spring",
      stiffness: 160,
    }}
    className="
flex
flex-col
items-center
h-full
self-center
w-full
justify-center
"
  ><div
  className="
    mb-5
    rounded-2xl
    bg-white
    px-5
    py-3
    text-black
    font-semibold
    shadow-xl
    relative
  "
>
  You did it! 🎉
</div>
    <video
  autoPlay
  loop
  muted
  playsInline
  className="w-64 h-64 object-contain"
>
  <source
    src={`/videos/dino/loveHappy.${ext}`}
    type={
      isSafari
        ? 'video/mp4; codecs="hvc1"'
        : "video/webm"
    }
  />
</video>
  </motion.div>

  {/* Reward Cards */}

  <div className="grid grid-cols-2 gap-5">

    {/* XP */}

    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.45 }}
      whileHover={{ scale: 1.05 }}
      className="
rounded-2xl
bg-[#1B2B22]
min-h-[150px]
p-6
flex
flex-col
items-center
justify-center
text-center
"
    >
      <div className="text-4xl">⭐</div>

      <div className="mt-2 font-bold text-2xl">
        {xp} XP
      </div>
    </motion.div>

    {/* Coins */}

    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.55 }}
      whileHover={{ scale: 1.05 }}
     className="
rounded-2xl
bg-[#1B2B22]
min-h-[150px]
p-6
flex
flex-col
items-center
justify-center
text-center
"
    >
      <div className="text-4xl">🪙</div>

      <div className="mt-2 font-bold text-2xl">
        {coins} Coins
      </div>
    </motion.div>

    {/* Accuracy */}

    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.65 }}
      whileHover={{ scale: 1.05 }}
     className="
rounded-2xl
bg-[#1B2B22]
min-h-[150px]
p-6
flex
flex-col
items-center
justify-center
text-center
"
    >
      <div className="text-4xl">🎯</div>

      <div className="mt-2 font-bold text-2xl">
        {accuracy}%
      </div>

      <div className="text-sm text-gray-400 mt-1">
        Accuracy
      </div>
    </motion.div>

    {/* Best Streak */}

    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.75 }}
      whileHover={{ scale: 1.05 }}
     className="
rounded-2xl
bg-[#1B2B22]
min-h-[150px]
p-6
flex
flex-col
items-center
justify-center
text-center
"
    >
      <div className="text-4xl">🔥</div>

      <div className="mt-2 font-bold text-2xl">
        {bestStreak}
      </div>

      <div className="text-sm text-gray-400 mt-1">
        Best Streak
      </div>
    </motion.div>

  </div>

</div>

      {/* <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        whileHover={{
          scale: 1.03,
          boxShadow: "0 0 25px rgba(34,197,94,.5)",
        }}
        whileTap={{ scale: 0.98 }}
        className="
          mt-10
          w-full
          rounded-2xl
          py-4
          text-xl
          font-bold
          bg-gradient-to-r
          from-green-600
          to-emerald-500
        "
      >
        Continue Adventure →
      </motion.button> */}

      {isGuest && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="
            mt-8
            rounded-2xl
            border
            border-green-500/25
            bg-green-500/10
            px-5
            py-4
            text-sm
            text-green-100
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-3
          "
        >
          <span>
            You're playing as a guest — log in to save this progress to your profile.
          </span>

          <button
            onClick={() =>
              navigate("/login", { state: { from: location } })
            }
            className="
              shrink-0
              rounded-xl
              bg-green-500
              px-4
              py-2
              text-xs
              font-bold
              text-black
              hover:bg-green-400
              transition
            "
          >
            Log In
          </button>
        </motion.div>
      )}

<button
  onClick={() => {
    unlockNextLevel(level);

    navigate("/map");
  }}
  className="
    mt-10
    w-full
    rounded-2xl
    py-4
    text-xl
    font-bold
    bg-gradient-to-r
    from-green-600
    to-emerald-500
  "
>
  Continue Adventure →
</button>
    </motion.div>
  );
}