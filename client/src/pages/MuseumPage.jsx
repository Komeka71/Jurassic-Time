import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { museums, getMuseumBySlug } from "../data/museums.js";
import Collections from "../components/museum/Collections.jsx";
import FeaturedExhibits from "../components/museum/FeaturedExhibits.jsx";
import Timeline from "../components/museum/Timeline.jsx";
import Gallery from "../components/museum/Gallery.jsx";
import VisitInfo from "../components/museum/VisitInfo.jsx";
import RelatedMuseums from "../components/museum/RelatedMuseums.jsx";
import MuseumFooter from "../components/museum/MuseumFooter.jsx";
import CoreSampleRail from "../components/museum/CoreSampleRail.jsx";
import MuseumSpotlight from "../components/museum/MuseumSpotlight.jsx";
import VirtualTour from "../components/museum/VirtualTour.jsx";
import AudioGuide from "../components/museum/AudioGuide.jsx";
import { AudioGuideProvider } from "../components/museum/AudioGuideContext.jsx";
import HomeButton from "../components/Homebtn.jsx";
import DinoGuide from "../components/guide/DinoGuide";
import { useGuide } from "../context/GuideContext";

const AUDIO_SUBTITLES = {
  "royal-tyrrell": "Walking Through Deep Time",
  "field-museum": "Meet SUE the T. rex",
  "smithsonian": "Hall of Fossils Experience",
  "nhm-london": "Journey Through Earth's History",
  "fukui": "Japan's Dinosaur Capital",
  "zigong": "Jurassic Giants of China",
  "raiyoli": "India's Dinosaur Nesting Grounds",
};

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "history", label: "History" },
  { id: "collections", label: "Collections" },
  { id: "exhibits", label: "Exhibits" },
  { id: "timeline", label: "Timeline" },
  { id: "gallery", label: "Gallery" },
  { id: "visit", label: "Visit" },
];

const MUSEUM_FACTS = {
  "royal-tyrrell":
    "The Canadian Badlands continue to reveal new dinosaur fossils almost every year.",
  "field-museum":
    "SUE is one of the largest and most complete Tyrannosaurus rex skeletons ever discovered.",
  smithsonian:
    "The Smithsonian's fossil hall presents over 700 fossil specimens spanning Earth's history.",
  "nhm-london":
    "The Natural History Museum houses more than 80 million scientific specimens.",
  fukui:
    "Fukui Prefecture has produced many of Japan's most important dinosaur discoveries.",
  zigong:
    "The Zigong Dinosaur Museum was built directly above an active fossil excavation site.",
  raiyoli:
    "Raiyoli is one of the world's largest dinosaur nesting grounds, with hundreds of fossilized eggs discovered."
};

export default function MuseumPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const museum = getMuseumBySlug(slug);
  const { setCurrentPage, tourActive } = useGuide();

  useEffect(() => {
    setCurrentPage("museum");
  }, [setCurrentPage, slug]);

  if (!museum) {
    return <Navigate to="/" replace />;
  }

  const related = museums.filter((m) => m.slug !== museum.slug).slice(0, 3);

  return (
    <main className="relative bg-bone">
      <HomeButton onClick={() => navigate("/")} />

      <CoreSampleRail sections={SECTIONS} />
      {/* Hero */}
      <MuseumSpotlight>
      <section id="hero" className="fossil-photo relative flex h-[70vh] min-h-[480px] w-full items-end overflow-hidden">
        <motion.img
          initial={{ scale: 1.06, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          src={museum.heroImage}
          alt={`${museum.name} hero photograph`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
        <div className="relative z-10 px-6 pb-16 sm:px-12 lg:px-20">
          <Link
            to="/"
            className="catalog-id mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest2 text-bone/70 hover:text-bone"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 12H5M11 6l-6 6 6 6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Museum Explorer
          </Link>
          <p className="catalog-id text-xs uppercase tracking-widest2 text-bone/70">
            {museum.city}, {museum.country}
          </p>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-5xl font-medium leading-tight text-bone sm:text-6xl">
            {museum.name}
          </h1>
        </div>
      </section>
      </MuseumSpotlight>

      {/* About */}
      <section id="about" className="px-6 py-24 sm:px-12 lg:px-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="catalog-id text-xs uppercase tracking-widest2 text-amber">About</p>
            <h2 className="mt-2 font-display text-3xl font-medium text-strata">
              The Institution
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-lg leading-relaxed text-ink/80">{museum.about}</p>
          </div>
        </div>
      </section>

      {/* History */}
      <section id="history" className="bg-strata/[0.03] px-6 py-24 sm:px-12 lg:px-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="catalog-id text-xs uppercase tracking-widest2 text-amber">History</p>
            <h2 className="mt-2 font-display text-3xl font-medium text-strata">
              How It Came to Be
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-lg leading-relaxed text-ink/80">{museum.history}</p>
          </div>
        </div>
      </section>

      <Collections collections={museum.collections} />
      <FeaturedExhibits museumSlug={museum.slug} exhibits={museum.featuredExhibits} />
      <Timeline events={museum.timeline} />
      <MuseumSpotlight>
  <Gallery
    images={museum.gallery}
    museumName={museum.name}
  />
</MuseumSpotlight>
      <VisitInfo visitInfo={museum.visitInfo} city={museum.city} country={museum.country} />
      <RelatedMuseums museums={related} />
      <AudioGuideProvider src={`/audio/${museum.slug}.mp3`}>
        <VirtualTour museum={museum} />
        <AudioGuide museumName={museum.name} subtitle="Official Museum Audio Guide" />
      </AudioGuideProvider>
      <MuseumFooter />

      {/* DinoGuide — bottom-right by default; flips to bottom-left while
          the Virtual Tour overlay is open, so it never sits on top of
          the tour's audio-guide card (which docks bottom-right). */}
      <div
        className={`
          fixed
          bottom-5
          ${tourActive ? "left-5 md:left-8" : "right-5 md:right-8"}
          z-[9999]
          scale-[0.65]
          md:scale-[0.7]
          ${tourActive ? "origin-bottom-left" : "origin-bottom-right"}
          transition-all
          duration-300
        `}
      >
        <DinoGuide section="museum" />
      </div>
    </main>
  );
}