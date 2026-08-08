// client/src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const STAT_META = [
  { key: "userCount", label: "Users" },
  { key: "adminCount", label: "Admins" },
  { key: "discoveryCount", label: "Discoveries" },
  { key: "underReview", label: "Under Review", accent: "orange" },
  { key: "verified", label: "Verified", accent: "emerald" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/admin/stats")
      .then((res) => setStats(res.data.data))
      .catch(() => setError("Could not load dashboard stats."));
  }, []);

  if (error) {
    return <p className="text-orange-400 text-sm">{error}</p>;
  }

  if (!stats) {
    return <p className="text-stone-400 text-sm">Loading dashboard…</p>;
  }

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Stat cards */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {STAT_META.map(({ key, label, accent }) => (
          <div
            key={key}
            className="rounded-lg border border-stone-800 bg-stone-900 p-4"
          >
            <p className="text-xs text-stone-400 uppercase tracking-wide">
              {label}
            </p>
            <p
              className={`font-display text-3xl mt-2 tabular-nums ${
                accent === "orange"
                  ? "text-orange-400"
                  : accent === "emerald"
                  ? "text-emerald-400"
                  : "text-stone-100"
              }`}
            >
              {stats[key]}
            </p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <section className="lg:col-span-1 rounded-lg border border-stone-800 bg-stone-900 p-5">
          <h2 className="font-display text-base mb-4">Quick actions</h2>
          <div className="space-y-2">
            <Link
              to="/admin/discoveries"
              className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm border border-stone-800 hover:border-amber-400/40 hover:bg-amber-400/5 transition-colors"
            >
              <span>Review discoveries</span>
              <span className="font-mono text-xs text-orange-400">
                {stats.underReview} pending
              </span>
            </Link>
            <Link
              to="/admin/users"
              className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm border border-stone-800 hover:border-amber-400/40 hover:bg-amber-400/5 transition-colors"
            >
              <span>Manage users</span>
              <span className="font-mono text-xs text-stone-400">
                {stats.userCount} total
              </span>
            </Link>
          </div>
        </section>

        {/* Recent activity — real data from ActivityLog */}
        <section className="lg:col-span-2 rounded-lg border border-stone-800 bg-stone-900 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-base">Recent activity</h2>
            <Link to="/admin/logs" className="text-xs text-stone-500 hover:text-stone-300">
              View all →
            </Link>
          </div>
          {stats.recentLogs?.length ? (
            <ul className="space-y-3">
              {stats.recentLogs.map((log) => (
                <li
                  key={log._id}
                  className="flex items-center justify-between text-sm border-b border-stone-800/60 last:border-0 pb-3 last:pb-0"
                >
                  <span className="text-stone-100">
                    {log.performedBy?.username || "Admin"} — {log.details}
                  </span>
                  <span className="text-stone-400 text-xs">
                    {new Date(log.createdAt).toLocaleTimeString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-stone-400 text-sm">No activity yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}