export default function Particles({ level }) {
  const particleCount = 20;

  const particles = Array.from({ length: particleCount });

  const styles = {
    1: {
      emoji: "🍃",
      opacity: 0.7,
    },
    2: {
      emoji: "🟤",
      opacity: 0.35,
    },
    3: {
      emoji: "✨",
      opacity: 0.6,
    },
    4: {
      emoji: "❄",
      opacity: 0.8,
    },
    5: {
      emoji: "☄",
      opacity: 0.7,
    },
  };

  const current = styles[level] || styles[1];

  return (
    <>
      {particles.map((_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${8 + Math.random() * 8}s`,
            fontSize: `${12 + Math.random() * 18}px`,
            opacity: current.opacity,
          }}
        >
          {current.emoji}
        </span>
      ))}
    </>
  );
}