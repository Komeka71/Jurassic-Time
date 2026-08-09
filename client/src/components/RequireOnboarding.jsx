import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Sits inside ProtectedRoute. Sends first-time users to the Dig Site
// Briefing before they can reach the rest of the app.
export default function RequireOnboarding() {
  const { user } = useAuth();

  if (user && !user.hasOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
}