import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errors = {};
    if (form.username.trim().length < 3) errors.username = "Username needs at least 3 characters.";
    else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) errors.username = "Letters, numbers, and _ only.";

    if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Enter a valid email address.";

    if (form.password.length < 8) errors.password = "Password needs at least 8 characters.";

    if (form.confirmPassword !== form.password) errors.confirmPassword = "Passwords don't match.";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const { userId, email } = await signup({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      navigate("/verify-otp", { state: { userId, email } });
    } catch (err) {
      setFormError(err.response?.data?.message || "Couldn't create your account. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout eyebrow="New Contributor">
      <h1 className="glass-card__title">Join the dig site</h1>
      <p className="glass-card__subtitle">Create an account to save progress, take quizzes, and log finds.</p>

      {formError && <div className="form-error-banner">{formError}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            placeholder="fossil_hunter_99"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            autoComplete="username"
          />
          {fieldErrors.username && <div className="field-error">{fieldErrors.username}</div>}
        </div>

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
            autoComplete="new-password"
          />
          {fieldErrors.password && <div className="field-error">{fieldErrors.password}</div>}
        </div>

        <div className="field">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            autoComplete="new-password"
          />
          {fieldErrors.confirmPassword && <div className="field-error">{fieldErrors.confirmPassword}</div>}
        </div>

        <button className="primary" type="submit" disabled={submitting}>
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="glass-card__footer">
        Already excavating with us? <Link to="/login">Log in</Link>
      </p>
    </AuthLayout>
  );
}