import { useState, useEffect } from "react";
import { motion, animate } from "framer-motion";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import CompanionPicker from "../components/CompanionPicker";
import companions from "../data/companions";
import "../styles/profile-theme.css";

// Counts up from 0 to `value` on mount — used for the stat boxes.
function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate(v) {
        setDisplay(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [value]);

  return <span className="value">{display}</span>;
}

// Decorative double-helix, drawn procedurally so it stays smooth at any height.
function DnaStrand() {
  const points = 20;
  const height = 800;
  const amplitude = 55;
  const centerX = 80;
  const step = height / points;

  const strandA = [];
  const strandB = [];
  const rungs = [];

  for (let i = 0; i <= points; i++) {
    const y = i * step;
    const phase = (i / points) * Math.PI * 4;
    const xA = centerX + Math.sin(phase) * amplitude;
    const xB = centerX - Math.sin(phase) * amplitude;
    strandA.push([xA, y]);
    strandB.push([xB, y]);
    if (i % 2 === 0) rungs.push([xA, xB, y]);
  }

  const toPath = (pts) => pts.reduce((acc, [x, y], i) => acc + (i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`), "");

  return (
    <svg
      className="profile-dna"
      viewBox={`0 0 160 ${height}`}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={toPath(strandA)} stroke="#6fcf6a" strokeWidth="2" fill="none" />
      <path d={toPath(strandB)} stroke="#2f5c2f" strokeWidth="2" fill="none" />
      {rungs.map(([xA, xB, y], i) => (
        <line key={i} x1={xA} y1={y} x2={xB} y2={y} stroke="#6fcf6a" strokeWidth="1" opacity="0.5" />
      ))}
    </svg>
  );
}

// Original illustrated dusk scene: gradient sky, layered hill silhouettes,
// a sauropod, a palm, and foreground ferns. Pure vector, no external image.
function JurassicScene() {
  return (
    <svg
      className="profile-scene"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#081a14" />
          <stop offset="40%" stopColor="#14392a" />
          <stop offset="65%" stopColor="#cbb877" />
          <stop offset="100%" stopColor="#0a1f18" />
        </linearGradient>
        <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e8d9a0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e8d9a0" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="800" height="500" fill="url(#skyGrad)" />
      <ellipse cx="430" cy="260" rx="260" ry="95" fill="url(#glowGrad)" />

      {/* far hills */}
      <path
        fill="#0c2318"
        opacity="0.9"
        d="M0 300 C 100 270, 200 290, 300 275 C 400 260, 500 280, 600 270 C 700 260, 750 275, 800 265 L800 500 L0 500 Z"
      />
      {/* mid tree line */}
      <path
        fill="#081a12"
        d="M0 350 C 60 330, 120 345, 180 335 C 240 325, 300 340, 360 332 C 420 324, 480 338, 540 330 C 600 322, 660 336, 720 328 C 760 324, 780 330, 800 326 L800 500 L0 500 Z"
      />

      {/* sauropod silhouette */}
      <g fill="#060f0a">
        <ellipse cx="520" cy="250" rx="90" ry="48" />
        <path d="M420 220 C 370 180, 320 150, 270 140 C 258 138, 248 144, 244 154 C 240 164, 246 172, 256 174 C 275 178, 258 188, 264 196 C 270 202, 288 194, 300 188 C 345 168, 395 190, 430 225 Z" />
        <path d="M600 260 C 650 268, 700 274, 745 268 C 752 267, 752 260, 745 258 C 700 250, 650 244, 605 240 Z" />
        <path d="M480 300 C 478 325, 476 345, 474 360 L494 360 C 496 340, 497 320, 499 300 Z" />
        <path d="M510 305 C 508 330, 507 348, 506 362 L526 362 C 527 342, 528 322, 529 305 Z" />
        <path d="M545 302 C 543 327, 542 346, 541 361 L561 361 C 562 341, 563 321, 564 302 Z" />
        <path d="M570 298 C 568 323, 567 342, 566 358 L586 358 C 587 338, 588 318, 589 298 Z" />
      </g>

      {/* foreground tree/bush line — crosses in front of the dino's legs, like the reference */}
      <path
        fill="#04100a"
        d="M0 400 C 80 385, 160 395, 240 388 C 320 381, 400 392, 480 386 C 560 380, 640 390, 720 384 C 760 381, 780 385, 800 383 L800 500 L0 500 Z"
      />

      {/* foreground palm, right edge */}
      <g fill="#04100a">
        <path d="M760 500 C 758 420, 752 350, 745 300 L 752 300 C 758 350, 762 420, 764 500 Z" />
        <path d="M745 300 C 700 280, 660 260, 630 250 C 660 270, 690 285, 720 305 Z" />
        <path d="M745 300 C 710 270, 670 240, 635 210 C 660 250, 695 280, 730 310 Z" />
        <path d="M745 300 C 780 270, 810 235, 830 195 C 810 245, 780 280, 750 310 Z" />
        <path d="M745 300 C 790 290, 830 270, 860 245 C 825 275, 790 300, 750 315 Z" />
        <path d="M745 300 C 720 260, 705 210, 700 160 C 715 215, 730 260, 750 305 Z" />
      </g>

      {/* foreground ferns, bottom-left corner */}
      <g fill="#04100a">
        <path d="M0 500 C 10 460, 25 430, 45 410 C 35 445, 25 475, 15 500 Z" />
        <path d="M20 500 C 35 465, 55 435, 80 415 C 65 450, 50 480, 35 500 Z" />
        <path d="M45 500 C 65 470, 90 445, 120 430 C 100 460, 80 485, 60 500 Z" />
      </g>
    </svg>
  );
}

const PARTICLES = [
  { left: "8%", delay: "0s", duration: "6s" },
  { left: "22%", delay: "1.4s", duration: "7.5s" },
  { left: "41%", delay: "0.6s", duration: "5.5s" },
  { left: "63%", delay: "2.1s", duration: "8s" },
  { left: "78%", delay: "0.9s", duration: "6.5s" },
  { left: "90%", delay: "1.8s", duration: "7s" },
];

export default function Profile() {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    username: user.username,
    ageGroup: user.preferences.ageGroup,
    interests: user.preferences.interests,
    companionId: user.companion.companionId,
    companionGender: user.companion.gender,
    companionName: user.companion.name,
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const companion = companions.find((c) => c.id === user.companion.companionId);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const { data } = await api.put("/users/profile", form);
      setUser(data);
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't save your changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-page">
      {/* 1. Centered Header Navigation Panel */}
      <header className="profile-navigation">
        <div>
          {/* <span className="nav-subtitle">Web Wonders 2026</span> */}
          <h1 className="nav-title">Paleora</h1>
        </div>
        <nav className="nav-links">
          <a href="#" className="nav-link active">Profile</a>
          <a href="#" className="nav-link">Log out</a>
        </nav>
      </header>

      {/* 2. Primary ID Card Container */}
      <div className="profile-hero" data-tag="Field ID Card">
        <div className="profile-hero-bg">
          <JurassicScene />
          <DnaStrand />
          <div className="profile-particles">
            {PARTICLES.map((p, i) => (
              <span
                key={i}
                className="profile-particle"
                style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="profile-hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="profile-header">
         <motion.div
  className="profile-photo profile-photo--amber"
  initial={{ scale: 0.6, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{
    duration: 0.5,
    delay: 0.15,
    ease: "backOut",
  }}
>
  {companion?.emoji?.[user.companion?.gender] || "🦴"}
</motion.div>
            <div>
              <h2 className="profile-name" style={{ marginBottom: 2 }}>
                {user.username}
              </h2>
              <span className="helper-text profile-hero-sub">
                Guided by {user.companion.name} the {companion?.label || user.companion.companionId}
              </span>
            </div>
          </div>

          {/* 3. Vertical Stats Stack */}
          <motion.div
            className="stat-grid profile-stat-grid"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}
          >
            {[
              { value: user.quizStats.maxScore, label: "Best score" },
              { value: user.quizStats.maxStreak, label: "Best streak" },
              { value: user.points, label: "Fossil points" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="stat-box profile-stat-box"
                variants={{ hidden: { opacity: 0, y: 16, scale: 0.92 }, show: { opacity: 1, y: 0, scale: 1 } }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <AnimatedNumber value={stat.value} />
                <span className="label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* 4. Achievements Section */}
          <h3 className="profile-badges-title" style={{ fontSize: "1rem", marginTop: 18 }}>
            Badges
          </h3>
          {user.badges.length > 0 ? (
            <motion.div
              className="badge-row"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } } }}
            >
              {user.badges.map((b) => (
                <motion.span
                  key={b}
                  className="badge-pill profile-badge-pill"
                  variants={{ hidden: { opacity: 0, scale: 0.5, rotate: -8 }, show: { opacity: 1, scale: 1, rotate: 0 } }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  transition={{ duration: 0.35, ease: "backOut" }}
                >
                  {b}
                </motion.span>
              ))}
            </motion.div>
          ) : (
            <p className="empty-state profile-hero-sub">No badges yet — take a quiz to earn your first one.</p>
          )}
        </motion.div>
      </div>

      {/* 5. User Preferences Panel */}
      <motion.div
        className="field-card profile-preferences-card"
        data-tag="Preferences"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {!editing ? (
          <>
            <h3>Your dig site profile</h3>
            <p>
              <strong>Age group:</strong> {user.preferences.ageGroup}
            </p>
            <p>
              <strong>Purpose:</strong> {user.preferences.purpose}
            </p>
            <p>
              <strong>Interests:</strong> {user.preferences.interests.join(", ")}
            </p>
            <button className="ghost" onClick={() => setEditing(true)}>
              Edit preferences
            </button>
          </>
        ) : (
          <form onSubmit={handleSave}>
            <h3>Edit preferences</h3>
            {error && <div className="form-error-banner">{error}</div>}

            <div className="field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>

            <div className="field">
              <label htmlFor="ageGroup">Age group</label>
              <select
                id="ageGroup"
                value={form.ageGroup}
                onChange={(e) => setForm({ ...form, ageGroup: e.target.value })}
              >
                <option value="kid">Kid</option>
                <option value="teen">Teen</option>
                <option value="adult">Adult</option>
              </select>
            </div>

            <p className="helper-text">Guide</p>
            <CompanionPicker
              companionId={form.companionId}
              gender={form.companionGender}
              onChange={({ companionId, gender }) => setForm({ ...form, companionId, companionGender: gender })}
            />

            <div style={{ display: "flex", gap: 10 }}>
              <button className="ghost" type="button" onClick={() => setEditing(false)}>
                Cancel
              </button>
              <button className="primary" type="submit" disabled={saving}>
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}