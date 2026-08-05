import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Award,
  CheckCircle2,
  Coins,
  Flame,
  Menu,
  Package,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

import SideMenu from "../components/SideMenu";
const isSafari =
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const ext = isSafari ? "mov" : "webm";
const USERNAME = "Shreya";

export default function Profile() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [profileData, setProfileData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/user/${encodeURIComponent(USERNAME)}`
        );

        if (!response.ok) {
          throw new Error(
            "Could not load explorer profile."
          );
        }

        const data = await response.json();

        setProfileData(data);
      } catch (err) {
        console.error(
          "PROFILE FETCH ERROR:",
          err
        );

        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <ProfileLoading />;
  }

  if (error || !profileData) {
    return (
      <ProfileError
        message={
          error ||
          "Explorer profile could not be found."
        }
      />
    );
  }

  const stats = profileData.stats || {};

  const history = profileData.history || [];

  const username =
    stats.username || USERNAME;

  const xp = stats.xp || 0;

  const coins = stats.coins || 0;

  const streak =
    stats.currentStreak || 0;

  const longestStreak =
    stats.longestStreak || 0;

  const level = stats.level || 1;

  const quizzesPlayed =
    stats.quizzesPlayed || 0;

  const highestScore =
    stats.highestScore || 0;

  const correctAnswers =
    stats.correctAnswers || 0;

  const totalAnswered =
    stats.totalAnswered || 0;

  const discoveredDinosaurs =
    stats.discoveredDinosaurs || [];

  const purchasedItems =
    stats.purchasedItems || [];

  const unlockedAchievements =
    stats.unlockedAchievements || [];

  const xpPerLevel = 250;

  const currentLevelXP =
    xp % xpPerLevel;

  const xpProgress = Math.min(
    (currentLevelXP / xpPerLevel) * 100,
    100
  );

  const accuracy =
    totalAnswered > 0
      ? Math.round(
          (correctAnswers / totalAnswered) *
            100
        )
      : 0;

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#06130D]
        text-white
      "
    >
      {/* ========================================
          BACKGROUND
      ======================================== */}

      <div
        className="
          fixed
          inset-0

          bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.17),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_35%)]

          pointer-events-none
        "
      />

      <div
        className="
          fixed

          -right-40
          top-40

          w-[600px]
          h-[600px]

          rounded-full

          bg-green-500/10

          blur-[180px]

          pointer-events-none
        "
      />

      {/* ========================================
          SIDE MENU
      ======================================== */}

      <SideMenu
        open={menuOpen}
        onClose={() =>
          setMenuOpen(false)
        }
        level={level}
      />

      {/* ========================================
          HEADER
      ======================================== */}

      <header
        className="
          relative
          z-20

          sticky
          top-0

          min-h-20

          px-4
          sm:px-6
          lg:px-10

          flex
          items-center
          justify-between

          bg-[#081A12]/90

          backdrop-blur-2xl

          border-b
          border-green-500/20
        "
      >
        <div
          className="
            flex
            items-center
            gap-4
          "
        >
          <motion.button
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.92,
            }}
            onClick={() =>
              setMenuOpen(true)
            }
            className="
              w-12
              h-12

              rounded-2xl

              flex
              items-center
              justify-center

              bg-green-500/10

              border
              border-green-500/30
            "
          >
            <Menu size={22} />
          </motion.button>

          <div>
            <h1
              className="
                title-font

                text-2xl
                sm:text-3xl
              "
            >
              Explorer Profile
            </h1>

            <p
              className="
                hidden
                sm:block

                text-xs

                uppercase
                tracking-[0.25em]

                text-green-300/60
              "
            >
              Prehistoric Identity
            </p>
          </div>
        </div>

        <div
          className="
            px-5
            py-3

            rounded-2xl

            bg-green-500/10

            border
            border-green-500/30

            text-green-300

            font-bold
          "
        >
          Level {level}
        </div>
      </header>

      {/* ========================================
          CONTENT
      ======================================== */}

      <main
        className="
          relative
          z-10

          max-w-[1400px]
          mx-auto

          px-4
          sm:px-6
          lg:px-10

          py-10
        "
      >
        {/* ========================================
            PROFILE HERO
        ======================================== */}

        <section
          className="
            relative

            min-h-[500px]

            rounded-[36px]

            overflow-hidden

            border
            border-green-500/25

            bg-[#082116]

            shadow-[0_30px_100px_rgba(0,0,0,0.35)]

            mb-10
          "
        >
          <div
            className="
              absolute
              inset-0

              bg-[radial-gradient(circle_at_80%_50%,rgba(34,197,94,0.22),transparent_35%)]

              pointer-events-none
            "
          />

          <div
            className="
              relative
              z-10

              min-h-[500px]

              grid
              lg:grid-cols-[1.1fr_0.9fr]

              items-center

              gap-10

              p-8
              sm:p-12
              lg:p-16
            "
          >
            {/* PROFILE INFO */}

            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
            >
              <p
                className="
                  flex
                  items-center
                  gap-2

                  mb-5

                  text-sm

                  uppercase
                  tracking-[0.3em]

                  text-green-300

                  font-bold
                "
              >
                <Sparkles size={17} />

                Explorer Identity
              </p>

              <h2
                className="
                  title-font

                  text-5xl
                  sm:text-6xl
                  lg:text-7xl

                  leading-[0.95]

                  mb-5
                "
              >
                {username}

                <span className="text-green-400">
                  {" "}
                  the Explorer.
                </span>
              </h2>

              <p
                className="
                  max-w-xl

                  text-lg
                  leading-relaxed

                  text-white/55

                  mb-8
                "
              >
                Fossil seeker, expedition
                survivor, and Dino's officially
                unofficial prehistoric research
                partner.
              </p>

              {/* LEVEL PROGRESS */}

              <div
                className="
                  max-w-xl

                  p-5

                  rounded-2xl

                  bg-black/20

                  border
                  border-white/10
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between

                    mb-3
                  "
                >
                  <span
                    className="
                      text-sm
                      text-white/55
                    "
                  >
                    Explorer Level {level}
                  </span>

                  <span
                    className="
                      text-sm

                      text-green-300

                      font-bold
                    "
                  >
                    {currentLevelXP} /{" "}
                    {xpPerLevel} XP
                  </span>
                </div>

                <div
                  className="
                    h-3

                    rounded-full

                    bg-black/40

                    overflow-hidden
                  "
                >
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${xpProgress}%`,
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.3,
                    }}
                    className="
                      h-full

                      rounded-full

                      bg-gradient-to-r
                      from-green-500
                      to-emerald-300
                    "
                  />
                </div>
              </div>
            </motion.div>

            {/* ========================================
                DINO
            ======================================== */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 120,
              }}
              className="
                relative

                flex
                items-center
                justify-center

                min-h-[380px]
              "
            >
              <div
                className="
                  absolute

                  w-[340px]
                  h-[340px]

                  rounded-full

                  bg-green-400/20

                  blur-[80px]
                "
              />

             <motion.video
  src={`/videos/dino/idle.${ext}`}
  autoPlay
  loop
  muted
  playsInline
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  relative
                  z-10

                  w-[330px]
                  sm:w-[400px]
                  lg:w-[470px]

                  max-h-[430px]

                  object-contain

                  drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]
                "
              />

              {/* DINO SPEECH */}

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.7,
                }}
                className="
                  absolute
                  z-20

                  top-2
                  left-0

                  max-w-[250px]

                  px-5
                  py-4

                  rounded-2xl

                  bg-[#F1FFF6]

                  text-[#082116]

                  font-bold
                  text-center

                  shadow-xl

                  border
                  border-green-200
                "
              >
                🦖 {quizzesPlayed} expeditions
                survived. I supervised all of
                them.
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ========================================
            MAIN STATS
        ======================================== */}

        <section
          className="
            grid

            grid-cols-2
            lg:grid-cols-4

            gap-5

            mb-10
          "
        >
          <StatCard
            icon={Trophy}
            label="Explorer XP"
            value={xp}
          />

          <StatCard
            icon={Coins}
            label="Fossil Coins"
            value={coins}
          />

          <StatCard
            icon={Flame}
            label="Current Streak"
            value={streak}
          />

          <StatCard
            icon={Package}
            label="Collected Gear"
            value={purchasedItems.length}
          />
        </section>

        {/* ========================================
            EXPLORER RECORD + ACHIEVEMENTS
        ======================================== */}

        <section
          className="
            grid
            lg:grid-cols-2

            gap-6

            mb-10
          "
        >
          {/* EXPLORER RECORD */}

          <div
            className="
              rounded-[30px]

              p-7
              sm:p-9

              bg-[#0A2117]

              border
              border-green-500/20
            "
          >
            <p
              className="
                flex
                items-center
                gap-2

                text-xs

                uppercase
                tracking-[0.25em]

                text-green-300

                font-bold

                mb-3
              "
            >
              <Award size={17} />

              Explorer Record
            </p>

            <h3
              className="
                title-font

                text-3xl

                mb-7
              "
            >
              Expedition statistics.
            </h3>

            <div className="space-y-4">
              <RecordRow
                label="Explorer Level"
                value={`Level ${level}`}
              />

              <RecordRow
                label="Quizzes Played"
                value={quizzesPlayed}
              />

              <RecordRow
                label="Highest Score"
                value={highestScore}
              />

              <RecordRow
                label="Species Discovered"
                value={
                  discoveredDinosaurs.length
                }
              />

              <RecordRow
                label="Longest Streak"
                value={`${longestStreak} days`}
              />

              <RecordRow
                label="Answer Accuracy"
                value={`${accuracy}%`}
              />
            </div>
          </div>

          {/* ACHIEVEMENTS */}

          <div
            className="
              rounded-[30px]

              p-7
              sm:p-9

              bg-[#0A2117]

              border
              border-green-500/20
            "
          >
            <p
              className="
                flex
                items-center
                gap-2

                text-xs

                uppercase
                tracking-[0.25em]

                text-yellow-300

                font-bold

                mb-3
              "
            >
              <Trophy size={17} />

              Field Achievements
            </p>

            <h3
              className="
                title-font

                text-3xl

                mb-7
              "
            >
              Dino-approved milestones.
            </h3>

            <div className="space-y-4">
              {quizzesPlayed > 0 && (
                <Achievement
                  emoji="🦖"
                  title="First Expedition"
                  description="Entered the prehistoric wilds."
                />
              )}

              {correctAnswers > 0 && (
                <Achievement
                  emoji="🦴"
                  title="Fossil Finder"
                  description={`${correctAnswers} correct prehistoric answers discovered.`}
                />
              )}

              {streak > 0 && (
                <Achievement
                  emoji="🔥"
                  title="Still Alive"
                  description={`${streak} day expedition streak maintained.`}
                />
              )}

              {unlockedAchievements.length >
                0 &&
                unlockedAchievements.map(
                  (achievement, index) => (
                    <Achievement
                      key={`${achievement}-${index}`}
                      emoji="🏆"
                      title={formatAchievement(
                        achievement
                      )}
                      description="Official expedition milestone unlocked."
                    />
                  )
                )}

              {quizzesPlayed === 0 &&
                unlockedAchievements.length ===
                  0 && (
                  <div
                    className="
                      py-10

                      text-center

                      text-white/40
                    "
                  >
                    🦕 No achievements yet.
                    Dino is waiting for an
                    expedition.
                  </div>
                )}
            </div>
          </div>
        </section>

        {/* ========================================
            RECENT EXPEDITIONS
        ======================================== */}

        <section
          className="
            rounded-[30px]

            p-7
            sm:p-9

            bg-[#0A2117]

            border
            border-green-500/20
          "
        >
          <p
            className="
              flex
              items-center
              gap-2

              text-xs

              uppercase
              tracking-[0.25em]

              text-cyan-300

              font-bold

              mb-3
            "
          >
            <Target size={17} />

            Expedition Log
          </p>

          <h3
            className="
              title-font

              text-3xl

              mb-7
            "
          >
            Recent prehistoric missions.
          </h3>

          {history.length === 0 ? (
            <div
              className="
                py-12

                rounded-2xl

                bg-black/20

                border
                border-white/5

                text-center

                text-white/40
              "
            >
              🗺 No expedition history found.
            </div>
          ) : (
            <div className="space-y-4">
              {history
                .slice(0, 5)
                .map((attempt, index) => (
                  <ExpeditionRow
                    key={
                      attempt._id || index
                    }
                    attempt={attempt}
                    index={index}
                  />
                ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

/*
========================================
LOADING SCREEN
========================================
*/

function ProfileLoading() {
  return (
    <div
      className="
        min-h-screen

        flex
        flex-col
        items-center
        justify-center

        bg-[#06130D]

        text-white
      "
    >
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-7xl"
      >
        🦖
      </motion.div>

      <p
        className="
          mt-6

          text-green-300

          uppercase
          tracking-[0.25em]

          text-sm
          font-bold
        "
      >
        Dino is finding your records...
      </p>
    </div>
  );
}

/*
========================================
ERROR SCREEN
========================================
*/

function ProfileError({ message }) {
  return (
    <div
      className="
        min-h-screen

        flex
        items-center
        justify-center

        px-6

        bg-[#06130D]

        text-white
      "
    >
      <div
        className="
          max-w-lg
          w-full

          p-10

          rounded-[30px]

          bg-[#0A2117]

          border
          border-red-400/20

          text-center
        "
      >
        <div className="text-6xl mb-5">
          🦖
        </div>

        <h1
          className="
            title-font

            text-4xl

            mb-4
          "
        >
          Dino lost the records.
        </h1>

        <p className="text-white/50">
          {message}
        </p>

        <p
          className="
            mt-5

            text-sm
            text-green-300/60
          "
        >
          Check that the backend server is
          running.
        </p>
      </div>
    </div>
  );
}

/*
========================================
STAT CARD
========================================
*/

function StatCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="
        p-6

        rounded-[26px]

        bg-[#0A2117]

        border
        border-green-500/20
      "
    >
      <div
        className="
          w-11
          h-11

          rounded-2xl

          flex
          items-center
          justify-center

          bg-green-500/10

          text-green-300

          mb-5
        "
      >
        <Icon size={21} />
      </div>

      <motion.p
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          text-3xl

          font-bold

          mb-1
        "
      >
        {value}
      </motion.p>

      <p className="text-sm text-white/45">
        {label}
      </p>
    </motion.div>
  );
}

/*
========================================
RECORD ROW
========================================
*/

function RecordRow({
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between

        gap-5

        px-5
        py-4

        rounded-2xl

        bg-black/20

        border
        border-white/5
      "
    >
      <span className="text-white/50">
        {label}
      </span>

      <span
        className="
          font-bold
          text-right
        "
      >
        {value}
      </span>
    </div>
  );
}

/*
========================================
ACHIEVEMENT
========================================
*/

function Achievement({
  emoji,
  title,
  description,
}) {
  return (
    <motion.div
      whileHover={{
        x: 5,
      }}
      className="
        flex
        items-center

        gap-4

        p-4

        rounded-2xl

        bg-black/20

        border
        border-white/5
      "
    >
      <div
        className="
          w-12
          h-12

          shrink-0

          rounded-2xl

          flex
          items-center
          justify-center

          bg-green-500/10

          text-2xl
        "
      >
        {emoji}
      </div>

      <div>
        <p className="font-bold">
          {title}
        </p>

        <p
          className="
            text-sm
            text-white/45

            mt-1
          "
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

/*
========================================
EXPEDITION ROW
========================================
*/

function ExpeditionRow({
  attempt,
  index,
}) {
  const score = attempt.score || 0;

  const totalQuestions =
    attempt.totalQuestions || 0;

  const coinsEarned =
    attempt.coinsEarned || 0;

  const xpEarned =
    attempt.xpEarned || 0;

  const date = attempt.createdAt
    ? new Date(
        attempt.createdAt
      ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Unknown date";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.08,
      }}
      whileHover={{
        x: 4,
      }}
      className="
        flex
        flex-col
        sm:flex-row

        sm:items-center
        sm:justify-between

        gap-5

        p-5

        rounded-2xl

        bg-black/20

        border
        border-white/5
      "
    >
      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        <div
          className="
            w-12
            h-12

            shrink-0

            rounded-2xl

            flex
            items-center
            justify-center

            bg-cyan-500/10

            text-cyan-300
          "
        >
          <CheckCircle2 size={22} />
        </div>

        <div>
          <p className="font-bold">
            Expedition #{index + 1}
          </p>

          <p
            className="
              mt-1

              text-sm
              text-white/40
            "
          >
            {date}
          </p>
        </div>
      </div>

      <div
        className="
          flex
          flex-wrap

          items-center

          gap-3
        "
      >
        <ExpeditionBadge>
          🎯 {score}
          {totalQuestions > 0
            ? ` / ${totalQuestions}`
            : ""}
        </ExpeditionBadge>

        <ExpeditionBadge>
          ✨ +{xpEarned} XP
        </ExpeditionBadge>

        <ExpeditionBadge>
          🪙 +{coinsEarned}
        </ExpeditionBadge>
      </div>
    </motion.div>
  );
}

function ExpeditionBadge({ children }) {
  return (
    <span
      className="
        px-3
        py-2

        rounded-xl

        bg-white/5

        border
        border-white/10

        text-sm
        font-bold

        text-white/70
      "
    >
      {children}
    </span>
  );
}

/*
========================================
FORMAT ACHIEVEMENT
========================================
*/

function formatAchievement(value) {
  if (typeof value !== "string") {
    return "Explorer Achievement";
  }

  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}