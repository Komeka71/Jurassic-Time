import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

// Renders once, right after a brand-new account gets verified (OTP or
// first-time Google sign-in), then dismisses itself.
export default function WelcomeBanner() {
  const { welcomeName, clearWelcome } = useAuth();

  useEffect(() => {
    if (!welcomeName) return;
    const timer = setTimeout(clearWelcome, 6000);
    return () => clearTimeout(timer);
  }, [welcomeName, clearWelcome]);

  if (!welcomeName) return null;

  return (
    <div
      className="field-card"
      data-tag="Welcome"
      style={{ borderColor: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "space-between" }}
    >
      <div>
        <h3 style={{ marginBottom: 4 }}>🦖 Welcome to Paleora, {welcomeName}!</h3>
        <p className="helper-text" style={{ margin: 0 }}>
          Your account is verified. Let's find you a guide.
        </p>
      </div>
      <button className="ghost" onClick={clearWelcome} aria-label="Dismiss">
        ✕
      </button>
    </div>
  );
}