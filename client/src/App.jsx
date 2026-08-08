// import Museum from "./pages/Museum";
// import MuseumArchive from "./pages/MuseumArchive";
// import AdminUsers from "./pages/AdminUsers";
// import AdminLogs from "./pages/AdminLogs";
// // newestt
// import AdminDiscoveries from "./pages/AdminDiscoveries";
// import NotFoundPage from "./pages/NotFoundPage";
// import React, { useState } from "react";

// // Loader
// import LoaderPage from "./components/LoaderPage";

// // Global
// import CursorGlow from "./components/landing/CursorGlow";
// import GuideToggle from "./components/guide/GuideToggle";
// import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
// import Navbar from "./components/landing/Navbar";

// // Maps
// import Maps from "./pages/Maps";

// // Museum
// import MuseumExplorer from "./pages/MuseumExplorer";
// import MuseumPage from "./pages/MuseumPage";
// import ExhibitPage from "./pages/ExhibitPage";

// // DNA Lab
// import DNALaboratory from "./pages/DNALaboratory/DNALaboratory";

// // Auth
// import ProtectedRoute from "./components/ProtectedRoute";
// import RequireOnboarding from "./components/RequireOnboarding";
// import ProfilePage from "./pages/Profile/ProfilePage";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import VerifyOtp from "./pages/VerifyOtp";
// import Onboarding from "./pages/Onboarding";
// import HomeLogin from "./pages/HomeLogin";
// import ProfileLogin from "./pages/ProfileLogin";

// // Timeline
// import TimelineLandingPage from "./pages/LandingPage";
// import EraTimeline from "./pages/EraTimeline";
// import SearchPage from "./pages/SearchPage";

// // Register Search
// import "./search/registerCollections.js";

// // Landing
// import LandingPage from "./components/LandingPage";

// // Jurassic
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
// import ScrollToTop from "./components/ScrollToTop";
// // ----------------------
// // Admin Panel
// // ----------------------
// import AdminRoute from "./components/admin/AdminRoute";
// import AdminLayout from "./components/admin/AdminLayout";
// import AdminDashboard from "./pages/AdminDashboard";

// function MainLayout() {
//   return (
//     <div className="app-shell">
//       <Outlet />
//       {/* <Navbar /> */}
//     </div>
//   );
// }

// export default function App() {
//   // const [loading, setLoading] = useState(true);

//   // if (loading) {
//   //   return <LoaderPage onComplete={() => setLoading(false)} />;
//   // }

//   return (
//     <BrowserRouter>
//       <CursorGlow />
//       <GuideToggle />
//   <ScrollToTop />
//       <Routes>
//         <Route path="/museum" element={<Museum />} />
// <Route path="/museum/archive" element={<MuseumArchive />} />
//         {/* ================= AUTH ================= */}

//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/verify-otp" element={<VerifyOtp />} />

//         {/* ================= MAIN ================= */}

//         <Route element={<MainLayout />}>
//           {/* Landing */}
//           <Route path="/" element={<LandingPage />} />

//           {/* Timeline */}
//           <Route path="/timeline" element={<TimelineLandingPage />} />
//           <Route path="/timeline/:era" element={<EraTimeline />} />
//           <Route path="/search" element={<SearchPage />} />

//           {/* DNA Lab */}
//           <Route path="/dna-lab" element={<DNALaboratory />} />

//           {/* Login Home */}
//           <Route path="/login-home" element={<HomeLogin />} />

//           {/* Protected */}
//           <Route element={<ProtectedRoute />}>
//             <Route path="/onboarding" element={<Onboarding />} />

//             <Route element={<RequireOnboarding />}>
//               <Route
//                 path="/login-profile"
//                 element={<ProfilePage />}
//               />
//             </Route>
//           </Route>

//           {/* Museum */}
//           <Route path="/museum" element={<MuseumExplorer />} />
//           <Route path="/museum/:slug" element={<MuseumPage />} />
//           <Route
//             path="/museum/:slug/exhibit/:exhibitSlug"
//             element={<ExhibitPage />}
//           />

//           {/* Jurassic */}
//           <Route path="/home" element={<Home />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/daily" element={<DailyMissions />} />
//           <Route
//             path="/expedition"
//             element={<ExpeditionSelect />}
//           />
//           <Route path="/quiz" element={<Quiz />} />
//           <Route path="/map" element={<Map />} />
//           <Route path="/camp" element={<Camp />} />
//           <Route path="/shop" element={<DinoShop />} />
//           <Route path="/collection" element={<Collection />} />
//           <Route
//             path="/leaderboard"
//             element={<Leaderboard />}
//           />
//           <Route path="/research" element={<ResearchHub />} />

//           {/* Dashboard */}
//           <Route
//             path="/dashboard"
//             element={<ProfilePage />}
//           />

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

//           {/* Maps */}
//           <Route path="/maps" element={<Maps />} />
// <Route element={<AdminRoute />}>
//   <Route path="/admin" element={<AdminLayout />}>
//     <Route index element={<AdminDashboard />} />

//     <Route
//       path="discoveries"
//       element={<AdminDiscoveries />}
//     />
//   </Route>
// </Route>
//           {/* ================= ADMIN ================= */}

//           <Route element={<AdminRoute />}>
//             <Route path="/admin" element={<AdminLayout />}>
//               <Route index element={<AdminDashboard />} />

//             <Route
//   path="discoveries"
//   element={<AdminDiscoveries />}
// />
// <Route path="users" element={<AdminUsers />} />   {/* ✅ correct, relative to parent /admin */}
//   <Route path="logs" element={<AdminLogs />} />
//             </Route>
//           </Route>

//           {/* 404 */}
//           <Route
//   path="*"
//   element={<NotFoundPage />}
// />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }





import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

/* =========================
   GLOBAL
========================= */
import CursorGlow from "./components/landing/CursorGlow";
import GuideToggle from "./components/guide/GuideToggle";
import Navbar from "./components/landing/Navbar";
import ScrollToTop from "./components/ScrollToTop";

/* =========================
   LANDING
========================= */
import LandingPage from "./components/LandingPage";

/* =========================
   AUTH
========================= */
import ProtectedRoute from "./components/ProtectedRoute";
import RequireOnboarding from "./components/RequireOnboarding";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import Onboarding from "./pages/Onboarding";

import HomeLogin from "./pages/HomeLogin";
import ProfileLogin from "./pages/ProfileLogin";
import ProfilePage from "./pages/Profile/ProfilePage";

/* =========================
   MUSEUM
========================= */
import Museum from "./pages/Museum";
import MuseumArchive from "./pages/MuseumArchive";
import MuseumExplorer from "./pages/MuseumExplorer";
import MuseumPage from "./pages/MuseumPage";
import ExhibitPage from "./pages/ExhibitPage";

/* =========================
   TIMELINE / SEARCH
========================= */
import TimelineLandingPage from "./pages/LandingPage";
import EraTimeline from "./pages/EraTimeline";
import SearchPage from "./pages/SearchPage";

import "./search/registerCollections.js";

/* =========================
   DNA LAB
========================= */
import DNALaboratory from "./pages/DNALaboratory/DNALaboratory";

/* =========================
   JURASSIC
========================= */
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

/* =========================
   MINI GAMES
========================= */
import DinoTrackDetective from "./games/DinoTrackDetective/DinoTrackDetective";
import EraSorting from "./games/EraSorting/EraSorting";
import FossilExcavation from "./games/FossilExcavation/FossilExcavation";

/* =========================
   MAPS
========================= */
import Maps from "./pages/Maps";

/* =========================
   ADMIN
========================= */
import AdminRoute from "./components/admin/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminLogs from "./pages/AdminLogs";
import AdminDiscoveries from "./pages/AdminDiscoveries";

/* =========================
   404
========================= */
import NotFoundPage from "./pages/NotFoundPage";


/* =========================================================
   MAIN LAYOUT
========================================================= */

function MainLayout() {
  return (
    <>
      <ScrollToTop />

      {/* <Navbar /> */}

      <CursorGlow />

      <GuideToggle />

      <Outlet />
    </>
  );
}


/* =========================================================
   APP
========================================================= */

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =================================================
            MAIN APPLICATION LAYOUT
        ================================================= */}

        <Route element={<MainLayout />}>

          {/* ================= LANDING ================= */}

          <Route
            path="/"
            element={<LandingPage />}
          />


          {/* ================= TIMELINE ================= */}

          <Route
            path="/timeline"
            element={<TimelineLandingPage />}
          />

          <Route
            path="/timeline/:era"
            element={<EraTimeline />}
          />

          <Route
            path="/search"
            element={<SearchPage />}
          />


          {/* ================= DNA LAB ================= */}

          <Route
            path="/dna-lab"
            element={<DNALaboratory />}
          />


          {/* ================= LOGIN HOME ================= */}

          <Route
            path="/login-home"
            element={<HomeLogin />}
          />


          {/* =================================================
              PROTECTED ROUTES
          ================================================= */}

          <Route element={<ProtectedRoute />}>

            <Route
              path="/onboarding"
              element={<Onboarding />}
            />

            <Route element={<RequireOnboarding />}>

              <Route
                path="/login-profile"
                element={<ProfilePage />}
              />

            </Route>

          </Route>


          {/* =================================================
              MUSEUM
          ================================================= */}

          {/* Main Museum landing page */}
          <Route
            path="/museum"
            element={<Museum />}
          />

          {/* Museum archive */}
          <Route
            path="/museum/archive"
            element={<MuseumArchive />}
          />

          {/* Existing museum explorer pages */}
          <Route
            path="/museum/:slug"
            element={<MuseumPage />}
          />

          <Route
            path="/museum/:slug/exhibit/:exhibitSlug"
            element={<ExhibitPage />}
          />


          {/* =================================================
              JURASSIC APP
          ================================================= */}

          <Route
            path="/home"
            element={<Home />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/daily"
            element={<DailyMissions />}
          />

          <Route
            path="/expedition"
            element={<ExpeditionSelect />}
          />

          <Route
            path="/quiz"
            element={<Quiz />}
          />

          <Route
            path="/map"
            element={<Map />}
          />

          <Route
            path="/camp"
            element={<Camp />}
          />

          <Route
            path="/shop"
            element={<DinoShop />}
          />

          <Route
            path="/collection"
            element={<Collection />}
          />

          <Route
            path="/leaderboard"
            element={<Leaderboard />}
          />

          <Route
            path="/research"
            element={<ResearchHub />}
          />


          {/* ================= DASHBOARD ================= */}

          <Route
            path="/dashboard"
            element={<ProfilePage />}
          />


          {/* =================================================
              MINI GAMES
          ================================================= */}

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


          {/* ================= MAPS ================= */}

          <Route
            path="/maps"
            element={<Maps />}
          />

        </Route>


        {/* =================================================
            AUTH
        ================================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOtp />}
        />

        <Route
          path="/profile-login"
          element={<ProfileLogin />}
        />


        {/* =================================================
            ADMIN
        ================================================= */}

        <Route element={<AdminRoute />}>

          <Route
            path="/admin"
            element={<AdminLayout />}
          >

            <Route
              index
              element={<AdminDashboard />}
            />

            <Route
              path="discoveries"
              element={<AdminDiscoveries />}
            />

            <Route
              path="users"
              element={<AdminUsers />}
            />

            <Route
              path="logs"
              element={<AdminLogs />}
            />

          </Route>

        </Route>


        {/* =================================================
            404
        ================================================= */}

        <Route
          path="*"
          element={<NotFoundPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}