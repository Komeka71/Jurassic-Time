
// client/src/pages/AdminUsers.jsx

import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function AdminUsers() {
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actingId, setActingId] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);

    api
      .get("/admin/users")
      .then((res) => {
        setUsers(res.data.users || []);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || "Could not load users."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const changeRole = async (id, role) => {
    setActingId(id);
    setError(null);

    try {
      await api.patch(`/admin/users/${id}/role`, { role });
      load();
    } catch (err) {
      setError(
        err.response?.data?.message || "Action failed."
      );
    } finally {
      setActingId(null);
    }
  };

  const changeStatus = async (id, status) => {
    if (
      status === "suspended" &&
      !window.confirm(
        "Suspend this user? They won't be able to log in."
      )
    ) {
      return;
    }

    setActingId(id);
    setError(null);

    try {
      await api.patch(`/admin/users/${id}/status`, { status });
      load();
    } catch (err) {
      setError(
        err.response?.data?.message || "Action failed."
      );
    } finally {
      setActingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-stone-100">
          User Management
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Manage user roles and account status.
        </p>
      </div>

      {error && (
        <p className="text-red-400 text-sm">
          {error}
        </p>
      )}

      {loading && (
        <p className="text-stone-400 text-sm">
          Loading…
        </p>
      )}

      {!loading && (
        <div className="rounded-lg border border-stone-800 bg-stone-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-800 text-left text-stone-400">
                  <th className="px-4 py-3 font-medium">
                    Username
                  </th>

                  <th className="px-4 py-3 font-medium">
                    Email
                  </th>

                  <th className="px-4 py-3 font-medium">
                    Role
                  </th>

                  <th className="px-4 py-3 font-medium">
                    Status
                  </th>

                  <th className="px-4 py-3 font-medium">
                    Joined
                  </th>

                  <th className="px-4 py-3 font-medium text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-8 text-center text-stone-500"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => {
                    const userId = u.id || u._id;
                    const currentUserId =
                      currentUser?.id || currentUser?._id;

                    const isSelf =
                      String(userId) === String(currentUserId);

                    const isActing = actingId === userId;

                    return (
                      <tr
                        key={userId}
                        className="border-b border-stone-800/60 last:border-0"
                      >
                        {/* Username */}
                        <td className="px-4 py-3 text-stone-100">
                          {u.username}

                          {isSelf && (
                            <span className="ml-2 text-[10px] text-stone-500">
                              (you)
                            </span>
                          )}
                        </td>

                        {/* Email */}
                        <td className="px-4 py-3 text-stone-400">
                          {u.email}
                        </td>

                        {/* Role */}
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs font-mono px-2 py-0.5 rounded-full border ${
                              u.role === "admin"
                                ? "border-amber-400/30 text-amber-400"
                                : "border-stone-700 text-stone-400"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <span
                            className={`text-xs font-mono px-2 py-0.5 rounded-full border ${
                              u.status === "suspended"
                                ? "border-red-400/30 text-red-400"
                                : "border-emerald-400/30 text-emerald-400"
                            }`}
                          >
                            {u.status || "active"}
                          </span>
                        </td>

                        {/* Joined */}
                        <td className="px-4 py-3 text-stone-400">
                          {u.createdAt
                            ? new Date(
                                u.createdAt
                              ).toLocaleDateString()
                            : "—"}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2 flex-wrap">
                            {/* Role action */}
                            {u.role === "admin" ? (
                              <button
                                disabled={isActing || isSelf}
                                onClick={() =>
                                  changeRole(userId, "user")
                                }
                                className="text-xs px-2.5 py-1 rounded-md border border-stone-700 text-stone-300 hover:bg-stone-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                              >
                                Demote
                              </button>
                            ) : (
                              <button
                                disabled={isActing}
                                onClick={() =>
                                  changeRole(userId, "admin")
                                }
                                className="text-xs px-2.5 py-1 rounded-md border border-amber-400/30 text-amber-400 hover:bg-amber-400/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                              >
                                Promote
                              </button>
                            )}

                            {/* Status action */}
                            {u.status === "suspended" ? (
                              <button
                                disabled={isActing}
                                onClick={() =>
                                  changeStatus(userId, "active")
                                }
                                className="text-xs px-2.5 py-1 rounded-md border border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                              >
                                Unsuspend
                              </button>
                            ) : (
                              <button
                                disabled={isActing || isSelf}
                                onClick={() =>
                                  changeStatus(
                                    userId,
                                    "suspended"
                                  )
                                }
                                className="text-xs px-2.5 py-1 rounded-md border border-red-400/30 text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                              >
                                Suspend
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
// ```
