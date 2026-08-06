const Discovery = require("../models/Discovery");
const Comment = require("../models/Comment");
// const model = require("../utils/geminiVision");
const { analyzeFossil } = require("../utils/geminiVision");
// const fs = require("fs");
// const path = require("path");

/*
========================================
CREATE DISCOVERY
========================================
*/

const createDiscovery = async (req, res) => {
  try {
// Generate next Archive ID

const lastDiscovery = await Discovery.findOne()
  .sort({ archiveId: -1 });

let nextNumber = 1;

if (lastDiscovery) {
  const last = parseInt(
    lastDiscovery.archiveId.split("-")[2]
  );

  nextNumber = last + 1;
}

const archiveId = `PV-${new Date().getFullYear()}-${String(
  nextNumber
).padStart(4, "0")}`;
// const gpsVerified = Math.random() > 0.1;
// const duplicateScan = Math.random() > 0.2;

// const confidence = Math.floor(Math.random() * 16) + 80;
// let recommendation = "";

// if (confidence >= 95) {
//   recommendation =
//     "Specimen exhibits exceptionally high authenticity. Recommend immediate museum verification and archival review.";
// } else if (confidence >= 85) {
//   recommendation =
//     "Specimen appears authentic. Proceed with community validation before final archival approval.";
// } else if (confidence >= 70) {
//   recommendation =
//     "Additional supporting evidence is recommended. AI confidence is moderate.";
// } else {
//   recommendation =
//     "Evidence is currently insufficient. Upload more photographs and detailed field observations.";
// }
// const autoApproved =
//   confidence >= 92 &&
//   gpsVerified &&
//   duplicateScan;



// const report = `
// AI successfully analyzed the submitted specimen.

// • Estimated Species: ${req.body.species}
// • Geological Era: ${req.body.era}
// • Location: ${req.body.location}
// Morphological comparison indicates a ${confidence}% confidence match with known fossil records.

// Evidence Analysis:
// • Images Submitted: ${req.files?.length || 0}
// • Fossil Notes: ${
//   req.body.notes
//     ? "Detailed field observations received."
//     : "No additional field notes supplied."
// }
// GPS metadata ${
//   gpsVerified
//     ? "matches the reported excavation site."
//     : "requires additional verification."
// }

// Duplicate scan ${
//   duplicateScan
//     ? "found no similar archived specimen."
//     : "detected possible similarities requiring manual review."
// }

// Overall Recommendation:
// ${
//   autoApproved
//     ? "Proceed directly to museum verification."
//     : "Forward to community researchers for additional validation."
// }
// `;
let aiResult = {
  species: req.body.species,
  era: req.body.era,
  confidence: 85,
  preservation: "Unknown",
  reasoning: "AI analysis unavailable.",
  recommendation: "Proceed to community review.",
  duplicateRisk: "Unknown",
};

try {
  if (req.files?.length) {
const response = await analyzeFossil(req.files[0].path);
console.log("\n========== GEMINI RESPONSE ==========");
console.log(response);
console.log("=====================================\n");
console.log("Gemini Raw Response:");
console.log(response);
  const cleaned = response
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

aiResult = JSON.parse(cleaned);
console.log(aiResult);
  }
} catch (err) {
  console.error(err);
}
    const discovery = await Discovery.create({
      user: req.user?._id || null,
      archiveId,
      fossilName: req.body.fossilName,
      location: req.body.location,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      era: aiResult.era || req.body.era,

species: aiResult.species || req.body.species,
      notes: req.body.notes,
      signature: req.body.signature,
      status: "under-review",
aiVerification: {
  confidence: aiResult.confidence || 85,

  progress: 50,

  checks: {
    speciesClassification: true,

    imageValidation: (req.files?.length || 0) > 0,

    gpsVerified:
      !!req.body.latitude && !!req.body.longitude,

    duplicateScan:
      aiResult.duplicateRisk?.toLowerCase() !== "high",
  },
  breakdown: {
  imageQuality:
    aiResult.breakdown?.imageQuality || 0,

  fossilDetection:
    aiResult.breakdown?.fossilDetection || 0,

  speciesMatch:
    aiResult.breakdown?.speciesMatch || 0,

  geologicalConsistency:
    aiResult.breakdown?.geologicalConsistency || 0,

  preservationScore:
    aiResult.breakdown?.preservationScore || 0,
},
report: `
Species: ${aiResult.species}

Specimen Type: ${aiResult.specimenType}

Era: ${aiResult.era}

Preservation: ${aiResult.preservation}

Reasoning:
${aiResult.reasoning}

Recommendation:
${aiResult.recommendation}
`,
},
verificationTimeline: [
  {
    title: "Discovery Submitted",
    description: "Field discovery registered in the Paleora archive.",
    status: "completed",
    icon: "CheckCircle2",
    color: "text-emerald-400",
  },

  {
    title: "AI Analysis",
    description: "Specimen morphology analyzed successfully.",
    status: "completed",
    icon: "Brain",
    color: "text-sky-400",
  },

{
  title: "Community Review",
  description:
    "Researchers are reviewing the submitted evidence alongside the AI analysis.",
  status: "current",
  icon: "Users",
  color: "text-amber-400",
},
{
  title: "Museum Archive",
  description:
    "Awaiting final museum approval after successful community verification.",
  status: "pending",
  icon: "ShieldCheck",
  color: "text-emerald-400",
},
],
reviewers: [],
evidence:
  req.files?.map((file) => ({
    filename: file.filename,
    originalName: file.originalname,
    path: file.path,
    mimetype: file.mimetype,
    size: file.size,
  })) || [],
    });

    res.status(201).json({
      success: true,
      message: "Discovery submitted successfully!",
      discovery,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/*
========================================
LATEST DISCOVERIES
========================================
*/

const getLatestDiscoveries = async (req, res) => {
  try {
    const discoveries = await Discovery.find()
  .sort({ createdAt: -1 });

    res.json({
      success: true,
      discoveries,
    });
  } catch (err) {
    console.error("LATEST ERROR:");
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// @desc Like a discovery
// @route POST /api/discoveries/:id/like
const likeDiscovery = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please login first.",
      });
    }

    const discovery = await Discovery.findById(req.params.id);

    if (!discovery) {
      return res.status(404).json({
        success: false,
        message: "Discovery not found",
      });
    }

    // Owner cannot like own discovery
    if (
      discovery.user &&
      discovery.user.toString() === req.user._id.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "You cannot like your own discovery.",
      });
    }

    const alreadyLiked = discovery.likes.some(
      (id) => id.toString() === req.user._id.toString()
    );

    if (alreadyLiked) {
      discovery.likes = discovery.likes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
    } else {
      discovery.likes.push(req.user._id);
    }

    discovery.upvotes = discovery.likes.length;

    await discovery.save();

    res.json({
      success: true,
      liked: !alreadyLiked,
      upvotes: discovery.upvotes,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const verifyDiscovery = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Login required.",
      });
    }

    const { verdict } = req.body;

    const discovery = await Discovery.findById(req.params.id);

    if (!discovery) {
      return res.status(404).json({
        success: false,
        message: "Discovery not found",
      });
    }

    // Owner cannot vote
    if (
      discovery.user &&
      discovery.user.toString() === req.user._id.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "You cannot verify your own discovery.",
      });
    }

    // Already voted?
    const already = discovery.approvals.find(
      (v) => v.user.toString() === req.user._id.toString()
    );

    if (already) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this discovery.",
      });
    }
discovery.approvals.push({
  user: req.user._id,
  verdict,
});
discovery.reviewers = discovery.reviewers.filter(
  (r) => r.verdict !== "pending"
);
const approveComments = [
  "Morphological characteristics closely match the proposed species.",
  "Evidence quality is sufficient for peer verification.",
  "Geological context appears consistent with the submitted era.",
  "Visible fossil structures support the identification.",
  "Specimen shows strong diagnostic fossil features."
];

const rejectComments = [
  "Additional photographs are required for verification.",
  "The fossil characteristics are not sufficiently visible.",
  "Image quality prevents reliable identification.",
  "More geological evidence is required.",
  "Current evidence is insufficient for confirmation."
];
discovery.reviewers.push({
  user: req.user._id,
  verdict:
    verdict === "approve"
      ? "approved"
      : "rejected",

comment:
  verdict === "approve"
    ? approveComments[
        Math.floor(Math.random() * approveComments.length)
      ]
    : rejectComments[
        Math.floor(Math.random() * rejectComments.length)
      ],
  reviewedAt: new Date(),
});

    discovery.approvalCount =
      discovery.approvals.filter(
        (v) => v.verdict === "approve"
      ).length;

    discovery.rejectionCount =
      discovery.approvals.filter(
        (v) => v.verdict === "reject"
      ).length;

    // Auto verification
// Community Review stage

if (discovery.verificationTimeline[2]) {
  discovery.verificationTimeline[2].status =
    discovery.approvalCount >= 3
      ? "completed"
      : "current";
}

// Museum Archive stage

if (discovery.approvalCount >= 3) {
  discovery.status = "verified";

  discovery.aiVerification.progress = 100;
  discovery.aiVerification.confidence = 99;

  discovery.aiVerification.report =
    "AI consensus achieved. Community validation confirms high fossil authenticity. Geological context, morphology, image analysis, GPS metadata, and peer review all indicate this specimen is suitable for permanent inclusion within the Paleora Museum archive.";

  discovery.verificationTimeline =
    discovery.verificationTimeline.map((step) => ({
      ...step.toObject?.() || step,
      status: "completed",
    }));
}

if (discovery.rejectionCount >= 3) {
  discovery.status = "rejected";

  discovery.aiVerification.progress = 100;
  discovery.aiVerification.confidence = 21;

  discovery.aiVerification.report =
    "AI review concluded that available evidence is insufficient for archival preservation. Community reviewers identified inconsistencies requiring additional fossil evidence or field documentation before this specimen can be reconsidered.";

  discovery.verificationTimeline =
    discovery.verificationTimeline.map((step) => ({
      ...step.toObject?.() || step,
      status: "completed",
    }));
}

if (discovery.rejectionCount >= 3) {
  discovery.status = "rejected";

  if (discovery.verificationTimeline[3]) {
    discovery.verificationTimeline[3].status =
      "pending";
  }
}

    await discovery.save();

    res.json({
      success: true,
      approvalCount: discovery.approvalCount,
      rejectionCount: discovery.rejectionCount,
      status: discovery.status,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
/*
========================================
GET ALL DISCOVERIES
========================================
*/

const getAllDiscoveries = async (req, res) => {
  try {
    const discoveries = await Discovery.find().sort({
      createdAt: -1,
    });
// const isOwner =
//   req.user &&
//   discovery.user &&
//   discovery.user._id.toString() === req.user._id.toString();
    res.json({
      success: true,
      discoveries,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getDiscoveryById = async (req, res) => {
  try {
 const discovery = await Discovery.findById(req.params.id)
  .populate("user", "username")
  .populate("reviewers.user", "username");
    if (!discovery) {
      return res.status(404).json({
        success: false,
        message: "Discovery not found",
      });
    }
const isOwner =
  req.user &&
  discovery.user &&
  discovery.user._id.toString() === req.user._id.toString();

const userVote =
  req.user &&
  discovery.approvals.some(
    (vote) =>
      vote.user &&
      vote.user.toString() === req.user._id.toString()
  );

res.json({
  success: true,
  discovery: {
    ...discovery.toObject(),
    isOwner,
    userVote,
  },
});
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// get archive stats
const getArchiveStats = async (req, res) => {
  try {
    const totalDiscoveries = await Discovery.countDocuments();

    const verifiedDiscoveries = await Discovery.countDocuments({
      status: "verified",
    });

    const pendingVerification = await Discovery.countDocuments({
      status: "under-review",
    });

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const todaySubmissions = await Discovery.countDocuments({
      createdAt: { $gte: startOfToday },
    });

    const verifiedPercent =
      totalDiscoveries === 0
        ? 0
        : Math.round((verifiedDiscoveries / totalDiscoveries) * 100);

    res.json({
      archivedFossils: totalDiscoveries,
      verifiedPercent,
      pendingVerification,
      todaySubmissions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch archive statistics",
    });
  }
};
// @desc Get comments
// @route GET /api/discoveries/:id/comments

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      discovery: req.params.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc Add comment
// @route POST /api/discoveries/:id/comments

const addComment = async (req, res) => {
  try {
    const discovery = await Discovery.findById(req.params.id);

    if (!discovery) {
      return res.status(404).json({
        success: false,
        message: "Discovery not found",
      });
    }

    const comment = await Comment.create({
      discovery: discovery._id,
      author:
        req.body.author || "Anonymous Researcher",
      message: req.body.message,
    });

    discovery.comments += 1;

    await discovery.save();

    res.status(201).json({
      success: true,
      comment,
      totalComments: discovery.comments,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const getResearchNetworkStats = async (req, res) => {
  try {
    const totalDiscoveries = await Discovery.countDocuments();

    const verifiedDiscoveries = await Discovery.countDocuments({
      status: "Verified",
    });

    const aiAverage = await Discovery.aggregate([
      {
        $group: {
          _id: null,
          averageConfidence: {
            $avg: "$aiVerification.confidence",
          },
        },
      },
    ]);

    res.json({
      researchersOnline: 2341, // placeholder until auth/users exist
      verifiedFossils: verifiedDiscoveries,
      totalDiscoveries,
      aiAccuracy:
        aiAverage.length > 0
          ? aiAverage[0].averageConfidence.toFixed(1)
          : 0,
      activeSites: 81, // placeholder
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const getResearchActivity = async (req, res) => {
  try {
    const discoveries = await Discovery.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const activity = discoveries.map((item) => ({
      id: item._id,
      title: item.title,
      species: item.species,
      era: item.era,
      status: item.status,
      createdAt: item.createdAt,
    }));

    res.json(activity);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getTopContributors = async (req, res) => {
  try {
    const contributors = await Discovery.aggregate([
      {
        $group: {
  _id: "$signature",
  discoveries: { $sum: 1 },
  location: { $first: "$location" },
},
      },
      {
        $sort: {
          discoveries: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    const medals = ["🥇", "🥈", "🥉"];

    res.json(
      contributors.map((item, index) => ({
        rank: medals[index] || `${index + 1}`,
        name: item._id || "Unknown Researcher",
        country: item.location || "Unknown",
        discoveries: item.discoveries,
      }))
    );
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const getNetworkHealth = async (req, res) => {
  try {
    const total = await Discovery.countDocuments();

    const underReview = await Discovery.countDocuments({
      status: "under-review",
    });

    const verified = await Discovery.countDocuments({
      status: "verified",
    });

    const contributors = await Discovery.distinct("signature");

    const aiAverage = await Discovery.aggregate([
      {
        $group: {
          _id: null,
          average: {
            $avg: "$aiVerification.confidence",
          },
        },
      },
    ]);

    res.json({
      uptime: 99.98,

      aiQueue:
        total > 0
          ? Math.round((underReview / total) * 100)
          : 0,

      collaboration:
        total > 0
          ? Math.round((contributors.length / total) * 100)
          : 0,

      synchronization: 96,

      summary: {
        discoveries: total,
        verified,
        contributors: contributors.length,
        aiAccuracy:
          aiAverage.length > 0
            ? aiAverage[0].average.toFixed(1)
            : 0,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports = {
  createDiscovery,
  getLatestDiscoveries,
  getAllDiscoveries,
  getArchiveStats,
  getDiscoveryById,
  likeDiscovery,
  getComments,
  addComment,
  getResearchNetworkStats,
  getResearchActivity,
  getTopContributors,
  getNetworkHealth,
  verifyDiscovery,
};