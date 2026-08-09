import { motion } from "framer-motion";
import { useGuide } from "../../../../context/GuideContext";


const tabs = [
  { id: "overview", label: "Overview" },
  { id: "evidence", label: "Evidence" },
  { id: "verification", label: "Verification" },
  { id: "ai", label: "AI Insight" },
  { id: "discussion", label: "Discussion" },
];

export default function DrawerTabs({
  activeTab,
  setActiveTab,
}) {
  const { setLastAction } = useGuide();

  return (
    <div
      className="
        sticky
        top-0
        z-30
        border-y
        border-[#8b6a3d]/20
        bg-[#120d09]/95
        backdrop-blur-xl
      "
    >
      <div className="flex overflow-x-auto scrollbar-hide">

        {tabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
  setActiveTab(tab.id);

  const actions = {
    overview: "overviewViewed",
    evidence: "evidenceViewed",
    verification: "verificationViewed",
    ai: "aiViewed",
    discussion: "discussionViewed",
  };

  setLastAction(actions[tab.id]);
}}
              className="
                relative
                flex-1
                whitespace-nowrap
                px-6
                py-5
                text-sm
                font-semibold
                tracking-[0.25em]
                uppercase
                transition-all
                duration-300
              "
            >
              <span
                className={
                  active
                    ? "text-[#f6e5c3]"
                    : "text-[#88765a] hover:text-[#d8b67a]"
                }
              >
                {tab.label}
              </span>

              {active && (
                <motion.div
                  layoutId="drawerTab"
                  className="
                    absolute
                    bottom-0
                    left-5
                    right-5
                    h-[3px]
                    rounded-full
                    bg-[#ddb878]
                    shadow-[0_0_15px_rgba(221,184,120,.8)]
                  "
                />
              )}
            </button>
          );
        })}

      </div>
    </div>
  );
}