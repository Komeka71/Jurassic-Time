import { useState, useCallback, useEffect } from "react";
import { useGuide } from "../context/GuideContext";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DinoGuide from "../components/guide/DinoGuide";
import Chatbot from "../components/chat/Chatbot";
import { SITES } from "../data/sites";
import { pinIcon } from "../components/PinIcon";
import DinoPopup from "../components/DinoPopup";
import { useAuth } from "../context/AuthContext";
import { getPersonalization } from "../utils/personalization";
import { useNavigate } from "react-router-dom";

import "./Maps.css";

function FlyTo({ lat, lng, zoom }) {
  const map = useMap();

  map.flyTo([lat, lng], Math.max(map.getZoom(), zoom), {
    duration: 1,
  });

  return null;
}

export default function Maps() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const personalization = getPersonalization(user);

  const [selectedSite, setSelectedSite] = useState(null);
  const [flyTo, setFlyTo] = useState(null);
  const [hintVisible, setHintVisible] = useState(true);

const {
  setCurrentPage,
  setCurrentDinosaur,
  setLastAction,
} = useGuide();
useEffect(() => {
  setCurrentPage("map");
  setCurrentDinosaur("earth");
  setLastAction("");
}, [
  setCurrentPage,
  setCurrentDinosaur,
  setLastAction,
]);
const handleMarkerClick = useCallback(
  (site) => {
    setSelectedSite(site);

    setFlyTo({
      lat: site.lat,
      lng: site.lng,
      zoom: 4,
    });

    setHintVisible(false);

    setCurrentDinosaur(site.name);

    setLastAction("mapLocationFound");
  },
  [
    setCurrentDinosaur,
    setLastAction,
  ]
);

const handleClose = useCallback(() => {
  setSelectedSite(null);
  setFlyTo(null);

  setCurrentDinosaur("earth");
}, [setCurrentDinosaur]);
  return (
    <div className="maps-app">
      <header className="maps-hdr">
        <span style={{ fontSize: "24px" }}>🦕</span>

        <div>
          <div className="maps-hdr-title">PALEORA</div>
          <div className="maps-hdr-sub">
            Fossil Site Explorer
          </div>
        </div>

        <div className="maps-hdr-badge">
          {SITES.length} fossil sites
        </div>
      </header>

      <button
  className="maps-back-home"
  onClick={() => navigate("/")}
>
  <span className="maps-back-arrow">←</span>
  <span>Back to Home</span>
</button>

      <MapContainer
        center={[20, 15]}
        zoom={2}
        minZoom={2}
        maxZoom={12}
        zoomControl={true}
        className="maps-map"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
          detectRetina={true}
        />

        {SITES.map((site) => (
          <Marker
            key={site.id}
            position={[site.lat, site.lng]}
            icon={pinIcon}
            // eventHandlers={{
            //   click: () => handleMarkerClick(site),
            // }}
            eventHandlers={{
  click: () => {
    console.log("Marker clicked:", site.name);
    handleMarkerClick(site);
  },
}}
          >
            <Tooltip
              direction="top"
              offset={[0, -18]}
              opacity={1}
              className="custom-tooltip"
            >
              <b style={{ color: "#C4A35A" }}>
                {site.name}
              </b>
              <br />
              <span
                style={{
                  color: "#9CA3AF",
                  fontSize: "11px",
                }}
              >
                {site.country} · {site.dinos.length} species
              </span>
            </Tooltip>
          </Marker>
        ))}

        {flyTo && (
          <FlyTo
            lat={flyTo.lat}
            lng={flyTo.lng}
            zoom={flyTo.zoom}
          />
        )}
      </MapContainer>

      <div
        className={`maps-hint ${
          !hintVisible ? "hidden" : ""
        }`}
      >
        🗺️ Click any glowing point to explore fossil sites
      </div>

      {selectedSite && (
        <DinoPopup
          site={selectedSite}
          onClose={handleClose}
        />
      )}
      {/* Floating Dino */}
{/* Floating Dino */}
<div
  className="
    fixed

    bottom-6
    left-6

    z-[900]

    hidden
    xl:block

    origin-bottom-left

    scale-[0.9]
    2xl:scale-100
  "
>
  <DinoGuide section="map" />
</div>

<Chatbot personalization={personalization} page="map" userName={user?.username} />

    </div>
  );
}