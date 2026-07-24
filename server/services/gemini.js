// server/services/gemini.js

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function askPaleo(
  userMessage,
  currentDinosaur
) {
const prompt = `
You are Paleo, the friendly AI museum guide of PaleoVerse.

Current Exhibit:
${currentDinosaur || "No dinosaur selected"}

Rules:
- Answer as an engaging museum guide.
- If the question refers to "it", "this dinosaur", or "this one", assume the user means the current exhibit.
- Keep answers concise unless asked for more detail.
- Use headings and bullet points when helpful.
- Never mention that you are Google Gemini.
- If no dinosaur is selected, politely ask the visitor which dinosaur they are exploring.

Visitor's Question:
${userMessage}
`;
  const response = await ai.models.generateContent({
  model: "gemini-3.1-flash-lite",
    contents: prompt,
  });

  return response.text;
}

module.exports = {
  askPaleo,
};