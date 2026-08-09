const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  const models = await ai.models.list();

  for await (const model of models) {
    if (
      model.supportedActions &&
      model.supportedActions.includes("generateContent")
    ) {
      console.log(model.name);
    }
  }
}

main();