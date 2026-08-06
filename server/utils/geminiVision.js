const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_VISION_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-3.1-flash-lite",
});

async function analyzeFossil(imagePath) {
  const image = {
    inlineData: {
      data: fs.readFileSync(imagePath).toString("base64"),
      mimeType: "image/jpeg",
    },
  };

const prompt = `
You are a world-class paleontologist and fossil authentication expert working for the Paleora Natural History Museum.

Analyze ONLY what is visible in the uploaded image.

Never invent facts.
If uncertain, explicitly state that you are uncertain.

Determine whether the uploaded image is:

- an authentic fossil
- a museum display
- a reconstructed skeleton
- a fossil cast
- a replica
- artwork
- CGI render
- AI-generated image
- toy/model
- or unrelated to paleontology.

If the specimen appears to be a museum cast or reconstruction rather than an original fossil, explicitly mention this in the reasoning and reduce confidence accordingly.

Evaluate:

1. Most likely specimen.
2. Scientific species name.
3. Geological era.
4. Preservation quality.
5. Whether this appears to be a genuine fossil.
6. Whether the image quality is sufficient.
7. Whether the image shows signs of editing, AI generation, or manipulation.
8. Duplicate risk compared with known fossil discoveries.
9. Overall confidence (0-100).

Confidence should be based on:

- image quality
- visibility of diagnostic fossil features
- preservation quality
- certainty of identification
- geological plausibility
- whether the image depicts an original fossil or merely a reconstruction/cast

Recommendation must be exactly one of:

- Accept for community review
- Needs additional evidence
- Reject submission
The breakdown values must each be integers between 0 and 100.

They should be determined independently.

For example:

- imageQuality = based only on image clarity
- fossilDetection = confidence that a fossil is actually visible
- speciesMatch = confidence of taxonomic identification
- geologicalConsistency = whether the specimen agrees with the proposed era
- preservationScore = preservation and completeness

Overall confidence should NOT simply be the average.
It should represent your final professional assessment after considering every factor.
Return ONLY valid JSON.

{
  "species": "",
  "specimenType": "",
  "confidence": 0,
  "era": "",
  "preservation": "",
  "reasoning": "",
  "recommendation": "",
  "duplicateRisk": "",
  "containsFossil": true,
  "imageQuality": "Excellent",

  "breakdown": {
    "imageQuality": 0,
    "fossilDetection": 0,
    "speciesMatch": 0,
    "geologicalConsistency": 0,
    "preservationScore": 0
  }
}
`;
  const result = await model.generateContent([
    prompt,
    image,
  ]);

  return result.response.text();
}

module.exports = {
  analyzeFossil,
};