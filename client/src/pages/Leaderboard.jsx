import {
  useMemo,
  useState,
  useEffect,
} from "react";
import { motion } from "framer-motion";
import { getUserProgress } from "../utils/userProgress";
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  Search,
  SlidersHorizontal,
  Trophy,
} from "lucide-react";

import SideMenu from "../components/SideMenu";

import LeaderboardHero from "../leaderboard/LeaderboardHero";
import Podium from "../leaderboard/Podium";
import LeaderboardRow from "../leaderboard/LeaderboardRow";

// import leaderboardData from "../data/leaderboardData";

// import {
//   getPlayerProgress,
//   getPlayerRank,
// } from "../utils/playerProgress";

/*
========================================
FILTERS
========================================
*/

const leaderboardFilters = [
  "Global",
  "Weekly",
  "Streak",
];
function getRankTitle(xp) {
  if (xp >= 5000) return "Legend";
  if (xp >= 3000) return "Master";
  if (xp >= 1500) return "Explorer";
  if (xp >= 500) return "Ranger";
  return "Beginner";
}
/*
========================================
LEADERBOARD
========================================
*/

export default function Leaderboard() {
  /*
  ========================================
  STATE
  ========================================
  */
const { user } = useAuth();

const [player, setPlayer] = useState({
  level: 1,
  xp: 0,
  coins: 0,
});
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [activeFilter, setActiveFilter] =
    useState("Global");

  const [searchQuery, setSearchQuery] =
    useState("");
const [leaderboardData, setLeaderboardData] =
  useState([]);
  useEffect(() => {
  const loadLeaderboard = async () => {
    try {
      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/leaderboard` //ll
);

      const data = await response.json();

      const formatted = data.map((player) => ({
  id: player.username,
  name: player.username,
  avatar: "🦖",
title: getRankTitle(player.xp || 0),
  xp: player.xp || 0,
  streak: player.dailyStreak || 0,
  discoveries:
    player.discoveredDinosaurs?.length || 0,
  level: player.level || 1,
}));

      setLeaderboardData(formatted);
    } catch (err) {
      console.error(
        "Failed to load leaderboard",
        err
      );
    }
  };

  loadLeaderboard();
}, []);
useEffect(() => {
  async function loadPlayer() {
    const progress = await getUserProgress();
    setPlayer(progress);
  }

  loadPlayer();
}, []);
  /*
  ========================================
  CURRENT PLAYER
  ========================================
  */



  /*
  ========================================
  CURRENT PLAYER LEADERBOARD DATA
  ========================================
  */

const currentPlayer = useMemo(() => {
  if (!user) return null;

  return (
    leaderboardData.find(
      (p) => p.name === user.username
    ) || null
  );
}, [leaderboardData, user]);
  /*
  ========================================
  SORT LEADERBOARD
  ========================================
  */

  const rankedPlayers = useMemo(() => {
    const players = [...leaderboardData];

if (
  currentPlayer &&
  !players.some(
    (player) => player.id === currentPlayer.id
  )
) {
  players.push(currentPlayer);
}

    if (activeFilter === "Weekly") {
      return players.sort(
        (a, b) =>
          (b.weeklyXp || b.xp) -
          (a.weeklyXp || a.xp)
      );
    }

    if (activeFilter === "Streak") {
      return players.sort(
        (a, b) =>
          (b.streak || 0) -
          (a.streak || 0)
      );
    }

    return players.sort(
      (a, b) =>
        (b.xp || 0) - (a.xp || 0)
    );
}, [activeFilter, currentPlayer, leaderboardData]);

  /*
  ========================================
  CURRENT PLAYER RANK
  ========================================
  */

const currentPlayerRank =
  currentPlayer
    ? rankedPlayers.findIndex(
        (leaderboardPlayer) =>
          leaderboardPlayer.id ===
          currentPlayer.id
      ) + 1
    : 0;

  /*
  ========================================
  SEARCH
  ========================================
  */

  const searchedPlayers = rankedPlayers.filter(
    (leaderboardPlayer) =>
      leaderboardPlayer.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  /*
  ========================================
  TABLE PLAYERS
  ========================================
  */

  const tablePlayers =
  searchQuery.trim().length > 0
    ? searchedPlayers
    : rankedPlayers.length > 3
      ? rankedPlayers.slice(3)
      : rankedPlayers;

  /*
  ========================================
  UI
  ========================================
  */

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
      {/* BACKGROUND */}

      <div
        className="
          fixed
          inset-0

          bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.1),transparent_35%)]

          pointer-events-none
        "
      />

      <div
        className="
          fixed

          -top-40
          right-10

          w-[500px]
          h-[500px]

          rounded-full

          bg-yellow-500/[0.05]

          blur-[160px]

          pointer-events-none
        "
      />

      {/* SIDE MENU */}

      <SideMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        level={player.level || 1}
      />

      {/* HEADER */}

      <header
        className="
          relative
          z-30

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
        {/* HEADER LEFT */}

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
              Explorer Leaderboard
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
              Hall of Prehistoric Legends
            </p>
          </div>
        </div>

        {/* PLAYER RANK */}

        <motion.div
          key={currentPlayerRank}
          initial={{
            scale: 1.12,
          }}
          animate={{
            scale: 1,
          }}
          className="
            flex
            items-center
            gap-3

            px-4
            sm:px-5

            py-3

            rounded-2xl

            bg-yellow-500/[0.07]

            border
            border-yellow-500/25
          "
        >
          <Trophy
            size={20}
            className="text-yellow-300"
          />

          <div>
            <p
              className="
                text-[9px]

                uppercase
                tracking-[0.15em]

                text-white/35
              "
            >
              Your Rank
            </p>

            <p
              className="
                font-black

                text-yellow-200
              "
            >
              #{currentPlayerRank}
            </p>
          </div>
        </motion.div>
      </header>

      {/* CONTENT */}

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
        {/* HERO */}

       <LeaderboardHero
  playerRank={currentPlayerRank}
  playerXp={player.xp}
  playerStreak={currentPlayer?.streak || 0}
  totalExplorers={rankedPlayers.length}
/>
        {/* PODIUM */}

      <Podium players={rankedPlayers} />

        {/* LEADERBOARD SECTION */}

        <section
          className="
            mt-12
          "
        >
          {/* SECTION TOP */}

          <div
            className="
              flex
              flex-col
              xl:flex-row

              xl:items-end
              xl:justify-between

              gap-6

              mb-7
            "
          >
            {/* TITLE */}

            <div>
              <div
                className="
                  flex
                  items-center
                  gap-2

                  text-green-300

                  text-xs
                  font-bold

                  uppercase
                  tracking-[0.3em]
                "
              >
                <Trophy size={16} />

                Explorer Rankings
              </div>

              <h2
                className="
                  title-font

                  mt-3

                  text-3xl
                  sm:text-4xl
                "
              >
                The expedition continues.
              </h2>

              <p
                className="
                  mt-3

                  max-w-xl

                  text-sm
                  sm:text-base

                  leading-relaxed

                  text-white/40
                "
              >
                Earn XP, protect your streak, and
                climb beyond the explorers ahead
                of you.
              </p>
            </div>

            {/* CONTROLS */}

            <div
              className="
                flex
                flex-col
                lg:flex-row

                gap-3
              "
            >
              {/* FILTERS */}

              <div
                className="
                  flex

                  gap-2

                  overflow-x-auto

                  pb-1
                "
              >
                {leaderboardFilters.map(
                  (filter) => (
                    <motion.button
                      key={filter}
                      whileTap={{
                        scale: 0.96,
                      }}
                      onClick={() =>
                        setActiveFilter(filter)
                      }
                      className={`
                        shrink-0

                        px-4
                        py-3

                        rounded-2xl

                        border

                        text-sm
                        font-bold

                        transition

                        ${
                          activeFilter === filter
                            ? `
                              bg-green-500

                              border-green-300

                              text-[#07130D]

                              shadow-lg
                              shadow-green-500/20
                            `
                            : `
                              bg-white/[0.04]

                              border-white/[0.08]

                              text-white/50

                              hover:text-white

                              hover:border-green-500/25
                            `
                        }
                      `}
                    >
                      {filter}
                    </motion.button>
                  )
                )}
              </div>

              {/* SEARCH */}

              <div
                className="
                  relative

                  min-w-0
                  sm:min-w-[280px]
                "
              >
                <Search
                  size={18}
                  className="
                    absolute

                    left-4
                    top-1/2

                    -translate-y-1/2

                    text-white/30
                  "
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(
                      event.target.value
                    )
                  }
                  placeholder="Search explorer..."
                  className="
                    w-full

                    py-3
                    pl-12
                    pr-4

                    rounded-2xl

                    bg-white/[0.04]

                    border
                    border-white/[0.08]

                    text-sm
                    text-white

                    outline-none

                    placeholder:text-white/25

                    focus:border-green-500/40

                    transition
                  "
                />
              </div>
            </div>
          </div>

          {/* COLUMN LABELS */}

          {!searchQuery && (
            <div
              className="
                hidden
                md:grid

                grid-cols-[70px_1fr_130px_110px_150px]

                gap-5

                px-6
                pb-3

                text-[10px]
                font-bold

                uppercase
                tracking-[0.18em]

                text-white/25
              "
            >
              <span>Rank</span>

              <span>Explorer</span>

              <span>Expedition</span>

              <span>Streak</span>

              <span className="text-right">
                Experience
              </span>
            </div>
          )}

          {/* ROWS */}

          <div
            className="
              flex
              flex-col

              gap-3
            "
          >
            {tablePlayers.map(
              (leaderboardPlayer, index) => {
                const actualRank =
                  rankedPlayers.findIndex(
                    (rankedPlayer) =>
                      rankedPlayer.id ===
                      leaderboardPlayer.id
                  ) + 1;

                return (
                  <LeaderboardRow
                    key={leaderboardPlayer.id}
                    player={leaderboardPlayer}
                    rank={actualRank}
                    index={index}
                    isCurrentPlayer={
  currentPlayer &&
  leaderboardPlayer.id === currentPlayer.id
}
                  />
                );
              }
            )}
          </div>

          {/* EMPTY SEARCH */}

          {tablePlayers.length === 0 && (
            <div
              className="
                mt-4

                min-h-[260px]

                rounded-[28px]

                flex
                flex-col
                items-center
                justify-center

                bg-[#0D2117]/70

                border
                border-green-500/15

                text-center

                px-6
              "
            >
              <SlidersHorizontal
                size={34}
                className="
                  text-green-300/50
                "
              />

              <h3
                className="
                  title-font

                  mt-5

                  text-2xl
                "
              >
                No explorer found.
              </h3>

              <p
                className="
                  mt-2

                  text-sm

                  text-white/35
                "
              >
                Dino checked behind every fossil.
                Probably.
              </p>
            </div>
          )}

          {/* DINO NOTE */}

          <div
            className="
              mt-7

              flex
              items-center
              justify-center

              gap-2

              text-xs

              text-white/25
            "
          >
            <span>🦖</span>

            Dino says rankings are definitely not
            emotionally devastating.
          </div>
        </section>
      </main>
    </div>
  );
}