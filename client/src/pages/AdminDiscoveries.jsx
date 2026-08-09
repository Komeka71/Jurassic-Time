// client/src/pages/AdminDiscoveries.jsx
import { useEffect, useState, useCallback } from "react";
import api, { SERVER_ORIGIN } from "../api/axios";

const FILTERS = [
  { value: "under-review", label: "Pending" },
  { value: "verified", label: "Verified" },
  { value: "rejected", label: "Rejected" },
  { value: "all", label: "All" },
];

export default function AdminDiscoveries() {
  const [filter, setFilter] = useState("under-review");
  const [discoveries, setDiscoveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actingId, setActingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    api
      .get(`/admin/discoveries?status=${filter}`)
      .then((res) => setDiscoveries(res.data.discoveries))
      .catch(() => setError("Could not load discoveries."))
      .finally(() => setLoading(false));
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  const moderate = async (id, verdict) => {
    setActingId(id);
    try {
      await api.patch(`/admin/discoveries/${id}/${verdict}`);
      load();
    } catch {
      setError("Action failed. Try again.");
    } finally {
      setActingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-stone-100">Discovery Management</h1>
        <div className="flex gap-1 rounded-lg border border-stone-800 bg-stone-900 p-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                filter === f.value
                  ? "bg-emerald-400/10 text-emerald-400"
                  : "text-stone-400 hover:text-stone-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      {loading && <p className="text-stone-400 text-sm">Loading…</p>}

      {!loading && discoveries.length === 0 ? (
        <p className="text-stone-400">Nothing here.</p>
      ) : (
        <div className="space-y-4">
          {discoveries.map((d) => {
            const expanded = expandedId === d._id;
            return (
              <div
                key={d._id}
                className="rounded-lg border border-stone-800 bg-stone-900 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-stone-100">
                      {d.fossilName}
                    </h2>
                    <p className="text-sm text-stone-400 mt-1">
                      Status: {d.status}
                    </p>
                    <p className="text-sm text-stone-400 mt-1">
                      By: {d.user?.username || d.signature || "Unknown"}
                    </p>
                  </div>

                  <button
                    onClick={() => setExpandedId(expanded ? null : d._id)}
                    className="shrink-0 text-sm text-stone-400 hover:text-stone-100 border border-stone-700 rounded-md px-3 py-1.5 transition-colors"
                  >
                    {expanded ? "Hide details" : "View"}
                  </button>
                </div>

                {expanded && (
                  <div className="mt-4 pt-4 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {d.evidence?.length > 0 && (
                      <div className="flex gap-2 flex-wrap sm:col-span-2">
                        {d.evidence.map((ev, i) => (
                          <img
                            key={i}
                            src={`${SERVER_ORIGIN}/uploads/${ev.filename}`}
                            alt={`${d.fossilName} evidence ${i + 1}`}
                            className="w-20 h-20 rounded-md object-cover border border-stone-800"
                          />
                        ))}
                      </div>
                    )}

                    <div className="text-sm text-stone-400 space-y-1">
                      <p>Species: <span className="text-stone-200">{d.species}</span></p>
                      <p>Era: <span className="text-stone-200">{d.era}</span></p>
                      <p>Location: <span className="text-stone-200">{d.location}</span></p>
                      {(d.latitude || d.longitude) && (
                        <p>
                          Coordinates:{" "}
                          <span className="text-stone-200">
                            {d.latitude}, {d.longitude}
                          </span>
                        </p>
                      )}
                    </div>

                    <div className="text-sm text-stone-400 space-y-1">
                      <p>
                        AI confidence:{" "}
                        <span className="text-stone-200">
                          {d.aiVerification?.confidence ?? "—"}%
                        </span>
                      </p>
                      <p>Archive ID: <span className="text-stone-200">{d.archiveId}</span></p>
                      {d.moderatedBy && (
                        <p>
                          Moderated by:{" "}
                          <span className="text-stone-200">
                            {d.moderatedBy?.username}
                          </span>
                        </p>
                      )}
                    </div>

                    {d.notes && (
                      <p className="text-sm text-stone-400 sm:col-span-2">
                        Notes: <span className="text-stone-200">{d.notes}</span>
                      </p>
                    )}
                  </div>
                )}

                {d.status === "under-review" && (
                  <div className="mt-4 flex gap-3">
                    <button
                      disabled={actingId === d._id}
                      onClick={() => moderate(d._id, "approve")}
                      className="rounded-md bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-500 disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      disabled={actingId === d._id}
                      onClick={() => moderate(d._id, "reject")}
                      className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-500 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}