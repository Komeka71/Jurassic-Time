import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MuseumIntro from "../components/museum/MuseumIntro";
import { useGuide } from "../context/GuideContext"; // adjust path to match actual location relative to this file

export default function Museum() {
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