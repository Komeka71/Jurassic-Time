import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

import { mapPin } from "../../../utils/mapPin";
import MapTooltip from "./MapTooltip";

const statusStyles = {
  featured: {
    color: "from-[#ffe18d] to-[#d7a524]",
    glow: "bg-[#ffd46a]",
    border: "border-[#ffe6a6]",
  },

  verified: {
    color: "from-[#7be6b6] to-[#1f9d73]",
    glow: "bg-[#44d39d]",
    border: "border-[#95f3c8]",
  },

  "under-review": {
    color: "from-[#ffc56d] to-[#d68a25]",
    glow: "bg-[#e8a23d]",
    border: "border-[#ffd79b]",
  },

  pending: {
    color: "from-[#ff8b8b] to-[#c23c3c]",
    glow: "bg-[#df5a5a]",
    border: "border-[#ffb2b2]",
  },

  rejected: {
    color: "from-[#ff8b8b] to-[#c23c3c]",
    glow: "bg-[#df5a5a]",
    border: "border-[#ffb2b2]",
  },
};

export default function ExpeditionPins() {
  const API =
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000";

  const [hovered, setHovered] = useState(null);
  const [sites, setSites] = useState([]);

  useEffect(() => {
    fetchSites();
  }, []);

  async function fetchSites() {
    try {
      const { data } = await axios.get(
        `${API}/api/discoveries`
      );

      setSites(
        (data.discoveries || []).map(mapPin)
      );
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {sites.map((site) => {
        const style =
          statusStyles[site.status] ??
          statusStyles["under-review"];

        return (
          <motion.div
            key={site.id}
            className="absolute"
            style={{
              left: `${site.x}%`,
              top: `${site.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: hovered?.id === site.id ? 999 : 20,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15 }}
            onMouseEnter={() => setHovered(site)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Pin */}
            <button
              type="button"
              className="relative cursor-pointer"
            >
              {/* Pulse */}
              <motion.span
                animate={{
                  scale: [1, 2.2],
                  opacity: [0.45, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className={`
                  absolute
                  inset-0
                  rounded-full
                  ${style.glow}
                `}
              />

              {/* Glow */}
              <span
                className={`
                  absolute
                  inset-0
                  rounded-full
                  blur-md
                  opacity-70
                  ${style.glow}
                `}
              />

              {/* Pin */}
              <motion.span
                whileHover={{
                  scale: 1.35,
                  rotate: 10,
                }}
                className={`
                  relative
                  block
                  h-4
                  w-4
                  rounded-full
                  border-2
                  shadow-xl
                  bg-gradient-to-br
                  ${style.color}
                  ${style.border}
                `}
              />
            </button>

            {/* Tooltip */}
            <AnimatePresence>
              {hovered?.id === site.id && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    scale: 0.95,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="absolute bottom-7 left-1/2 z-[999] -translate-x-1/2"
                >
                  <MapTooltip site={site} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </>
  );
}