import { useState } from "react";

export default function DinoPopup({ site, onClose }) {
  const [activeIdx, setActiveIdx] = useState(0);
  if (!site) return null;

  const dino = site.dinos[activeIdx];

  return (
<div className="maps-popup-overlay" onClick={onClose}>
  <div
    className="maps-popup-card"
    onClick={(e) => e.stopPropagation()}
  >
        <button className="pop-close" onClick={onClose}>✕</button>

        <div className="pop-site">
          <div className="pop-site-label">Fossil Site</div>
          <div className="pop-site-name">{site.name}</div>
          <div className="pop-site-meta">
            {site.country}{site.state ? " · " + site.state : ""} · {site.dinos.length} species found
          </div>
        </div>

        <div className="dino-tabs">
          {site.dinos.map((d, i) => (
            <button
              key={d.name}
              className={`dtab ${i === activeIdx ? "active" : ""}`}
              onClick={() => setActiveIdx(i)}
            >
              {d.name.split(" ")[0]}
            </button>
          ))}
        </div>

        <div className="dino-panels">
          <div className="dino-panel active">
            <div className="dino-head">
              <div className="dino-emo">{dino.emoji}</div>
              <div>
                <div className="dino-nm">{dino.name}</div>
                <div className="dino-per">{dino.period}</div>
              </div>
            </div>
            <div className="dino-desc">{dino.desc}</div>
            <div className="stats">
              <div className="stat"><div className="stat-l">Length</div><div className="stat-v">{dino.length}</div></div>
              <div className="stat"><div className="stat-l">Weight</div><div className="stat-v">{dino.weight}</div></div>
              <div className="stat"><div className="stat-l">Diet</div><div className="stat-v">{dino.diet}</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}