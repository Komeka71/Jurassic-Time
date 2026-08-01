// import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
// import DebugErrorBoundary from "./components/DebugErrorBoundary";
// // import CursorGlow from "./components/landing/CursorGlow";

// // Auth
// import ProtectedRoute from "./components/ProtectedRoute";
// import RequireOnboarding from "./components/RequireOnboarding";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import VerifyOtp from "./pages/VerifyOtp";
// import Onboarding from "./pages/Onboarding";
// import HomeLogin from "./pages/HomeLogin";
// import ProfileLogin from "./pages/ProfileLogin";
// import EraTimeline from "./pages/EraTimeline";
// import SearchPage from "./pages/SearchPage";

// // Register search collections
// import "./search/registerCollections.js";
// // Jurassic
// import LandingPage from "./components/LandingPage";
// import Home from "./pages/Home";
// import DailyMissions from "./pages/DailyMissions";
// import ExpeditionSelect from "./pages/ExpeditionSelect";
// import Quiz from "./pages/Quiz";
// import Map from "./pages/Map";
// import Camp from "./pages/Camp";
// import DinoShop from "./pages/DinoShop";
// import Collection from "./pages/Collection";
// import Leaderboard from "./pages/Leaderboard";
// import Profile from "./pages/Profile";
// import ResearchHub from "./components/ResearchHub/ResearchHub";

// // Mini Games
// import DinoTrackDetective from "./games/DinoTrackDetective/DinoTrackDetective";
// import EraSorting from "./games/EraSorting/EraSorting";
// import FossilExcavation from "./games/FossilExcavation/FossilExcavation";

// function MainLayout() {
//   return (
//     <div className="app-shell">
//       <Outlet />
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       {/* <CursorGlow /> */}

//       <Routes>
//         {/* Authentication */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/verify-otp" element={<VerifyOtp />} />

//         <Route element={<MainLayout />}>

//           {/* Landing */}
//           {/* <Route path="/" element={<LandingPage />} /> */}

//           <Route
//   path="/"
//   element={
//     <DebugErrorBoundary>
//       <LandingPage />
//     </DebugErrorBoundary>
//   }
// />
// {/* Timeline */}
// <Route path="/timeline/:era" element={<EraTimeline />} />

// {/* Search */}
// <Route path="/search" element={<SearchPage />} />
//           {/* Login System */}
//           <Route path="/login-home" element={<HomeLogin />} />

//           <Route element={<ProtectedRoute />}>
//             <Route path="/onboarding" element={<Onboarding />} />

//             <Route element={<RequireOnboarding />}>
//               <Route
//                 path="/login-profile"
//                 element={<ProfileLogin />}
//               />
//             </Route>
//           </Route>

//           {/* Jurassic */}
//           <Route path="/home" element={<Home />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/daily" element={<DailyMissions />} />
//           <Route path="/expedition" element={<ExpeditionSelect />} />
//           <Route path="/quiz" element={<Quiz />} />
//           <Route path="/map" element={<Map />} />
//           <Route path="/camp" element={<Camp />} />
//           <Route path="/shop" element={<DinoShop />} />
//           <Route path="/collection" element={<Collection />} />
//           <Route path="/leaderboard" element={<Leaderboard />} />
//           <Route path="/research" element={<ResearchHub />} />

//           {/* Mini Games */}
//           <Route
//             path="/mini-games/dino-track-detective"
//             element={<DinoTrackDetective />}
//           />
//           <Route
//             path="/mini-games/era-sorting"
//             element={<EraSorting />}
//           />
//           <Route
//             path="/mini-games/fossil-excavation"
//             element={<FossilExcavation />}
//           />

//           <Route
//             path="*"
//             element={<h2>404 - Page Not Found</h2>}
//           />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }




import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Auth
import ProtectedRoute from "./components/ProtectedRoute";
import RequireOnboarding from "./components/RequireOnboarding";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import Onboarding from "./pages/Onboarding";
import HomeLogin from "./pages/HomeLogin";
import ProfileLogin from "./pages/ProfileLogin";

// Timeline
import TimelineLandingPage from "./pages/LandingPage";
import EraTimeline from "./pages/EraTimeline";
import SearchPage from "./pages/SearchPage";

// Register search collections
import "./search/registerCollections.js";

// Jurassic Homepage
import LandingPage from "./components/LandingPage";

// Jurassic Pages
import Home from "./pages/Home";
import DailyMissions from "./pages/DailyMissions";
import ExpeditionSelect from "./pages/ExpeditionSelect";
import Quiz from "./pages/Quiz";
import Map from "./pages/Map";
import Camp from "./pages/Camp";
import DinoShop from "./pages/DinoShop";
import Collection from "./pages/Collection";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import ResearchHub from "./components/ResearchHub/ResearchHub";

// Mini Games
import DinoTrackDetective from "./games/DinoTrackDetective/DinoTrackDetective";
import EraSorting from "./games/EraSorting/EraSorting";
import FossilExcavation from "./games/FossilExcavation/FossilExcavation";

function MainLayout() {
  return (
    <div className="app-shell">
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route element={<MainLayout />}>

          {/* Main Jurassic Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Timeline */}
          <Route path="/timeline" element={<TimelineLandingPage />} />
          <Route path="/timeline/:era" element={<EraTimeline />} />
          <Route path="/search" element={<SearchPage />} />

          {/* Login System */}
          <Route path="/login-home" element={<HomeLogin />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/onboarding" element={<Onboarding />} />

            <Route element={<RequireOnboarding />}>
              <Route
                path="/login-profile"
                element={<ProfileLogin />}
              />
            </Route>
          </Route>

          {/* Jurassic */}
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/daily" element={<DailyMissions />} />
          <Route path="/expedition" element={<ExpeditionSelect />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/map" element={<Map />} />
          <Route path="/camp" element={<Camp />} />
          <Route path="/shop" element={<DinoShop />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/research" element={<ResearchHub />} />

          {/* Mini Games */}
          <Route
            path="/mini-games/dino-track-detective"
            element={<DinoTrackDetective />}
          />
          <Route
            path="/mini-games/era-sorting"
            element={<EraSorting />}
          />
          <Route
            path="/mini-games/fossil-excavation"
            element={<FossilExcavation />}
          />

          <Route
            path="*"
            element={<h2>404 - Page Not Found</h2>}
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}