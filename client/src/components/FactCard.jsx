const themes = {
  1: {
    card: `
      bg-gradient-to-r
      from-[#123D25]/95
      via-[#10321F]/95
      to-[#071A10]/95
    `,
    border: "border-green-500/30",
    title: "text-green-300",
    icon: "🌿",
    glow: "shadow-green-900/20",

    xp: `
      bg-cyan-500/10
      border-cyan-500/30
      text-cyan-300
    `,

    coins: `
      bg-yellow-500/10
      border-yellow-500/30
      text-yellow-300
    `,
  },

  2: {
    card: `
      bg-gradient-to-r
      from-[#49331A]/95
      via-[#352515]/95
      to-[#1D150C]/95
    `,
    border: "border-amber-500/30",
    title: "text-amber-300",
    icon: "🦴",
    glow: "shadow-amber-900/20",

    xp: `
      bg-orange-500/10
      border-orange-500/30
      text-orange-300
    `,

    coins: `
      bg-yellow-500/10
      border-yellow-500/30
      text-yellow-300
    `,
  },

  3: {
    card: `
      bg-gradient-to-r
      from-[#4A1E14]/95
      via-[#35150F]/95
      to-[#1C0B08]/95
    `,
    border: "border-red-500/30",
    title: "text-orange-300",
    icon: "🌋",
    glow: "shadow-red-900/30",

    xp: `
      bg-red-500/10
      border-red-500/30
      text-red-300
    `,

    coins: `
      bg-orange-500/10
      border-orange-500/30
      text-orange-300
    `,
  },

  4: {
    card: `
      bg-gradient-to-r
      from-[#16455C]/95
      via-[#12384C]/95
      to-[#091F2C]/95
    `,
    border: "border-cyan-400/30",
    title: "text-cyan-200",
    icon: "❄️",
    glow: "shadow-cyan-900/30",

    xp: `
      bg-blue-500/10
      border-blue-400/30
      text-blue-200
    `,

    coins: `
      bg-cyan-500/10
      border-cyan-400/30
      text-cyan-200
    `,
  },

  5: {
    card: `
      bg-gradient-to-r
      from-[#4A2A17]/95
      via-[#342015]/95
      to-[#1A110C]/95
    `,
    border: "border-orange-500/30",
    title: "text-orange-300",
    icon: "☄️",
    glow: "shadow-orange-900/30",

    xp: `
      bg-orange-500/10
      border-orange-500/30
      text-orange-300
    `,

    coins: `
      bg-yellow-500/10
      border-yellow-500/30
      text-yellow-300
    `,
  },
};

export default function FactCard({
  question,
  submitted,
  level = 1,
}) {
  const theme = themes[level] || themes[1];

  if (!submitted) return null;

  return (
    <div
      className={`
        mt-6
        md:mt-8

        rounded-[24px]

        ${theme.card}

        border
        ${theme.border}

        px-5
        sm:px-6

        py-5

        backdrop-blur-xl

        shadow-xl
        ${theme.glow}

        transition-all
        duration-500
      `}
    >
      {/* TITLE */}

      <div
        className={`
          flex
          items-center
          gap-2

          ${theme.title}

          text-sm
          sm:text-base

          font-bold

          uppercase
          tracking-wide

          mb-3
        `}
      >
        <span>{theme.icon}</span>

        <span>DID YOU KNOW?</span>
      </div>

      {/* FACT */}

      <p
        className="
          text-white/90

          text-sm
          sm:text-base
          md:text-lg

          leading-relaxed
        "
      >
        {question.fact}
      </p>

      {/* REWARDS */}

      <div
        className="
          flex
          flex-wrap
          items-center

          gap-3

          mt-5
        "
      >
        {/* XP */}

        <div
          className={`
            px-4
            py-2

            rounded-full

            border

            font-bold

            ${theme.xp}
          `}
        >
          ⭐ +{question.xp} XP
        </div>

        {/* COINS */}

        <div
          className={`
            px-4
            py-2

            rounded-full

            border

            font-bold

            ${theme.coins}
          `}
        >
          🪙 +{question.coins}
        </div>
      </div>
    </div>
  );
}