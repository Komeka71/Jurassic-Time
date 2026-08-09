import { motion } from "framer-motion";

export default function XPBar({ xp = 70 }) {
  return (
    <div className="flex-1 px-6">
      <div className="flex justify-between mb-2 text-sm text-slate-300">
        <span className="font-semibold">Level 3</span>
        <span>{xp}%</span>
      </div>

      <div className="h-4 rounded-full bg-slate-700 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${xp}%` }}
          transition={{ duration: 1 }}
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
        />
      </div>
    </div>
  );
}