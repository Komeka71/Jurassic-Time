import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function EditProfileModal({ profile, onClose, onSave }) {
  const [form, setForm] = useState({
    username: profile.username || "",
    bio: profile.bio || "",
    favouriteDinosaur: profile.favouriteDinosaur || "",
    favouriteEra: profile.favouriteEra || "",
    country: profile.country || "",
    socialLinks: profile.socialLinks || "",
  });
  const [saving, setSaving] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

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
          <Field label="Bio" value={form.bio} onChange={set("bio")} textarea />
          <Field label="Favourite Dinosaur" value={form.favouriteDinosaur} onChange={set("favouriteDinosaur")} />
          <Field label="Favourite Era" value={form.favouriteEra} onChange={set("favouriteEra")} />
          <Field label="Country" value={form.country} onChange={set("country")} />
          <Field label="Social Links (optional)" value={form.socialLinks} onChange={set("socialLinks")} />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22 }}>
          <button type="button" className="jt-btn-ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="jt-btn-amber" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
        </div>
      </motion.form>
    </motion.div>
  );
}

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
