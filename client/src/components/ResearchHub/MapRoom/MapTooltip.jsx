import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
  ThumbsUp,
} from "lucide-react";

const statusConfig = {
  featured: {
    label: "Featured Discovery",
    color:
      "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    Icon: Star,
  },

  verified: {
    label: "Verified Discovery",
    color:
      "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    Icon: CheckCircle2,
  },

  "under-review": {
    label: "Under Review",
    color:
      "bg-orange-500/20 text-orange-300 border-orange-500/30",
    Icon: Clock3,
  },

  "field-draft": {
    label: "Field Draft",
    color:
      "bg-slate-500/20 text-slate-300 border-slate-500/30",
    Icon: Clock3,
  },

  pending: {
    label: "Evidence Required",
    color:
      "bg-red-500/20 text-red-300 border-red-500/30",
    Icon: ShieldCheck,
  },

  rejected: {
    label: "Rejected",
    color:
      "bg-red-500/20 text-red-300 border-red-500/30",
    Icon: ShieldCheck,
  },
};

export default function MapTooltip({ site }) {
  if (!site) return null;

  const status =
    statusConfig[site.status] ??
    statusConfig["under-review"];

  const StatusIcon = status.Icon;

  return (
    <div
      className="
        absolute
        left-1/2
        bottom-[28px]
        z-50
        min-w-[300px]
        -translate-x-1/2
        rounded-2xl
        border
        border-[#8d6a3d]/40
        bg-[#15100c]/95
        p-4
        shadow-[0_18px_45px_rgba(0,0,0,0.55)]
        backdrop-blur-xl
        pointer-events-none
      "
    >
      {/* Dinosaur */}

      <h3 className="text-lg font-semibold text-[#f7e2bc]">
        🦖 {site.dinosaur}
      </h3>

      {/* Location */}

      <div className="mt-3 flex items-center gap-2 text-sm text-stone-300">
        <MapPin
          size={15}
          className="text-amber-400"
        />
        {site.location}
      </div>

      {/* Era */}

      <p className="mt-2 text-xs uppercase tracking-[0.25em] text-stone-400">
        {site.era}
      </p>

      {/* Discovery Year */}

      <div className="mt-3 flex items-center gap-2 text-sm text-stone-300">
        <CalendarDays
          size={15}
          className="text-amber-400"
        />
        First documented in {site.discoveryYear}
      </div>

      {/* Status */}

      <div
        className={`
          mt-4
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          px-3
          py-1
          text-xs
          ${status.color}
        `}
      >
        <StatusIcon size={14} />
        {status.label}
      </div>

      {/* Verified By */}

      {site.verifiedBy && (
        <div className="mt-3 text-xs text-stone-400">
          Verified by
          <span className="ml-1 text-[#e5c58b]">
            {site.verifiedBy}
          </span>
        </div>
      )}

      {/* Divider */}

      <div className="my-4 h-px bg-gradient-to-r from-transparent via-[#8b6a3c]/40 to-transparent" />

      {/* Footer */}

      <div className="flex items-center justify-between text-sm text-stone-300">
        <div className="flex items-center gap-1">
          <ThumbsUp size={15} />
          {site.upvotes} Votes
        </div>

        <div className="flex items-center gap-1">
          <MessageCircle size={15} />
          {site.comments} Comments
        </div>
      </div>

      {/* Arrow */}

      <div
        className="
          absolute
          -bottom-2
          left-1/2
          h-4
          w-4
          -translate-x-1/2
          rotate-45
          border-r
          border-b
          border-[#8d6a3d]/40
          bg-[#15100c]
        "
      />
    </div>
  );
}