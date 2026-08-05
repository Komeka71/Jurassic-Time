import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DinoGuide from "../DinoGuide";

export default function HybridLabPreview() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050607]">

      {/* ================= BACKGROUND VIDEO ================= */}
{/* Background */}

<video
  autoPlay
  muted
  loop
  playsInline
  poster="/assets/hybrid-lab/background.jpg"
  className="absolute inset-0 h-full w-full object-cover"
>
  <source src="/videos/hybrid-preview/lab.mp4" type="video/mp4" />
</video>

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#050607] via-[#050607]/80 to-[#050607]/30" />

      {/* Cyan Ambient Glow */}

      <div className="absolute right-[-250px] top-[-200px] h-[700px] w-[700px] rounded-full bg-cyan-400/10 blur-[180px]" />

      <div className="absolute left-[-150px] bottom-[-150px] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[150px]" />

      {/* ================= CONTENT ================= */}

      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl items-center px-6">

        <div className="grid w-full items-center gap-20 lg:grid-cols-2">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >

            <p className="mb-5 text-xs uppercase tracking-[0.45em] text-cyan-300">

              CLASSIFIED RESEARCH FACILITY

            </p>

            <h2 className="text-5xl font-black leading-tight text-white md:text-7xl">

              Beyond the Museum...

              <span className="block text-cyan-300">

                Life Continues Here.

              </span>

            </h2>

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-300">

              Hidden beneath the rainforest lies Paleora's most
              advanced Genetics Research Laboratory. Unlock extinct
              DNA archives, discover hybrid organisms and explore
              experiments never shown inside the museum.

            </p>

            <button
              onClick={() => navigate("/hybrid-lab")}
              className="
                mt-12
                rounded-full
                border
                border-cyan-400/30
                bg-white/5
                px-8
                py-4
                text-white
                backdrop-blur-xl
                transition-all
                duration-300
                hover:scale-105
                hover:border-cyan-300
                hover:bg-cyan-500/10
                hover:shadow-[0_0_35px_rgba(34,211,238,.35)]
              "
            >
              🧬 ENTER HYBRID LAB →
            </button>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >

            <div
              className="
                relative
                overflow-hidden
                rounded-[36px]
                border
                border-cyan-400/20
                bg-white/5
                backdrop-blur-xl
              "
            >

              {/* Scanner Line */}

              <motion.div

                animate={{
                  y: ["0%", "100%", "0%"],
                }}

                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}

                className="
                  absolute
                  left-0
                  top-0
                  z-20
                  h-1
                  w-full
                  bg-cyan-300
                  blur-sm
                "
              />

              {/* Door */}

              <motion.img

                whileHover={{
                  scale: 1.03,
                }}

                transition={{
                  duration: .4,
                }}

                src="/assets/hybrid-lab/entrance/lab-door.png"

                alt="Hybrid Lab"

                className="
                  h-full
                  w-full
                  object-cover
                "

              />

              {/* Bottom Gradient */}

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              {/* Status */}

              <div className="absolute left-8 top-8 rounded-full border border-cyan-400/20 bg-black/50 px-5 py-2 backdrop-blur-xl">

                <span className="text-xs uppercase tracking-[0.3em] text-cyan-300">

                  ONLINE

                </span>

              </div>

              {/* Bottom */}

              <div className="absolute bottom-8 left-8">

                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">

                  Access Level

                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">

                  Genetics Research Lab

                </h3>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

      {/* ================= DINO ================= */}
<div
  className="
    absolute
    bottom-6
    -left-16
    z-30
    hidden
    lg:block
    scale-[0.55]
    xl:scale-[0.65]
    2xl:scale-[0.75]
    origin-bottom-left
  "
>
  <DinoGuide
    mood="idle"
    message="Psst... Only authorized researchers can enter!"
  />
</div>

    </section>
  );
}

// export default function HybridLabPreview() {
//   return (
//     <div className="h-screen bg-red-600 flex items-center justify-center">
//       <h1 className="text-6xl text-white font-bold">
//         HYBRID LAB WORKS
//       </h1>
//     </div>
//   );
// }