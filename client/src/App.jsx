import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Global
import LoaderPage from "./components/LoaderPage";
import ScrollToTop from "./components/ScrollToTop";
import CursorGlow from "./components/landing/CursorGlow";
import GuideToggle from "./components/guide/GuideToggle";

// Auth
import ProtectedRoute from "./components/ProtectedRoute";
import RequireOnboarding from "./components/RequireOnboarding";
import ProfilePage from "./pages/Profile/ProfilePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import Onboarding from "./pages/Onboarding";
import HomeLogin from "./pages/HomeLogin";
import ProfileLogin from "./pages/ProfileLogin";

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

// Timeline
import TimelineLandingPage from "./pages/LandingPage";
import EraTimeline from "./pages/EraTimeline";
import SearchPage from "./pages/SearchPage";

// Museum
import MuseumExplorer from "./pages/MuseumExplorer";
import MuseumPage from "./pages/MuseumPage";
import ExhibitPage from "./pages/ExhibitPage";

// DNA Lab
import DNALaboratory from "./pages/DNALaboratory/DNALaboratory";

// Maps
import Maps from "./pages/Maps";

// Mini Games
import DinoTrackDetective from "./games/DinoTrackDetective/DinoTrackDetective";
import EraSorting from "./games/EraSorting/EraSorting";
import FossilExcavation from "./games/FossilExcavation/FossilExcavation";

// Admin
import AdminRoute from "./components/admin/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDiscoveries from "./pages/AdminDiscoveries";
import AdminUsers from "./pages/AdminUsers";
import AdminQuiz from "./pages/AdminQuiz";
import AdminLogs from "./pages/AdminLogs";

// Search collections
import "./search/registerCollections.js";


/* =========================================================
   MAIN LAYOUT
   ========================================================= */

function MainLayout() {
  return (
    <>
      {/* Automatically scroll every new route to the top */}
      <ScrollToTop />

      {/* Global visual effects / helpers */}
      <CursorGlow />
      <GuideToggle />

      {/* Render current route */}
      <Outlet />
    </>
  );
}


/* =========================================================
   APP
   ========================================================= */

export default function App() {
  const [loading, setLoading] = useState(true);

  /* -------------------------------------------------------
     Initial Loader
     ------------------------------------------------------- */

  if (loading) {
    return (
      <LoaderPage
        onComplete={() => setLoading(false)}
      />
    );
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* =================================================
            AUTHENTICATION
            ================================================= */}

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/verify-otp"
          element={<VerifyOtp />}
        />


        {/* =================================================
            MAIN APPLICATION LAYOUT
            ================================================= */}

        <Route element={<MainLayout />}>

          {/* =================================================
              LANDING
              ================================================= */}

          <Route
            path="/"
            element={<LandingPage />}
          />


          {/* =================================================
              TIMELINE
              ================================================= */}

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


          {/* =================================================
              DNA LAB
              ================================================= */}

          <Route
            path="/dna-lab"
            element={<DNALaboratory />}
          />


          {/* =================================================
              LOGIN SYSTEM
              ================================================= */}

          <Route
            path="/login-home"
            element={<HomeLogin />}
          />

          <Route element={<ProtectedRoute />}>

            <Route
              path="/onboarding"
              element={<Onboarding />}
            />

            <Route element={<RequireOnboarding />}>

              <Route
                path="/login-profile"
                element={<ProfileLogin />}
              />

            </Route>

          </Route>


          {/* =================================================
              MUSEUM
              ================================================= */}

          <Route
            path="/museum"
            element={<MuseumExplorer />}
          />

          <Route
            path="/museum/:slug"
            element={<MuseumPage />}
          />

          <Route
            path="/museum/:slug/exhibit/:exhibitSlug"
            element={<ExhibitPage />}
          />


          {/* =================================================
              JURASSIC HOME / APP
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


          {/* =================================================
              USER DASHBOARD
              ================================================= */}

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


          {/* =================================================
              MAPS
              ================================================= */}

          <Route
            path="/maps"
            element={<Maps />}
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
                path="quiz"
                element={<AdminQuiz />}
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
            element={
              <h2>404 - Page Not Found</h2>
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}