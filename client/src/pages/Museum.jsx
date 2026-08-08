import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MuseumHero from "../components/features/museum/MuseumIntro";
// import VirtualTourModal from "../components/features/museum/VirtualTourModal"; // if/when you build it

export default function Museum() {
  const navigate = useNavigate();
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <>
      <MuseumHero
        primaryCta={{ label: "Explore Archive", onClick: () => navigate("/museum/archive") }}
        secondaryCta={{ label: "Virtual Tour", onClick: () => setTourOpen(true) }}
      />

      {/* {tourOpen && <VirtualTourModal onClose={() => setTourOpen(false)} />} */}

      {/* Rest of the museum page — exhibit grid, halls, etc. */}
    </>
  );
}