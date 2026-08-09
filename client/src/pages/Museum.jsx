// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import MuseumIntro from "../components/museum/MuseumIntro";

// export default function Museum() {
//   const navigate = useNavigate();
//   const [tourOpen, setTourOpen] = useState(false);

//   const handleExplore = () => {
//     console.log("🔥 EXPLORE ARCHIVE CLICKED");
//     navigate("/museum/archive");
//   };

//   const handleTour = () => {
//     console.log("🔥 VIRTUAL TOUR CLICKED");
//     setTourOpen(true);
//   };

//   return (
//     <MuseumIntro
//       primaryCta={{
//         label: "Explore Archive",
//         onClick: handleExplore,
//       }}
//       secondaryCta={{
//         label: "Virtual Tour",
//         onClick: handleTour,
//       }}
//     />
//   );
// }

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MuseumIntro from "../components/museum/MuseumIntro";
import { useGuide } from "../context/GuideContext"; // adjust path to match actual location relative to this file

const Museum = () => {
  const navigate = useNavigate();
  const [tourOpen, setTourOpen] = useState(false);
  const { setCurrentPage } = useGuide();

  useEffect(() => {
    setCurrentPage("museumIntro");
  }, [setCurrentPage]);

  const handleExplore = () => {
    navigate("/museum/archive");
  };

  const handleTour = () => {
    setTourOpen(true);
  };

  return (
    <main className="museum-page">
      {/* Background */}
      <div className="museum-background" />

      {/* Dark overlay */}
      <div className="museum-overlay" />

      {/* Content */}
      <section className="museum-content">
        <div className="museum-text">
          <h1>
            Explore the
            <br />
            Museum
          </h1>

          <p>
            Step inside and discover fossils, ancient creatures,
            and stories preserved from Earth's deep past.
          </p>

          <div className="museum-actions">
            <button
              className="museum-primary-btn"
              onClick={() => navigate("/museum")}
            >
              Enter Museum
              <span>→</span>
            </button>

            <button
              className="museum-secondary-btn"
              onClick={() => navigate("/museum")}
            >
              Explore Exhibits
            </button>
          </div>

          <div className="museum-details">
            <span>Fossils</span>
            <i>•</i>
            <span>Dinosaur Skeletons</span>
            <i>•</i>
            <span>Ancient Life</span>
          </div>
        </div>
      </section>

      {/* Small decorative element */}
      <div className="museum-corner-detail">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </main>
  );
};

export default Museum;