import {
  X,
  Home,
  Map,
  Tent,
  BookOpen,
  Trophy,
  Medal,
  User,
  Coins,
  Star,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function ExpeditionPanel({
  open,
  onClose,
  coins = 520,
  xp = 1250,
  rank = "Bronze Explorer",
}) {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0
          bg-black/60
          backdrop-blur-sm
          transition-all
          duration-300
          z-40

          ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* Drawer */}
      <div
        className={`
          fixed
          top-0
          left-0
          h-full

          w-[320px]
          sm:w-[360px]

          bg-[#07110C]/95
          backdrop-blur-3xl

          border-r
          border-green-900/40

          transition-all
          duration-300

          z-50

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Green Glow */}
        <div
          className="
            absolute
            -top-16
            -left-20
            w-72
            h-72
            rounded-full
            bg-green-500/10
            blur-[140px]
          "
        />

        <div className="relative h-full flex flex-col p-6">

          {/* Header */}

          <div className="flex justify-between items-center">

            <h2 className="title-font text-3xl">
              🦖 Jurassic Time
            </h2>

            <button
              onClick={onClose}
              className="
                p-2
                rounded-xl

                hover:bg-white/10
                transition
              "
            >
              <X />
            </button>

          </div>

          {/* Explorer Card */}

          <div
            className="
              mt-8
              rounded-3xl

              bg-green-500/10

              border
              border-green-500/30

              p-5
            "
          >
            <h3 className="text-xl font-bold">
              Explorer
            </h3>

            <p className="text-green-300 mt-1">
              {rank}
            </p>

            <div className="mt-5">

              <div className="flex justify-between text-sm">

                <span>XP</span>

                <span>{xp} / 2000</span>

              </div>

              <div className="h-3 bg-slate-800 rounded-full mt-2">

                <div
                  className="
                    h-full
                    rounded-full

                    bg-gradient-to-r
                    from-green-500
                    to-emerald-400

                    w-[62%]
                  "
                />

              </div>

            </div>

          </div>

          {/* Menu */}

          <div className="mt-8 space-y-2">

            <MenuRow
              icon={<Home size={22} />}
              text="Home"
              onClick={() => goTo("/")}
            />

            <MenuRow
              icon={<Map size={22} />}
              text="Expedition Map"
              onClick={() => goTo("/map")}
            />

            <MenuRow
              icon={<Tent size={22} />}
              text="Explorer Camp"
              onClick={() => goTo("/camp")}
            />

            <MenuRow
              icon={<BookOpen size={22} />}
              text="Discovery Journal"
            />

            <MenuRow
              icon={<Trophy size={22} />}
              text="Achievements"
            />

            <MenuRow
              icon={<Medal size={22} />}
              text="Leaderboard"
            />

            <MenuRow
              icon={<User size={22} />}
              text="Profile"
            />

          </div>

          {/* Bottom */}

          <div className="mt-auto">

            <div
              className="
                rounded-3xl

                bg-emerald-500/10

                border
                border-emerald-500/30

                p-5
              "
            >
              <div className="flex justify-between">

                <div className="flex items-center gap-2">

                  <Coins size={18} />

                  <span>{coins}</span>

                </div>

                <div className="flex items-center gap-2">

                  <Star size={18} />

                  <span>Level 8</span>

                </div>

              </div>

            </div>

            <p className="text-center text-xs text-gray-500 mt-5">
              Jurassic Time • Version 1.0
            </p>

          </div>

        </div>

      </div>
    </>
  );
}

function MenuRow({ icon, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        w-full

        flex
        items-center
        gap-4

        rounded-2xl

        p-3

        text-left

        hover:bg-green-500/10

        hover:translate-x-2

        transition-all
        duration-300
      "
    >
      {icon}

      <span className="text-lg">
        {text}
      </span>
    </button>
  );
}