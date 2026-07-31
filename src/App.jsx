import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import EraTimeline from './pages/EraTimeline.jsx'
import SearchPage from './pages/SearchPage.jsx'
// Registers every searchable collection (dinosaurs today; eras, mini
// games, DNA lab, articles, and the AI Guide later) with the search
// service. Imported once here, as early as possible, purely for its
// side effect — see search/registerCollections.js.
import './search/registerCollections.js'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/*
        One reusable route for every era — EraTimeline reads the :era
        param and looks up its config in data/eraTimelines.js. All three
        eras (Jurassic, Triassic, Cretaceous) are populated and linked
        from the landing page; the route works identically for all of
        them without any duplication.
      */}
      <Route path="/timeline/:era" element={<EraTimeline />} />
      {/*
        Global Museum Search — independent of Timeline. Reads ?q= from
        the URL itself; see pages/SearchPage.jsx.
      */}
      <Route path="/search" element={<SearchPage />} />
      {/*
        Future phases will register additional routes here, e.g.:
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/museum" element={<Museum />} />
        Not implemented yet.
      */}
    </Routes>
  )
}

export default App