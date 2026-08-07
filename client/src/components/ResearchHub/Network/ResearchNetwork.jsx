import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Activity,
  ArrowUpRight,
  Bone,
  BrainCircuit,
  Clock3,
  ShieldCheck,
  Users,
} from "lucide-react";

const defaultStats = [
  {
    icon: Users,
    value: "2,341",
    label: "Researchers Online",
    sub: "Live",
  },
  {
    icon: Bone,
    value: "18,542",
    label: "Verified Fossils",
    sub: "98.2% verified",
  },
  {
    icon: BrainCircuit,
    value: "96.4%",
    label: "AI Accuracy",
    sub: "Stable",
  },
  {
    icon: ShieldCheck,
    value: "81",
    label: "Active Sites",
    sub: "Worldwide",
  },
];

const defaultActivity = [
  {
    icon: "🦴",
    title: "Spinosaurus Skull Verified",
    desc: "Verified by Dr. Emily Carter",
    time: "2 min ago",
  },
  {
    icon: "🤖",
    title: "AI Species Classification",
    desc: "98.7% confidence achieved",
    time: "6 min ago",
  },
  {
    icon: "📍",
    title: "New Excavation Started",
    desc: "Kem Kem Beds • Morocco",
    time: "12 min ago",
  },
  {
    icon: "🔬",
    title: "DNA Analysis Completed",
    desc: "Tyrannosaurus Rex specimen",
    time: "18 min ago",
  },
  {
    icon: "📖",
    title: "Research Paper Submitted",
    desc: "Jurassic ecosystem analysis",
    time: "26 min ago",
  },
];

export default function ResearchNetwork() {
  const [stats, setStats] = useState(defaultStats);
  const [activity, setActivity] = useState(defaultActivity);
  const [contributors, setContributors] = useState([]);
  const [health, setHealth] = useState({
    uptime: 99.98,
    aiQueue: 92,
    collaboration: 87,
    synchronization: 96,
    summary: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const [statsResult, activityResult, contributorResult, healthResult] =
        await Promise.allSettled([
          axios.get(`${import.meta.env.VITE_API_URL}/api/discoveries/network-stats`), //ll
          axios.get(`${import.meta.env.VITE_API_URL}/api/discoveries/activity`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/discoveries/top-contributors`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/discoveries/network-health`),
        ]);

      if (statsResult.status === "fulfilled") {
        const data = statsResult.value.data;
        setStats([
          {
            icon: Users,
            value: data.researchersOnline,
            label: "Researchers Online",
            sub: "Live",
          },
          {
            icon: Bone,
            value: data.verifiedFossils,
            label: "Verified Fossils",
            sub: `${data.totalDiscoveries} total`,
          },
          {
            icon: BrainCircuit,
            value: `${data.aiAccuracy}%`,
            label: "AI Accuracy",
            sub: "Live Average",
          },
          {
            icon: ShieldCheck,
            value: data.activeSites,
            label: "Active Sites",
            sub: "Worldwide",
          },
        ]);
      } else {
        console.error(statsResult.reason);
      }

      if (activityResult.status === "fulfilled") {
        setActivity(
          activityResult.value.data.map((item) => ({
            icon: "🦴",
            title: item.species,
            desc: `${item.era} • ${item.status}`,
            time: new Date(item.createdAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            }),
          }))
        );
      } else {
        console.error(activityResult.reason);
      }

      if (contributorResult.status === "fulfilled") {
        setContributors(contributorResult.value.data);
      } else {
        console.error(contributorResult.reason);
      }

      if (healthResult.status === "fulfilled") {
        setHealth(healthResult.value.data);
      } else {
        console.error(healthResult.reason);
      }

      setLoading(false);
    };

    fetchAll();
  }, []);

  if (loading) {
    return (
      <section className="mt-40 text-center text-[#d7b87c]">
        Loading research network...
      </section>
    );
  }

  return (
    <section className="mt-40">
      {/* ================= HEADER ================= */}

      <div className="mx-auto max-w-3xl text-center">
        <span
          className="
            rounded-full
            border
            border-[#8b6b3c44]
            bg-[#241914]
            px-5
            py-2
            text-xs
            uppercase
            tracking-[0.35em]
            text-[#d7b87c]
          "
        >
          Research Hub
        </span>

        <h2
          className="
            mt-6
            text-5xl
            font-bold
            text-[#f4e2be]
            md:text-6xl
          "
        >
          Global Scientific Collaboration
        </h2>

        <p
          className="
            mx-auto
            mt-6
            max-w-2xl
            text-lg
            leading-8
            text-[#c8b89d]
          "
        >
          Monitor the health of the Paleora research network, follow live
          discoveries, and explore community contributions from scientists
          around the globe.
        </p>
      </div>

      {/* ================= MAIN PANEL ================= */}

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="
          relative
          mt-14
          overflow-hidden
          rounded-[42px]
          border
          border-[#8d693833]
          bg-gradient-to-br
          from-[#2a1d15]
          via-[#17120f]
          to-[#110d0b]
          p-8
          md:p-12
        "
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#d8ae5d12,transparent_65%)]" />

        <div className="relative z-10">
          {/* ================= TOP STATS ================= */}

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -6 }}
                  className="
                    rounded-2xl
                    border
                    border-[#8d693833]
                    bg-[#201711]/70
                    backdrop-blur-xl
                    p-4
                  "
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-[#7d5529]
                      "
                    >
                      <Icon size={26} className="text-[#f8e2b4]" />
                    </div>

                    <ArrowUpRight className="text-[#d6b176]" size={20} />
                  </div>

                  <h3 className="mt-4 text-2xl font-bold text-[#f5dfb7]">
                    {item.value}
                  </h3>

                  <p className="mt-2 text-[#d2c0a3]">{item.label}</p>

                  <p className="mt-3 text-sm text-[#9f8d76]">{item.sub}</p>
                </motion.div>
              );
            })}
          </div>

          {/* ================= CENTER GRID ================= */}

          <div className="mt-10 grid gap-8 xl:grid-cols-[2fr_1fr]">
            {/* Activity Feed */}

            <div
              className="
                rounded-[30px]
                border
                border-[#8d693833]
                bg-[#1d1510]/70
                p-8
              "
            >
              <div className="flex items-center gap-3">
                <Activity className="text-[#d8b26c]" />

                <h3 className="text-2xl font-semibold text-[#f4e2be]">
                  Live Research Activity
                </h3>
              </div>

              <p className="mt-2 text-[#bfae93]">
                Real-time discoveries, AI reviews and verification updates.
              </p>

              <div className="mt-8 space-y-4">
                {activity.length === 0 ? (
                  <p className="text-[#a99883]">
                    No recent research activity.
                  </p>
                ) : (
                  activity.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.08,
                      }}
                      whileHover={{
                        x: 6,
                      }}
                      className="
                        group
                        flex
                        items-center
                        gap-5
                        rounded-2xl
                        border
                        border-[#8d693822]
                        bg-[#241914]/70
                        p-7
                        transition-all
                      "
                    >
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-full
                          bg-[#7d5529]
                          text-2xl
                        "
                      >
                        {item.icon}
                      </div>

                      <div className="flex-1">
                        <h4
                          className="
                            font-semibold
                            text-[#f6e3bd]
                            group-hover:text-[#ffd996]
                          "
                        >
                          {item.title}
                        </h4>

                        <p
                          className="
                            mt-1
                            text-sm
                            text-[#bca98c]
                          "
                        >
                          {item.desc}
                        </p>
                      </div>

                      <span
                        className="
                          whitespace-nowrap
                          text-sm
                          text-[#8f7c64]
                        "
                      >
                        {item.time}
                      </span>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* ================= LEADERBOARD ================= */}

            <div
              className="
                rounded-[30px]
                border
                border-[#8d693833]
                bg-[#1d1510]/70
                p-8
              "
            >
              <h3 className="text-2xl font-semibold text-[#f4e2be]">
                Top Contributors
              </h3>

              <p className="mt-2 text-[#bfae93]">
                Researchers leading discoveries across the Paleora network.
              </p>

              <div className="mt-8 divide-y divide-[#8d693822]">
                {contributors.length === 0 ? (
                  <p className="text-[#a99883]">No contributors yet.</p>
                ) : (
                  contributors.map((user) => (
                    <motion.div
                      key={user.name}
                      whileHover={{ x: 6 }}
                      className="
                        flex
                        items-center
                        justify-between
                        py-5
                      "
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            bg-[#7d5529]
                            font-bold
                            text-[#f5dfb7]
                          "
                        >
                          {user.rank}
                        </div>

                        <div>
                          <h4 className="font-semibold text-[#f5dfb7]">
                            {user.name}
                          </h4>

                          <p className="text-sm text-[#a99883]">
                            {user.country}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-[#f5dfb7]">
                          {user.discoveries}
                        </div>

                        <div className="text-xs text-[#8f7c64]">
                          Discoveries
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ================= BOTTOM PANEL ================= */}

          <div
            className="
              mt-8
              rounded-[30px]
              border
              border-[#8d693833]
              bg-[#1d1510]/70
              p-8
            "
          >
            <div className="flex items-center gap-3">
              <Clock3 className="text-[#d8b26c]" />

              <h3 className="text-2xl font-semibold text-[#f4e2be]">
                Network Health
              </h3>
            </div>

            <p className="mt-2 text-[#bfae93]">
              Live metrics describing the current state of scientific
              collaboration.
            </p>

            <div className="mt-8 space-y-6">
              {[
                {
                  label: "Research Network Uptime",
                  value: health.uptime,
                },
                {
                  label: "AI Verification Queue",
                  value: health.aiQueue,
                },
                {
                  label: "Global Collaboration",
                  value: health.collaboration,
                },
                {
                  label: "Data Synchronization",
                  value: health.synchronization,
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[#d8c6a8]">{item.label}</span>

                    <span className="font-semibold text-[#f5dfb7]">
                      {item.value}%
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-[#2c221c]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#c28b46] to-[#f1c979]"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              className="
                mt-8
                rounded-2xl
                border
                border-[#8d693822]
                bg-[#241914]/70
                p-6
              "
            >
              <h4 className="text-xl font-semibold text-[#f5dfb7]">
                Today's Summary
              </h4>
              <span className="text-lg text-[#ffffff]">
                {health.summary?.discoveries ? (
                  <>
                    {health.summary.discoveries} discoveries are currently in
                    the archive, {health.summary.verified} have been
                    verified, {health.summary.contributors} researchers have
                    contributed, and the average AI confidence is{" "}
                    {health.summary.aiAccuracy}%.
                  </>
                ) : (
                  <span className="text-[#a99883]">
                    Summary data unavailable.
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}