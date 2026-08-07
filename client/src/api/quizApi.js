const BASE_URL = import.meta.env.VITE_API_URL;

export async function getQuestions(
  level,
  difficulty,
  topic,
  questionCount
) {
  const url =
    `${BASE_URL}/questions` +
    `?level=${level}` +
    `&difficulty=${difficulty}` +
    `&topic=${topic}` +
    `&limit=${questionCount}`;

  console.log("================================");
  console.log("FETCHING URL:", url);
  console.log("level:", level);
  console.log("difficulty:", difficulty);
  console.log("topic:", topic);
  console.log("questionCount:", questionCount);
  console.log("================================");

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch questions");
  }

  const data = await res.json();

  console.log("RAW RESPONSE:", data);

  return data.map((q, index) => ({
    id: index + 1,
    expedition: `🌿 Expedition ${index + 1}`,
    question: q.text,
    text: q.text,
    options: q.options,
    answer: q.correctIndex,
    fact: q.fact,
    story: q.story,
    dinoMessage: q.dinoMessage,
    difficulty: q.difficulty,
    topic: q.topic,
    level: q.level,
    xp: q.xp || 20,
    coins: q.coins || 10,
  }));
}