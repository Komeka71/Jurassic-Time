import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errors = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Enter a valid email address.";
    if (!form.password) errors.password = "Password is required.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const result = await login({ email: form.email.trim(), password: form.password });

      if (result.needsVerification) {
        navigate("/verify-otp", { state: { userId: result.userId, email: result.email } });
        return;
      }
      navigate(result.hasOnboarded ? redirectTo : "/onboarding");
    } catch (err) {
      setFormError(err.response?.data?.message || "Couldn't log you in. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout eyebrow="Return Visitor">
      <h1 className="glass-card__title">Welcome back to the dig</h1>
      <p className="glass-card__subtitle">Log in to pick up where you left off.</p>

      {formError && <div className="form-error-banner">{formError}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            autoComplete="email"
          />
          {fieldErrors.email && <div className="field-error">{fieldErrors.email}</div>}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            autoComplete="current-password"
          />
          {fieldErrors.password && <div className="field-error">{fieldErrors.password}</div>}
        </div>

        <button className="primary" type="submit" disabled={submitting}>
          {submitting ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="glass-card__footer">
        New here? <Link to="/signup">Create an account</Link>
      </p>
    </AuthLayout>
  );
}