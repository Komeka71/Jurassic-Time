import { motion } from "framer-motion";
import VerificationCard from "./VerificationCard";
import { verificationStages } from "./verificationData";

export default function VerificationTimeline() {
  return (
    <section className="relative mt-24">

      {/* ================= DESKTOP ================= */}

      <div className="relative hidden xl:block">

        {/* Base Line */}

        <div className="absolute left-[12%] right-[12%] top-[120px] h-[3px] rounded-full bg-[#4a3520]" />

        {/* Animated Gold Line */}

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "76%" }}
          viewport={{ once: true }}
          transition={{
            duration: 1.8,
            ease: "easeOut",
          }}
          className="
            absolute
            left-[12%]
            top-[120px]
            h-[3px]
            rounded-full
            bg-gradient-to-r
            from-[#b67d33]
            via-[#f1d28a]
            to-[#b67d33]
          "
        />

        {/* Cards */}

        <div className="grid grid-cols-4 gap-10">
          {verificationStages.map((stage, index) => (
            <div key={stage.id} className="relative">

              {/* Timeline Dot */}

              <motion.div
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                whileInView={{
                  scale: 1,
                  opacity: 1,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.18,
                }}
                className="
                  absolute
                  left-1/2
                  top-[107px]
                  z-20
                  h-6
                  w-6
                  -translate-x-1/2
                  rounded-full
                  border-[5px]
                  border-[#ddb878]
                  bg-[#120d09]
                  shadow-[0_0_20px_rgba(221,184,120,.7)]
                "
              />

              <VerificationCard
                {...stage}
                delay={index * 0.15}
              />

            </div>
          ))}
        </div>
      </div>

      {/* ================= MOBILE ================= */}

      <div className="space-y-8 xl:hidden">

        {/* Vertical Line */}

        <div className="absolute left-6 top-0 bottom-0 w-[3px] bg-[#4a3520]" />

        {verificationStages.map((stage, index) => (
          <div
            key={stage.id}
            className="relative pl-14"
          >

            {/* Dot */}

            <div
              className="
                absolute
                left-[14px]
                top-10
                h-5
                w-5
                rounded-full
                border-4
                border-[#ddb878]
                bg-[#120d09]
              "
            />

            <VerificationCard
              {...stage}
              delay={index * 0.1}
            />

          </div>
        ))}

      </div>
    </section>
  );
}