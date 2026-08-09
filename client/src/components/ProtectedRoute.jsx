import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wraps routes that require login. If there's no user once the initial
// "am I logged in?" check finishes, redirect to /login and remember where
// the person was headed so we can send them back after they sign in.
export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <p className="helper-text">Checking your credentials…</p>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}