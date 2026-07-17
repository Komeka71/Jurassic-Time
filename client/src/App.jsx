import { BrowserRouter, Routes, Route } from "react-router-dom";
import DailyMissions from "./pages/DailyMissions";
import Home from "./pages/Home";
import ExpeditionSelect from "./pages/ExpeditionSelect";
import Quiz from "./pages/Quiz";
import Map from "./pages/Map";
import Camp from "./pages/Camp";
import DinoShop from "./pages/DinoShop";
import Collection from "./pages/Collection";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
<Route
    path="/daily"
    element={<DailyMissions />}
/>
        <Route
          path="/expedition"
          element={<ExpeditionSelect />}
        />

        <Route
          path="/quiz"
          element={<Quiz />}
        />

        <Route
          path="/map"
          element={<Map />}
        />

        <Route
          path="/camp"
          element={<Camp />}
        />

        <Route
          path="/shop"
          element={<DinoShop />}
        />

        <Route
          path="/collection"
          element={<Collection />}
        />
        <Route
  path="/leaderboard"
  element={<Leaderboard />}
/>
<Route
  path="/profile"
  element={<Profile />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;