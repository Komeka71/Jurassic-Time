import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import MuseumIntro from "../components/museum/MuseumIntro.jsx";
import MuseumHero from "../components/museum/MuseumHero.jsx";
import FeaturedMuseum from "../components/museum/FeaturedMuseum.jsx";
import MuseumGrid from "../components/museum/MuseumGrid.jsx";
// import MuseumCategories from "../components/museum/MuseumCategories.jsx";
import WorldMap from "../components/museum/WorldMap.jsx";
import MuseumFooter from "../components/museum/MuseumFooter.jsx";
import HomeButton from "../components/Homebtn.jsx";
import DinoGuide from "../components/guide/DinoGuide"; // adjust path to match actual location relative to this file
import Chatbot from "../components/chat/Chatbot"; // adjust path to match actual location relative to this file
import { useGuide } from "../context/GuideContext"; // adjust path to match actual location relative to this file
import { museums, categories } from "../data/museums.js";
import "../styles/museum.css";

const FEATURED_SLUG = "field-museum";

export default function MuseumExplorer() {
const navigate = useNavigate();
const [query, setQuery] = useState("");
const [activeCategory, setActiveCategory] = useState(null);
const [tourOpen, setTourOpen] = useState(false);
const { setCurrentPage } = useGuide();

useEffect(() => {
setCurrentPage("museum");
  }, [setCurrentPage]);

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
<main className="relative bg-bone">
<HomeButton onClick={() => navigate("/")} />

{/* Cinematic splash — plays once on entry, then the functional search hero takes over */}

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

{/* DinoGuide — bottom-right, smaller than Hero/HybridLab (0.9-1.2)
          but not tiny; persists across the whole scroll since it's fixed. */}
<div
className="
          fixed
          bottom-5
          right-5
          md:bottom-6
          md:right-8
          z-[9999]
          scale-[0.65]
          md:scale-[0.7]
          origin-bottom-right
        "
>
<DinoGuide section="museum" />
</div>

{/* Paleo chatbot — DinoGuide already owns the bottom-right corner on this
        page, so the chat bubble/window is pushed to the top-right instead
        to avoid the two overlapping. */}
<Chatbot page="museum" buttonPosition="top-right" />
</main>
  );
}