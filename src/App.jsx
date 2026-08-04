import { Routes, Route } from "react-router-dom";

import MuseumExplorer from "./pages/MuseumExplorer.jsx";
import MuseumPage from "./pages/MuseumPage.jsx";
import ExhibitPage from "./pages/ExhibitPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MuseumExplorer />} />

      <Route
        path="/museum/:slug"
        element={<MuseumPage />}
      />

      <Route
        path="/museum/:slug/exhibit/:exhibitSlug"
        element={<ExhibitPage />}
      />
    </Routes>
  );
}