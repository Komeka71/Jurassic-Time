import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

// Reached two ways:
// 1. Right after signup (location.state has { userId, email })
// 2. After a login attempt on an unverified account (same state shape)
export default function VerifyOtp() {
  const { verifyOtp, resendOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, email } = location.state || {};

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);

  if (!userId) {
    return (
      <AuthLayout eyebrow="Verify Email">
        <h1 className="glass-card__title">Nothing to verify</h1>
        <p className="glass-card__subtitle">
          Start by <Link to="/signup">creating an account</Link>.
        </p>
      </AuthLayout>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (code.trim().length !== 6) {
      setError("Enter the 6-digit code from your email.");
      return;
    }
    setSubmitting(true);
    try {
      await verifyOtp({ userId, otp: code.trim() });
      navigate("/onboarding", { state: { justVerified: true } });
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't verify that code.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setInfo("");
    setResending(true);
    try {
      await resendOtp({ userId });
      setInfo("A new code is on its way to your inbox.");
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't resend the code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthLayout eyebrow="Verify Email">
      <h1 className="glass-card__title">Check your email</h1>
      <p className="glass-card__subtitle">
        We sent a 6-digit code to <strong>{email}</strong>. Enter it below to activate your account.
      </p>

      {error && <div className="form-error-banner">{error}</div>}
      {info && (
        <p className="glass-card__subtitle" style={{ color: "#cfe6cf", marginTop: -14 }}>
          {info}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="otp">Verification code</label>
          <input
            id="otp"
            className="otp-input"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            inputMode="numeric"
            placeholder="042819"
            autoFocus
          />
        </div>

        <div className="glass-card__actions">
          <button className="primary" type="submit" disabled={submitting}>
            {submitting ? "Verifying…" : "Verify & continue"}
          </button>
          <button className="ghost" type="button" onClick={handleResend} disabled={resending}>
            {resending ? "Sending…" : "Resend"}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}