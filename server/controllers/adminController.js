



// neww
// server/controllers/adminController.js
const User = require("../models/User");
const Discovery = require("../models/Discovery");
const ActivityLog = require("../models/ActivityLog");
const Question = require("../models/Question");
const logActivity = require("../utils/logActivity");
// @route GET /api/admin/stats
const getDashboardStats = async (req, res) => {
  try {
    const [
      userCount,
      adminCount,
      discoveryCount,
      underReview,
      verified,
      rejected,
      questionCount,
      recentLogs,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "admin" }),
      Discovery.countDocuments(),
      Discovery.countDocuments({ status: "under-review" }),
      Discovery.countDocuments({ status: "verified" }),
      Discovery.countDocuments({ status: "rejected" }),
      Question.countDocuments(),
      ActivityLog.find().sort({ createdAt: -1 }).limit(5).populate("performedBy", "username"),
    ]);

    res.json({
      success: true,
      data: {
        userCount,
        adminCount,
        discoveryCount,
        underReview,
        verified,
        rejected,
        questionCount,
        recentLogs,
      },
    });
  } catch (err) {
    console.error("[admin.getDashboardStats]", err);
    res.status(500).json({ success: false, message: "Failed to load stats" });
  }
};

// @route GET /api/admin/discoveries
const getDiscoveriesForReview = async (req, res) => {
  try {
    const { status } = req.query;

    const filter =
      !status || status === "under-review"
        ? { status: "under-review" }
        : status === "all"
        ? {}
        : { status };

    const discoveries = await Discovery.find(filter)
      .sort({ createdAt: -1 })
      .populate("user", "username")
      .populate("moderatedBy", "username");

    res.json({
      success: true,
      discoveries,
    });
  } catch (err) {
    console.error("[admin.getDiscoveriesForReview]", err);

    res.status(500).json({
      success: false,
      message: "Failed to load discoveries",
    });
  }
};

// @route GET /api/admin/users
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      users,
    });
  } catch (err) {
    console.error("[admin.getUsers]", err);

    res.status(500).json({
      success: false,
      message: "Failed to load users",
    });
  }
};

// Shared logic for approve/reject
const setDiscoveryStatus = async (req, res, newStatus) => {
  try {
    const discovery = await Discovery.findById(req.params.id);

    if (!discovery) {
      return res.status(404).json({
        success: false,
        message: "Discovery not found",
      });
    }

    const update = {
      status: newStatus,
      moderatedBy: req.user._id,
      moderatedAt: new Date(),
    };

    // Only update timeline entries if they actually exist.
    if (discovery.verificationTimeline?.[2]) {
      update["verificationTimeline.2.status"] = "completed";

      update["verificationTimeline.2.description"] =
        newStatus === "verified"
          ? "Reviewed and approved by museum admin."
          : "Reviewed and rejected by museum admin.";
    }

    if (discovery.verificationTimeline?.[3]) {
      update["verificationTimeline.3.status"] =
        newStatus === "verified" ? "completed" : "pending";
    }

    const updatedDiscovery = await Discovery.findByIdAndUpdate(
      req.params.id,
      {
        $set: update,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("user", "username")
      .populate("moderatedBy", "username");

    if (!updatedDiscovery) {
      return res.status(404).json({
        success: false,
        message: "Discovery not found",
      });
    }

    // Logging should never break the actual approval/rejection.
    await logActivity({
      action:
        newStatus === "verified"
          ? "discovery.approved"
          : "discovery.rejected",
      performedBy: req.user._id,
      targetId: updatedDiscovery._id,
      targetType: "Discovery",
      details: updatedDiscovery.fossilName,
    });

    return res.json({
      success: true,
      status: updatedDiscovery.status,
      discovery: updatedDiscovery,
    });
  } catch (err) {
    console.error(
      `[admin.setDiscoveryStatus:${newStatus}]`,
      err
    );

    console.error("Discovery update error:", {
      name: err.name,
      message: err.message,
      stack: err.stack,
    });

    return res.status(500).json({
      success: false,
      message: err.message || "Failed to update discovery",
    });
  }
};

// @route PATCH /api/admin/users/:id/role
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role.",
      });
    }

    if (
      req.params.id === req.user._id.toString() &&
      role !== "admin"
    ) {
      return res.status(400).json({
        success: false,
        message: "You can't demote your own account.",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const previousRole = user.role;

    user.role = role;

    await user.save();

    await logActivity({
      action:
        role === "admin"
          ? "user.promoted"
          : "user.demoted",
      performedBy: req.user._id,
      targetId: user._id,
      targetType: "User",
      details: `${user.username}: ${previousRole} → ${role}`,
    });

    res.json({
      success: true,
      user: user.toPublicJSON(),
    });
  } catch (err) {
    console.error("[admin.updateUserRole]", err);

    res.status(500).json({
      success: false,
      message: "Failed to update role",
    });
  }
};

// @route PATCH /api/admin/users/:id/status
const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "suspended"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    if (
      req.params.id === req.user._id.toString() &&
      status === "suspended"
    ) {
      return res.status(400).json({
        success: false,
        message: "You can't suspend your own account.",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.status = status;

    await user.save();

    await logActivity({
      action:
        status === "suspended"
          ? "user.suspended"
          : "user.unsuspended",
      performedBy: req.user._id,
      targetId: user._id,
      targetType: "User",
      details: user.username,
    });

    res.json({
      success: true,
      user: user.toPublicJSON(),
    });
  } catch (err) {
    console.error("[admin.updateUserStatus]", err);

    res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};

// @route GET /api/admin/logs
const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .populate("performedBy", "username");

    res.json({
      success: true,
      logs,
    });
  } catch (err) {
    console.error("[admin.getActivityLogs]", err);

    res.status(500).json({
      success: false,
      message: "Failed to load logs",
    });
  }
};

// @route PATCH /api/admin/discoveries/:id/approve
const approveDiscovery = (req, res) =>
  setDiscoveryStatus(req, res, "verified");

// @route PATCH /api/admin/discoveries/:id/reject
const rejectDiscovery = (req, res) =>
  setDiscoveryStatus(req, res, "rejected");
// @route GET /api/admin/questions
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ _id: -1 });
    res.json({ success: true, questions });
  } catch (err) {
    console.error("[admin.getQuestions]", err);
    res.status(500).json({ success: false, message: "Failed to load questions" });
  }
};

// @route POST /api/admin/questions
const createQuestion = async (req, res) => {
  try {
    const {
      text,
      options,
      correctIndex,
      category,
      difficulty,
      topic,
      fact,
      story,
      dinoMessage,
      xp,
      coins,
      level,
    } = req.body;

    if (!text || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Question text and at least 2 options are required.",
      });
    }

    if (
      typeof correctIndex !== "number" ||
      correctIndex < 0 ||
      correctIndex >= options.length
    ) {
      return res.status(400).json({
        success: false,
        message: "correctIndex must point to a valid option.",
      });
    }

    const question = await Question.create({
      text,
      options,
      correctIndex,
      category,
      difficulty,
      topic,
      fact,
      story,
      dinoMessage,
      xp,
      coins,
      level,
    });

    await logActivity({
      action: "quiz.question_created",
      performedBy: req.user._id,
      targetId: question._id,
      targetType: "Question",
      details: question.text.slice(0, 60),
    });

    res.status(201).json({ success: true, question });
  } catch (err) {
    console.error("[admin.createQuestion]", err);
    res.status(500).json({ success: false, message: "Failed to create question" });
  }
};

// @route PATCH /api/admin/questions/:id
const updateQuestion = async (req, res) => {
  try {
    const {
      text,
      options,
      correctIndex,
      category,
      difficulty,
      topic,
      fact,
      story,
      dinoMessage,
      xp,
      coins,
      level,
    } = req.body;

    if (options && (!Array.isArray(options) || options.length < 2)) {
      return res.status(400).json({
        success: false,
        message: "options must be an array of at least 2 items.",
      });
    }

    const optionsLength = options?.length;
    if (
      correctIndex !== undefined &&
      optionsLength !== undefined &&
      (correctIndex < 0 || correctIndex >= optionsLength)
    ) {
      return res.status(400).json({
        success: false,
        message: "correctIndex must point to a valid option.",
      });
    }

    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    Object.assign(question, {
      ...(text !== undefined && { text }),
      ...(options !== undefined && { options }),
      ...(correctIndex !== undefined && { correctIndex }),
      ...(category !== undefined && { category }),
      ...(difficulty !== undefined && { difficulty }),
      ...(topic !== undefined && { topic }),
      ...(fact !== undefined && { fact }),
      ...(story !== undefined && { story }),
      ...(dinoMessage !== undefined && { dinoMessage }),
      ...(xp !== undefined && { xp }),
      ...(coins !== undefined && { coins }),
      ...(level !== undefined && { level }),
    });

    await question.save();

    await logActivity({
      action: "quiz.question_updated",
      performedBy: req.user._id,
      targetId: question._id,
      targetType: "Question",
      details: question.text.slice(0, 60),
    });

    res.json({ success: true, question });
  } catch (err) {
    console.error("[admin.updateQuestion]", err);
    res.status(500).json({ success: false, message: "Failed to update question" });
  }
};

// @route DELETE /api/admin/questions/:id
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    await logActivity({
      action: "quiz.question_deleted",
      performedBy: req.user._id,
      targetId: question._id,
      targetType: "Question",
      details: question.text.slice(0, 60),
    });

    res.json({ success: true });
  } catch (err) {
    console.error("[admin.deleteQuestion]", err);
    res.status(500).json({ success: false, message: "Failed to delete question" });
  }
};module.exports = {
  getDashboardStats,
  getDiscoveriesForReview,
  getUsers,
  approveDiscovery,
  rejectDiscovery,
  updateUserRole,
  updateUserStatus,
  getActivityLogs,
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};