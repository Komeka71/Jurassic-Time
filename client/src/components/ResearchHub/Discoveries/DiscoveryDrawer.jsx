import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import DrawerHeader from "./components/DrawerHeader";
import DrawerTabs from "./components/DrawerTabs";

import OverviewTab from "./tabs/OverviewTab";
import EvidenceTab from "./tabs/EvidenceTab";
import VerificationTab from "./tabs/VerificationTab";
import AITab from "./tabs/AITab";
import DiscussionTab from "./tabs/DiscussionTab";

export default function DiscoveryDrawer({
  discovery,
  open,
  onClose,
}) {
  const [activeTab, setActiveTab] = useState("overview");

  // Reset tab + lock background scroll
  useEffect(() => {
    if (open) {
      setActiveTab("overview");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // Close drawer with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && discovery && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
            }}
            onClick={(e) => e.stopPropagation()}
            className="
              fixed
              right-0
              top-0
              z-50
              h-screen
              w-full
              max-w-4xl
              overflow-y-auto
              border-l
              border-[#8b6a3d]/30
              bg-gradient-to-b
              from-[#18120d]
              via-[#120d09]
              to-[#090705]
              shadow-[-40px_0_100px_rgba(0,0,0,.75)]
            "
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="
                fixed
                right-6
                top-6
                z-50
                rounded-full
                border
                border-[#8b6a3d]/30
                bg-[#24170f]/90
                p-2
                text-[#ddb878]
                transition
                hover:border-[#ddb878]/60
                hover:bg-[#2c1d12]
                hover:rotate-90
              "
            >
              <X size={18} />
            </button>

            <DrawerHeader discovery={discovery} />

            <DrawerTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <div className="p-8">
              {activeTab === "overview" && (
                <OverviewTab discovery={discovery} />
              )}

              {activeTab === "evidence" && (
                <EvidenceTab discovery={discovery} />
              )}

              {activeTab === "verification" && (
                <VerificationTab discovery={discovery} />
              )}

              {activeTab === "ai" && (
                <AITab discovery={discovery} />
              )}

              {activeTab === "discussion" && (
                <DiscussionTab discovery={discovery} />
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}