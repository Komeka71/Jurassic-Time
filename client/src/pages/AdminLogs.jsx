// client/src/pages/AdminLogs.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";

const ACTION_LABELS = {
  "discovery.approved": { label: "Approved discovery", tone: "emerald" },
  "discovery.rejected": { label: "Rejected discovery", tone: "red" },
  "user.promoted": { label: "Promoted user", tone: "lime" },
  "user.demoted": { label: "Demoted user", tone: "muted" },
  "user.suspended": { label: "Suspended user", tone: "red" },
  "user.unsuspended": { label: "Unsuspended user", tone: "emerald" },
  "quiz.question_created": { label: "Created question", tone: "lime" },
  "quiz.question_updated": { label: "Updated question", tone: "muted" },
  "quiz.question_deleted": { label: "Deleted question", tone: "red" },
};

const TONE_CLASSES = {
  emerald: "border-emerald-400/30 text-emerald-400",
  red: "border-red-400/30 text-red-400",
  lime: "border-lime-400/30 text-lime-400",
  muted: "border-emerald-800 text-emerald-400",
};

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/admin/logs")
      .then((res) => setLogs(res.data.logs))
      .catch(() => setError("Could not load activity logs."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4 max-w-4xl">
      <h1 className="text-2xl font-semibold text-green-50">Activity Logs</h1>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      {loading && <p className="text-emerald-400 text-sm">Loading…</p>}

      {!loading && logs.length === 0 && (
        <p className="text-emerald-500 text-sm">No admin actions recorded yet.</p>
      )}

      {!loading && logs.length > 0 && (
        <div className="rounded-lg border border-emerald-900 bg-emerald-950 divide-y divide-emerald-900">
          {logs.map((log) => {
            const meta = ACTION_LABELS[log.action] || { label: log.action, tone: "muted" };
            return (
              <div key={log._id} className="flex items-center justify-between px-4 py-3 gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`shrink-0 text-xs font-mono px-2 py-0.5 rounded-full border ${TONE_CLASSES[meta.tone]}`}
                  >
                    {meta.label}
                  </span>
                  <span className="text-sm text-emerald-200 truncate">{log.details}</span>
                </div>
                <div className="shrink-0 text-right text-xs text-emerald-600">
                  <p>{log.performedBy?.username || "Unknown admin"}</p>
                  <p>{new Date(log.createdAt).toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}