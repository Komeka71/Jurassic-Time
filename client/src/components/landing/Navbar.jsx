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
} from "lucide-react";

const navItems = [
  { title: "Timeline", to: "/timeline", icon: Clock3 },
  { title: "Map", to: "/maps", icon: Map },
  { title: "Museum", to: "/museum", icon: Compass },
  { title: "Quiz", to: "/home", icon: Binoculars },
  { title: "Hybrid Lab", to: "/dna-lab", icon: FlaskConical },
  { title: "Mini Games", to: "/games", icon: Gamepad2 },
];

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Auto-close the mobile drawer on any route change, so its
  // fixed full-screen backdrop can never linger over a new page
  // and silently swallow clicks meant for that page's content.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55 }}
      className={`${isHome ? "fixed" : "sticky"} top-0 left-0 right-0 z-50`}
    >
      <div className="relative z-[9999] border-b border-green-500/10 bg-black/20 backdrop-blur-3xl">

        {/* Mobile Backdrop */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 top-16 z-40 bg-black/60"
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
                absolute
                left-0
                top-16
                z-50

                flex
                flex-col

                w-[390px]
                h-[calc(100vh-64px)]

                border-r border-green-500/10

                bg-gradient-to-b
                from-[#132117]
                via-[#0b100c]
                to-[#050805]

                backdrop-blur-3xl
                shadow-[0_0_80px_rgba(0,0,0,.45)]
              "
            >
              {/* Header */}
              <div className="border-b border-green-500/10 px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-[#8ea672]">
                      Museum Navigation
                    </p>

                    <h2 className="mt-2 text-[30px] font-bold tracking-wide text-white">
                      <Link
                        to="/"
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-white/10
                          bg-white/[0.04]
                          transition-all
                          duration-300
                          hover:border-green-400/40
                          hover:bg-green-500/10
                        "
                      >
                        <Bone size={20} className="text-[#9fc97f]" />
                      </Link>
                    </h2>

                    <p className="mt-1 text-sm text-white/45">
                      Explore the prehistoric world
                    </p>
                  </div>

                  <button
                    onClick={() => setMenuOpen(false)}
                    className="
                      flex h-10 w-10 items-center justify-center
                      rounded-xl
                      border border-white/10
                      bg-white/[0.04]
                      transition-all
                      hover:border-green-400/40
                      hover:bg-green-500/10
                    "
                  >
                    <X size={20} className="text-white" />
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <nav
                className="
                  flex-1
                  overflow-y-auto

                  px-4
                  py-6

                  space-y-2
                "
              >
                {navItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.title}
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `
                        group
                        flex
                        items-center
                        justify-between

                        rounded-2xl

                        px-5
                        py-5

                        transition-all
                        duration-300

                        ${
                          isActive
                            ? "border border-green-400/30 bg-green-500/10 text-green-300 shadow-[0_0_20px_rgba(34,197,94,.12)]"
                            : "text-white/75 hover:bg-white/[0.05] hover:text-white"
                        }
                        `
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          size={20}
                          className="text-[#9fc97f] transition-transform duration-300 group-hover:scale-110"
                        />

                        <span className="text-[17px] font-medium">
                          {item.title}
                        </span>
                      </div>

                      <ChevronRight
                        size={18}
                        className="opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100"
                      />
                    </NavLink>
                  );
                })}
              </nav>

              {user?.role === "admin" && (
                <NavLink
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="
                    group
                    mt-2
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-amber-400/30
                    bg-amber-500/10
                    px-5
                    py-5
                    text-amber-300
                    transition-all
                    duration-300
                    hover:bg-amber-500/20
                  "
                >
                  <span className="text-[17px] font-medium">
                    Admin Dashboard
                  </span>

                  <ChevronRight size={18} />
                </NavLink>
              )}

              {/* Footer */}
              <div
                className="
                  mt-auto
                  border-t
                  border-green-500/10
                  p-6
                "
              >
                <div className="rounded-3xl border border-green-500/10 bg-[#101512] p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        bg-green-500/15
                        text-[18px]
                        tracking-wide
                        font-bold
                        text-green-300
                      "
                    >
                      {user?.username?.charAt(0).toUpperCase() || "G"}
                    </div>

                    <div>
                      <div className="flex-1">
                        <p className="font-semibold text-white text-lg">
                          {user ? user.username : "Guest Explorer"}
                        </p>

                        <p className="mt-1 text-sm text-white/45 truncate">
                          {user ? user.email : "Sign in to save your progress."}
                        </p>
                      </div>
                      <div className="my-5 h-px bg-white/10" />
                      <div className="mt-5 space-y-2">
                        {user ? (
                          <>
                            <button
                              onClick={() => {
                                setMenuOpen(false);
                                navigate("/login-profile");
                              }}
                              className="
                                flex w-full items-center justify-between
                                rounded-xl border border-green-500/20
                                bg-green-500/10
                                px-4 h-12
                                text-green-300
                                transition
                                hover:bg-green-500/20
                                hover:translate-x-1
                                duration-300
                              "
                            >
                              <span>My Profile</span>
                              <ChevronRight size={18} />
                            </button>

                            <button
                              onClick={async () => {
                                await logout();
                                setMenuOpen(false);
                              }}
                              className="
                                flex w-full items-center justify-between
                                rounded-xl border border-red-500/20
                                bg-red-500/10
                                px-4 py-3
                                text-red-300
                                transition
                                hover:bg-red-500/20
                                hover:translate-x-1
                                duration-300
                              "
                            >
                              <span>Logout</span>
                              <ChevronRight
                                size={17}
                                className="opacity-70 group-hover:translate-x-1 transition"
                              />
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
                                flex w-full items-center justify-between
                                rounded-xl border border-green-500/20
                                bg-green-500/10
                                px-4 py-3
                                text-green-300
                                transition
                                hover:bg-green-500/20
                              "
                            >
                              <span>Login</span>
                              <ChevronRight size={18} />
                            </button>

                            <button
                              onClick={() => {
                                setMenuOpen(false);
                                navigate("/signup");
                              }}
                              className="
                                flex w-full items-center justify-between
                                rounded-xl border border-white/10
                                bg-white/5
                                px-4 py-3
                                text-white
                                transition
                                hover:bg-white/10
                              "
                            >
                              <span>Create Account</span>
                              <ChevronRight size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navbar */}
        <div
          className="
            flex
            h-16
            items-center
            justify-between

            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
              className="
                group
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/[0.04]
                transition-all
                duration-300
                hover:border-green-400/40
                hover:bg-green-500/10
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
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/[0.04]
                transition-all
                duration-300
                hover:border-green-400/40
                hover:bg-green-500/10
              "
            >
              <Bone size={20} className="text-[#9fc97f]" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex flex-1 items-center justify-between gap-8 px-8">
            <nav className="flex items-center gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.to}
                  className={({ isActive }) =>
                    `
                    rounded-full
                    px-4
                    py-2
                    text-sm
                    font-medium
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "bg-green-500/20 border border-green-400/40 text-green-300 shadow-[0_0_20px_rgba(34,197,94,.2)]"
                        : "border border-transparent text-white/70 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
                    }
                    `
                  }
                >
                  {item.title}
                </NavLink>
              ))}

              {user?.role === "admin" && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `
                    rounded-full
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "bg-amber-500/20 border border-amber-400/50 text-amber-300"
                        : "border border-amber-400/20 text-amber-200 hover:bg-amber-500/10 hover:border-amber-400/40"
                    }
                    `
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
                  w-full
                  rounded-full
                  border
                  border-green-500/15
                  bg-[#111814]/80
                  py-3
                  pl-12
                  pr-5
                  text-white
                  placeholder:text-white/35
                  outline-none
                  transition-all
                  duration-300
                  focus:border-green-400/40
                  focus:ring-4
                  focus:ring-green-500/10
                "
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="
                group
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/[0.04]
                transition-all
                duration-300
                hover:border-green-400/40
                hover:bg-green-500/10
              "
            >
              <Bell size={18} className="text-white group-hover:text-green-300" />
            </button>

            <button
              onClick={() => {
                if (user) {
                  navigate("/login-profile");
                } else {
                  navigate("/login");
                }
              }}
              className="
                group
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/[0.04]
                transition-all
                duration-300
                hover:border-green-400/40
                hover:bg-green-500/10
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