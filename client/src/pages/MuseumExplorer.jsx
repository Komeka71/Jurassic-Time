// import { useMemo, useState } from "react";
// import MuseumHero from "../components/museum/MuseumHero.jsx";
// import FeaturedMuseum from "../components/museum/FeaturedMuseum.jsx";
// import MuseumGrid from "../components/museum/MuseumGrid.jsx";
// // import MuseumCategories from "../components/museum/MuseumCategories.jsx";
// import WorldMap from "../components/museum/WorldMap.jsx";
// import MuseumFooter from "../components/museum/MuseumFooter.jsx";
// import { museums, categories } from "../data/museums.js";
// import "../styles/museum.css";
// const FEATURED_SLUG = "field-museum";

// export default function MuseumExplorer() {
//   const [query, setQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState(null);

//   const featured = museums.find((m) => m.slug === FEATURED_SLUG);

//   const filteredMuseums = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     return museums.filter((museum) => {
//       const matchesQuery =
//         !q ||
//         museum.name.toLowerCase().includes(q) ||
//         museum.city.toLowerCase().includes(q) ||
//         museum.country.toLowerCase().includes(q);
//       const matchesCategory = !activeCategory || museum.tags.includes(activeCategory);
//       return matchesQuery && matchesCategory;
//     });
//   }, [query, activeCategory]);

//   return (
//     <main className="bg-bone">
//       <MuseumHero query={query} onQueryChange={setQuery} featuredHeroImage={featured.heroImage} />
//       <FeaturedMuseum museum={featured} />
//       <MuseumGrid museums={filteredMuseums} />
//       {/* <MuseumCategories
//         categories={categories}
//         activeCategory={activeCategory}
//         onSelect={setActiveCategory}
//       /> */}
//       <WorldMap museums={museums} />
//       <MuseumFooter />
//     </main>
//   );
// }

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MuseumIntro from "../components/museum/MuseumIntro.jsx";
import MuseumHero from "../components/museum/MuseumHero.jsx";
import FeaturedMuseum from "../components/museum/FeaturedMuseum.jsx";
import MuseumGrid from "../components/museum/MuseumGrid.jsx";
// import MuseumCategories from "../components/museum/MuseumCategories.jsx";
import WorldMap from "../components/museum/WorldMap.jsx";
import MuseumFooter from "../components/museum/MuseumFooter.jsx";
import { museums, categories } from "../data/museums.js";
import "../styles/museum.css";

const FEATURED_SLUG = "field-museum";

export default function MuseumExplorer() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [tourOpen, setTourOpen] = useState(false);

  const featured = museums.find((m) => m.slug === FEATURED_SLUG);

  const filteredMuseums = useMemo(() => {
    const q = query.trim().toLowerCase();
    return museums.filter((museum) => {
      const matchesQuery =
        !q ||
        museum.name.toLowerCase().includes(q) ||
        museum.city.toLowerCase().includes(q) ||
        museum.country.toLowerCase().includes(q);
      const matchesCategory = !activeCategory || museum.tags.includes(activeCategory);
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <main className="bg-bone">
      {/* Cinematic splash — plays once on entry, then the functional search hero takes over */}
      <MuseumIntro
        primaryCta={{
          label: "Explore Archive",
          onClick: () => {
            document.getElementById("museum-search-hero")?.scrollIntoView({ behavior: "smooth" });
          },
        }}
        secondaryCta={{ label: "Virtual Tour", onClick: () => setTourOpen(true) }}
      />

      <div id="museum-search-hero">
        <MuseumHero query={query} onQueryChange={setQuery} featuredHeroImage={featured.heroImage} />
      </div>

      <FeaturedMuseum museum={featured} />
      <MuseumGrid museums={filteredMuseums} />
      {/* <MuseumCategories
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      /> */}
      <WorldMap museums={museums} />
      <MuseumFooter />

      {/* {tourOpen && <VirtualTourModal onClose={() => setTourOpen(false)} />} */}
    </main>
  );
}