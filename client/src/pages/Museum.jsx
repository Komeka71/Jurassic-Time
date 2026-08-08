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
          onClick: () => {
            console.log("🔥 EXPLORE ARCHIVE CLICKED");
            navigate("/museum/archive");
          },
        }}
        secondaryCta={{
          label: "Virtual Tour",
          onClick: () => {
            console.log("🔥 VIRTUAL TOUR CLICKED");
            setTourOpen(true);
          },
        }}
      />

      {/* {tourOpen && (
        <VirtualTourModal onClose={() => setTourOpen(false)} />
      )} */}
    </>
  );
}