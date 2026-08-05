import React, { useState, useCallback } from "react";
import "./FossilExcavation.css";
import { SITES, SPECIES, shuffle, pickFossilFor, randomEmptyMessage } from "./data";
import SiteSelection from "./components/SiteSelection";
import DigSite from "./components/DigSite";
import Excavation from "./components/Excavation";
import ScanSequence from "./components/ScanSequence";
import MuseumCard from "./components/MuseumCard";
import Collection from "./components/Collection";
import { Stepper } from "./components/Shared";

/* Small in-flow interstitial for a resolved "empty" excavation. */
function EmptyResultModal({ message, onContinue }) {
  return (
    <div className="modal-backdrop">
      <div className="modal vitrine">
        <div className="modal-icon">🔍</div>
        <h3>Survey Complete</h3>
        <p>{message}</p>
        <button className="brass-btn" onClick={onContinue}>Try Another Marker</button>
      </div>
    </div>
  );
}

export default function FossilExcavation() {
  const [screen, setScreen] = useState("sites"); // sites | explore | excavate | scanning | identify | collection
  const [siteId, setSiteId] = useState(null);
  const [spots, setSpots] = useState([]);
  const [tried, setTried] = useState(new Set());
  const [outcome, setOutcome] = useState(null); // active excavation outcome
  const [emptyMsg, setEmptyMsg] = useState(null);
  const [activeSpecies, setActiveSpecies] = useState(null);
  const [discovered, setDiscovered] = useState(new Set());

  const enterSite = (id) => {
    const fossilSpecies = pickFossilFor(id, discovered);
    const kinds = shuffle([
      { type: "fossil", species: fossilSpecies },
      { type: "empty", ...randomEmptyMessage() },
      { type: "empty", ...randomEmptyMessage() },
    ]);
    const positions = shuffle([
      { x: 22, y: 55 },
      { x: 50, y: 38 },
      { x: 76, y: 58 },
    ]);
    setSpots(kinds.map((k, i) => ({ ...k, x: positions[i].x, y: positions[i].y })));
    setTried(new Set());
    setSiteId(id);
    setScreen("explore");
  };

  const pickSpot = (i) => {
    const spot = spots[i];
    if (spot.type === "empty") {
      setTried((prev) => new Set(prev).add(i));
      setOutcome({ type: "empty", art: spot.art, message: spot.text });
    } else {
      setActiveSpecies(spot.species);
      setOutcome({ type: "fossil", species: spot.species });
    }
    setScreen("excavate");
  };

  const onFossilRevealed = useCallback(() => setScreen("scanning"), []);

  const onEmptyResolved = useCallback((message) => {
    setEmptyMsg(message);
    setScreen("explore");
  }, []);

  const onScanComplete = () => {
    setDiscovered((prev) => new Set(prev).add(activeSpecies));
    setScreen("identify");
  };

  const backToSites = () => {
    setScreen("sites");
    setSiteId(null);
    setActiveSpecies(null);
    setOutcome(null);
  };

  const site = siteId ? SITES[siteId] : null;

  return (
    <div className="fx-root">
      <div className="fx-grain" aria-hidden="true" />
      <div className="topbar">
        <span className="topbar-mark">PALEORA — MUSEUM WITHOUT WALLS</span>
      </div>

      {screen === "sites" && (
        <SiteSelection
          discoveredCount={discovered.size}
          totalSpecies={Object.keys(SPECIES).length}
          onEnter={enterSite}
          onOpenCollection={() => setScreen("collection")}
        />
      )}

      {screen === "explore" && site && (
        <DigSite site={site} spots={spots} triedSet={tried} onPickSpot={pickSpot} onBack={backToSites} />
      )}

      {screen === "excavate" && outcome && (
        <div className="screen excavate-screen">
          <button className="ghost-btn back-btn" onClick={() => setScreen("explore")}>← Markers</button>
          <Stepper activeIndex={1} />
          <h2 className="screen-title">Excavate the Site</h2>
          <p className="screen-sub">Brush carefully — the ground rarely gives up its secrets quickly.</p>
          <Excavation outcome={outcome} onFossilRevealed={onFossilRevealed} onEmptyResolved={onEmptyResolved} />
        </div>
      )}

      {screen === "scanning" && activeSpecies && (
        <ScanSequence species={activeSpecies} onComplete={onScanComplete} />
      )}

      {screen === "identify" && activeSpecies && (
        <MuseumCard species={SPECIES[activeSpecies]} onBack={backToSites} />
      )}

      {screen === "collection" && <Collection discovered={discovered} onBack={backToSites} />}

      {emptyMsg && <EmptyResultModal message={emptyMsg} onContinue={() => setEmptyMsg(null)} />}
    </div>
  );
}