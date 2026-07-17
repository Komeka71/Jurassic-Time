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

  topic: {
    type: String,
    default: "mixed",
  },

  fact: String,
story: {
  type: String,
  default: "",
},

dinoMessage: {
  type: String,
  default: "",
},
  xp: Number,

  coins: Number,

  level: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Question", QuestionSchema);