import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function VerificationHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative mx-auto max-w-5xl text-center"
    >
      {/* Glow */}

      <div className="absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#d6aa62]/10 blur-[140px]" />

      {/* Badge */}

      <div
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-[#8b6637]
          bg-[#24180f]/80
          px-6
          py-2
          text-xs
          uppercase
          tracking-[0.35em]
          text-[#ddb878]
          backdrop-blur-md
        "
      >
        <ShieldCheck size={15} />
        Verification Pipeline
      </div>

      {/* Heading */}

      <h2
        className="
          mt-8
          text-4xl
          font-bold
          leading-tight
          text-[#f7e8c8]
          md:text-[3.5rem]
        "
      >
        Every Discovery
        <br />
        Earns Its Place
      </h2>

      {/* Description */}

      <p
        className="
          mx-auto
          mt-8
          max-w-3xl
          text-lg
          leading-9
          text-[#d4c2a5]
        "
      >
        Every fossil submitted to PaleoVerse undergoes a rigorous scientific
        verification process before becoming part of the permanent Museum
        Archive.
      </p>

      {/* Divider */}

      <div className="mx-auto mt-10 h-px w-52 bg-gradient-to-r from-transparent via-[#ddb878]/70 to-transparent" />
    </motion.div>
  );
}