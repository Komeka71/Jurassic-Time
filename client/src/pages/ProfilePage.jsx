// pages/ProfilePage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import AchievementsSection from "../components/profile/AchievementsSection";
import CollectionSection from "../components/profile/CollectionSection";
import SavedDiscoveries from "../components/profile/SavedDiscoveries";
import ResearchContributions from "../components/profile/ResearchContributions";
import QuizPerformance from "../components/profile/QuizPerformance";
import InventorySection from "../components/profile/InventorySection";
import RecentActivity from "../components/profile/RecentActivity";
// import SettingsPreview from "../components/profile/SettingsPreview";
import { getProfile } from "../services/profileService";
import HomeButton from "../components/Homebtn.jsx";



export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");

useEffect(() => {
  getProfile()
    .then((data) => setUser(data))
    .catch((err) => {
      console.error("Failed to load profile:", err);
      setUser(null);
    })
    .finally(() => setLoading(false));
}, []);

  return (
    <div className="min-h-screen bg-stone-950 px-4 py-8 md:px-8">
      <HomeButton onClick={() => navigate("/")} position="right" />

      <div className="mx-auto flex max-w-7xl gap-6">
        <ProfileSidebar activeSection={activeSection} onNavigate={setActiveSection} />

        <main className="flex min-w-0 flex-1 flex-col gap-8">
  <ProfileHeader
    user={user}
    loading={loading}
  />

  <ProfileStats user={user} />

  <AchievementsSection user={user} />

  <CollectionSection user={user} />

  <SavedDiscoveries />

  <ResearchContributions user={user} />

  <QuizPerformance user={user} />

  <InventorySection user={user} />

  <RecentActivity user={user} />
</main>
      </div>
    </div>
  );
}