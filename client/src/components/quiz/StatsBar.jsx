import CoinCounter from "./CoinCounter";
import XPBar from "./XPBar";
import StreakCounter from "./StreakCounter";

export default function StatsBar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/60 border-b border-slate-800">

      <div className="max-w-7xl mx-auto px-6 py-5">

        <div className="flex flex-wrap items-center gap-5">

          <CoinCounter />

          <XPBar />

          <StreakCounter />

        </div>

      </div>

    </header>
  );
}