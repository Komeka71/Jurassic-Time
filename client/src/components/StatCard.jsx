export default function StatCard({
  icon,
  title,
  value,
  color = "text-green-400",
}) {
  return (
    <div
      className="
      rounded-[28px]
      border
      border-[#1c5a39]
      bg-gradient-to-br
      from-[#10261d]
      to-[#091712]
      p-7
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-[#31dd7b]
      shadow-[0_20px_60px_rgba(0,0,0,.35)]
      "
    >
      <div className="text-5xl mb-8">
        {icon}
      </div>

      <p className="uppercase tracking-[0.28em] text-xs text-gray-500 font-semibold">
        {title}
      </p>

      <h2 className={`text-4xl font-black mt-4 ${color}`}>
        {value}
      </h2>
    </div>
  );
}