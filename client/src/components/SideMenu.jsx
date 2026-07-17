import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import {
  X,
  House,
  Map,
  TentTree,
  Trophy,
  ShoppingBag,
  Backpack,
  UserRound,
  CalendarDays,
  Settings,
  Music,
  Volume2,
  ChevronLeft,
} from "lucide-react";

import { useAudio } from "../context/AudioContext";


const USERNAME = "Shreya";


const themes = {
  1: {
    menu: "bg-[#08140F]/95",
    border: "border-green-500/20",
    subtitle: "text-green-300/70",

    itemHover:
      "hover:bg-green-500/10 hover:border-green-500/20",

    active:
      "bg-green-500/15 border-green-400/30 text-green-100",

    icon:
      "bg-green-500/10 text-green-300",

    iconHover:
      "group-hover:bg-green-500/20 group-hover:text-green-200",

    activeIcon:
      "bg-green-500/25 text-green-200",

    glow: "bg-green-500/10",

    toggle: "bg-green-500",

    toggleGlow:
      "shadow-[0_0_25px_rgba(34,197,94,0.35)]",
  },

  2: {
    menu: "bg-[#1B130B]/95",
    border: "border-amber-500/20",
    subtitle: "text-amber-300/70",

    itemHover:
      "hover:bg-amber-500/10 hover:border-amber-500/20",

    active:
      "bg-amber-500/15 border-amber-400/30 text-amber-100",

    icon:
      "bg-amber-500/10 text-amber-300",

    iconHover:
      "group-hover:bg-amber-500/20 group-hover:text-amber-200",

    activeIcon:
      "bg-amber-500/25 text-amber-200",

    glow: "bg-amber-500/10",

    toggle: "bg-amber-500",

    toggleGlow:
      "shadow-[0_0_25px_rgba(245,158,11,0.35)]",
  },

  3: {
    menu: "bg-[#1D0B08]/95",
    border: "border-red-500/25",
    subtitle: "text-orange-300/70",

    itemHover:
      "hover:bg-red-500/10 hover:border-red-500/20",

    active:
      "bg-red-500/15 border-red-400/30 text-orange-100",

    icon:
      "bg-red-500/10 text-orange-300",

    iconHover:
      "group-hover:bg-red-500/20 group-hover:text-orange-200",

    activeIcon:
      "bg-red-500/25 text-orange-200",

    glow: "bg-red-500/10",

    toggle: "bg-orange-500",

    toggleGlow:
      "shadow-[0_0_25px_rgba(249,115,22,0.35)]",
  },

  4: {
    menu: "bg-[#071824]/95",
    border: "border-cyan-400/25",
    subtitle: "text-cyan-200/70",

    itemHover:
      "hover:bg-cyan-400/10 hover:border-cyan-400/20",

    active:
      "bg-cyan-400/15 border-cyan-300/30 text-cyan-100",

    icon:
      "bg-cyan-400/10 text-cyan-200",

    iconHover:
      "group-hover:bg-cyan-400/20 group-hover:text-cyan-100",

    activeIcon:
      "bg-cyan-400/25 text-cyan-100",

    glow: "bg-cyan-400/10",

    toggle: "bg-cyan-400",

    toggleGlow:
      "shadow-[0_0_25px_rgba(34,211,238,0.35)]",
  },

  5: {
    menu: "bg-[#18100B]/95",
    border: "border-orange-500/25",
    subtitle: "text-orange-300/70",

    itemHover:
      "hover:bg-orange-500/10 hover:border-orange-500/20",

    active:
      "bg-orange-500/15 border-orange-400/30 text-orange-100",

    icon:
      "bg-orange-500/10 text-orange-300",

    iconHover:
      "group-hover:bg-orange-500/20 group-hover:text-amber-200",

    activeIcon:
      "bg-orange-500/25 text-orange-200",

    glow: "bg-orange-500/10",

    toggle: "bg-orange-500",

    toggleGlow:
      "shadow-[0_0_25px_rgba(249,115,22,0.35)]",
  },
};


const menuItems = [
  {
    label: "Home",
    icon: House,
    path: "/",
  },

  {
    label: "Jurassic Island",
    icon: Map,
    path: "/map",
  },

  {
    label: "Camp",
    icon: TentTree,
    path: "/camp",
  },

  {
    label: "Dino Shop",
    icon: ShoppingBag,
    path: "/shop",
  },

  {
    label: "Collection",
    icon: Backpack,
    path: "/collection",
  },

  {
    label: "Leaderboard",
    icon: Trophy,
    path: "/leaderboard",
  },
{
    label: "Daily Missions",
    icon: CalendarDays,
    path: "/daily",
},
  {
    label: "Profile",
    icon: UserRound,
    path: "/profile",
  },
];


export default function SideMenu({
  open,
  onClose,
  level = 1,
}) {

  const navigate = useNavigate();

  const location = useLocation();


  const [settingsOpen, setSettingsOpen] =
    useState(false);


  const {
    musicEnabled,
    effectsEnabled,
    toggleMusic,
    toggleEffects,
  } = useAudio();


  const theme =
    themes[level] || themes[1];


  const handleNavigate = (path) => {

    setSettingsOpen(false);

    onClose();


    if (location.pathname === path) {
      return;
    }


    navigate(path);

  };


  const saveSoundPreferences = async (
    preferences
  ) => {

    try {

      const response = await fetch(
        `/api/user/${encodeURIComponent(
  USERNAME
)}/sound`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            preferences
          ),
        }
      );


      if (!response.ok) {

        const data =
          await response.json();


        throw new Error(
          data.message ||
            "Could not save sound preferences"
        );

      }


      console.log(
        "🔊 Sound preferences saved"
      );

    } catch (error) {

      console.error(
        "SAVE SOUND PREFERENCES ERROR:",
        error
      );

    }

  };


  const handleMusicToggle = () => {

    const newValue =
      !musicEnabled;


    toggleMusic();


    saveSoundPreferences({
      music: newValue,
      effects: effectsEnabled,
    });

  };


  const handleEffectsToggle = () => {

    const newValue =
      !effectsEnabled;


    toggleEffects();


    saveSoundPreferences({
      music: musicEnabled,
      effects: newValue,
    });

  };


  return (

    <AnimatePresence>

      {open && (

        <>

          {/* ========================================
              DARK PAGE OVERLAY
          ======================================== */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            onClick={() => {

              setSettingsOpen(false);

              onClose();

            }}
            className="
              fixed
              inset-0

              z-[100]

              bg-black/60

              backdrop-blur-sm
            "
          />


          {/* ========================================
              SIDE MENU
          ======================================== */}

          <motion.aside
            initial={{
              x: "-100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "-100%",
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
            }}
            className={`
              fixed
              top-0
              left-0
              bottom-0

              z-[110]

              w-[85%]
              max-w-[340px]

              flex
              flex-col

              ${theme.menu}

              backdrop-blur-2xl

              border-r
              ${theme.border}

              shadow-[20px_0_70px_rgba(0,0,0,0.55)]

              text-white

              overflow-hidden
            `}
          >

            {/* THEME GLOW */}

            <div
              className={`
                absolute

                -top-32
                -left-32

                w-[350px]
                h-[350px]

                rounded-full

                ${theme.glow}

                blur-[120px]

                pointer-events-none
              `}
            />


            {/* ========================================
                MENU / SETTINGS SLIDER
            ======================================== */}

            <AnimatePresence
              mode="wait"
              initial={false}
            >

              {!settingsOpen ? (

                <motion.div
                  key="main-menu"
                  initial={{
                    opacity: 0,
                    x: -30,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -30,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="
                    relative
                    z-10

                    flex
                    flex-col

                    h-full
                  "
                >

                  {/* HEADER */}

                  <div
                    className={`
                      flex
                      items-center
                      justify-between

                      px-6
                      py-6

                      border-b
                      ${theme.border}
                    `}
                  >

                    <div>

                      <h2
                        className="
                          title-font

                          text-2xl
                          text-white
                        "
                      >
                        🦖 Jurassic Time
                      </h2>


                      <p
                        className={`
                          mt-1

                          text-xs

                          uppercase
                          tracking-[0.25em]

                          ${theme.subtitle}
                        `}
                      >
                        Explorer Menu
                      </p>

                    </div>


                    <motion.button
                      whileHover={{
                        rotate: 90,
                        scale: 1.08,
                      }}
                      whileTap={{
                        scale: 0.9,
                      }}
                      onClick={() => {

                        setSettingsOpen(false);

                        onClose();

                      }}
                      className={`
                        w-10
                        h-10

                        rounded-xl

                        flex
                        items-center
                        justify-center

                        bg-white/5

                        border
                        ${theme.border}

                        hover:bg-white/10

                        transition
                      `}
                      aria-label="Close explorer menu"
                    >
                      <X size={21} />
                    </motion.button>

                  </div>


                  {/* MENU ITEMS */}

                  <nav
                    className="
                      flex-1

                      overflow-y-auto

                      px-4
                      py-5

                      space-y-2
                    "
                  >

                    {menuItems.map(
                      (item, index) => {

                        const Icon =
                          item.icon;


                        const isActive =
                          location.pathname ===
                          item.path;


                        return (

                          <motion.button
                            key={item.label}
                            initial={{
                              opacity: 0,
                              x: -20,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              delay:
                                index * 0.05,
                            }}
                            whileHover={{
                              x: isActive
                                ? 0
                                : 5,
                            }}
                            whileTap={{
                              scale: 0.98,
                            }}
                            onClick={() =>
                              handleNavigate(
                                item.path
                              )
                            }
                            className={`
                              group

                              relative

                              w-full

                              flex
                              items-center
                              gap-4

                              px-4
                              py-3.5

                              rounded-2xl

                              text-left

                              border

                              transition

                              ${
                                isActive
                                  ? theme.active
                                  : `
                                    border-transparent
                                    text-white/80

                                    hover:text-white

                                    ${theme.itemHover}
                                  `
                              }
                            `}
                          >

                            {/* ACTIVE BAR */}

                            {isActive && (

                              <motion.div
                                layoutId="active-side-menu-indicator"
                                className="
                                  absolute

                                  left-0
                                  top-3
                                  bottom-3

                                  w-1

                                  rounded-r-full

                                  bg-current
                                "
                              />

                            )}


                            {/* ICON */}

                            <div
                              className={`
                                w-10
                                h-10

                                rounded-xl

                                flex
                                items-center
                                justify-center

                                transition

                                ${
                                  isActive
                                    ? theme.activeIcon
                                    : `
                                      ${theme.icon}
                                      ${theme.iconHover}
                                    `
                                }
                              `}
                            >
                              <Icon size={20} />
                            </div>


                            {/* LABEL */}

                            <span
                              className="
                                font-semibold
                                text-[15px]
                              "
                            >
                              {item.label}
                            </span>


                            {/* CURRENT */}

                            {isActive && (

                              <span
                                className="
                                  ml-auto

                                  text-[9px]

                                  uppercase
                                  tracking-[0.18em]

                                  opacity-60
                                "
                              >
                                Current
                              </span>

                            )}

                          </motion.button>

                        );

                      }
                    )}

                  </nav>


                  {/* BOTTOM */}

                  <div
                    className={`
                      p-4

                      border-t
                      ${theme.border}
                    `}
                  >

                    <motion.button
                      whileHover={{
                        x: 5,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      onClick={() =>
                        setSettingsOpen(true)
                      }
                      className="
                        group

                        w-full

                        flex
                        items-center
                        gap-4

                        px-4
                        py-3.5

                        rounded-2xl

                        text-white/70

                        hover:text-white
                        hover:bg-white/5

                        transition
                      "
                    >

                      <div
                        className={`
                          w-10
                          h-10

                          rounded-xl

                          flex
                          items-center
                          justify-center

                          ${theme.icon}
                        `}
                      >
                        <Settings size={20} />
                      </div>


                      <span
                        className="
                          font-semibold
                        "
                      >
                        Settings
                      </span>


                      <span
                        className="
                          ml-auto

                          text-white/30
                        "
                      >
                        ›
                      </span>

                    </motion.button>


                    <p
                      className="
                        mt-4

                        text-center
                        text-[10px]

                        uppercase
                        tracking-[0.25em]

                        text-white/25
                      "
                    >
                      Jurassic Time Explorer
                    </p>

                  </div>

                </motion.div>

              ) : (

                /* ========================================
                   SETTINGS PANEL
                ======================================== */

                <motion.div
                  key="settings-panel"
                  initial={{
                    opacity: 0,
                    x: 40,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: 40,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="
                    relative
                    z-10

                    flex
                    flex-col

                    h-full
                  "
                >

                  {/* SETTINGS HEADER */}

                  <div
                    className={`
                      flex
                      items-center

                      gap-4

                      px-5
                      py-6

                      border-b
                      ${theme.border}
                    `}
                  >

                    <motion.button
                      whileHover={{
                        x: -3,
                      }}
                      whileTap={{
                        scale: 0.9,
                      }}
                      onClick={() =>
                        setSettingsOpen(false)
                      }
                      className={`
                        w-10
                        h-10

                        rounded-xl

                        flex
                        items-center
                        justify-center

                        bg-white/5

                        border
                        ${theme.border}
                      `}
                    >
                      <ChevronLeft size={21} />
                    </motion.button>


                    <div>

                      <h2
                        className="
                          title-font

                          text-2xl
                        "
                      >
                        Settings
                      </h2>


                      <p
                        className={`
                          mt-1

                          text-[10px]

                          uppercase
                          tracking-[0.22em]

                          ${theme.subtitle}
                        `}
                      >
                        Expedition Controls
                      </p>

                    </div>


                    <motion.button
                      whileHover={{
                        rotate: 90,
                      }}
                      whileTap={{
                        scale: 0.9,
                      }}
                      onClick={() => {

                        setSettingsOpen(false);

                        onClose();

                      }}
                      className={`
                        ml-auto

                        w-10
                        h-10

                        rounded-xl

                        flex
                        items-center
                        justify-center

                        bg-white/5

                        border
                        ${theme.border}
                      `}
                    >
                      <X size={20} />
                    </motion.button>

                  </div>


                  {/* SETTINGS CONTENT */}

                  <div
                    className="
                      flex-1

                      px-5
                      py-7
                    "
                  >

                    <p
                      className="
                        mb-4

                        text-[10px]

                        uppercase
                        tracking-[0.25em]

                        text-white/35

                        font-bold
                      "
                    >
                      Audio
                    </p>


                    <div
                      className="
                        space-y-3
                      "
                    >

                      {/* MUSIC */}

                      <SettingRow
                        icon={Music}
                        title="Music"
                        description="Expedition background music"
                        enabled={musicEnabled}
                        onToggle={
                          handleMusicToggle
                        }
                        theme={theme}
                      />


                      {/* EFFECTS */}

                      <SettingRow
                        icon={Volume2}
                        title="Sound Effects"
                        description="Quiz and reward sounds"
                        enabled={effectsEnabled}
                        onToggle={
                          handleEffectsToggle
                        }
                        theme={theme}
                      />

                    </div>


                    {/* DINO MESSAGE */}

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
                        delay: 0.2,
                      }}
                      className="
                        mt-8

                        p-5

                        rounded-2xl

                        bg-black/20

                        border
                        border-white/5

                        text-center
                      "
                    >

                      <div
                        className="
                          text-4xl

                          mb-3
                        "
                      >
                        🦖
                      </div>


                      <p
                        className="
                          text-sm

                          text-white/55

                          leading-relaxed
                        "
                      >
                        {effectsEnabled
                          ? "Good. I can still roar."
                          : "You muted my roar. Rude."}
                      </p>

                    </motion.div>

                  </div>


                  {/* SETTINGS FOOTER */}

                  <div
                    className={`
                      p-5

                      border-t
                      ${theme.border}

                      text-center
                    `}
                  >

                    <p
                      className="
                        text-[10px]

                        uppercase
                        tracking-[0.2em]

                        text-white/25
                      "
                    >
                      Preferences save automatically
                    </p>

                  </div>

                </motion.div>

              )}

            </AnimatePresence>

          </motion.aside>

        </>

      )}

    </AnimatePresence>

  );

}


/*
========================================
SETTING ROW
========================================
*/

function SettingRow({
  icon: Icon,
  title,
  description,
  enabled,
  onToggle,
  theme,
}) {

  return (

    <motion.button
      whileHover={{
        scale: 1.01,
      }}
      whileTap={{
        scale: 0.99,
      }}
      onClick={onToggle}
      className="
        w-full

        flex
        items-center

        gap-4

        p-4

        rounded-2xl

        bg-white/[0.04]

        border
        border-white/[0.07]

        hover:bg-white/[0.07]

        transition

        text-left
      "
    >

      {/* ICON */}

      <div
        className={`
          w-11
          h-11

          shrink-0

          rounded-xl

          flex
          items-center
          justify-center

          ${theme.icon}
        `}
      >
        <Icon size={20} />
      </div>


      {/* TEXT */}

      <div
        className="
          flex-1

          min-w-0
        "
      >

        <p
          className="
            font-semibold

            text-white
          "
        >
          {title}
        </p>


        <p
          className="
            mt-1

            text-xs

            text-white/35
          "
        >
          {description}
        </p>

      </div>


      {/* TOGGLE */}

      <div
        className={`
          relative

          w-12
          h-7

          shrink-0

          rounded-full

          transition-all
          duration-300

          ${
            enabled
              ? `
                ${theme.toggle}
                ${theme.toggleGlow}
              `
              : "bg-white/10"
          }
        `}
      >

        <motion.div
          animate={{
            x: enabled ? 22 : 3,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className="
            absolute

            top-[3px]

            w-[22px]
            h-[22px]

            rounded-full

            bg-white

            shadow-md
          "
        />

      </div>

    </motion.button>

  );

}