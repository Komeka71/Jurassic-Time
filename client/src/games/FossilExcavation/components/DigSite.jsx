import React from "react";
import { Stepper, SiteBackdrop } from "./Shared";

export default function DigSite({ site, spots, triedSet, onPickSpot, onBack }) {
  return (
    <div className="screen explore-screen">
      <button className="ghost-btn back-btn" onClick={onBack}>← Dig Sites</button>
      <Stepper activeIndex={0} />
      <h2 className="screen-title">{site.name}</h2>
      <p className="screen-sub">Select an excavation marker to begin your survey.</p>
      <div className="spot-field vitrine">
        <SiteBackdrop id={site.id} />
        <div className="spot-field-vignette" />
        <div className="spot-markers">
          {spots.map((spot, i) => {
            const tried = triedSet.has(i);
            return (
              <button
                key={i}
                className={"marker" + (tried ? " tried" : "")}
                style={{ left: spot.x + "%", top: spot.y + "%" }}
                disabled={tried}
                onClick={() => onPickSpot(i)}
                aria-label={`Excavation marker ${i + 1}`}
              >
                <span className="marker-pulse" />
                <span className="marker-post" />
                <span className="marker-flag">{tried ? "✕" : i + 1}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}