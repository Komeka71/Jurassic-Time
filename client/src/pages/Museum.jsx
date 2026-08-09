import { useNavigate } from "react-router-dom";
import MuseumIntro from "../components/museum/MuseumIntro";

export default function Museum() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/museums"); // <- point this at wherever MuseumExplorer is actually routed
  };

  const handleTour = () => {
    // There's no generic "virtual tour" without a specific museum's data —
    // the real VirtualTour component lives on MuseumPage and needs `museum` prop.
    // Sending users to a real museum with a working tour, for now:
    navigate("/museum/field-museum");
  };

  return (
    <MuseumIntro
      primaryCta={{ label: "Explore Archive", onClick: handleExplore }}
      secondaryCta={{ label: "Virtual Tour", onClick: handleTour }}
    />
  );
}