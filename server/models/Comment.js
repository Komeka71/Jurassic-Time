const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    discovery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discovery",
      required: true,
    },

    author: {
      type: String,
      default: "Anonymous Researcher",
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Comment",
  commentSchema
);