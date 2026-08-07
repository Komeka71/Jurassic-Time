// components/profile/ResearchContributions.jsx

import { useEffect, useState } from "react";
import SectionHeading from "./shared/SectionHeading";
import Badge from "./shared/Badge";
import { getDiscoveries } from "../../services/profileService";

const STATUS_TONE = {
  verified: "emerald",
  pending: "orange",
  rejected: "red",
};

export default function ResearchContributions() {
  const [rows, setRows] = useState([]);
useEffect(() => {
  getDiscoveries()
    .then((data) => {
      setRows(data || []);
    })
    .catch((err) => {
      console.error(err);
      setRows([]);
    });
}, []);
  return (
    <section id="research-contributions" className="space-y-4">
      <SectionHeading
        eyebrow="PROFILE"
        title="Research Contributions"
        description="Your submitted discoveries and their verification status."
      />

      <div className="overflow-x-auto rounded-xl border border-stone-800 bg-stone-900">
        <table className="min-w-full divide-y divide-stone-800">
          <thead className="bg-stone-950">
            <tr className="text-left text-xs uppercase tracking-wider text-stone-500">
              <th className="px-6 py-4">Discovery</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">AI Confidence</th>
              <th className="px-6 py-4">Likes</th>
              <th className="px-6 py-4">Comments</th>
              <th className="px-6 py-4">Submitted</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-800">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-stone-400"
                >
                  You haven't submitted any discoveries yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row._id || row.id}
                  className="transition-colors hover:bg-stone-800/40"
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {row.title || row.discovery}
                  </td>

                  <td className="px-6 py-4">
                    <Badge
                      tone={STATUS_TONE[row.status || "pending"] || "neutral"}
                    >
                      {row.status || "pending"}
                    </Badge>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-stone-800">
                        <div
                          className={`h-full rounded-full ${
                            row.aiConfidence >= 80
                              ? "bg-emerald-400"
                              : row.aiConfidence >= 50
                              ? "bg-orange-400"
                              : "bg-red-400"
                          }`}
                          style={{ width: `${row.aiConfidence}%` }}
                        />
                      </div>

                      <span className="text-sm text-stone-300">
                        {row.aiConfidence}%
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-stone-300">
                    {row.likes ?? 0}
                  </td>

                  <td className="px-6 py-4 text-stone-300">
                    {row.comments ?? 0}
                  </td>

                  <td className="px-6 py-4 text-stone-400">
                    {new Date(row.submitted).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}