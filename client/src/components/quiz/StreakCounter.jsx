import { FaFire } from "react-icons/fa";

export default function StreakCounter({ streak = 7 }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-slate-800/70 px-4 py-3 backdrop-blur-md border border-slate-700">
      <FaFire className="text-orange-500 text-xl" />
      <span className="font-bold">
        {streak} Days
      </span>
    </div>
  );
}