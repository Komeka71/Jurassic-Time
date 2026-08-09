const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctIndex: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    default: "general",
  },
  difficulty: {
    type: String,
    default: "easy",
  },
});

module.exports = mongoose.model("Question", QuestionSchema);