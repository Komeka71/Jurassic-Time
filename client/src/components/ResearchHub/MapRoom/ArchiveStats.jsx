import { useEffect, useState } from "react";
import axios from "axios";

import {
  BookOpen,
  Globe2,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function ArchiveStats() {
  const [stats, setStats] = useState({
    discoveries: 0,
    sites: 0,
    reviewing: 0,
    species: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/discoveries"
      );
console.log(data);
      // const discoveries = data;
      const discoveries = data.discoveries;

      const uniqueSites = new Set(
        discoveries.map((d) => d.location)
      );

      const uniqueSpecies = new Set(
        discoveries.map((d) => d.species)
      );

      const reviewing = discoveries.filter(
        (d) => d.status === "under-review"
      ).length;

      setStats({
        discoveries: discoveries.length,
        sites: uniqueSites.size,
        reviewing,
        species: uniqueSpecies.size,
      });
    } catch (err) {
      console.error(err);
    }
  }

  const cards = [
    {
      icon: ShieldCheck,
      value: stats.discoveries,
      label: "Discoveries",
    },
    {
      icon: Globe2,
      value: stats.sites,
      label: "Excavation Sites",
    },
    {
      icon: Users,
      value: stats.reviewing,
      label: "Under Review",
    },
    {
      icon: BookOpen,
      value: stats.species,
      label: "Species Recorded",
    },
  ];

  return (
    <div className="mt-14">
      <div
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-[#8f6a38]/30
          bg-gradient-to-b
          from-[#1b140f]
          via-[#120d09]
          to-[#0b0907]
          px-10
          py-10
          shadow-[0_25px_70px_rgba(0,0,0,.55)]
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-[#ddb878]/40
            to-transparent
          "
        />

        <h3
          className="
            mb-8
            text-center
            text-xs
            uppercase
            tracking-[0.35em]
            text-[#ddb878]
          "
        >
          Archive Summary
        </h3>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {cards.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="text-center"
            >
              <Icon
                size={28}
                className="mx-auto mb-4 text-[#ddb878]"
              />

              <h4 className="text-4xl font-bold text-[#f5dfb5]">
                {value}
              </h4>

              <p
                className="
                  mt-3
                  text-xs
                  uppercase
                  tracking-[0.25em]
                  text-[#bba98b]
                "
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="
          mt-6
          flex
          flex-wrap
          justify-center
          gap-6
          text-sm
          text-[#cdb894]
        "
      >
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          Verified
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-orange-400" />
          Under Review
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          Evidence Required
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          Featured Discovery
        </div>
      </div>
    </div>
  );
}