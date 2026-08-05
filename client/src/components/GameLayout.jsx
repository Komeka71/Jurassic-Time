export default function GameLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#06180f] text-white overflow-x-hidden">

      {/* Background */}

      <div className="fixed inset-0 pointer-events-none">

        <div className="absolute -left-40 -top-40 w-[450px] h-[450px] rounded-full bg-green-500/10 blur-[150px]" />

        <div className="absolute right-0 bottom-0 w-[550px] h-[550px] rounded-full bg-emerald-500/10 blur-[180px]" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 py-10">

        {children}

      </div>

    </div>
  );
}