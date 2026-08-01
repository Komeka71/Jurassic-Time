import { Check, Lock, Sparkles } from "lucide-react";

const RANKS = ["Rookie", "Explorer", "Adventurer", "Paleo Master"];

export default function ExpeditionProgress({ currentRank = "Explorer" }) {
  const currentIndex = Math.max(0, RANKS.indexOf(currentRank));

  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
        Expedition Progress
      </span>

      <div className="flex items-center">
        {RANKS.map((rank, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          const locked = i > currentIndex;

          return (
            <div key={rank} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${
                    done
                      ? "border-emerald-400 bg-emerald-400/20 text-emerald-300"
                      : active
                      ? "border-amber-300 bg-amber-300/20 text-amber-200 shadow-[0_0_20px_rgba(252,211,77,0.5)]"
                      : "border-white/15 bg-white/5 text-white/30"
                  }`}
                >
                  {done ? (
                    <Check className="h-4 w-4" />
                  ) : locked ? (
                    <Lock className="h-3.5 w-3.5" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                </div>
                <span
                  className={`text-[11px] font-medium uppercase tracking-wide ${
                    active
                      ? "text-amber-300"
                      : done
                      ? "text-emerald-300"
                      : "text-white/30"
                  }`}
                >
                  {rank}
                </span>
              </div>

              {i < RANKS.length - 1 && (
                <div
                  className={`mx-2 h-[2px] flex-1 rounded-full ${
                    i < currentIndex ? "bg-emerald-400/60" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
