const mongoose = require("mongoose");

const evidenceSchema = new mongoose.Schema(
  {
    filename: String,
    originalName: String,
    path: String,
    mimetype: String,
    size: Number,
  },
  { _id: false }
);

const discoverySchema = new mongoose.Schema(
  {
    archiveId: {
      type: String,
      unique: true,
    },

    fossilName: {
      type: String,
      required: true,
      trim: true,
    },
user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null,
},
    location: {
      type: String,
      required: true,
      trim: true,
    },

    latitude: Number,
    longitude: Number,

    era: {
      type: String,
      default: "Unknown",
    },

    species: {
      type: String,
      default: "Unknown",
    },

    notes: {
      type: String,
      required: true,
    },

    signature: {
      type: String,
      required: true,
    },

    evidence: [evidenceSchema],

    status: {
      type: String,
      enum: [
        "field-draft",
        "under-review",
        "verified",
        "featured",
      ],
      default: "under-review",
    },

    verifiedBy: [String],
aiVerification: {
  confidence: {
    type: Number,
    default: 0,
  },

  progress: {
    type: Number,
    default: 0,
  },

  checks: {
    speciesClassification: {
      type: Boolean,
      default: false,
    },

    imageValidation: {
      type: Boolean,
      default: false,
    },

    gpsVerified: {
      type: Boolean,
      default: false,
    },

    duplicateScan: {
      type: Boolean,
      default: false,
    },
  },

  report: {
    type: String,
    default: "",
  },
},
verificationTimeline: [
  {
    title: String,
    description: String,
    status: {
      type: String,
      enum: ["completed", "current", "pending"],
      default: "pending",
    },
    icon: String,
    color: String,
  },
],
reviewers: [
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    verdict: {
      type: String,
      enum: ["approved", "pending", "rejected"],
    },

    comment: String,

    reviewedAt: Date,
  }
],
   upvotes: {
  type: Number,
  default: 0,
  min: 0,
},

likedBy: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
],

    comments: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Discovery",
  discoverySchema
);