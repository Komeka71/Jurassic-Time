import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Avatar from "../../../components/Avatar";
import { DINO_COLORS } from "../../../data/avatarAssets";

const AGE_GROUPS = ["kid", "teen", "adult"];
const PURPOSES = ["learning", "research", "fun", "teaching"];
const INTERESTS = [
  "carnivores",
  "flying reptiles",
  "marine reptiles",
  "fossils/geology",
  "extinction science",
];

export default function EditProfileModal({ profile, onClose, onSave }) {
  const [form, setForm] = useState({
    username: profile.username || "",
    fullName: profile.fullName || "",
    bio: profile.bio || "",
    ageGroup: profile.ageGroup || "",
    purpose: profile.purpose || "",
    interests: profile.interests || [],
    companionId: profile.companionId || "green",
    companionName: profile.companionName || "",
  });
  const [saving, setSaving] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleInterest = (interest) => {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(interest)
        ? f.interests.filter((i) => i !== interest)
        : [...f.interests, interest],
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      className="jt-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.form
        className="jt-card jt-modal"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 10 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h2 className="jt-serif" style={{ margin: 0, fontSize: 20 }}>Edit Explorer Profile</h2>
          <button type="button" className="jt-btn-ghost" style={{ padding: 8 }} onClick={onClose}><X size={16} /></button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Field label="Username" value={form.username} onChange={set("username")} />
          <Field label="Full Name" value={form.fullName} onChange={set("fullName")} />
          <Field label="Bio" value={form.bio} onChange={set("bio")} textarea />

          {/* Age group */}
          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "var(--jt-cream-dim)" }}>
            Age Group
            <select
              value={form.ageGroup}
              onChange={set("ageGroup")}
              style={selectStyle}
            >
              <option value="">Select...</option>
              {AGE_GROUPS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </label>

          {/* Purpose */}
          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "var(--jt-cream-dim)" }}>
            Purpose
            <select
              value={form.purpose}
              onChange={set("purpose")}
              style={selectStyle}
            >
              <option value="">Select...</option>
              {PURPOSES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>

          {/* Interests - multi select */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "var(--jt-cream-dim)" }}>
            Interests
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {INTERESTS.map((interest) => {
                const active = form.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 999,
                      fontSize: 12,
                      border: active
                        ? "1px solid var(--jt-amber-2)"
                        : "1px solid var(--jt-glass-border)",
                      background: active
                        ? "rgba(232, 163, 61, 0.18)"
                        : "rgba(241,231,208,0.06)",
                      color: active ? "var(--jt-amber-2)" : "var(--jt-cream-dim)",
                      cursor: "pointer",
                    }}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dinosaur color */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: "var(--jt-cream-dim)" }}>
            Dinosaur Color
            <div style={{ display: "flex", gap: 12 }}>
              {DINO_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, companionId: color }))}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    padding: 8,
                    borderRadius: 12,
                    border:
                      form.companionId === color
                        ? "2px solid var(--jt-amber-2)"
                        : "2px solid transparent",
                    background: "rgba(241,231,208,0.06)",
                    cursor: "pointer",
                  }}
                >
                  <Avatar companionId={color} equippedItems={null} size="56px" />
                  <span style={{ fontSize: 11, textTransform: "capitalize" }}>{color}</span>
                </button>
              ))}
            </div>
          </div>

          <Field
            label="Dinosaur Name"
            value={form.companionName}
            onChange={set("companionName")}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22 }}>
          <button type="button" className="jt-btn-ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="jt-btn-amber" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
        </div>
      </motion.form>
    </motion.div>
  );
}

const selectStyle = {
  background: "rgba(241,231,208,0.06)",
  border: "1px solid var(--jt-glass-border)",
  borderRadius: 10,
  padding: "10px 12px",
  color: "var(--jt-cream)",
  fontSize: 14,
};

function Field({ label, value, onChange, textarea }) {
  const Comp = textarea ? "textarea" : "input";
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "var(--jt-cream-dim)" }}>
      {label}
      <Comp
        value={value}
        onChange={onChange}
        rows={textarea ? 3 : undefined}
        style={{
          background: "rgba(241,231,208,0.06)",
          border: "1px solid var(--jt-glass-border)",
          borderRadius: 10,
          padding: "10px 12px",
          color: "var(--jt-cream)",
          fontSize: 14,
          resize: textarea ? "vertical" : "none",
        }}
      />
    </label>
  );
}