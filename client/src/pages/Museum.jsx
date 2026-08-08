import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MuseumIntro from "../components/museum/MuseumIntro";

export default function Museum() {
  const navigate = useNavigate();
  const [tourOpen, setTourOpen] = useState(false);

  const handleExplore = () => {
    console.log("🔥 EXPLORE ARCHIVE CLICKED");
    navigate("/museum/archive");
  };

  const handleTour = () => {
    console.log("🔥 VIRTUAL TOUR CLICKED");
    setTourOpen(true);
  };

  return (
    <MuseumIntro
      primaryCta={{
        label: "Explore Archive",
        onClick: handleExplore,
      }}
      secondaryCta={{
        label: "Virtual Tour",
        onClick: handleTour,
      }}
    />
  );
}