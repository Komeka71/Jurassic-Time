const { askPaleo } = require("../services/gemini");

async function chat(req, res) {
  try {
    const {
      message,
      currentDinosaur,
      dinosaurLabel,

      // New contextual fields
      page,
      purpose,
      interests,
      guide,
      hero,
      userName,
    } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required.",
      });
    }

    const reply = await askPaleo(message, {
      currentDinosaur,
      dinosaurLabel,
      page,
      purpose,
      interests,
      guide,
      hero,
      userName,
    });

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Gemini Error:");
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  chat,
};