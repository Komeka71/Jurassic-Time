import { motion } from "framer-motion";
import { Gift } from "lucide-react";

// NOTE: your file tree has an /images/treasure-chest/ folder but I don't know
// the exact filename inside it, so this uses a lucide Gift icon for now.
// Swap the icon block below for an <img src="/images/treasure-chest/<file>" />
// once you give me the exact path.
export default function DailyBonusCard({ onClaim, claimed = false }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col items-center gap-3 rounded-3xl border border-white/10 bg-black/40 p-5 text-center shadow-[0_0_30px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md md:items-start md:p-6 md:text-left"
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
        Daily Bonus
      </span>

      <div className="flex items-center gap-4">
        <motion.div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/30 to-orange-600/30"
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <Gift className="h-7 w-7 text-amber-300" strokeWidth={2} />
        </motion.div>

        <div className="flex flex-col items-start gap-2">
          <p className="max-w-[220px] text-sm text-white/60">
            Complete a mission to claim your reward!
          </p>
          <button
            type="button"
            onClick={onClaim}
            disabled={claimed}
            className="rounded-full bg-emerald-400 px-5 py-1.5 text-xs font-bold uppercase tracking-wide text-emerald-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
          >
            {claimed ? "Claimed" : "Claim Reward"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
