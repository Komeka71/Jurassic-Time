// components/profile/RecentActivity.jsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Compass,
  Landmark,
  FlaskConical,
  Award,
  TrendingUp,
  Trophy,
  Send,
  ShieldCheck,
} from "lucide-react";
import SectionHeading from "./shared/SectionHeading";
import { getActivity } from "../../services/profileService";

const TYPE_CONFIG = {
  quiz_completed: { icon: CheckCircle2, tone: "text-emerald-400" },
  fossil_discovered: { icon: Compass, tone: "text-amber-400" },
  museum_visit: { icon: Landmark, tone: "text-amber-400" },
  dna_experiment: { icon: FlaskConical, tone: "text-amber-400" },
  badge_earned: { icon: Award, tone: "text-orange-400" },
  level_up: { icon: TrendingUp, tone: "text-amber-400" },
  achievement_unlocked: { icon: Trophy, tone: "text-orange-400" },
  discovery_submitted: { icon: Send, tone: "text-stone-400" },
  verification_approved: { icon: ShieldCheck, tone: "text-emerald-400" },
};

export default function RecentActivity() {
  const [activity, setActivity] = useState([]);

 useEffect(() => {
  getActivity()
    .then((data) => {
      setActivity(data || []);
    })
    .catch((err) => {
      console.error(err);
      setActivity([]);
    });
}, []);

  return (
    <section id="recent-activity" className="space-y-4">
      <SectionHeading
        eyebrow="PROFILE"
        title="Recent Activity"
        description="Your latest progress across Paleora."
      />

      {activity.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-stone-400">
            Your activity timeline will appear here as you explore Paleora.
          </p>
        </div>
      ) : (
        <ol className="relative border-l border-stone-800 pl-6">
          {activity.map((item, i) => {
            const config = TYPE_CONFIG[item.type] || {
              icon: CheckCircle2,
              tone: "text-stone-400",
            };

            const Icon = config.icon;

            return (
              <motion.li
                key={item._id || item.id}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="relative pb-6 last:pb-0"
              >
                <span
                  className={`absolute -left-[29px] flex h-6 w-6 items-center justify-center rounded-full border border-stone-800 bg-stone-950 ${config.tone}`}
                >
                  <Icon size={13} />
                </span>

                <div className="rounded-xl border border-stone-800 bg-stone-900 p-4">
                  <p className="text-sm font-medium text-white">
                    {item.text || "Activity"}
                  </p>

                  <p className="mt-1 text-xs text-stone-500">
                    {item.time || ""}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      )}
    </section>
  );
}