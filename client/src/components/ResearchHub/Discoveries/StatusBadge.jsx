import {
  CheckCircle2,
  Clock3,
  ShieldAlert,
  Star,
} from "lucide-react";

const statusConfig = {
  featured: {
    label: "Featured Discovery",
    Icon: Star,
    className:
      "border-yellow-400/40 bg-yellow-500/15 text-yellow-300 shadow-[0_0_20px_rgba(250,204,21,.18)]",
  },

  verified: {
    label: "Verified",
    Icon: CheckCircle2,
    className:
      "border-emerald-400/40 bg-emerald-500/15 text-emerald-300 shadow-[0_0_18px_rgba(16,185,129,.16)]",
  },

"under-review": {
    label: "Under Review",
    Icon: Clock3,
    className:
      "border-orange-400/40 bg-orange-500/15 text-orange-300 shadow-[0_0_18px_rgba(249,115,22,.16)]",
  },

  pending: {
    label: "Evidence Required",
    Icon: ShieldAlert,
    className:
      "border-red-400/40 bg-red-500/15 text-red-300 shadow-[0_0_18px_rgba(239,68,68,.16)]",
  },
};

export default function StatusBadge({
  status,
  size = "md",
}) {
  const config = statusConfig[status];

  if (!config) return null;

  const { Icon, label, className } = config;

  const sizeClasses =
    size === "sm"
      ? {
          wrapper: "px-3 py-1 text-[11px]",
          icon: 14,
        }
      : {
          wrapper: "px-4 py-2 text-xs",
          icon: 16,
        };

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        backdrop-blur-md
        font-semibold
        tracking-[0.12em]
        transition-all
        duration-300
        ${sizeClasses.wrapper}
        ${className}
      `}
    >
      <Icon
        size={sizeClasses.icon}
        className="shrink-0"
      />

      <span className="whitespace-nowrap uppercase">
        {label}
      </span>
    </div>
  );
}