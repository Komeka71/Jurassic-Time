import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
// import Explore from "../components/landing/Explore";
import Timeline from "../components/landing/Timeline";
// import DailyChallenge from "../components/landing/DailyChallenge";
import MapPreview from "../components/map/MapPreview";
// import Games from "../components/landing/Games";
// import Community from "../components/landing/Community";
// import Genetics from "../components/landing/Genetics";
// import Footer from "../components/landing/Footer";
import CursorGlow from "../components/landing/CursorGlow";
import DinoCompanion from "../components/landing/DinoCompanion";
import DinoGuide from "../components/Hero/DinoGuide";
import QuizPreview from "../components/QuizPreview/QuizPreview";
import ResearchPreview from "../components/landing/ResearchPreview/ResearchPreview";
import MiniGamesPreview from "../components/landing/MiniGamesPreview";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="bg-[#08110b] text-white overflow-x-hidden cursor-none">

      {/* Global Cursor */}
      <CursorGlow />
{/* <DinoCompanion/> */}
      <Navbar />
      <Hero />
      <Timeline />
      <MapPreview />
<QuizPreview/>
<ResearchPreview
  onEnter={() => navigate("/research")}
/>

<MiniGamesPreview />

{/* <Explore /> */}
      {/* <DailyChallenge />
      <Games />
      <Community />
      <Genetics />
      <Footer /> */}

    </main>
  );
}