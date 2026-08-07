// components/profile/QuizPerformance.jsx

import { useEffect, useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import {
  Target,
  TrendingUp,
  Award,
  Repeat,
  Flame,
  Trophy,
} from "lucide-react";
import SectionHeading from "./shared/SectionHeading";
import StatCard from "./shared/StatCard";
import { getQuizStats } from "../../services/profileService";

export default function QuizPerformance({ user }) {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getQuizStats()
  .then((data) => setQuiz(data || {}))
  .catch((err) => {
    console.error(err);
    setError(err);
  })
  .finally(() => setLoading(false));
  }, []);

  const data = quiz || {};

  const cards = [
    {
      icon: Target,
      label: "Accuracy",
      value: data.accuracy ?? 0,
      accent: "emerald",
    },
    {
      icon: TrendingUp,
      label: "Average Score",
      value: data.averageScore ?? 0,
      accent: "amber",
    },
    {
      icon: Trophy,
      label: "Highest Score",
      value: data.highestScore ?? 0,
      accent: "amber",
    },
    {
      icon: Repeat,
      label: "Attempts",
      value: data.attempts ?? 0,
      accent: "amber",
    },
    {
      icon: Flame,
      label: "Current Streak",
      value: data.currentStreak ?? user?.currentStreak ?? 0,
      accent: "orange",
    },
    {
      icon: Award,
      label: "Highest Streak",
      value: data.highestStreak ?? user?.highestStreak ?? 0,
      accent: "orange",
    },
  ];

  return (
    <section id="quiz-performance" className="space-y-4">
      <SectionHeading
        eyebrow="PROFILE"
        title="Quiz Performance"
        description="Your learning progress across dinosaur quizzes."
      />

      {loading ? (
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[84px] animate-pulse rounded-xl border border-white/10 bg-black/40"
              />
            ))}
          </div>

          <div className="h-64 animate-pulse rounded-xl border border-white/10 bg-black/40" />
        </div>
      ) : error ? (
        <p className="rounded-xl border border-white/10 bg-black/40 p-6 text-center text-sm text-white/40">
          Quiz performance is currently unavailable.
        </p>
      ) : (data.attempts ?? 0) === 0 ? (
        <p className="rounded-xl border border-white/10 bg-black/40 p-6 text-center text-sm text-white/40">
          You haven't attempted any quizzes yet.
          <br />
          <br />
          Complete quizzes to unlock detailed performance analytics.
        </p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {cards.map((c, i) => (
              <StatCard key={c.label} {...c} index={i} />
            ))}

            <div className="col-span-2 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-sm sm:col-span-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/40">Best category</span>
                <span className="font-medium text-emerald-400">
                  {data.bestCategory || "—"}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-white/40">Needs work</span>
                <span className="font-medium text-orange-400">
                  {data.worstCategory || "—"}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
            <p className="mb-2 text-xs font-medium text-white/40">
              Score by category
            </p>

            <ResponsiveContainer width="100%" height={220}>
              <RadarChart
                data={data.categoryBreakdown || []}
                outerRadius="75%"
              >
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{
                    fill: "rgba(255,255,255,0.4)",
                    fontSize: 10,
                  }}
                />
                <Radar
                  dataKey="score"
                  stroke="#fbbf24"
                  fill="#fbbf24"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </section>
  );
}