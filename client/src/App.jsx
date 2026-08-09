


import React, { useState } from "react";
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
import AdminQuiz from "./pages/AdminQuiz.jsx";

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
    const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoaderPage onComplete={() => setLoading(false)} />;
  }

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
            element={<MuseumExplorer />}
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
 <Route path="quiz" element={<AdminQuiz />} /> 
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