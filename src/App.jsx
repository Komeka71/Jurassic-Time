import { useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { SITES } from "./data/sites";
import { pinIcon } from "./components/PinIcon";
import DinoPopup from "./components/DinoPopup";

function FlyTo({ lat, lng, zoom }) {
  const map = useMap();
  map.flyTo([lat, lng], Math.max(map.getZoom(), zoom), { duration: 1 });
  return null;
}

export default function App() {
  const [selectedSite, setSelectedSite] = useState(null);
  const [flyTo, setFlyTo] = useState(null);
  const [hintVisible, setHintVisible] = useState(true);

  const handleMarkerClick = useCallback((site) => {
    setSelectedSite(site);
    setFlyTo({ lat: site.lat, lng: site.lng, zoom: 4 });
    setHintVisible(false);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedSite(null);
    setFlyTo(null);
  }, []);

  return (
    <div className="app">
      <header className="hdr">
        <span style={{ fontSize: "24px" }}>🦕</span>
        <div>
          <div className="hdr-title">DINOVERSE</div>
          <div className="hdr-sub">Fossil Site Explorer</div>
        </div>
        <div className="hdr-badge">{SITES.length} fossil sites</div>
      </header>

      <MapContainer
        center={[20, 15]}
        zoom={2}
        minZoom={2}
        maxZoom={12}
        zoomControl={true}
        className="map"
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
            eventHandlers={{ click: () => handleMarkerClick(site) }}
          >
            <Tooltip
              direction="top"
              offset={[0, -18]}
              opacity={1}
              className="custom-tooltip"
            >
              <b style={{ color: "#C4A35A" }}>{site.name}</b>
              <br />
              <span style={{ color: "#9CA3AF", fontSize: "11px" }}>
                {site.country} · {site.dinos.length} species
              </span>
            </Tooltip>
          </Marker>
        ))}

        {flyTo && <FlyTo lat={flyTo.lat} lng={flyTo.lng} zoom={flyTo.zoom} />}
      </MapContainer>

      <div className={`hint ${!hintVisible ? "hidden" : ""}`}>
        🗺️ Click any glowing point to explore fossil sites
      </div>

      {selectedSite && <DinoPopup site={selectedSite} onClose={handleClose} />}
    </div>
  );
}