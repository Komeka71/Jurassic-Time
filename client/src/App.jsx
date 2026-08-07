


// newestt
import AdminDiscoveries from "./pages/AdminDiscoveries";
import NotFoundPage from "./pages/NotFoundPage";
import React, { useState } from "react";

// Loader
import LoaderPage from "./components/LoaderPage";

// Global
import CursorGlow from "./components/landing/CursorGlow";
import GuideToggle from "./components/guide/GuideToggle";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/landing/Navbar";

// Maps
import Maps from "./pages/Maps";

// Museum
import MuseumExplorer from "./pages/MuseumExplorer";
import MuseumPage from "./pages/MuseumPage";
import ExhibitPage from "./pages/ExhibitPage";

// DNA Lab
import DNALaboratory from "./pages/DNALaboratory/DNALaboratory";

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

// Timeline
import TimelineLandingPage from "./pages/LandingPage";
import EraTimeline from "./pages/EraTimeline";
import SearchPage from "./pages/SearchPage";

// Register Search
import "./search/registerCollections.js";

// Landing
import LandingPage from "./components/LandingPage";

// Jurassic
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
import ScrollToTop from "./components/ScrollToTop";
// ----------------------
// Admin Panel
// ----------------------
import AdminRoute from "./components/admin/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";

function MainLayout() {
  return (
    <div className="app-shell">
      <Outlet />
      {/* <Navbar /> */}
    </div>
  );
}

export default function App() {
  // const [loading, setLoading] = useState(true);

  // if (loading) {
  //   return <LoaderPage onComplete={() => setLoading(false)} />;
  // }

  return (
    <BrowserRouter>
      <CursorGlow />
      <GuideToggle />
  <ScrollToTop />
      <Routes>
        {/* ================= AUTH ================= */}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* ================= MAIN ================= */}

        <Route element={<MainLayout />}>
          {/* Landing */}
          <Route path="/" element={<LandingPage />} />

          {/* Timeline */}
          <Route path="/timeline" element={<TimelineLandingPage />} />
          <Route path="/timeline/:era" element={<EraTimeline />} />
          <Route path="/search" element={<SearchPage />} />

          {/* DNA Lab */}
          <Route path="/dna-lab" element={<DNALaboratory />} />

          {/* Login Home */}
          <Route path="/login-home" element={<HomeLogin />} />

          {/* Protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/onboarding" element={<Onboarding />} />

            <Route element={<RequireOnboarding />}>
              <Route
                path="/login-profile"
                element={<ProfilePage />}
              />
            </Route>
          </Route>

          {/* Museum */}
          <Route path="/museum" element={<MuseumExplorer />} />
          <Route path="/museum/:slug" element={<MuseumPage />} />
          <Route
            path="/museum/:slug/exhibit/:exhibitSlug"
            element={<ExhibitPage />}
          />

          {/* Jurassic */}
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/daily" element={<DailyMissions />} />
          <Route
            path="/expedition"
            element={<ExpeditionSelect />}
          />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/map" element={<Map />} />
          <Route path="/camp" element={<Camp />} />
          <Route path="/shop" element={<DinoShop />} />
          <Route path="/collection" element={<Collection />} />
          <Route
            path="/leaderboard"
            element={<Leaderboard />}
          />
          <Route path="/research" element={<ResearchHub />} />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<ProfilePage />}
          />

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

          {/* Maps */}
          <Route path="/maps" element={<Maps />} />
<Route element={<AdminRoute />}>
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<AdminDashboard />} />

    <Route
      path="discoveries"
      element={<AdminDiscoveries />}
    />
  </Route>
</Route>
          {/* ================= ADMIN ================= */}

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />

            <Route
  path="discoveries"
  element={<AdminDiscoveries />}
/>
            </Route>
          </Route>

          {/* 404 */}
          <Route
  path="*"
  element={<NotFoundPage />}
/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


