
import Chatbot from "../chat/Chatbot";
import ArchiveHero from "./Hero/ArchiveHero";
import MapRoom from "./MapRoom/MapRoom";
import SubmitJournal from "./SubmitJournal/SubmitJournal";
import VerificationPipeline from "./Verification/VerificationPipeline";
import DiscoveriesSection from "./Discoveries/DiscoveriesSection";
import ResearchNetwork from "./Network/ResearchNetwork";
import FloatingNavigation from "./FloatingNavigation";
// import ActivityFeed from "./Activity/ActivityFeed";
// import Leaderboard from "./Leaderboard/Leaderboard";
// import WeeklyChallenge from "./WeeklyChallenge/WeeklyChallenge";
import DinoGuide from "../guide/DinoGuide";
import { useGuide } from "../../context/GuideContext";
import { useAuth } from "../../context/AuthContext";
import { getPersonalization } from "../../utils/personalization";

import { useEffect, useRef, useState } from "react";

export default function ResearchHub() {
  const videoRef = useRef(null);
  const { user } = useAuth();
  const personalization = getPersonalization(user);
  const { setCurrentPage, setLastAction } = useGuide();

useEffect(() => {
  // Always start at the Hero
  window.scrollTo(0, 0);

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  if (videoRef.current) {
    videoRef.current.playbackRate = 0.15;
  }
}, []);

// The shared guide context previously had no idea the user was on the
// Research Hub at all (this page never called setCurrentPage), so the
// chat guide would answer "what page is this?" using whatever page the
// visitor had been on before. Keep it in sync here.
useEffect(() => {
  setCurrentPage("research");
  setLastAction("researchVisited");
}, [setCurrentPage, setLastAction]);
const [guideMood, setGuideMood] = useState("wave");
const heroRef = useRef(null);
const mapRef = useRef(null);
const submitRef = useRef(null);
const verificationRef = useRef(null);
const discoveriesRef = useRef(null);
const networkRef = useRef(null);
const [guideMessage, setGuideMessage] = useState(
  "Welcome to the PaleoVerse Research Archive."
);
useEffect(() => {
const sections = [
  {
    ref: heroRef,
    mood: "wave",
    message: "Welcome to the PaleoVerse Research Archive.",
  },

  {
    ref: mapRef,
    mood: "pointingRight",
    message: "Explore fossil discoveries from around the world.",
  },

  {
    ref: submitRef,
    mood: "happy",
    message: "Upload your fossil discovery for verification.",
  },

  {
    ref: verificationRef,
    mood: "thinking",
    message: "Every submission is carefully verified using AI.",
  },

  {
    ref: discoveriesRef,
    mood: "celebrate",
    message: "Browse verified discoveries from our researchers.",
  },

  {
    ref: networkRef,
    mood: "loveHappy",
    message: "Connect with paleontologists across the globe.",
  },
];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const section = sections.find(
          (s) => s.ref.current === entry.target
        );

        if (section) {
         setGuideMood(section.mood);
setGuideMessage(section.message);
        }
      });
    },
    {
      threshold: 0.45,
    }
  );

  sections.forEach((s) => {
    if (s.ref.current)
      observer.observe(s.ref.current);
  });

  return () => observer.disconnect();
}, []);
  return (
<section className="relative overflow-hidden bg-[#090806]">

  <FloatingNavigation />

  {/* HERO */}      <div ref={heroRef}>
    <ArchiveHero />
</div>

      {/* ================= REST OF RESEARCH HUB ================= */}
      <div className="relative">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source
              src="/videos/research/museum.mp4"
              type="video/mp4"
            />
          </video>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/80" />

          {/* Warm Museum Tint */}
<div className="absolute inset-0 bg-gradient-to-b from-[#1b130d]/40 via-[#090806]/75 to-black/95" />        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12">
          <div
    ref={mapRef}
    className="pt-32"
>
    <MapRoom />
</div>

          <div
    ref={submitRef}
    className="pt-40"
>
    <SubmitJournal />
</div>

          <div
    ref={verificationRef}
    className="pt-40"
>
    <VerificationPipeline />
</div>

         <div
    ref={discoveriesRef}
    className="pt-40"
>
    <DiscoveriesSection />
</div>
          <div
    ref={networkRef}
    className="pt-40"
>
    <ResearchNetwork />
</div>
          {/*
          <div className="pt-40">
            <ActivityFeed />
          </div>

          <div className="pt-40">
            <Leaderboard />
          </div>

          <div className="pt-40 pb-40">
            <WeeklyChallenge />
          </div>
          */}
        </div>
      </div>
  {/* ================= FLOATING DINO ================= */}
<div
  className="
    fixed
    bottom-2
    right-3

    xl:bottom-4
    xl:right-6

    z-[90]

    origin-bottom-right
    scale-[0.9]

    xl:scale-[1.2]
    2xl:scale-[1.05]
  "
>
  <DinoGuide
    controlled
    disableClick
    mood={guideMood}
    message={guideMessage}
  />
</div>

{/* ================= AI CHATBOT ================= */}
<div
  className="
    fixed
    bottom-4
    left-0

    md:bottom-6
    md:left-6

    z-[95]
  "
>
  <Chatbot personalization={personalization} page="research" userName={user?.username} />
</div>

</section>
  );
}