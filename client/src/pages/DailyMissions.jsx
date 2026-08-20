import { useEffect, useState } from "react";
import GameLayout from "../components/GameLayout";
import StatCard from "../components/StatCard";
import DinoAssistant from "../components/DinoAssistant";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import SideMenu from "../components/SideMenu";
import { getUserProgress } from "../utils/userProgress";
// import { getPlayerProgress } from "../utils/playerProgress";
const BASE_URL = `${import.meta.env.VITE_API_URL}`; //ll

const EMPTY_DAILY = { streak: { current: 0 }, missions: [] };

export default function DailyMissions() {
  const { user } = useAuth();
  const [daily, setDaily] = useState(null);
  const [loading, setLoading] = useState(true);
const [menuOpen, setMenuOpen] = useState(false);

const [player, setPlayer] = useState({
  level: 1,
  xp: 0,
  coins: 0,
});
useEffect(() => {
  if (!user) return;

  async function loadPlayer() {
    const progress = await getUserProgress(user.username);
    setPlayer(progress);
  }

  loadPlayer();
}, [user]);
  const [mood, setMood] = useState("idle");
  const [message, setMessage] = useState(
    "Ready for today's missions!"
  );

useEffect(() => {
  if (user) {
    loadMissions();
  }
}, [user]);
  async function loadMissions() {
    try {
      if (!user) return;

      const res = await fetch(
        `${BASE_URL}/api/daily/${encodeURIComponent(user.username)}`
      );

      if (!res.ok) {
        console.error(
          `Failed to load daily missions (${res.status}) for user "${user.username}"`
        );
        setDaily(EMPTY_DAILY);
        setLoading(false);
        return;
      }

      const data = await res.json();

      // Guard against malformed/partial payloads so .filter() never
      // gets called on undefined further down.
      setDaily({
        streak: data?.streak ?? { current: 0 },
        missions: Array.isArray(data?.missions) ? data.missions : [],
      });
    } catch (err) {
      console.error(err);
      setDaily(EMPTY_DAILY);
    }

    setLoading(false);
  }

  async function claimReward(title) {
    try {
      const res = await fetch(
        `${BASE_URL}/api/daily/${encodeURIComponent(user.username)}/claim`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setMood("celebrate");

        setMessage(
          `ROAR! +${data.rewardXP} XP & +${data.rewardCoins} Coins!`
        );

        setTimeout(() => {
          setMood("happy");
          setMessage(
            "Amazing! Keep completing missions!"
          );
        }, 3000);

        loadMissions();
        const progress = await getUserProgress(user.username);
setPlayer(progress);
      } else {
        setMood("angry");

        setMessage(data.message);

        setTimeout(() => {
          setMood("idle");
          setMessage(
            "Ready for today's missions!"
          );
        }, 2500);
      }
    } catch (err) {
      console.error(err);

      setMood("sad");

      setMessage("Something went wrong.");

      setTimeout(() => {
        setMood("idle");
        setMessage(
          "Ready for today's missions!"
        );
      }, 2500);
    }
  }

  if (loading) {
    return (
      <div className="font-cormorant min-h-screen bg-[#06180f] flex items-center justify-center text-white text-xl font-semibold">
        Loading Daily Missions...
      </div>
    );
  }

  // Extra safety net in case daily is ever null when loading is false
  // (shouldn't happen now, but avoids a hard crash if it does).
  const safeDaily = daily ?? EMPTY_DAILY;

  const completed = safeDaily.missions.filter(
    (m) => m.claimed
  ).length;

 return (
  <div
    className="
      relative
      min-h-screen
      bg-[#06130D]
      text-white
      overflow-x-hidden
    "
  >
    <SideMenu
      open={menuOpen}
      onClose={() => setMenuOpen(false)}
      level={player.level || 1}
    />

    {/* HEADER */}
   <header
  className="
    sticky
    top-0
    z-50
    min-h-20
    flex
    items-center
    justify-between
    px-4
    sm:px-6
    lg:px-10
    bg-[#081A12]/95
    backdrop-blur-xl
    border-b
    border-green-500/20
  "
>
  <div className="flex items-center gap-4">
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => setMenuOpen(true)}
      className="
        w-12 h-12
        rounded-2xl
        flex items-center justify-center
        bg-green-500/10
        border border-green-500/30
      "
    >
      <Menu size={22} />
    </motion.button>

    <div>
      <h1 className="title-font text-2xl sm:text-3xl">
        Daily Missions
      </h1>

      <p className="hidden sm:block text-xs uppercase tracking-[0.25em] text-green-300/60">
        Complete missions • Earn rewards
      </p>
    </div>
  </div>

  <div
    className="
      px-4 py-2
      rounded-2xl
      bg-[#163425]
      border border-green-500/20
      text-green-300
      font-semibold
    "
  >
    🔥 {safeDaily.streak.current}
  </div>
</header>

    <main
      className="
        max-w-[1400px]
        mx-auto
        px-4
        sm:px-6
        lg:px-10
        py-10
      "
    >
<SideMenu
    open={menuOpen}
    onClose={() => setMenuOpen(false)}
    level={player.level || 1}
/>
      {/* HERO */}

<section className="max-w-5xl mx-auto mb-14">

        <div
          className="
          rounded-[34px]
          border font-cormorant 
          border-[#215a39]
          bg-gradient-to-br
          from-[#123126]
          to-[#0b1913]
          shadow-[0_30px_80px_rgba(0,0,0,.45)]
          p-8
          "
        >
          <div className="flex flex-col items-center">

            <div className="mb-5 text-center">

              <p className="font-cormorant uppercase tracking-[0.35em] text-green-400 text-xs">
                CURRENT STREAK
              </p>

              <h2 className="font-cormorant text-2xl font-black mt-2">
                🔥 {safeDaily.streak.current}
              </h2>

              <p className="font-cormorant text-gray-400 mt-3">
                Keep exploring every day.
              </p>

            </div>

            <DinoAssistant
              mood={mood}
              message={message}
            />

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-7 mb-14">

        <StatCard
          icon="⭐"
          title="Total XP"
value={player.xp}          color="text-yellow-300"
        />

        <StatCard
          icon="🪙"
          title="Coins"
value={player.coins}
          color="text-yellow-300"
        />

        <StatCard
  icon="🏆"
  title="Level"
value={player.level}
  color="text-green-400"
/>
      </section>

      {/* MISSIONS */}
<div className="mb-6 flex justify-end">
    <span className="px-4 py-2 rounded-xl bg-[#163425] text-green-400 font-semibold">
        Claimed: {completed}/{safeDaily.missions.length}
    </span>
</div>

      {safeDaily.missions.length === 0 ? (
        <div className="rounded-[30px] border border-[#1d5a39] bg-gradient-to-br from-[#10271d] via-[#0d1f17] to-[#091510] p-9 text-center text-gray-400">
          No missions available right now. Check back soon!
        </div>
      ) : (
      <section className="space-y-8">

        {safeDaily.missions.map((mission) => {

          const percent = Math.min(
            (mission.progress / mission.goal) * 100,
            100
          );

          return (

            <div
              key={mission._id}
              className="
              rounded-[30px]
              border
              font-cormorant 
              border-[#1d5a39]
              bg-gradient-to-br
              from-[#10271d]
              via-[#0d1f17]
              to-[#091510]
              shadow-[0_25px_70px_rgba(0,0,0,.45)]
              hover:border-[#32e07d]
              hover:-translate-y-1
              transition-all
              duration-300
              p-7
              lg:p-9
              "
            >

              {/* TOP */}

              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">

                <div className="flex-1">

                  <div className="flex items-center gap-3 flex-wrap">

                    <h2 className="text-2xl md:text-4xl font-bold">
                      {mission.title}
                    </h2>

                    {mission.claimed && (

                      <span
                        className="
                        px-4
                        py-1
                        rounded-full
                        bg-green-500/20
                        border
                        border-green-600
                        text-green-300
                        text-sm font-cormorant 
                        "
                      >
                        Claimed
                      </span>

                    )}

                  </div>

                  <p className="text-gray-400 mt-4 leading-7 max-w-3xl">
                    {mission.description}
                  </p>

                </div>

                <div className="text-left lg:text-right">

                  <p className="uppercase tracking-[0.25em] text-xs text-gray-500">
                    Progress
                  </p>

                  <h3 className="text-2xl font-black mt-2 text-green-400">
                    {mission.progress}
                    <span className="text-gray-500">
                      {" "}
                      / {mission.goal}
                    </span>
                  </h3>

                  {mission.completed ? (

                    <p className="font-cormorant mt-3 text-green-400 font-semibold">
                      ✅ Ready to claim
                    </p>

                  ) : (

                    <p className="font-cormorant mt-3 text-yellow-400 font-semibold">
                      In Progress
                    </p>

                  )}

                </div>

              </div>

              {/* Progress */}

              <div className="mt-8">

                <div className="flex justify-between text-sm text-gray-400 mb-3">

                  <span>Completion</span>

                  <span>{Math.floor(percent)}%</span>

                </div>

                <div className="h-4 rounded-full bg-[#173427] overflow-hidden">

                  <div
                    className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-[#1ddf7b]
                    via-[#47f7b7]
                    to-[#d8ff68]
                    transition-all
                    duration-700
                    "
                    style={{
                      width: `${percent}%`,
                    }}
                  />

                </div>

              </div>

              {/* Rewards */}

              <div className="mt-8 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

                <div className="flex flex-wrap gap-8">

                  <div>

                    <p className="font-cormorant uppercase text-xs tracking-[0.25em] text-gray-500">
                      XP
                    </p>

                    <h6 className="font-cormorant font-bold text-xl text-yellow-300 mt-2">
                      ⭐ {mission.rewardXP}
                    </h6>

                  </div>

                  <div>

                    <p className="font-cormorant uppercase text-xs tracking-[0.25em] text-gray-500">
                      Coins
                    </p>

                    <h6 className="font-cormorant text-xl font-bold text-yellow-400 mt-2">
                      🪙 {mission.rewardCoins}
                    </h6>

                  </div>

                </div>


                                <div>

                  {mission.completed && !mission.claimed ? (

                    <button
                      onClick={() => claimReward(mission.title)}
                      className="
                      px-8
                      py-4
                      rounded-2xl
                      bg-gradient-to-r
                      from-[#19df7d]
                      to-[#47f7b7]
                      text-black
                      font-bold
                      text-lg
                      hover:scale-105
                      hover:shadow-[0_0_30px_rgba(25,223,125,.45)]
                      transition-all
                      duration-300
                      "
                    >
                      Claim Reward
                    </button>

                  ) : mission.claimed ? (

                    <button
                      disabled
                      className="
                      px-8
                      py-4
                      rounded-2xl
                      border
                      border-green-700
                      bg-[#173126]
                      text-green-300
                      font-bold
                      "
                    >
                      Claimed ✓
                    </button>

                  ) : (

                    <button
                      disabled
                      className="
                      px-8
                      py-4
                      rounded-2xl
                      bg-[#22342b]
                      text-gray-400
                      cursor-not-allowed
                      "
                    >
                      Complete Mission
                    </button>

                  )}

                </div>

              </div>

            </div>

          );

        })}

      </section>
      )}

       </main>
  </div>
);


}