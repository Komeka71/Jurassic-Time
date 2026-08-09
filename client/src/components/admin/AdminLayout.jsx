// client/src/components/admin/AdminLayout.jsx
import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/admin", label: "Dashboard", tag: "DASH", end: true },
  { to: "/admin/discoveries", label: "Discoveries", tag: "DISC" },
  { to: "/admin/users", label: "Users", tag: "USR" },
  { to: "/admin/quiz", label: "Quiz", tag: "QUIZ" },
  { to: "/admin/logs", label: "Activity Logs", tag: "LOG" },
];

function SidebarIcon({ open }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      {open ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 12l9-9 9 9" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}

export default function AdminLayout() {
  const [open, setOpen] = useState(true);
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-stone-950 text-stone-100 font-sans">
      {/* Sidebar */}
      <aside
        className={`${
          open ? "w-56" : "w-16"
        } shrink-0 border-r border-stone-800 bg-stone-900 transition-all duration-200 flex flex-col`}
      >
    <div className="h-16 flex items-center justify-between px-4 border-b border-stone-800">
  {open && (
    <img
      src="/logo.png"
      alt="Paleora"
      className="h-16 w-auto object-contain"
    />
  )}
  <button
            onClick={() => setOpen((v) => !v)}
            className="p-1.5 rounded-md text-stone-400 hover:text-emerald-400 hover:bg-stone-800 transition-colors"
            aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          >
            <SidebarIcon open={open} />
          </button>
        </div>

        <div className="px-2 pt-2">
          <Link
            to="/"
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm text-stone-400 hover:text-emerald-400 hover:bg-stone-800 transition-colors ${
              open ? "" : "justify-center"
            }`}
          >
            <HomeIcon />
            {open && <span>Home</span>}
          </Link>
        </div>

        <nav className="flex-1 py-3 px-2 space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-emerald-400/10 text-emerald-400"
                    : "text-stone-400 hover:text-stone-100 hover:bg-stone-800"
                }`
              }
            >
              <span className={open ? "" : "sr-only"}>{l.label}</span>
              {open && (
                <span className="font-mono text-[10px] tracking-wider text-stone-500">
                  {l.tag}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-stone-800 p-3">
          <Link
            to="/"
            className={`block text-xs text-stone-400 hover:text-stone-100 transition-colors ${
              open ? "" : "text-center"
            }`}
          >
            {open ? "← Back to site" : "←"}
          </Link>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 border-b border-stone-800 bg-stone-900/60 backdrop-blur flex items-center justify-between px-6">
          <h1 className="font-display text-base text-stone-100">
            Admin Control Center
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded-full border border-emerald-400/30 text-emerald-400 font-mono uppercase tracking-wide">
              {user?.role}
            </span>
            <span className="text-sm text-stone-400">{user?.username}</span>
            <button
              onClick={logout}
              className="text-sm text-stone-400 hover:text-red-400 transition-colors"
            >
              Log out
            </button>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}