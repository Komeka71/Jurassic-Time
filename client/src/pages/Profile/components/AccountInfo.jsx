import React from "react";
import { ShieldCheck, ShieldAlert } from "lucide-react";

export default function AccountInfo({ account = {} }) {
  const rows = [
    ["Email", account.email],
    ["Account ID", account.accountId],
    ["Join Date", account.joinDate ? new Date(account.joinDate).toLocaleDateString() : "—"],
    ["Last Login", account.lastLogin ? new Date(account.lastLogin).toLocaleString() : "—"],
  ];

  return (
    <div>
      <div className="jt-section-heading">
        <span className="jt-section-title">Account Information</span>
      </div>
      <div className="jt-card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        {rows.map(([label, value]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
            <span style={{ color: "var(--jt-cream-dim)" }}>{label}</span>
            <span>{value || "—"}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14 }}>
          <span style={{ color: "var(--jt-cream-dim)" }}>Verification Status</span>
          <span style={{ display: "flex", gap: 6, alignItems: "center", color: account.verified ? "var(--jt-teal)" : "var(--jt-amber-2)" }}>
            {account.verified ? <ShieldCheck size={16} /> : <ShieldAlert size={16} />}
            {account.verified ? "Verified" : "Unverified"}
          </span>
        </div>
      </div>
    </div>
  );
}
