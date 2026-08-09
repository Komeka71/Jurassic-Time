// import { useEffect } from "react";
// import Navbar from "../components/landing/Navbar";
// import Hero from "../components/landing/Hero";
// import Timeline from "../components/landing/Timeline";
// import MapPreview from "../components/map/MapPreview";
// import { useAuth } from "../context/AuthContext";
// import { getPersonalization } from "../utils/personalization";
// import CursorGlow from "../components/landing/CursorGlow";
// import DinoCompanion from "../components/landing/DinoCompanion";
// import DinoGuide from "../components/Hero/DinoGuide";
// import QuizPreview from "../components/QuizPreview/QuizPreview";
// import ResearchPreview from "../components/landing/ResearchPreview/ResearchPreview";
// import MiniGamesPreview from "../components/landing/MiniGamesPreview";
// import { useNavigate } from "react-router-dom";
// import MuseumIntro from "./museum/MuseumIntro";
// import HybridLabPreview from "../components/home/HybridLabPreview";

// export default function LandingPage() {
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const personalization = getPersonalization(user);
//   const sectionOrder = personalization.homepage.order;

//   // Scroll to a requested section after coming back from another page.
//   useEffect(() => {
//     if (window.location.hash === "#mini-games") {
//       const timer = setTimeout(() => {
//         document.getElementById("mini-games")?.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       }, 150);

//       return () => clearTimeout(timer);
//     }
//   }, []);

//   return (
//     <>
//       {/* Global Cursor */}
//       <CursorGlow />

//       {/* Navbar */}
//       <Navbar />

//       <main>
//         {sectionOrder.map((section) => {
//           switch (section) {
//             case "hero":
//               return <Hero key="hero" />;

//             case "timeline":
//               return <Timeline key="timeline" />;

//             case "map":
//               return <MapPreview key="map" />;

//             case "quiz":
//               return <QuizPreview key="quiz" />;

//             case "research":
//               return (
//                 <ResearchPreview
//                   key="research"
//                   onEnter={() => navigate("/research")}
//                 />
//               );

//             case "games":
//               return (
//                 <div
//                   key="games"
//                   id="mini-games"
//                   style={{ scrollMarginTop: "80px" }}
//                 >
//                   <MiniGamesPreview />
//                 </div>
//               );

//             default:
//               return null;
//           }
//         })}
//       </main>
//     </>
//   );
// }



import { useEffect } from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Timeline from "../components/landing/Timeline";
import MapPreview from "../components/map/MapPreview";
import { useAuth } from "../context/AuthContext";
import { getPersonalization } from "../utils/personalization";
import CursorGlow from "../components/landing/CursorGlow";
import DinoCompanion from "../components/landing/DinoCompanion";
import DinoGuide from "../components/Hero/DinoGuide";
import QuizPreview from "../components/QuizPreview/QuizPreview";
import ResearchPreview from "../components/landing/ResearchPreview/ResearchPreview";
import MiniGamesPreview from "../components/landing/MiniGamesPreview";
import { useNavigate } from "react-router-dom";
import MuseumIntro from "./museum/MuseumIntro";
import HybridLabPreview from "../components/home/HybridLabPreview";

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const personalization = getPersonalization(user);
  const sectionOrder = personalization.homepage.order;

  // Scroll to a requested section after coming back from another page.
  useEffect(() => {
    if (window.location.hash === "#mini-games") {
      const timer = setTimeout(() => {
        document.getElementById("mini-games")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {/* Global Cursor */}
      <CursorGlow />

      {/* Navbar */}
      <Navbar />

      <main>
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

            case "museum":
              return (
                <MuseumIntro
                  key="museum"
                  onEnter={() => navigate("/museum")}
                />
              );

            case "hybridLab":
              return <HybridLabPreview key="hybridLab" />;

            case "games":
              return (
                <div
                  key="games"
                  id="mini-games"
                  style={{ scrollMarginTop: "80px" }}
                >
                  <MiniGamesPreview />
                </div>
              );

            default:
              return null;
          }
        })}
      </main>
    </>
  );
}