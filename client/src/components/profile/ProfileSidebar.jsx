// components/profile/ProfileSidebar.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Trophy,
  Layers,
  Compass,
  FlaskConical,
  BarChart3,
  Package,
  ChevronLeft,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "collection", label: "Collection", icon: Layers },
  { id: "discoveries", label: "Discoveries", icon: Compass },
  { id: "research", label: "Research", icon: FlaskConical },
  { id: "quiz-stats", label: "Quiz Stats", icon: BarChart3 },
  { id: "inventory", label: "Inventory", icon: Package },
];

export default function ProfileSidebar({ activeSection, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);

  const scrollToSection = (id) => {
    onNavigate?.(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside
      className={`sticky top-20 h-fit shrink-0 rounded-xl border border-stone-800 bg-stone-900 p-3 transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="mb-3 flex w-full items-center justify-end rounded-lg p-1.5 text-stone-500 hover:bg-stone-800 hover:text-amber-400 transition-colors"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronLeft
          size={16}
          className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
        />
      </button>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "text-amber-400"
                  : "text-stone-400 hover:text-white hover:bg-stone-800/60"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-pill"
                  className="absolute inset-0 rounded-lg bg-stone-800"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <Icon size={18} className="relative z-10 shrink-0" />
              {!collapsed && <span className="relative z-10 truncate">{label}</span>}

              {collapsed && (
                <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md border border-stone-800 bg-stone-900 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 z-20">
                  {label}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}