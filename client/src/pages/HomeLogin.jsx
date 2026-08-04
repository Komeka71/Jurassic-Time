import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Placeholder — the real homepage feed (reordered by preferences) belongs
// to whoever owns content/species listings on the team.
export default function Home() {
  const { user } = useAuth();

  return (
    <div className="field-card" data-tag="Camp HQ">
      <h2>{user ? `Welcome back, ${user.username}` : "Welcome to Paleora"}</h2>
      <p className="helper-text">
        {user
          ? "This is where the species feed, quizzes, and virtual tour will live."
          : "Sign up to save your progress and pick a dino guide."}
      </p>
      {!user && (
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <Link to="/signup"><button className="primary">Sign up</button></Link>
          <Link to="/login"><button className="ghost">Log in</button></Link>
        </div>
      )}
    </div>
  );
}