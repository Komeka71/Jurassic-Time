import React, { useState } from "react";
import { Stepper } from "./Shared";
import { SpeciesArt } from "./FossilArt";

export default function MuseumCard({ species, onLearnMore, onBack }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="screen identify-screen">
      <Stepper activeIndex={3} />
      <div className="id-card vitrine">
        <div className="id-card-corner tl" />
        <div className="id-card-corner tr" />
        <div className="id-card-corner bl" />
        <div className="id-card-corner br" />
        <div
          className="id-image-pane"
          style={{ background: `radial-gradient(circle at 50% 40%, ${species.color}2e, #0e0c09 78%)` }}
        >
          <SpeciesArt id={species.id} mode="specimen" accent={species.color} />
        </div>
        <div className="id-info-pane">
          <span className="id-eyebrow">Specimen Identified</span>
          <h2 className="id-name">{species.name}</h2>
          <div className="id-tags">
            <span className="tag era">{species.era}</span>
            <span className={"tag diet " + species.diet.toLowerCase()}>{species.diet}</span>
          </div>
          <p className="id-fact-label">Field Note</p>
          <p className="id-fact">{species.fact}</p>
          {expanded && <p className="id-detail">{species.detail}</p>}
          <div className="id-actions">
            {/*
              Placeholder for future integration: replace this onClick with
              react-router navigation, e.g.
                const navigate = useNavigate();
                onClick={() => navigate(`/timeline/${species.id}`)}
              `species.id` is already threaded through via the onLearnMore
              callback below so the parent (or this component, once wired
              to a router) has everything needed to navigate.
            */}
            <button
              className="brass-btn"
              onClick={() => {
                setExpanded((v) => !v);
                onLearnMore && onLearnMore(species.id);
              }}
            >
              {expanded ? "Show Less" : "Learn More"}
            </button>
            <button className="ghost-btn" onClick={onBack}>Back to Dig Sites</button>
          </div>
        </div>
      </div>
    </div>
  );
}