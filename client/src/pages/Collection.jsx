import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  Menu,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import SideMenu from "../components/SideMenu";
import DinoGuide from "../components/DinoGuide";

import CollectionHero from "../collection/CollectionHero";
import CollectionCard from "../collection/CollectionCard";
import DinoInspectModal from "../collection/DinoInspectModal";

import dinosaurs from "../data/dinosaurs";

/*
========================================
API CONFIG
========================================
*/

const API_URL = "http://localhost:3000";

const USERNAME = "Shreya";

/*
========================================
ERA FILTERS
========================================
*/

const eras = [
  "All",
  "Triassic",
  "Jurassic",
  "Cretaceous",
];

/*
========================================
RARITY ORDER
========================================
*/

const rarityOrder = {
  Common: 1,
  Rare: 2,
  Epic: 3,
  Legendary: 4,
};

/*
========================================
DEFAULT PLAYER
========================================
*/

const defaultPlayer = {
  username: USERNAME,

  level: 1,

  discoveredDinosaurs: [],

  soundPreferences: {
    music: true,
    effects: true,
  },
};

/*
========================================
DINO DEFAULT MESSAGE
========================================
*/

const DEFAULT_DINO_MESSAGE =
  "🌿 So many ancient friends... and absolutely no suspicious fossils.";

/*
========================================
COLLECTION SOUNDS

Optional sound files:

public/
  sounds/
    collection/
      open.mp3
      filter.mp3
      search.mp3
      discover.mp3
      locked.mp3
      legendary.mp3

Missing sounds never break Collection.
========================================
*/
const collectionSounds = {
  open: "/sounds/collection/open.mp3",

  filter: "/sounds/collection/filter.mp3",

  search: "/sounds/collection/search.mp3",

  discover: "/sounds/collection/discover.mp3",

  locked: "/sounds/collection/locked.mp3",

  legendary:
    "/sounds/collection/legendary.mp3",
};

/*
========================================
COLLECTION PAGE
========================================
*/

export default function Collection() {
  /*
  ========================================
  ACCESSIBILITY
  ========================================
  */

  const shouldReduceMotion =
    useReducedMotion();

  /*
  ========================================
  PLAYER
  ========================================
  */

  const [player, setPlayer] =
    useState(defaultPlayer);

  const [
    collectionLoading,
    setCollectionLoading,
  ] = useState(true);

  /*
  ========================================
  PAGE STATE
  ========================================
  */

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [
    selectedDinosaur,
    setSelectedDinosaur,
  ] = useState(null);

  const [era, setEra] = useState("All");

  const [search, setSearch] =
    useState("");

  const [sortBy, setSortBy] =
    useState("Discovery");

  /*
  ========================================
  DINO STATE
  ========================================
  */

  const [dinoMood, setDinoMood] =
    useState("wave");

  const [dinoMessage, setDinoMessage] =
    useState(
      "🦖 Welcome to the archive! I definitely remember every dinosaur in here."
    );

  /*
  ========================================
  REFS
  ========================================
  */

  const moodTimerRef = useRef(null);

  const searchTimerRef = useRef(null);

  const audioRef = useRef(null);

  /*
  ========================================
  SOUND HELPER
  ========================================
  */

  const playSound = useCallback(
    (soundName) => {
      const soundSource =
        collectionSounds[soundName];

      if (!soundSource) {
        return;
      }

      /*
      Respect MongoDB sound preferences.
      */

      if (
        player.soundPreferences?.effects ===
        false
      ) {
        return;
      }

      try {
        if (audioRef.current) {
          audioRef.current.pause();

          audioRef.current.currentTime = 0;
        }

        const audio = new Audio(soundSource);

        audio.volume = 0.28;

        audioRef.current = audio;

        audio.play().catch(() => {
          /*
          Browser may block audio before
          the first user interaction.

          Collection continues normally.
          */
        });
      } catch {
        /*
        Sound is enhancement only.

        Never break Collection for audio.
        */
      }
    },
    [player.soundPreferences?.effects]
  );

  /*
  ========================================
  DINO REACTION HELPER
  ========================================
  */

  const reactDino = useCallback(
    (
      mood,
      message,
      duration = 3500
    ) => {
      if (moodTimerRef.current) {
        clearTimeout(
          moodTimerRef.current
        );
      }

      setDinoMood(mood);

      setDinoMessage(message);

      if (duration) {
        moodTimerRef.current = setTimeout(
          () => {
            setDinoMood("idle");

            setDinoMessage(
              DEFAULT_DINO_MESSAGE
            );
          },
          duration
        );
      }
    },
    []
  );

  /*
  ========================================
  LOAD PLAYER FROM BACKEND
  ========================================
  */

  const fetchPlayer = useCallback(
    async ({
      showErrorReaction = true,
    } = {}) => {
      try {
        const response = await fetch(
          `${API_URL}/api/user/${USERNAME}`
        );

        if (!response.ok) {
          throw new Error(
            "Could not load collection progress"
          );
        }

        const data = await response.json();

        setPlayer({
          ...defaultPlayer,

          ...(data.stats || {}),

          discoveredDinosaurs:
            data.stats
              ?.discoveredDinosaurs || [],

          soundPreferences:
            data.stats?.soundPreferences || {
              music: true,
              effects: true,
            },
        });

        return data.stats;
      } catch (error) {
        console.error(
          "COLLECTION PLAYER FETCH ERROR:",
          error
        );

        if (showErrorReaction) {
          reactDino(
            "thinking",
            "🤔 Hmm... the archive records are hiding from me.",
            4000
          );
        }

        return null;
      } finally {
        setCollectionLoading(false);
      }
    },
    [reactDino]
  );

  /*
  ========================================
  INITIAL PLAYER LOAD
  ========================================
  */

  useEffect(() => {
    fetchPlayer();
  }, [fetchPlayer]);

  /*
  ========================================
  SYNC LEVEL UNLOCKS TO MONGODB

  Player level decides which dinosaurs
  are eligible to be discovered.

  MongoDB stores the discovered IDs.
  ========================================
  */

  useEffect(() => {
    if (collectionLoading) {
      return;
    }

    const syncUnlockedDinosaurs = async () => {
      const unlockedDinosaurs = dinosaurs.filter(
        (dinosaur) =>
          (player.level || 1) >=
          (dinosaur.discoveredAtLevel || 1)
      );

      const missingDinosaurs =
        unlockedDinosaurs.filter(
          (dinosaur) =>
            !(
              player.discoveredDinosaurs || []
            ).includes(dinosaur.id)
        );

      if (missingDinosaurs.length === 0) {
        return;
      }

      try {
        for (const dinosaur of missingDinosaurs) {
          const response = await fetch(
            `${API_URL}/api/collection/${USERNAME}/discover`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                dinosaurId: dinosaur.id,
              }),
            }
          );

          if (!response.ok) {
            throw new Error(
              `Could not discover ${dinosaur.name}`
            );
          }

          console.log(
            "🦖 DINOSAUR DISCOVERED:",
            dinosaur.name
          );
        }

        const refreshedStats = await fetchPlayer({
          showErrorReaction: false,
        });

        if (refreshedStats) {
          reactDino(
            "happyJumps",
            `🦖 Archive updated! ${
              refreshedStats.discoveredDinosaurs?.length || 0
            } prehistoric friends discovered.`,
            3500
          );
        }
      } catch (error) {
        console.error(
          "DINOSAUR SYNC ERROR:",
          error
        );

        reactDino(
          "thinking",
          "🤔 I found the fossils, but the archive clerk dropped the records.",
          4000
        );
      }
    };

    syncUnlockedDinosaurs();
  }, [
    collectionLoading,
    player.level,
    player.discoveredDinosaurs,
    fetchPlayer,
    reactDino,
  ]);

  /*
  ========================================
  REFRESH PLAYER

  Keeps Collection synced after returning
  from Quiz, Shop, Profile, etc.
  ========================================
  */

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState ===
        "visible"
      ) {
        fetchPlayer({
          showErrorReaction: false,
        });
      }
    };

    const handleFocus = () => {
      fetchPlayer({
        showErrorReaction: false,
      });
    };

    window.addEventListener(
      "focus",
      handleFocus
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      window.removeEventListener(
        "focus",
        handleFocus
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [fetchPlayer]);

  /*
  ========================================
  ENTRY REACTION
  ========================================
  */

  useEffect(() => {
    moodTimerRef.current = setTimeout(
      () => {
        setDinoMood("idle");

        setDinoMessage(
          DEFAULT_DINO_MESSAGE
        );
      },
      4500
    );

    return () => {
      if (moodTimerRef.current) {
        clearTimeout(
          moodTimerRef.current
        );
      }

      if (searchTimerRef.current) {
        clearTimeout(
          searchTimerRef.current
        );
      }

      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  /*
  ========================================
  DISCOVERY CHECK

  MongoDB is the source of truth.

  A dinosaur is unlocked ONLY when its ID
  exists inside:

  stats.discoveredDinosaurs
  ========================================
  */

  const isDiscovered = useCallback(
    (dinosaur) => {
      return (
        player.discoveredDinosaurs || []
      ).includes(dinosaur.id);
    },
    [player.discoveredDinosaurs]
  );

  /*
  ========================================
  DISCOVERED DINOSAURS
  ========================================
  */

  const discoveredDinosaurs = useMemo(
    () =>
      dinosaurs.filter((dinosaur) =>
        isDiscovered(dinosaur)
      ),
    [isDiscovered]
  );

  const discoveredCount =
    discoveredDinosaurs.length;

  /*
  ========================================
  FILTER + SEARCH + SORT
  ========================================
  */

  const visibleDinosaurs = useMemo(() => {
    let result = [...dinosaurs];

    /*
    FILTER BY ERA
    */

    if (era !== "All") {
      result = result.filter(
        (dinosaur) =>
          dinosaur.era === era
      );
    }

    /*
    SEARCH
    */

    const cleanSearch =
      search.trim().toLowerCase();

    if (cleanSearch) {
      result = result.filter(
        (dinosaur) => {
          const name =
            dinosaur.name?.toLowerCase() ||
            "";

          const nickname =
            dinosaur.nickname
              ?.toLowerCase() || "";

          const eraName =
            dinosaur.era?.toLowerCase() ||
            "";

          const rarity =
            dinosaur.rarity?.toLowerCase() ||
            "";

          return (
            name.includes(cleanSearch) ||
            nickname.includes(cleanSearch) ||
            eraName.includes(cleanSearch) ||
            rarity.includes(cleanSearch)
          );
        }
      );
    }

    /*
    SORT
    */

    if (sortBy === "Name") {
      result.sort((first, second) =>
        first.name.localeCompare(second.name)
      );
    }

    if (sortBy === "Rarity") {
      result.sort(
        (first, second) =>
          (rarityOrder[second.rarity] || 0) -
          (rarityOrder[first.rarity] || 0)
      );
    }

    if (sortBy === "Discovery") {
      result.sort((first, second) => {
        const firstDiscovered =
          isDiscovered(first);

        const secondDiscovered =
          isDiscovered(second);

        if (
          firstDiscovered !==
          secondDiscovered
        ) {
          return firstDiscovered ? -1 : 1;
        }

        return (
          (first.discoveredAtLevel || 0) -
          (second.discoveredAtLevel || 0)
        );
      });
    }

    return result;
  }, [
    era,
    search,
    sortBy,
    isDiscovered,
  ]);

  /*
  ========================================
  SEARCH RESULT REACTION
  ========================================
  */

  useEffect(() => {
    if (searchTimerRef.current) {
      clearTimeout(
        searchTimerRef.current
      );
    }

    const cleanSearch = search.trim();

    if (!cleanSearch) {
      return;
    }

    searchTimerRef.current = setTimeout(
      () => {
        if (
          visibleDinosaurs.length === 0
        ) {
          reactDino(
            "thinking",
            "🤔 Hmm... I searched every fossil pile. Are you sure that dinosaur exists?",
            4000
          );

          return;
        }

        if (
          visibleDinosaurs.length === 1
        ) {
          reactDino(
            "pointingRight",
            `👀 Found ${visibleDinosaurs[0].name}! My fossil detective skills remain unmatched.`,
            3200
          );

          return;
        }

        reactDino(
          "lookingAround",
          `🔎 I found ${visibleDinosaurs.length} possible matches. One of them is probably the dinosaur you meant.`,
          3000
        );
      },
      500
    );

    return () => {
      if (searchTimerRef.current) {
        clearTimeout(
          searchTimerRef.current
        );
      }
    };
  }, [
    search,
    visibleDinosaurs,
    reactDino,
  ]);

  /*
  ========================================
  ESCAPE KEY
  ========================================
  */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") {
        return;
      }

      if (selectedDinosaur) {
        setSelectedDinosaur(null);

        reactDino(
          "idle",
          "🌿 Back to the archive. The fossils missed us.",
          2500
        );

        return;
      }

      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    menuOpen,
    selectedDinosaur,
    reactDino,
  ]);

  /*
  ========================================
  ERA CHANGE
  ========================================
  */

  const handleEraChange = (
    selectedEra
  ) => {
    setEra(selectedEra);

    playSound("filter");

    if (selectedEra === "All") {
      reactDino(
        "pointingRight",
        "🗺 The whole prehistoric archive! Try not to get lost.",
        3000
      );

      return;
    }

    reactDino(
      "pointingRight",
      `👉 ${selectedEra}! Excellent choice. I totally know which period that is.`,
      3500
    );
  };

  /*
  ========================================
  SEARCH CHANGE
  ========================================
  */

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  /*
  ========================================
  CLEAR SEARCH
  ========================================
  */

  const clearSearch = () => {
    setSearch("");

    reactDino(
      "happy",
      "🌿 Archive restored! Back to every prehistoric friend.",
      2600
    );
  };

  /*
  ========================================
  SORT CHANGE
  ========================================
  */

  const handleSortChange = (event) => {
    const nextSort = event.target.value;

    setSortBy(nextSort);

    playSound("filter");

    const sortMessages = {
      Discovery:
        "🦴 Discovery order! The ancient way of organising things.",

      Name:
        "🔤 Alphabetical order. Very scientific. Very organised.",

      Rarity:
        "✨ Rarest first?! Ooooh, we're looking at the fancy fossils.",
    };

    reactDino(
      nextSort === "Rarity"
        ? "happyJumps"
        : "thinking",
      sortMessages[nextSort],
      3000
    );
  };

  /*
  ========================================
  DINOSAUR INSPECT
  ========================================
  */

  const handleInspectDinosaur = (
    dinosaur
  ) => {
    const discovered =
      isDiscovered(dinosaur);

    /*
    LOCKED DINOSAUR
    */

    if (!discovered) {
      playSound("locked");

      reactDino(
        "sad",
        `🥺 ${dinosaur.name}? Not yet, Explorer! Keep completing expeditions to uncover this species.`,
        4000
      );

      return;
    }

    setSelectedDinosaur(dinosaur);

    /*
    LEGENDARY DINOSAUR
    */

    if (
      dinosaur.rarity === "Legendary"
    ) {
      playSound("legendary");

      reactDino(
        "happyJumps",
        `🤩 ${dinosaur.name}?! LEGENDARY! I knew you had excellent dinosaur taste!`,
        4500
      );

      return;
    }

    /*
    EPIC DINOSAUR
    */

    if (dinosaur.rarity === "Epic") {
      playSound("discover");

      reactDino(
        "loveHappy",
        `💚 ${dinosaur.name}! One of my prehistoric favourites!`,
        4000
      );

      return;
    }

    /*
    NORMAL DISCOVERED DINOSAUR
    */

    playSound("open");

    reactDino(
      "happy",
      `🦖 ${dinosaur.name}! Oh, I know this one! Probably.`,
      3500
    );
  };

  /*
  ========================================
  CLOSE INSPECT MODAL
  ========================================
  */

  const handleCloseModal = () => {
    setSelectedDinosaur(null);

    reactDino(
      "idle",
      "🦴 Back to fossil browsing. Please don't lick the exhibits.",
      2600
    );
  };

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
        overflow-x-hidden
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

          bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.1),transparent_38%)]

          pointer-events-none
        "
      />

      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.08, 1],

                opacity: [
                  0.6,
                  1,
                  0.6,
                ],
              }
        }
        transition={{
          duration: 8,

          repeat: Infinity,

          ease: "easeInOut",
        }}
        className="
          fixed

          -top-40
          right-10

          w-[500px]
          h-[500px]

          rounded-full

          bg-green-500/10

          blur-[160px]

          pointer-events-none
        "
      />

      <div
        className="
          fixed
          inset-0

          opacity-[0.035]

          bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]

          bg-[size:72px_72px]

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
        level={player.level || 1}
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
            gap-3
            sm:gap-4

            min-w-0
          "
        >
          <motion.button
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 1.08,
                  }
            }
            whileTap={{
              scale: 0.92,
            }}
            onClick={() =>
              setMenuOpen(true)
            }
            className="
              w-11
              h-11

              sm:w-12
              sm:h-12

              shrink-0

              rounded-2xl

              flex
              items-center
              justify-center

              bg-green-500/10

              border
              border-green-500/30

              hover:bg-green-500/15

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-green-400

              transition
            "
            aria-label="Open explorer menu"
          >
            <Menu size={22} />
          </motion.button>

          <div className="min-w-0">
            <h1
              className="
                title-font

                truncate

                text-xl
                sm:text-3xl
              "
            >
              Dino Collection
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
              Prehistoric Archive
            </p>
          </div>
        </div>

        {/* DISCOVERY COUNTER */}

        <motion.div
          initial={{
            opacity: 0,

            scale: 0.9,
          }}
          animate={{
            opacity: 1,

            scale: 1,
          }}
          className="
            shrink-0

            px-3
            sm:px-5

            py-2.5
            sm:py-3

            rounded-2xl

            bg-green-500/10

            border
            border-green-500/25

            text-sm
            sm:text-base
          "
          aria-label={`${discoveredCount} of ${dinosaurs.length} dinosaurs discovered`}
        >
          <span
            className="
              text-green-300

              font-bold
            "
          >
            {collectionLoading
              ? "..."
              : discoveredCount}
          </span>

          <span className="text-white/40">
            {" "}
            / {dinosaurs.length}

            <span className="hidden sm:inline">
              {" "}
              discovered
            </span>
          </span>
        </motion.div>
      </header>

      {/* ========================================
          MAIN
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

          py-6
          sm:py-10
        "
      >
        {/* ========================================
            HERO + DESKTOP DINO
        ======================================== */}

        <div
          className="
            grid

            grid-cols-1
            xl:grid-cols-[1fr_330px]

            gap-6

            items-stretch
          "
        >
          <CollectionHero
            discoveredCount={
              collectionLoading
                ? 0
                : discoveredCount
            }
            totalCount={dinosaurs.length}
          />

          {/* DESKTOP COLLECTION DINO */}

          <motion.div
            initial={{
              opacity: 0,

              x: 30,
            }}
            animate={{
              opacity: 1,

              x: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="
              relative

              min-h-[420px]

              hidden
              xl:flex

              items-end
              justify-center

              rounded-[36px]

              bg-[#071B12]/80

              border
              border-green-500/20

              shadow-[0_30px_100px_rgba(0,0,0,0.35)]

              pt-16
              pb-4
            "
          >
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: [
                        1,
                        1.15,
                        1,
                      ],

                      opacity: [
                        0.2,
                        0.4,
                        0.2,
                      ],
                    }
              }
              transition={{
                duration: 4,

                repeat: Infinity,

                ease: "easeInOut",
              }}
              className="
                absolute

                w-[300px]
                h-[300px]

                rounded-full

                bg-green-400/20

                blur-[100px]

                pointer-events-none
              "
            />

            <div
              className="
                relative
                z-10

                flex
                items-center
                justify-center

                w-full
              "
            >
              <DinoGuide
                mood={dinoMood}
                message={dinoMessage}
              />
            </div>
          </motion.div>
        </div>

        {/* ========================================
            MOBILE / TABLET DINO
        ======================================== */}

        <motion.div
          initial={{
            opacity: 0,

            y: 20,
          }}
          animate={{
            opacity: 1,

            y: 0,
          }}
          className="
            relative

            xl:hidden

            mt-5

            min-h-[330px]

            flex
            items-end
            justify-center

            rounded-[28px]

            bg-[#071B12]/70

            border
            border-green-500/20

            pt-14
            pb-2
          "
        >
          <div
            className="
              absolute

              w-[240px]
              h-[240px]

              rounded-full

              bg-green-400/15

              blur-[90px]

              pointer-events-none
            "
          />

          <div
            className="
              relative
              z-10

              flex
              items-center
              justify-center

              w-full

              scale-[0.88]
              sm:scale-100
            "
          >
            <DinoGuide
              mood={dinoMood}
              message={dinoMessage}
            />
          </div>
        </motion.div>

        {/* ========================================
            TOOLBAR
        ======================================== */}

        <div
          className="
            flex
            flex-col
            xl:flex-row

            xl:items-center
            xl:justify-between

            gap-5

            mt-8
            sm:mt-10

            mb-8
          "
        >
          {/* ERA FILTERS */}

          <div
            className="
              flex
              gap-3

              overflow-x-auto

              pb-2

              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
            aria-label="Filter dinosaurs by era"
          >
            {eras.map((item) => (
              <motion.button
                key={item}
                whileTap={{
                  scale: 0.96,
                }}
                onClick={() =>
                  handleEraChange(item)
                }
                className={`
                  shrink-0

                  px-5
                  py-3

                  rounded-2xl

                  border

                  font-semibold

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-green-400

                  transition

                  ${
                    era === item
                      ? `
                        bg-green-500
                        border-green-300

                        text-[#06130D]

                        shadow-lg
                        shadow-green-500/20
                      `
                      : `
                        bg-white/5

                        border-white/10

                        text-white/60

                        hover:text-white
                        hover:border-green-500/30
                      `
                  }
                `}
                aria-pressed={
                  era === item
                }
              >
                {item}
              </motion.button>
            ))}
          </div>

          {/* SEARCH + SORT */}

          <div
            className="
              flex
              flex-col
              sm:flex-row

              gap-3
            "
          >
            {/* SEARCH */}

            <div
              className="
                relative

                min-w-0
                sm:w-[300px]
              "
            >
              <Search
                size={19}
                className="
                  absolute

                  left-4
                  top-1/2

                  -translate-y-1/2

                  text-white/35

                  pointer-events-none
                "
              />

              <input
                type="search"
                value={search}
                onChange={
                  handleSearchChange
                }
                placeholder="Search species, era, rarity..."
                className="
                  w-full

                  rounded-2xl

                  bg-white/5

                  border
                  border-white/10

                  py-3
                  pl-12
                  pr-11

                  text-sm

                  text-white

                  outline-none

                  placeholder:text-white/30

                  focus:border-green-500/40
                  focus:bg-green-500/[0.05]

                  focus-visible:ring-2
                  focus-visible:ring-green-500/20

                  transition

                  [&::-webkit-search-cancel-button]:hidden
                "
                aria-label="Search dinosaur collection"
              />

              <AnimatePresence>
                {search && (
                  <motion.button
                    initial={{
                      opacity: 0,

                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,

                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,

                      scale: 0.8,
                    }}
                    onClick={clearSearch}
                    className="
                      absolute

                      right-3
                      top-1/2

                      -translate-y-1/2

                      w-7
                      h-7

                      rounded-lg

                      flex
                      items-center
                      justify-center

                      text-white/40

                      hover:text-white
                      hover:bg-white/10

                      transition
                    "
                    aria-label="Clear dinosaur search"
                  >
                    <X size={15} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* SORT */}

            <div className="relative">
              <SlidersHorizontal
                size={18}
                className="
                  absolute

                  left-4
                  top-1/2

                  -translate-y-1/2

                  text-green-300/60

                  pointer-events-none
                "
              />

              <select
                value={sortBy}
                onChange={handleSortChange}
                className="
                  w-full
                  sm:w-[180px]

                  appearance-none

                  rounded-2xl

                  bg-[#0E2117]

                  border
                  border-white/10

                  py-3
                  pl-11
                  pr-4

                  text-sm

                  text-white/75

                  outline-none

                  cursor-pointer

                  focus:border-green-500/40

                  focus-visible:ring-2
                  focus-visible:ring-green-500/20
                "
                aria-label="Sort dinosaur collection"
              >
                <option value="Discovery">
                  Discovery
                </option>

                <option value="Name">
                  Name
                </option>

                <option value="Rarity">
                  Rarity
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* ========================================
            RESULT SUMMARY
        ======================================== */}

        <div
          className="
            flex
            items-center
            justify-between

            gap-4

            mb-5

            text-xs
            sm:text-sm

            text-white/35
          "
        >
          <p>
            Showing{" "}
            <span
              className="
                text-green-300/80

                font-semibold
              "
            >
              {visibleDinosaurs.length}
            </span>{" "}
            {visibleDinosaurs.length === 1
              ? "species"
              : "species"}
          </p>

          {(era !== "All" || search) && (
            <button
              onClick={() => {
                setEra("All");

                setSearch("");

                reactDino(
                  "happy",
                  "🌿 Everything is back! The archive can breathe again.",
                  2800
                );
              }}
              className="
                text-green-300/70

                hover:text-green-200

                transition
              "
            >
              Reset filters
            </button>
          )}
        </div>

        {/* ========================================
            COLLECTION GRID
        ======================================== */}

        <AnimatePresence mode="wait">
          {visibleDinosaurs.length > 0 ? (
            <motion.div
              key={`${era}-${sortBy}-${search}`}
              initial={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 0,

                      y: 12,
                    }
              }
              animate={{
                opacity: 1,

                y: 0,
              }}
              exit={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 0,

                      y: -8,
                    }
              }
              transition={{
                duration: 0.22,
              }}
              className="
                grid

                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4

                gap-5
              "
            >
              {visibleDinosaurs.map(
                (dinosaur, index) => {
                  const discovered =
                    isDiscovered(dinosaur);

                  return (
                    <CollectionCard
                      key={dinosaur.id}
                      dinosaur={dinosaur}
                      index={index}
                      discovered={
                        discovered
                      }
                      onInspect={
                        handleInspectDinosaur
                      }
                    />
                  );
                }
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty-collection"
              initial={{
                opacity: 0,

                scale: 0.98,
              }}
              animate={{
                opacity: 1,

                scale: 1,
              }}
              className="
                min-h-[320px]

                rounded-[28px]

                flex
                items-center
                justify-center

                bg-white/[0.025]

                border
                border-white/[0.07]

                text-center

                p-8
              "
            >
              <div>
                <motion.p
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          rotate: [
                            -5,
                            5,
                            -5,
                          ],

                          y: [
                            0,
                            -5,
                            0,
                          ],
                        }
                  }
                  transition={{
                    duration: 3,

                    repeat: Infinity,

                    ease: "easeInOut",
                  }}
                  className="
                    text-5xl

                    mb-5
                  "
                >
                  🦴
                </motion.p>

                <h3
                  className="
                    title-font

                    text-3xl
                  "
                >
                  No fossils found.
                </h3>

                <p
                  className="
                    mt-3

                    max-w-[420px]

                    text-white/40
                  "
                >
                  Try another era or search
                  for a different species.
                  Dino swears he checked
                  every fossil pile.
                </p>

                <button
                  onClick={() => {
                    setEra("All");

                    setSearch("");

                    reactDino(
                      "happyJumps",
                      "🎉 Fossil emergency solved! Everything is visible again.",
                      3200
                    );
                  }}
                  className="
                    mt-6

                    rounded-xl

                    bg-green-500

                    px-5
                    py-3

                    font-bold

                    text-[#06130D]

                    hover:bg-green-400

                    transition
                  "
                >
                  Reset Archive
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================
            ARCHIVE FOOTER NOTE
        ======================================== */}

        <div
          className="
            py-12

            text-center

            text-xs

            text-white/20
          "
        >
          🦖 Dino says every fossil has a
          story. Some of them are just
          louder than others.
        </div>
      </main>

      {/* ========================================
          DINO INSPECT MODAL
      ======================================== */}

      <DinoInspectModal
        dinosaur={selectedDinosaur}
        onClose={handleCloseModal}
      />
    </div>
  );
}