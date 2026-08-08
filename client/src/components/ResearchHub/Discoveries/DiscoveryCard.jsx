import { motion } from "framer-motion";
import api from "../../../api/axios";
import {
  ArrowRight,
  CalendarDays,
  Dna,
  MapPin,
  MessageCircle,
  ThumbsUp,
} from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import StatusBadge from "./StatusBadge";


export default function DiscoveryCard({
  discovery,
  onClick,
  index = 0,
}) {
  // const API =
  // import.meta.env.VITE_API_URL ||
  // "http://localhost:3000";
const [votes, setVotes] = useState(discovery.upvotes);
const [liked, setLiked] = useState(discovery.liked || false);
const { user } = useAuth();
const handleLike = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (!user) {
    toast.error("Please login to like discoveries.");
    return;
  }

  try {
    const { data } = await api.post(
      `/discoveries/${discovery._id}/like`
    );

    setVotes(data.upvotes);
    setLiked(data.liked);
  } catch (err) {
    toast.error(
      err.response?.data?.message ||
        "Unable to like discovery."
    );
  }
};
  return (
    <motion.div
  layout
  initial={{
    opacity: 0,
    y: 40,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
  }}
  viewport={{ once: true }}
  transition={{
    duration: 0.55,
    delay: index * 0.1,
  }}
  whileHover={{
    y: -10,
    scale: 1.025,
  }}
  onClick={() => onClick(discovery)}
  tabIndex={-1}
  className="
    group
    cursor-pointer
    overflow-hidden
    rounded-[30px]
    border
    border-[#8b6a3d]/30
    bg-gradient-to-b
    from-[#1b140f]
    via-[#120d09]
    to-[#090705]
    shadow-[0_25px_70px_rgba(0,0,0,.45)]
    transition-all
    duration-500
    hover:border-[#ddb878]/60
    hover:shadow-[0_35px_90px_rgba(0,0,0,.75)]
    outline-none
    focus:outline-none
    focus:ring-0
    focus-visible:outline-none
    focus-visible:ring-0
  "
>
      {/* ================= IMAGE ================= */}

{/* ================= IMAGE ================= */}

<div className="relative h-[300px] w-full overflow-hidden">

  <img
    src={
      discovery.evidence?.[0]?.url ||
      discovery.evidence?.[0]?.path
        ? `${import.meta.env.VITE_API_URL}/${(
            discovery.evidence[0].url ||
            discovery.evidence[0].path
          )
            .replace(/^\/+/, "")
            .replace(/\\/g, "/")}`
        : "/images/no-fossil.png"
    }
    alt={
      discovery.name ||
      discovery.fossilName ||
      "Fossil discovery"
    }
    className="
      h-full
      w-full
      object-cover
      transition-transform
      duration-700
      group-hover:scale-105
    "
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = "/images/no-fossil.png";
    }}
  />

  {/* Dark Overlay */}
  <div className="pointer-events-none absolute inset-0 bg-black/30" />

  {/* Bottom Gradient */}
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090705] via-black/20 to-transparent" />

  {/* Glass Reflection */}
  <div
    className="
      pointer-events-none
      absolute
      inset-0
      bg-gradient-to-br
      from-white/15
      via-transparent
      to-transparent
      opacity-40
    "
  />

  {/* Status */}
  <div className="absolute left-4 top-4">
    <StatusBadge
      status={discovery.status}
      size="sm"
    />
  </div>

</div>

      {/* ================= CONTENT ================= */}

      <div className="space-y-4 p-6">

        {/* Title */}

        <div>

          <h3 className="text-[1.7rem] font-bold leading-tight text-[#f6e5c3]">
            {discovery.name}
          </h3>

          <p className="mt-2 text-sm text-[#ccb998]">
            {discovery.species}
          </p>

          <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-[#8f7b5d]">
            Specimen {discovery.specimenId}
          </p>

        </div>

        {/* Location */}

        <div className="flex items-center gap-2 text-sm text-[#c4b297]">
          <MapPin
            size={16}
            className="text-[#ddb878]"
          />

          {discovery.location}, {discovery.country}
        </div>

        {/* Era */}

        <div className="flex items-center justify-between">

          <p className="text-xs uppercase tracking-[0.35em] text-[#8d7d63]">
            {discovery.era}
          </p>

          <div className="flex items-center gap-1 text-xs text-[#c4b297]">
            <CalendarDays size={14} />
            {discovery.discoveryYear}
          </div>

        </div>

        {/* Divider */}

        <div className="h-px bg-gradient-to-r from-transparent via-[#6d5432]/50 to-transparent" />

        {/* Stats */}

        <div className="grid grid-cols-3 gap-3 text-center">

          <div>
<motion.button
  whileTap={{ scale: 0.9 }}
  onClick={handleLike}
  className="
    flex
    items-center
    justify-center
    gap-1
    text-[#ddb878]
    transition
    hover:text-yellow-300
  "
>
  <ThumbsUp
    size={16}
    className={
      liked
        ? "fill-yellow-400 text-yellow-400"
        : ""
    }
  />
  {votes}
</motion.button>
            <p className="mt-1 text-[11px] uppercase tracking-widest text-[#8f7d61]">
              Votes
            </p>

          </div>

          <div>

            <div className="flex items-center justify-center gap-1 text-[#ddb878]">
              <MessageCircle size={16} />
              {discovery.comments}
            </div>

            <p className="mt-1 text-[11px] uppercase tracking-widest text-[#8f7d61]">
              Comments
            </p>

          </div>

          <div>

            <div className="flex items-center justify-center gap-1 text-[#ddb878]">
              <Dna size={16} />
              {discovery.evidenceCount}
            </div>

            <p className="mt-1 text-[11px] uppercase tracking-widest text-[#8f7d61]">
              Evidence
            </p>

          </div>

        </div>
{/* <motion.div
  whileHover={{ scale: 1.02 }}
  className="
    flex
    items-center
    justify-between
    rounded-xl
    border
    border-[#8b6a3d]/20
    bg-[#1d140f]
    px-4
    py-3
    transition-all
    duration-300
    group-hover:border-[#ddb878]/50
    group-hover:bg-[#24180f]
  "
>
  <span className="text-sm font-medium text-[#ddb878]">
    Open Archive
  </span>

  <ArrowRight
    size={18}
    className="transition-transform duration-300 group-hover:translate-x-2"
  />
</motion.div> */}
        {/* CTA */}

        <div
          className="
            flex
            items-center
            justify-between
            rounded-xl
            border
            border-[#8b6a3d]/20
            bg-[#1b140f]
            px-4
            py-3
            transition-all
            duration-300
            group-hover:border-[#ddb878]/40
          "
        >

          <span className="text-sm font-medium text-[#ddb878]">
            Open Archive
          </span>

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />

        </div>

      </div>
    </motion.div>
  );
}