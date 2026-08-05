import React from "react";

export default function SectionNav({ sections, active, onSelect }) {
  return (
    <nav className="jt-card jt-side-nav">
      {sections.map((s) => (
        <button
          key={s.id}
          className={`jt-nav-item ${active === s.id ? "active" : ""}`}
          onClick={() => onSelect(s.id)}
        >
          {s.label}
        </button>
      ))}
    </nav>
  );
}
