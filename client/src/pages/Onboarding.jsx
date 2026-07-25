import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import CompanionPicker from "../components/CompanionPicker";

const AGE_LABELS = {
  kid: { title: "Kid", sub: "Ages up to ~12" },
  teen: { title: "Teen", sub: "Ages ~13–17" },
  adult: { title: "Adult", sub: "18 and up" },
};
const PURPOSE_LABELS = {
  learning: { title: "Learning", sub: "Just here to explore and understand" },
  research: { title: "Research", sub: "Digging into data and sources" },
  fun: { title: "Fun", sub: "Quizzes, badges, and dino facts" },
  teaching: { title: "Teaching", sub: "Building lessons for others" },
};
const INTEREST_LABELS = {
  carnivores: "Carnivores",
  "flying reptiles": "Flying reptiles",
  "marine reptiles": "Marine reptiles",
  "fossils/geology": "Fossils & geology",
  "extinction science": "Extinction science",
};

const STEPS = ["Age group", "Purpose", "Interests", "Choose your guide"];

export default function Onboarding() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [options, setOptions] = useState(null);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [answers, setAnswers] = useState({
    ageGroup: "",
    purpose: "",
    interests: [],
    companionId: "",
    companionGender: "female",
    companionName: "",
  });

  useEffect(() => {
    api.get("/users/onboarding-options").then(({ data }) => setOptions(data));
  }, []);

  const toggleInterest = (interest) => {
    setAnswers((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const canAdvance = () => {
    if (step === 0) return !!answers.ageGroup;
    if (step === 1) return !!answers.purpose;
    if (step === 2) return answers.interests.length > 0;
    if (step === 3) return !!answers.companionId;
    return false;
  };

  const handleNext = () => {
    setError("");
    if (!canAdvance()) {
      setError("Pick at least one option before continuing.");
      return;
    }
    if (step < STEPS.length - 1) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const { data } = await api.put("/users/onboarding", answers);
      setUser(data);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong saving your answers.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!options) return <p className="helper-text">Loading the briefing…</p>;

  return (
    <>
      <div className="onboarding-bg" aria-hidden="true" />
      <div className="field-card" data-tag="Dig Site Briefing">
      <h2>Before you head in…</h2>
      <p className="helper-text">A few quick questions so we can point you to the right exhibits.</p>

      <div className="step-tracker">
        {STEPS.map((label, i) => (
          <span key={label} className={`step ${i === step ? "active" : i < step ? "done" : ""}`}>
            {i + 1}. {label}
          </span>
        ))}
      </div>

      {error && <div className="form-error-banner">{error}</div>}

      {step === 0 && (
        <div className="option-grid">
          {options.ageGroups.map((g) => (
            <button
              key={g}
              type="button"
              className={`option-card${answers.ageGroup === g ? " selected" : ""}`}
              onClick={() => setAnswers({ ...answers, ageGroup: g })}
            >
              <strong>{AGE_LABELS[g]?.title || g}</strong>
              <span className="helper-text">{AGE_LABELS[g]?.sub}</span>
            </button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="option-grid">
          {options.purposes.map((p) => (
            <button
              key={p}
              type="button"
              className={`option-card${answers.purpose === p ? " selected" : ""}`}
              onClick={() => setAnswers({ ...answers, purpose: p })}
            >
              <strong>{PURPOSE_LABELS[p]?.title || p}</strong>
              <span className="helper-text">{PURPOSE_LABELS[p]?.sub}</span>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="option-grid">
          {options.interests.map((i) => (
            <button
              key={i}
              type="button"
              className={`option-card${answers.interests.includes(i) ? " selected" : ""}`}
              onClick={() => toggleInterest(i)}
            >
              <strong>{INTEREST_LABELS[i] || i}</strong>
            </button>
          ))}
        </div>
      )}

      {step === 3 && (
        <>
          <CompanionPicker
            companionId={answers.companionId}
            gender={answers.companionGender}
            onChange={({ companionId, gender }) =>
              setAnswers({ ...answers, companionId, companionGender: gender })
            }
          />
          <div className="field">
            <label htmlFor="companionName">Give your guide a nickname (optional)</label>
            <input
              id="companionName"
              value={answers.companionName}
              onChange={(e) => setAnswers({ ...answers, companionName: e.target.value })}
              placeholder="e.g. Rex"
            />
          </div>
        </>
      )}

      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        {step > 0 && (
          <button className="ghost" type="button" onClick={() => setStep(step - 1)}>
            Back
          </button>
        )}
        <button className="primary" type="button" onClick={handleNext} disabled={submitting}>
          {step === STEPS.length - 1 ? (submitting ? "Saving…" : "Enter the dig site") : "Continue"}
        </button>
      </div>
    </div>
    </>
  );
}