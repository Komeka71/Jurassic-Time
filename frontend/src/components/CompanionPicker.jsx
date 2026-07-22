import companions from "../data/companions";

// Controlled component: parent owns the { companionId, gender } state.
export default function CompanionPicker({ companionId, gender, onChange }) {
  return (
    <div>
      <div className="companion-grid">
        {companions.map((c) => {
          const selected = companionId === c.id;
          return (
            <div
              key={c.id}
              className={`companion-card${selected ? " selected" : ""}`}
              onClick={() => onChange({ companionId: c.id, gender: gender || "female" })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onChange({ companionId: c.id, gender: gender || "female" })}
            >
              <span className="companion-emoji">{c.emoji[gender || "female"]}</span>
              <strong style={{ display: "block", marginTop: 6, fontFamily: "var(--font-display)" }}>
                {c.label}
              </strong>
              <span className="helper-text">{c.tagline}</span>

              {selected && (
                <div className="skin-toggle" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className={gender === "female" ? "active" : ""}
                    onClick={() => onChange({ companionId: c.id, gender: "female" })}
                  >
                    Female
                  </button>
                  <button
                    type="button"
                    className={gender === "male" ? "active" : ""}
                    onClick={() => onChange({ companionId: c.id, gender: "male" })}
                  >
                    Male
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
