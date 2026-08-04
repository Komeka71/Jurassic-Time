import { useMemo, useState } from "react";
import MuseumHero from "../components/museum/MuseumHero.jsx";
import FeaturedMuseum from "../components/museum/FeaturedMuseum.jsx";
import MuseumGrid from "../components/museum/MuseumGrid.jsx";
import MuseumCategories from "../components/museum/MuseumCategories.jsx";
import WorldMap from "../components/museum/WorldMap.jsx";
import MuseumFooter from "../components/museum/MuseumFooter.jsx";
import { museums, categories } from "../data/museums.js";

const FEATURED_SLUG = "field-museum";

export default function MuseumExplorer() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

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
      <MuseumHero query={query} onQueryChange={setQuery} featuredHeroImage={featured.heroImage} />
      <FeaturedMuseum museum={featured} />
      <MuseumGrid museums={filteredMuseums} />
      <MuseumCategories
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />
      <WorldMap museums={museums} />
      <MuseumFooter />
    </main>
  );
}
