import { motion } from "framer-motion";
import { Microscope } from "lucide-react";
import { useEffect, useState } from "react";
import { useGuide } from "../../../context/GuideContext";
import axios from "axios";
import { mapDiscovery } from "../../../utils/mapDiscovery";
import DiscoveryCard from "./DiscoveryCard";
import DiscoveryDrawer from "./DiscoveryDrawer";

export default function DiscoveriesSection() {
  const [selectedDiscovery, setSelectedDiscovery] =
  useState(null);

const [discoveries, setDiscoveries] =
  useState([]);

const [loading, setLoading] =
  useState(true);
  useEffect(() => {
  fetchDiscoveries();
}, []);
const {
  setCurrentDinosaur,
  setLastAction,
} = useGuide();
async function fetchDiscoveries() {
  try {
    const { data } = await axios.get(
      "http://localhost:3000/api/discoveries/latest"
    );

    setDiscoveries(
      data.discoveries.map(mapDiscovery)
    );
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}
  return (
    <section id="discoveries" className="relative overflow-hidden py-32">

      {/* ================= VIDEO BACKGROUND ================= */}

      <div className="absolute inset-0 overflow-hidden">

        {/* Uncomment when you generate the museum video */}

        
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-100"
        >
          <source
            src="/videos/research/discoveries.mp4"
            type="video/mp4"
          />
        </video>
       

        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-black/70" />

        {/* Warm Glow */}

        <div className="absolute inset-0 bg-gradient-to-b from-[#3c2917]/10 via-[#120d09]/60 to-[#090705]" />

        {/* Center Glow */}

        <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#d6aa62]/10 blur-[190px]" />

        {/* Side Glow */}

        <div className="absolute left-0 top-1/2 h-72 w-72 rounded-full bg-[#d6aa62]/5 blur-[170px]" />

        <div className="absolute right-0 top-1/2 h-72 w-72 rounded-full bg-[#d6aa62]/5 blur-[170px]" />

        {/* Floating Dust */}

        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -70],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            className="absolute rounded-full bg-[#f5deb0]"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 mx-auto max-w-[1550px] px-6">

        {/* ================= HEADER ================= */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >

          {/* Badge */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#8b6637]
              bg-[#24180f]/80
              px-6
              py-2
              text-xs
              uppercase
              tracking-[0.35em]
              text-[#ddb878]
              backdrop-blur-md
            "
          >
            <Microscope size={15} />
            Museum Collection
          </div>

          {/* Heading */}

          <h2
            className="
              mt-8
              font-bold
              leading-tight
              text-[#f8ebd3]
text-4xl md:text-[3.3rem]            "
          >
Research Collection          
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-8
              max-w-3xl
              text-lg
              leading-9
              text-[#d7c5aa]
            "
          >
            Authentic fossil discoveries preserved inside the PaleoVerse Museum Archive.
          </p>

          {/* Divider */}

          <div className="mx-auto mt-10 h-px w-48 bg-gradient-to-r from-transparent via-[#ddb878]/60 to-transparent" />

        </motion.div>

        {/* ================= CARDS ================= */}

       <div
  className="
    flex
    gap-8
    overflow-x-auto
    pb-6
    snap-x
    snap-mandatory
    scrollbar-hide
  "
><div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-[#090705] to-transparent" />

<div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-[#090705] to-transparent" />
  {discoveries.map((discovery, index) => (
    <div
      key={discovery.id}
      className="
        min-w-[360px]
        max-w-[360px]
        shrink-0
        snap-start
      "
    >
      <DiscoveryCard
        discovery={discovery}
        index={index}
        onClick={(discovery) => {
  setSelectedDiscovery(discovery);
  setLastAction("discoveryOpened");
  setCurrentDinosaur(discovery.species);
}}
      />
    </div>
  ))}
</div>

      </div>

      {/* ================= DRAWER ================= */}

      <DiscoveryDrawer
        discovery={selectedDiscovery}
        open={!!selectedDiscovery}
        onClose={() => setSelectedDiscovery(null)}
      />

    </section>
  );
}