// ProfilePage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useProfile } from "./api/useProfile";

import HeroPassportCard from "./components/HeroPassportCard";
import StatsGrid from "./components/StatsGrid";
import ExpeditionTimeline from "./components/ExpeditionTimeline";
import AchievementsGrid from "./components/AchievementsGrid";
import DiscoveriesSection from "./components/DiscoveriesSection";
import DinosaurCollection from "./components/DinosaurCollection";
import RecentQuizzesTable from "./components/RecentQuizzesTable";
import DailyMissions from "./components/DailyMissions";
import ShopInventory from "./components/ShopInventory";
// import SettingsSection from "./components/SettingsSection";
import EditProfileModal from "./components/EditProfileModal";
import AccountInfo from "./components/AccountInfo";
import SectionNav from "./components/SectionNav";
import JungleBackdrop from "./components/JungleBackdrop";
import HomeButton from "../../components/Homebtn.jsx";
import DinoGuide from "../../components/guide/DinoGuide"; // adjust path to match your actual DinoGuide location relative to this file
import { useGuide } from "../../context/GuideContext"; // adjust path to match your actual GuideContext location
import "./profile.css";

const SECTIONS = [
  { id: "overview", label: "Passport" },
  { id: "stats", label: "Field Stats" },
  { id: "expedition", label: "Expedition" },
  { id: "achievements", label: "Achievements" },
  { id: "discoveries", label: "Discoveries" },
  { id: "collection", label: "Collection" },
  { id: "quizzes", label: "Quiz Log" },
  { id: "missions", label: "Missions" },
  { id: "shop", label: "Inventory" },
  { id: "account", label: "Account" },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { profile, loading, error, refresh, updateProfile, claimMission } = useProfile();
  const { setCurrentPage } = useGuide();
  const [editOpen, setEditOpen] = useState(false);
  const [active, setActive] = useState("overview");

  // Standalone route (not a scroll-section on a longer landing page), so
  // we just claim "profile" once on mount rather than using an
  // IntersectionObserver like Hero/HybridLabPreview do.
  useEffect(() => {
    setCurrentPage("profile");
  }, [setCurrentPage]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 160;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
          setActive(s.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  if (loading) {
    return (
      <div className="jt-profile-loading">
        <div className="jt-fossil-spinner" />
        <p>Unearthing your passport…</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="jt-profile-loading">
        <p>We couldn't load your explorer profile. {error || ""}</p>
        <button className="jt-btn-amber" onClick={refresh}>Try again</button>
      </div>
    );
  }

  return (
    <div className="jt-profile-root">
      <JungleBackdrop />

      <HomeButton onClick={() => navigate("/")} position="right" />

      <div className="jt-profile-layout">
        <SectionNav sections={SECTIONS} active={active} onSelect={scrollTo} />

        <main className="jt-profile-main">
          <section id="overview">
            <HeroPassportCard profile={profile} onEdit={() => setEditOpen(true)} />
          </section>

          <section id="stats">
            <StatsGrid stats={profile.stats} />
          </section>

          <section id="expedition">
            <ExpeditionTimeline levels={profile.expedition} />
          </section>

          <section id="achievements">
            <AchievementsGrid achievements={profile.achievements} />
          </section>

          <section id="discoveries">
            <DiscoveriesSection discoveries={profile.discoveries} />
          </section>

          <section id="collection">
            <DinosaurCollection dinosaurs={profile.dinosaurCollection} />
          </section>

          <section id="quizzes">
            <RecentQuizzesTable quizzes={profile.recentQuizzes} />
          </section>

          <section id="missions">
            <DailyMissions missions={profile.dailyMissions} onClaim={claimMission} />
          </section>

          <section id="shop">
            <ShopInventory items={profile.inventory} />
          </section>

          <section id="account">
            <AccountInfo account={profile.account} />
          </section>

          {/* <section id="settings">
            <SettingsSection settings={profile.settings} onChange={updateProfile} />
          </section> */}
        </main>
      </div>

      {/* Fixed, page-level DinoGuide — sits above the SectionNav rail so
          it doesn't get scrolled away, and stays clear of HomeButton
          (right) and SectionNav (left edge). */}
      <div
        className="
          fixed
          bottom-5
          left-24
          md:left-28
          z-40
          scale-[0.85]
          md:scale-[0.95]
          origin-bottom-left
          pointer-events-auto
        "
      >
        <DinoGuide section="profile" />
      </div>

      <AnimatePresence>
        {editOpen && (
          <EditProfileModal
            profile={profile}
            onClose={() => setEditOpen(false)}
            onSave={async (data) => {
              await updateProfile(data);
              setEditOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}