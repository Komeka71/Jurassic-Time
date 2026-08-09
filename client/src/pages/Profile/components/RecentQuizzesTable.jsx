import React from "react";

export default function RecentQuizzesTable({ quizzes = [] }) {
  return (
    <div>
      <div className="jt-section-heading">
        <span className="jt-section-title">Recent Quizzes</span>
      </div>
      <div className="jt-card jt-table-wrap" style={{ padding: 8 }}>
        <table className="jt-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Difficulty</th>
              <th>Topic</th>
              <th>Accuracy</th>
              <th>XP</th>
              <th>Coins</th>
              <th>Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((q, i) => (
              <tr key={q.id ?? i}>
                <td>{new Date(q.date).toLocaleDateString()}</td>
                <td>{q.difficulty}</td>
                <td>{q.topic}</td>
                <td>{q.accuracy}%</td>
                <td style={{ color: "var(--jt-amber-2)" }}>+{q.xpEarned}</td>
                <td style={{ color: "var(--jt-teal)" }}>+{q.coinsEarned}</td>
                <td>{q.timeTaken}</td>
                <td><button className="jt-btn-ghost" style={{ fontSize: 12, padding: "6px 10px" }}>View</button></td>
              </tr>
            ))}
            {quizzes.length === 0 && (
              <tr><td colSpan={8} style={{ textAlign: "center", color: "var(--jt-cream-dim)", padding: 24 }}>No quizzes yet — go take one!</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
