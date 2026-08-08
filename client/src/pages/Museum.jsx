import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MuseumHero from "../components/museum/MuseumIntro";

export default function Museum() {
  const navigate = useNavigate();
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <>
      <MuseumHero
        primaryCta={{
          label: "Explore Archive",
          onClick: () => navigate("/museum/archive"),
        }}
        secondaryCta={{
          label: "Virtual Tour",
          onClick: () => setTourOpen(true),
        }}
      />

      {/* Virtual Tour - enable when modal is ready */}
      {/* {tourOpen && (
        <VirtualTourModal
          onClose={() => setTourOpen(false)}
        />
      )} */}

      {/* Rest of the museum page */}
    </>
  );
}