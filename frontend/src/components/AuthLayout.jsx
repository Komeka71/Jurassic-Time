import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/auth-theme.css";

// Layout: real photo panel (left, organic blob edge) + plain white form
// panel (right) with a vertical nav. Drop your image at
// frontend/public/images/dig-site-hero.jpg — this component just points
// an <img> at it, no import/bundling needed for anything in /public.
export default function AuthLayout({ eyebrow, children }) {
  const location = useLocation();

  return (
    <div className="auth-page">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* ---- Left: real photo with blob edge + headline ---- */}
        <div className="auth-image">
          <img src="/images/dig-site-hero.jpg" alt="" className="auth-image__photo" />
          <div className="auth-image-overlay" />

          <div className="auth-logo">
            <span className="auth-logo__icon">🦖</span> Jurassic Time
          </div>

          <div className="auth-headline">
            <h2>
              DISCOVER
              <br />
              DEEP TIME
            </h2>
            <p>Explore the dig site, meet a dino guide, and log your first find.</p>
          </div>
        </div>

        {/* ---- Right: white panel with vertical nav + form ---- */}
        <div className="auth-panel glass-card">
          <nav className="auth-vnav">
            <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>
              Log in
            </Link>
            <Link to="/signup" className={location.pathname === "/signup" ? "active" : ""}>
              Sign up
            </Link>
          </nav>

          <div className="auth-panel__content">
            {eyebrow && <span className="glass-card__eyebrow">{eyebrow}</span>}
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}