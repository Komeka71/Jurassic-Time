// client/src/pages/AdminQuiz.jsx
import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";

const EMPTY_FORM = {
  text: "",
  options: ["", "", "", ""],
  correctIndex: 0,
  category: "general",
  difficulty: "easy",
  topic: "mixed",
  fact: "",
  story: "",
  dinoMessage: "",
  xp: 10,
  coins: 5,
  level: 1,
};

export default function AdminQuiz() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null); // null = closed, "new" = create form
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    api
      .get("/admin/questions")
      .then((res) => setQuestions(res.data.questions))
      .catch(() => setError("Could not load questions."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const startCreate = () => {
    setForm(EMPTY_FORM);
    setEditingId("new");
  };

  const startEdit = (q) => {
    setForm({
      text: q.text || "",
      options: q.options?.length ? q.options : ["", "", "", ""],
      correctIndex: q.correctIndex ?? 0,
      category: q.category || "general",
      difficulty: q.difficulty || "easy",
      topic: q.topic || "mixed",
      fact: q.fact || "",
      story: q.story || "",
      dinoMessage: q.dinoMessage || "",
      xp: q.xp ?? 10,
      coins: q.coins ?? 5,
      level: q.level ?? 1,
    });
    setEditingId(q._id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const updateOption = (i, value) => {
    const next = [...form.options];
    next[i] = value;
    setForm({ ...form, options: next });
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...form,
        options: form.options.filter((o) => o.trim() !== ""),
        correctIndex: Number(form.correctIndex),
        xp: Number(form.xp),
        coins: Number(form.coins),
        level: Number(form.level),
      };

      if (editingId === "new") {
        await api.post("/admin/questions", payload);
      } else {
        await api.patch(`/admin/questions/${editingId}`, payload);
      }

      cancelEdit();
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this question permanently?")) return;
    try {
      await api.delete(`/admin/questions/${id}`);
      load();
    } catch {
      setError("Delete failed.");
    }
  };

  return (
    <div className="space-y-4 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-green-50">Quiz Manager</h1>
        {editingId === null && (
          <button
            onClick={startCreate}
            className="text-sm px-3 py-1.5 rounded-md bg-lime-400/10 border border-lime-400/30 text-lime-400 hover:bg-lime-400/20 transition-colors"
          >
            + Add question
          </button>
        )}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {editingId !== null && (
        <div className="rounded-lg border border-emerald-900 bg-emerald-950 p-5 space-y-4">
          <h2 className="text-sm font-medium text-emerald-300">
            {editingId === "new" ? "New question" : "Edit question"}
          </h2>

          <div>
            <label className="block text-xs text-emerald-400 mb-1">Question text</label>
            <textarea
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              rows={2}
              className="w-full rounded-md bg-green-950 border border-emerald-800 px-3 py-2 text-sm text-green-50"
            />
          </div>

          <div>
            <label className="block text-xs text-emerald-400 mb-1">
              Options (mark the correct one)
            </label>
            <div className="space-y-2">
              {form.options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="correctIndex"
                    checked={Number(form.correctIndex) === i}
                    onChange={() => setForm({ ...form, correctIndex: i })}
                    className="accent-lime-500"
                  />
                  <input
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                    placeholder={`Option ${i + 1}`}
                    className="flex-1 rounded-md bg-green-950 border border-emerald-800 px-3 py-1.5 text-sm text-green-50"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-emerald-400 mb-1">Category</label>
              <input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-md bg-green-950 border border-emerald-800 px-3 py-1.5 text-sm text-green-50"
              />
            </div>
            <div>
              <label className="block text-xs text-emerald-400 mb-1">Difficulty</label>
              <select
                value={form.difficulty}
                onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                className="w-full rounded-md bg-green-950 border border-emerald-800 px-3 py-1.5 text-sm text-green-50"
              >
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-emerald-400 mb-1">Topic</label>
              <input
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="w-full rounded-md bg-green-950 border border-emerald-800 px-3 py-1.5 text-sm text-green-50"
              />
            </div>
            <div>
              <label className="block text-xs text-emerald-400 mb-1">Level</label>
              <input
                type="number"
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                className="w-full rounded-md bg-green-950 border border-emerald-800 px-3 py-1.5 text-sm text-green-50"
              />
            </div>
            <div>
              <label className="block text-xs text-emerald-400 mb-1">XP</label>
              <input
                type="number"
                value={form.xp}
                onChange={(e) => setForm({ ...form, xp: e.target.value })}
                className="w-full rounded-md bg-green-950 border border-emerald-800 px-3 py-1.5 text-sm text-green-50"
              />
            </div>
            <div>
              <label className="block text-xs text-emerald-400 mb-1">Coins</label>
              <input
                type="number"
                value={form.coins}
                onChange={(e) => setForm({ ...form, coins: e.target.value })}
                className="w-full rounded-md bg-green-950 border border-emerald-800 px-3 py-1.5 text-sm text-green-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-emerald-400 mb-1">Fun fact (shown after answering)</label>
            <textarea
              value={form.fact}
              onChange={(e) => setForm({ ...form, fact: e.target.value })}
              rows={2}
              className="w-full rounded-md bg-green-950 border border-emerald-800 px-3 py-2 text-sm text-green-50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-emerald-400 mb-1">Story text (optional)</label>
              <textarea
                value={form.story}
                onChange={(e) => setForm({ ...form, story: e.target.value })}
                rows={2}
                className="w-full rounded-md bg-green-950 border border-emerald-800 px-3 py-2 text-sm text-green-50"
              />
            </div>
            <div>
              <label className="block text-xs text-emerald-400 mb-1">Dino message (optional)</label>
              <textarea
                value={form.dinoMessage}
                onChange={(e) => setForm({ ...form, dinoMessage: e.target.value })}
                rows={2}
                className="w-full rounded-md bg-green-950 border border-emerald-800 px-3 py-2 text-sm text-green-50"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              disabled={saving}
              onClick={save}
              className="text-sm px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              onClick={cancelEdit}
              className="text-sm px-4 py-2 rounded-md border border-emerald-800 text-emerald-300 hover:bg-emerald-900"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading && <p className="text-emerald-400 text-sm">Loading…</p>}

      {!loading && (
        <div className="space-y-3">
          {questions.map((q) => (
            <div
              key={q._id}
              className="rounded-lg border border-emerald-900 bg-emerald-950 p-4 flex items-start justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="text-sm text-green-50">{q.text}</p>
                <p className="text-xs text-emerald-500 mt-1">
                  {q.difficulty} · {q.topic} · level {q.level} · {q.xp} xp
                </p>
                <p className="text-xs text-lime-400 mt-1">
                  ✓ {q.options?.[q.correctIndex]}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEdit(q)}
                  className="text-xs px-2.5 py-1 rounded-md border border-emerald-800 text-emerald-300 hover:bg-emerald-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(q._id)}
                  className="text-xs px-2.5 py-1 rounded-md border border-red-400/30 text-red-400 hover:bg-red-400/10"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {questions.length === 0 && (
            <p className="text-emerald-500 text-sm">No questions yet.</p>
          )}
        </div>
      )}
    </div>
  );
}