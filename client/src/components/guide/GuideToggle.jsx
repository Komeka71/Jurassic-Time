import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useGuide } from "../../context/GuideContext";
import { useAuth } from "../../context/AuthContext";

export default function GuideToggle({ position }) {
  const { guideHidden, setGuideHidden, tourActive } = useGuide();
  const { user } = useAuth();
  const { pathname } = useLocation();

  if (!guideHidden) return null;

  // Right side on Museum routes, left side everywhere else.
  // An explicit `position` prop (if ever passed) always wins.
  const isMuseum = pathname.startsWith("/museum");
  const resolvedPosition = position || (isMuseum ? "right" : "left");

  // Hidden entirely during the Virtual Tour overlay by default.
  // Left-positioned instances stay visible during a tour.
  if (tourActive && resolvedPosition !== "left") return null;

  const guideName = user?.companion?.name || "Rex";

  const sideClass = resolvedPosition === "right" ? "right-5" : "left-5";

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, y: [0, -4, 0] }}
      transition={{
        scale: { duration: 0.35 },
        opacity: { duration: 0.35 },
        y: { repeat: Infinity, duration: 2.8 },
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={(e) => {
        e.stopPropagation();
        setGuideHidden(false);
      }}
      title={`Meet ${guideName}`}
      className={`
        fixed
        bottom-5
        ${sideClass}
        z-[9999]
        group
        flex
        items-center
        rounded-full
        border
        border-[#3f7040]
        bg-[#0d140f]/60
        backdrop-blur-xl
        shadow-[0_0_20px_rgba(58,255,120,.28)]
        overflow-hidden
        transition-all
        duration-300
        hover:border-[#74ff91]
        hover:shadow-[0_0_40px_rgba(74,255,145,.55)]
      `}
    >
      <div className="absolute inset-0 rounded-full bg-emerald-400/10 blur-xl animate-pulse -z-10" />

      <div className="relative flex h-14 w-14 items-center justify-center shrink-0">
        <PawPrint
          size={23}
          strokeWidth={2.3}
          className="text-[#79ff8f] drop-shadow-[0_0_10px_rgba(120,255,170,.8)]"
        />
      </div>

      <div className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-[170px]">
        <span className="pr-5 text-sm font-semibold text-[#d7f7cf]">
          Meet {guideName}
        </span>
      </div>
    </motion.button>
  );
}