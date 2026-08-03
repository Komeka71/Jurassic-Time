import React from "react";
import { SPECIES } from "../data";
import { SpeciesArt } from "./FossilArt";

export default function Collection({ discovered, onBack }) {
  const list = Object.values(SPECIES);
  return (
    <div className="screen collection-screen">
      <button className="ghost-btn back-btn" onClick={onBack}>← Dig Sites</button>
      <h2 className="screen-title">Museum Collection</h2>
      <p className="screen-sub">{discovered.size} of {list.length} specimens discovered</p>
      <div className="gallery">
        {list.map((sp) => {
          const found = discovered.has(sp.id);
          return (
            <div key={sp.id} className={"case vitrine" + (found ? " lit" : " dim")}>
              <div className="case-glow" style={found ? { background: sp.color } : undefined} />
              <div className="case-pedestal-light" />
              <div className="case-glyph">
                <SpeciesArt id={sp.id} mode={found ? "specimen" : "bone"} accent={sp.color} />
              </div>
              <div className="case-plate">
                <span className="case-name">{found ? sp.name : "??? Undiscovered"}</span>
                {found && <span className="case-era">{sp.era}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}