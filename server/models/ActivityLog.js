// server/models/ActivityLog.js
const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: [
        "discovery.approved",
        "discovery.rejected",
        "user.promoted",
        "user.demoted",
        "user.suspended",
        "user.unsuspended",
      ],
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    targetType: {
      type: String,
      enum: ["Discovery", "User"],
      required: true,
    },
    details: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityLog", activityLogSchema);