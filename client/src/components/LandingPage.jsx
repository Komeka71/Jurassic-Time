import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
// import Explore from "../components/landing/Explore";
import Timeline from "../components/landing/Timeline";
// import DailyChallenge from "../components/landing/DailyChallenge";
import MapPreview from "../components/map/MapPreview";
// import Games from "../components/landing/Games";
import { useAuth } from "../context/AuthContext";
// import { getHomepageSections } from "../utils/homepageLayout";
import { getPersonalization } from "../utils/personalization";
// import { useAuth } from "../context/AuthContext";
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
const { user } = useAuth();

// const { user } = useAuth();

const personalization = getPersonalization(user);

const sectionOrder = personalization.homepage.order;
  return (
    <main className="bg-[#08110b] text-white overflow-x-hidden cursor-none">

      {/* Global Cursor */}
      <CursorGlow />
{/* <DinoCompanion/> */}
      <Navbar />
{sectionOrder.map((section) => {
  switch (section) {
    case "hero":
      return <Hero key="hero" />;

    case "timeline":
      return <Timeline key="timeline" />;

    case "map":
      return <MapPreview key="map" />;

    case "quiz":
      return <QuizPreview key="quiz" />;

    case "research":
      return (
        <ResearchPreview
          key="research"
          onEnter={() => navigate("/research")}
        />
      );

    case "games":
      return <MiniGamesPreview key="games" />;

    default:
      return null;
  }
})}

{/* <Explore /> */}
      {/* <DailyChallenge />
      <Games />
      <Community />
      <Genetics />
      <Footer /> */}

    </main>
  );
}