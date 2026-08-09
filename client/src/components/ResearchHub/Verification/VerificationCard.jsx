import { motion } from "framer-motion";
import { CheckCircle2, Clock3, Lock } from "lucide-react";

export default function VerificationCard({
  title,
  subtitle,
  icon: Icon,
  status = "locked",
  delay = 0,
}) {
  const statusStyles = {
    complete: {
      label: "Completed",
      icon: CheckCircle2,
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      glow: "bg-emerald-400/10",
      iconColor: "text-emerald-400",
    },
    active: {
      label: "In Progress",
      icon: Clock3,
      color: "text-[#ddb878]",
      border: "border-[#ddb878]/30",
      glow: "bg-[#ddb878]/10",
      iconColor: "text-[#ddb878]",
    },
    locked: {
      label: "Locked",
      icon: Lock,
      color: "text-gray-500",
      border: "border-gray-700",
      glow: "bg-gray-500/10",
      iconColor: "text-gray-500",
    },
  };

  const current = statusStyles[status];
  const StatusIcon = current.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay,
      }}
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      className={`
        group
        relative
        overflow-hidden
        rounded-[30px]
        border
        ${current.border}
        bg-gradient-to-b
        from-[#20150f]
        via-[#18110c]
        to-[#0f0b08]
        p-8
        transition-all
        duration-500
        hover:shadow-[0_30px_70px_rgba(0,0,0,.55)]
      `}
    >
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div
          className={`absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full blur-[120px] ${current.glow}`}
        />
      </div>

      {/* Icon */}
      <motion.div
        animate={
          status === "active"
            ? {
                y: [0, -4, 0],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: status === "active" ? Infinity : 0,
          ease: "easeInOut",
        }}
        whileHover={{
          rotate: 5,
          scale: 1.1,
        }}
        className="
          mx-auto
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          border
          border-[#b88c47]
          bg-[#23180f]
        "
      >
        <Icon
          size={38}
          className={current.iconColor}
        />
      </motion.div>

      {/* Title */}
      <h3 className="mt-8 text-center text-3xl font-bold text-[#f5e4c4]">
        {title}
      </h3>

      {/* Subtitle */}
      <p className="mt-4 text-center leading-7 text-[#c8b59a]">
        {subtitle}
      </p>

      {/* Divider */}
      <div className="mx-auto my-8 h-px w-32 bg-gradient-to-r from-transparent via-[#ddb878]/40 to-transparent" />

      {/* Status */}
      <div className="flex items-center justify-center gap-2">
        <StatusIcon
          size={18}
          className={current.color}
        />

        <span
          className={`text-sm font-medium uppercase tracking-[0.2em] ${current.color}`}
        >
          {current.label}
        </span>
      </div>
    </motion.div>
  );
}