import React, { useState } from "react";

function Switch({ on, onToggle }) {
  return (
    <button className={`jt-switch ${on ? "on" : ""}`} onClick={onToggle} role="switch" aria-checked={on}>
      <span className="jt-knob" />
    </button>
  );
}

// NOTE: Only `music` and `effects` are backed by a real field right now
// (UserStats.soundPreferences, via PATCH /api/user/:username/sound).
// darkMode, notifications, language, and privacy have no schema field yet --
// they're wired up here as local UI state only, so they won't persist across
// a reload until fields are added to UserStats and a route accepts them.
export default function SettingsSection({ settings = {}, onChange }) {
  const [local, setLocal] = useState({
    darkMode: true,
    music: true,
    soundEffects: true,
    notifications: true,
    language: "English",
    privacy: "Public",
    ...settings,
  });

  const toggle = (key) => {
    const next = { ...local, [key]: !local[key] };
    setLocal(next);
    onChange?.({ settings: next });
  };

  const toggles = [
    ["darkMode", "Dark Mode"],
    ["music", "Music"],
    ["soundEffects", "Sound Effects"],
    ["notifications", "Notifications"],
  ];

  return (
    <div>
      <div className="jt-section-heading">
        <span className="jt-section-title">Settings</span>
      </div>
      <div className="jt-card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        {toggles.map(([key, label]) => (
          <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{label}</span>
            <Switch on={local[key]} onToggle={() => toggle(key)} />
          </div>
        ))}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Language</span>
          <select
            className="jt-btn-ghost"
            value={local.language}
            onChange={(e) => { const v = { ...local, language: e.target.value }; setLocal(v); onChange?.({ settings: v }); }}
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Privacy</span>
          <select
            className="jt-btn-ghost"
            value={local.privacy}
            onChange={(e) => { const v = { ...local, privacy: e.target.value }; setLocal(v); onChange?.({ settings: v }); }}
          >
            <option>Public</option>
            <option>Friends Only</option>
            <option>Private</option>
          </select>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid var(--jt-glass-border)", margin: "8px 0" }} />

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button className="jt-btn-ghost">Logout</button>
          <button
            className="jt-btn-ghost"
            style={{ color: "var(--jt-danger)", borderColor: "rgba(226,96,79,0.4)" }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
