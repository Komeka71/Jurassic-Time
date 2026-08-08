import React from "react";
import { SITES } from "../data";
import { Stepper, Stars, SiteBackdrop } from "./Shared";
import HomeButton from "../../../components/Homebtn";
import { useNavigate } from "react-router-dom";
export default function SiteSelection({ discoveredCount, totalSpecies, onEnter, onOpenCollection }) {
  const navigate = useNavigate();

  return (
    <div className="screen site-select">
<HomeButton onClick={() => navigate('/')} />

      <div className="hero">
        <h1 className="wordmark">Fossil Excavation</h1>
        <p className="hero-sub">Uncover ancient fossils buried beneath the earth.</p>
      </div>
      <Stepper activeIndex={0} />
      <div className="site-grid">
        {Object.values(SITES).map((site) => {
          const locked = site.locked && discoveredCount < site.unlockAt;
          return (
            <div
              key={site.id}
              className={"vitrine site-card" + (locked ? " locked" : "")}
              onClick={() => !locked && onEnter(site.id)}
              role="button"
              tabIndex={0}
            >
              <div className="card-corner tl" />
              <div className="card-corner tr" />
              <div className="card-corner bl" />
              <div className="card-corner br" />
              <SiteBackdrop id={site.id} />
              <div className="site-card-vignette" />
              {locked && (
                <div className="lock-overlay">
                  <div className="lock-icon">🔒</div>
                  <p className="lock-copy">
                    Sealed by volcanic ash. Discover <strong>{site.unlockAt}</strong> fossils across the museum to
                    unlock this expedition.
                  </p>
                  <div className="lock-progress">
                    <div className="lock-progress-fill" style={{ width: `${Math.min(100, (discoveredCount / site.unlockAt) * 100)}%` }} />
                  </div>
                  <span className="lock-progress-label">{discoveredCount} / {site.unlockAt} discovered</span>
                </div>
              )}
              <div className="site-card-body">
                <h3>{site.name}</h3>
                <p className="site-tagline">{site.tagline}</p>
                <div className="site-meta">
                  <span>Difficulty</span>
                  <Stars n={site.difficulty} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button className="ghost-btn collection-link" onClick={onOpenCollection}>
        View Museum Collection ({discoveredCount}/{totalSpecies}) →
      </button>
    </div>
  );
}