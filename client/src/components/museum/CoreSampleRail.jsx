import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * The page's signature device: a vertical "core sample" that mirrors the
 * geological cores paleontologists actually pull from a dig site, one band
 * per rock layer. Each band here maps to a section of the museum profile,
 * so scrolling the page reads like drilling down through strata — which is
 * literally what the content is about, not just decoration bolted on top.
 */
export default function CoreSampleRail({ sections }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const viewportMid = window.innerHeight * 0.4;
        let current = sections[0]?.id;
        for (const section of sections) {
          const el = document.getElementById(section.id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportMid) {
            current = section.id;
          }
        }
        setActiveId(current);
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pointer-events-none fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
      <div className="pointer-events-auto flex items-stretch gap-3">
        <div className="flex flex-col overflow-hidden rounded-full border border-strata/15 bg-bone/90 shadow-sm backdrop-blur-sm">
          {sections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                aria-label={`Jump to ${section.label}`}
                className="group relative flex h-11 w-11 items-center justify-center"
              >
                <span
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    isActive ? "scale-125 bg-amber" : "bg-strata/25 group-hover:bg-strata/50"
                  }`}
                />
                <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-sm bg-strata px-2.5 py-1 text-xs text-bone opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {section.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="core-sample-marker"
                    className="absolute inset-0 rounded-full ring-1 ring-amber/40"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}