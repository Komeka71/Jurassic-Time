import { useEffect, useState } from "react";

import VerificationHero from "./VerificationHero";
import VerificationTimeline from "./VerificationTimeline";
import CommunityReview from "./CommunityReview";
import CurrentStage from "./CurrentStage";

export default function VerificationPipeline() {
  const [discovery, setDiscovery] = useState(null);
console.log(discovery);
  useEffect(() => {
    async function fetchDiscovery() {
      try {
        const res = await fetch(
          "http://localhost:3000/api/discoveries/latest"
        );

        const data = await res.json();

        if (data.success && data.discoveries.length > 0) {
          setDiscovery(data.discoveries[0]);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchDiscovery();
  }, []);

  return (
    <section className="relative overflow-hidden py-32">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-44 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#d6aa62]/10 blur-[220px]" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6">
        <VerificationHero />

        <VerificationTimeline />

        <CurrentStage discovery={discovery} />

        <CommunityReview discovery={discovery} />
      </div>
    </section>
  );
}