import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Bone, Search } from "lucide-react";

import {
  Bell,
  CircleUserRound,
  Menu,
  X,
  Compass,
  Clock3,
  Map,
  Binoculars,
  Gamepad2,
  ChevronRight,
  FlaskConical,
  LogOut,
  UserRound,
  ShieldCheck,
  Microscope,
} from "lucide-react";

// Full set — used in the mobile / side drawer
const navItems = [
  { title: "Timeline", to: "/timeline", icon: Clock3 },
  { title: "Map", to: "/maps", icon: Map },
  { title: "Museum", to: "/museum", icon: Compass },
  { title: "Quiz", to: "/home", icon: Binoculars },
  { title: "Hybrid Lab", to: "/dna-lab", icon: FlaskConical },
  { title: "Research Hub", to: "/research", icon: Microscope },
  { title: "Mini Games", to: "/#mini-games", icon: Gamepad2 },
];

// Desktop top bar — Hybrid Lab stays drawer-only
const desktopNavItems = navItems.filter((item) => item.title !== "Hybrid Lab");

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleMiniGamesClick = () => {
    if (location.pathname === "/") {
      const element = document.getElementById("mini-games");

      if (element) {
        const start = window.scrollY;
        const target =
          element.getBoundingClientRect().top + window.scrollY - 80;

        const distance = target - start;
        const duration = 1600;
        let startTime = null;

        const animateScroll = (currentTime) => {
          if (!startTime) startTime = currentTime;

          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          const eased =
            progress < 0.5
              ? 2 * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 2) / 2;

          window.scrollTo(0, start + distance * eased);

          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          }
        };

        requestAnimationFrame(animateScroll);
      }
    } else {
      navigate("/#mini-games");
    }

    setMenuOpen(false);
  };

  const { user, logout } = useAuth();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55 }}
      className={`${isHome ? "fixed" : "sticky"} top-0 left-0 right-0 z-50`}
    >
      <div className="relative z-[9999] border-b border-green-500/10 bg-black/20 backdrop-blur-3xl">
        {/* Backdrop — covers the full viewport, including behind the top bar */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            />
          )}
        </AnimatePresence>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="
                fixed
                left-0
                top-0
                z-50

                flex
                h-[100dvh]
                w-[86vw]
                max-w-[340px]
                flex-col

                border-r border-white/[0.06]
                bg-[#0a0f0b]
                shadow-[0_0_60px_rgba(0,0,0,.6)]
              "
            >
              {/* faint strata lines — a quiet nod to a dig-site cross-section */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, #9fc97f 0px, #9fc97f 1px, transparent 1px, transparent 34px)",
                }}
              />

              {/* Header */}
              <div className="relative flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Bone size={18} className="text-[#9fc97f]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#8ea672]">
                      Paleora
                    </p>
                    <p className="text-[15px] font-semibold text-white">
                      Expedition Menu
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-xl
                    border border-white/10
                    bg-white/[0.04]
                    text-white/70
                    transition-all
                    hover:border-red-400/30
                    hover:bg-red-500/10
                    hover:text-red-300
                  "
                >
                  <X size={17} />
                </button>
              </div>

              {/* Navigation */}
              <nav className="relative flex-1 overflow-y-auto px-3 py-4">
                <p className="px-3 pb-2 text-[10px] uppercase tracking-[0.3em] text-white/30">
                  Explore
                </p>

                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const baseClasses = `
                      group flex w-full items-center justify-between
                      rounded-xl px-3 py-3
                      text-[15px] font-medium
                      transition-colors duration-200
                    `;

                    if (item.title === "Mini Games") {
                      return (
                        <button
                          key={item.title}
                          onClick={handleMiniGamesClick}
                          className={`${baseClasses} text-white/70 hover:bg-white/[0.05] hover:text-white`}
                        >
                          <span className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-[#9fc97f]">
                              <Icon size={17} />
                            </span>
                            {item.title}
                          </span>
                          <ChevronRight
                            size={16}
                            className="text-white/20 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                          />
                        </button>
                      );
                    }

                    return (
                      <NavLink
                        key={item.title}
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `${baseClasses} ${
                            isActive
                              ? "bg-green-500/10 text-green-300 shadow-[inset_0_0_0_1px_rgba(74,222,128,0.25)]"
                              : "text-white/70 hover:bg-white/[0.05] hover:text-white"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span className="flex items-center gap-3">
                              <span
                                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                  isActive
                                    ? "bg-green-500/15 text-green-300"
                                    : "bg-white/[0.04] text-[#9fc97f]"
                                }`}
                              >
                                <Icon size={17} />
                              </span>
                              {item.title}
                            </span>
                            <ChevronRight
                              size={16}
                              className={`transition-all duration-200 ${
                                isActive
                                  ? "text-green-300/60"
                                  : "text-white/20 opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                              }`}
                            />
                          </>
                        )}
                      </NavLink>
                    );
                  })}
                </div>

                {user?.role === "admin" && (
                  <>
                    <p className="px-3 pb-2 pt-5 text-[10px] uppercase tracking-[0.3em] text-white/30">
                      Staff Access
                    </p>
                    <NavLink
                      to="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="
                        group flex items-center justify-between
                        rounded-xl border border-amber-400/20
                        bg-amber-500/[0.06] px-3 py-3
                        text-[15px] font-medium text-amber-300
                        transition-colors duration-200
                        hover:bg-amber-500/10
                      "
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-300">
                          <ShieldCheck size={17} />
                        </span>
                        Admin Dashboard
                      </span>
                      <ChevronRight
                        size={16}
                        className="text-amber-300/50 transition-all duration-200 group-hover:translate-x-1"
                      />
                    </NavLink>
                  </>
                )}
              </nav>

              {/* Footer — pinned, doesn't scroll away or get squeezed */}
              <div className="relative shrink-0 border-t border-white/[0.06] bg-[#0d130f] px-4 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex h-11 w-11 shrink-0 items-center justify-center
                      rounded-full
                      border border-green-400/20
                      bg-green-500/10
                      text-[16px] font-bold tracking-wide text-green-300
                    "
                  >
                    {user?.username?.charAt(0).toUpperCase() || "G"}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold text-white">
                      {user ? user.username : "Guest Explorer"}
                    </p>
                    <p className="truncate text-[12.5px] text-white/40">
                      {user ? user.email : "Sign in to save your progress"}
                    </p>
                  </div>
                </div>

                <div className="mt-3 space-y-1.5">
                  {user ? (
                    <>
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          navigate("/login-profile");
                        }}
                        className="
                          group flex h-11 w-full items-center justify-between
                          rounded-lg border border-white/10
                          bg-white/[0.03] px-3.5
                          text-[14px] font-medium text-white/80
                          transition-colors duration-200
                          hover:bg-white/[0.06] hover:text-white
                        "
                      >
                        <span className="flex items-center gap-2.5">
                          <UserRound size={16} className="text-[#9fc97f]" />
                          My Profile
                        </span>
                        <ChevronRight size={15} className="text-white/25" />
                      </button>

                      <button
                        onClick={async () => {
                          await logout();
                          setMenuOpen(false);
                        }}
                        className="
                          group flex h-11 w-full items-center justify-between
                          rounded-lg border border-red-500/15
                          bg-red-500/[0.06] px-3.5
                          text-[14px] font-medium text-red-300
                          transition-colors duration-200
                          hover:bg-red-500/10
                        "
                      >
                        <span className="flex items-center gap-2.5">
                          <LogOut size={16} />
                          Logout
                        </span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          navigate("/login");
                        }}
                        className="
                          flex h-11 w-full items-center justify-between
                          rounded-lg border border-green-500/20
                          bg-green-500/10 px-3.5
                          text-[14px] font-medium text-green-300
                          transition-colors duration-200
                          hover:bg-green-500/20
                        "
                      >
                        Login
                        <ChevronRight size={15} />
                      </button>

                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          navigate("/signup");
                        }}
                        className="
                          flex h-11 w-full items-center justify-between
                          rounded-lg border border-white/10
                          bg-white/5 px-3.5
                          text-[14px] font-medium text-white
                          transition-colors duration-200
                          hover:bg-white/10
                        "
                      >
                        Create Account
                        <ChevronRight size={15} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navbar */}
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="
                group
                flex h-10 w-10 items-center justify-center
                rounded-xl border border-white/10 bg-white/[0.04]
                transition-all duration-300
                hover:border-green-400/40 hover:bg-green-500/10
              "
            >
              <Menu
                size={19}
                className="text-white transition-all duration-300 group-hover:rotate-90 group-hover:text-green-300"
              />
            </button>

            <Link
              to="/"
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl border border-white/10 bg-white/[0.04]
                transition-all duration-300
                hover:border-green-400/40 hover:bg-green-500/10
              "
            >
              <Bone size={20} className="text-[#9fc97f]" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex flex-1 items-center justify-between gap-8 px-8">
            <nav className="flex items-center gap-3">
              {desktopNavItems.map((item) =>
                item.title === "Mini Games" ? (
                  <button
                    key={item.title}
                    onClick={handleMiniGamesClick}
                    className="
                      rounded-full px-4 py-2 text-sm font-medium
                      border border-transparent text-white/70
                      transition-all duration-300
                      hover:border-white/10 hover:bg-white/[0.04] hover:text-white
                    "
                  >
                    {item.title}
                  </button>
                ) : (
                  <NavLink
                    key={item.title}
                    to={item.to}
                    className={({ isActive }) =>
                      `rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-green-500/20 border border-green-400/40 text-green-300 shadow-[0_0_20px_rgba(34,197,94,.2)]"
                          : "border border-transparent text-white/70 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
                      }`
                    }
                  >
                    {item.title}
                  </NavLink>
                )
              )}

              {user?.role === "admin" && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-amber-500/20 border border-amber-400/50 text-amber-300"
                        : "border border-amber-400/20 text-amber-200 hover:bg-amber-500/10 hover:border-amber-400/40"
                    }`
                  }
                >
                  Admin
                </NavLink>
              )}
            </nav>

            <div className="relative w-full max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8ea672]"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search dinosaurs, fossils, anatomy..."
                className="
                  w-full rounded-full border border-green-500/15
                  bg-[#111814]/80 py-3 pl-12 pr-5 text-white
                  placeholder:text-white/35 outline-none
                  transition-all duration-300
                  focus:border-green-400/40 focus:ring-4 focus:ring-green-500/10
                "
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="
                group flex h-10 w-10 items-center justify-center
                rounded-xl border border-white/10 bg-white/[0.04]
                transition-all duration-300
                hover:border-green-400/40 hover:bg-green-500/10
              "
            >
              <Bell size={18} className="text-white group-hover:text-green-300" />
            </button>

            <button
              onClick={() => navigate(user ? "/login-profile" : "/login")}
              className="
                group flex h-10 w-10 items-center justify-center
                rounded-xl border border-white/10 bg-white/[0.04]
                transition-all duration-300
                hover:border-green-400/40 hover:bg-green-500/10
              "
            >
              <CircleUserRound size={19} className="text-white group-hover:text-green-300" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}