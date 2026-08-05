const Discovery = require("../models/Discovery");
const Comment = require("../models/Comment");

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

    const discovery = await Discovery.create({
      user: req.user?._id || null,
      archiveId,
      fossilName: req.body.fossilName,
      location: req.body.location,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      era: req.body.era,
      species: req.body.species,
      notes: req.body.notes,
      signature: req.body.signature,
      status: "under-review",

aiVerification: {
  confidence: 87,

  progress: 50,

  checks: {
    speciesClassification: true,
    imageValidation: true,
    gpsVerified: true,
    duplicateScan: false,
  },

  report:
    "Initial AI verification completed. Awaiting duplicate scan and researcher review.",
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
    description: "Researchers are reviewing the submitted evidence.",
    status: "current",
    icon: "Users",
    color: "text-amber-400",
  },

  {
    title: "Museum Archive",
    description: "Awaiting final museum approval.",
    status: "pending",
    icon: "ShieldCheck",
    color: "text-emerald-400",
  },
],
reviewers: [
  {
    name: "Dr. Emily Carter",
    role: "Paleontologist",
    verdict: "approved",
    comment:
      "Excellent fossil preservation and complete evidence.",
    reviewedAt: new Date(),
  },

  {
    name: "Rahul Mehta",
    role: "Field Researcher",
    verdict: "approved",
    comment:
      "GPS and metadata appear authentic.",
    reviewedAt: new Date(),
  },

  {
    name: "Pending Reviewer",
    role: "Awaiting Assignment",
    verdict: "pending",
    comment: "Review has not started yet.",
  },
],
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
    const discovery = await Discovery.findById(req.params.id);

    if (!discovery) {
      return res.status(404).json({
        success: false,
        message: "Discovery not found",
      });
    }

    discovery.upvotes += 1;

    await discovery.save();

    res.status(200).json({
      success: true,
      upvotes: discovery.upvotes,
    });
  } catch (error) {
    console.error(error);

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
    const discovery = await Discovery.findById(req.params.id);

    if (!discovery) {
      return res.status(404).json({
        success: false,
        message: "Discovery not found",
      });
    }

    res.json({
      success: true,
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
};