// components/profile/ProfileHeader.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Coins } from "lucide-react";
import Badge from "./shared/Badge";
import AnimatedCounter from "./shared/AnimatedCounter";

export default function ProfileHeader({ user, loading }) {
  const [xpAnimated, setXpAnimated] = useState(false);

  if (loading) return <ProfileHeaderSkeleton />;
  if (!user) return null;

  const {
    avatar,
    username,
    fullName,
    role,
    bio,
    createdAt,
    level = 1,
    xp = 0,
    xpToNextLevel = 100,
    coins = 0,
  } = user;

  const xpPercent =
    xpToNextLevel > 0
      ? Math.min(100, Math.round((xp / xpToNextLevel) * 100))
      : 0;

  const joinDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <motion.section
      id="overview"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-stone-800 bg-stone-900 p-6 md:p-8"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* Avatar */}
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border-2 border-stone-800 bg-stone-800 md:h-28 md:w-28">
          {avatar ? (
            <img
              src={avatar}
              alt={fullName || username || "User"}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <span className="text-4xl font-bold uppercase text-amber-400">
              {(username?.[0] || "?").toUpperCase()}
            </span>
          )}
        </div>

        {/* Identity + Bio */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col items-center gap-2 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                <h1 className="text-2xl font-bold text-white">
                  {fullName || "—"}
                </h1>

                {role && (
                  <Badge variant="secondary">
                    {role}
                  </Badge>
                )}

                <Badge variant="primary">
                  Level {level}
                </Badge>
              </div>

              {username && (
                <p className="mt-1 text-sm text-stone-400">@{username}</p>
              )}

              {bio && (
                <p className="mt-3 text-sm leading-relaxed text-stone-400">
                  {bio}
                </p>
              )}

              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-stone-500 md:justify-start">
                <Calendar size={13} />
                Joined {joinDate}
              </div>
            </div>

            {/* Coins */}
            <div className="flex shrink-0 items-center gap-2 self-center rounded-lg border border-stone-800 bg-stone-950 px-4 py-2.5 md:self-start">
              <Coins size={18} className="text-amber-400" />
              <span className="text-lg font-semibold text-white">
                <AnimatedCounter value={coins} />
              </span>
            </div>
          </div>

          {/* XP Bar */}
          <div className="mt-6">
            <div className="mb-1.5 flex items-center justify-between text-xs text-stone-500">
              <span>Level {level}</span>
              <span>
                {xp.toLocaleString()} / {xpToNextLevel.toLocaleString()} XP
              </span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-stone-800">
              <motion.div
                className="h-full rounded-full bg-amber-400"
                initial={{ width: 0 }}
                animate={{ width: `${xpPercent}%` }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  delay: 0.2,
                }}
                onAnimationComplete={() => setXpAnimated(true)}
              />
            </div>

            {xpAnimated && (
              <p className="mt-2 text-right text-xs text-stone-500">
                {xpPercent}% to next level
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ProfileHeaderSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-stone-800 bg-stone-900 p-6 md:p-8">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="h-24 w-24 rounded-xl bg-stone-800 md:h-28 md:w-28" />

        <div className="flex-1">
          <div className="h-7 w-56 rounded bg-stone-800" />
          <div className="mt-3 h-4 w-32 rounded bg-stone-800" />
          <div className="mt-4 h-4 w-full rounded bg-stone-800" />
          <div className="mt-2 h-4 w-3/4 rounded bg-stone-800" />

          <div className="mt-8 h-2 w-full rounded-full bg-stone-800" />
        </div>

        <div className="h-12 w-24 rounded-lg bg-stone-800" />
      </div>
    </div>
  );
}