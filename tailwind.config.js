/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bone: "#F8F6F2",
        strata: "#2D3E2F",
        amber: "#A67C52",
        ink: "#1B1B1B",
      },
      fontFamily: {
        display: ["\"Fraunces\"", "serif"],
        body: ["\"Inter\"", "sans-serif"],
        mono: ["\"IBM Plex Mono\"", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
    },
  },
  plugins: [],
};
