import React, { useState, useEffect } from "react";
import { SpeciesArt } from "./FossilArt";

const LINES = [
  "Scanning specimen…",
  "Analyzing skeletal structure…",
  "Comparing prehistoric fossil records…",
  "Species Identified ✓",
];

export default function ScanSequence({ species, onComplete }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx < LINES.length - 1) {
      const t = setTimeout(() => setIdx((i) => i + 1), 1000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(onComplete, 1200);
    return () => clearTimeout(t);
  }, [idx]); // eslint-disable-line

  return (
    <div className="screen scanning-screen">
      <div className="scan-frame vitrine">
        <span className="scan-eyebrow">Museum AI Archive</span>
        <div className="scan-visual">
          <SpeciesArt id={species} mode="bone" />
          <div className="scan-line" />
          <div className="scan-ring" />
        </div>
        <div className="scan-log">
          {LINES.slice(0, idx + 1).map((l, i) => (
            <p key={i} className={"scan-line-text" + (i === idx ? " active" : "") + (l.includes("✓") ? " confirm" : "")}>
              {l}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}