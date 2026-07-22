import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RequireOnboarding from "./components/RequireOnboarding";
import WelcomeBanner from "./components/WelcomeBanner";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";

// Navbar + the centered 720px "app-shell" only wraps the non-auth pages now.
// Login/Signup/VerifyOtp render full-screen with no wrapper at all, since
// AuthLayout handles its own full-viewport layout.
function MainLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <WelcomeBanner />
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Full-screen auth pages — no navbar, no app-shell wrapper */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />

      {/* Everything else keeps the navbar + centered app-shell */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/onboarding" element={<Onboarding />} />

          <Route element={<RequireOnboarding />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route path="*" element={<p>404 — this exhibit doesn't exist.</p>} />
      </Route>
    </Routes>
  );
}