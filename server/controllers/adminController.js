// // server/controllers/adminController.js
// const User = require("../models/User");
// const Discovery = require("../models/Discovery");
// const logActivity = require("../utils/logActivity");



// // @route GET /api/admin/stats
// const getDashboardStats = async (req, res) => {
//   try {
//     const [userCount, adminCount, discoveryCount, underReview, verified] =
//       await Promise.all([
//         User.countDocuments(),
//         User.countDocuments({ role: "admin" }),
//         Discovery.countDocuments(),
//         Discovery.countDocuments({ status: "under-review" }),
//         Discovery.countDocuments({ status: "verified" }),
//       ]);

//     res.json({
//       success: true,
//       data: { userCount, adminCount, discoveryCount, underReview, verified },
//     });
//   } catch (err) {
//     console.error("[admin.getDashboardStats]", err);
//     res.status(500).json({ success: false, message: "Failed to load stats" });
//   }
// };

// // @route GET /api/admin/discoveries?status=under-review|verified|rejected|all
// const getDiscoveriesForReview = async (req, res) => {
//   try {
//     const { status } = req.query;
//     const filter =
//       !status || status === "under-review"
//         ? { status: "under-review" }
//         : status === "all"
//         ? {}
//         : { status };

//     const discoveries = await Discovery.find(filter)
//       .sort({ createdAt: -1 })
//       .populate("user", "username")
//       .populate("moderatedBy", "username");

//     res.json({ success: true, discoveries });
//   } catch (err) {
//     console.error("[admin.getDiscoveriesForReview]", err);
//     res.status(500).json({ success: false, message: "Failed to load discoveries" });
//   }
// };

// // Shared logic behind both approve and reject
// const setDiscoveryStatus = async (req, res, newStatus) => {
//   try {
//     const discovery = await Discovery.findById(req.params.id);
//     if (!discovery) {
//       return res.status(404).json({ success: false, message: "Discovery not found" });
//     }

//     discovery.status = newStatus;
//     discovery.moderatedBy = req.user._id;
//     discovery.moderatedAt = new Date();

//     if (discovery.verificationTimeline?.[2]) {
//       discovery.verificationTimeline[2].status = "completed";
//       discovery.verificationTimeline[2].description =
//         newStatus === "verified"
//           ? "Reviewed and approved by museum admin."
//           : "Reviewed and rejected by museum admin.";
//     }
//     if (discovery.verificationTimeline?.[3]) {
//       discovery.verificationTimeline[3].status =
//         newStatus === "verified" ? "completed" : "pending";
//     }

//     await discovery.save();

//     await logActivity({
//       action: newStatus === "verified" ? "discovery.approved" : "discovery.rejected",
//       performedBy: req.user._id,
//       targetId: discovery._id,
//       targetType: "Discovery",
//       details: discovery.fossilName,
//     });

//     res.json({ success: true, status: discovery.status });
//   } catch (err) {
//     console.error(`[admin.setDiscoveryStatus:${newStatus}]`, err);
//     res.status(500).json({ success: false, message: "Failed to update discovery" });
//   }
// };
// const updateUserRole = async (req, res) => {
//   try {
//     const { role } = req.body;
//     if (!["user", "admin"].includes(role)) {
//       return res.status(400).json({ success: false, message: "Invalid role." });
//     }

//     if (req.params.id === req.user._id.toString() && role !== "admin") {
//       return res
//         .status(400)
//         .json({ success: false, message: "You can't demote your own account." });
//     }

//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     const previousRole = user.role;
//     user.role = role;
//     await user.save();

//     await logActivity({
//       action: role === "admin" ? "user.promoted" : "user.demoted",
//       performedBy: req.user._id,
//       targetId: user._id,
//       targetType: "User",
//       details: `${user.username}: ${previousRole} → ${role}`,
//     });

//     res.json({ success: true, user: user.toPublicJSON() });
//   } catch (err) {
//     console.error("[admin.updateUserRole]", err);
//     res.status(500).json({ success: false, message: "Failed to update role" });
//   }
// };
// const updateUserStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     if (!["active", "suspended"].includes(status)) {
//       return res.status(400).json({ success: false, message: "Invalid status." });
//     }

//     if (req.params.id === req.user._id.toString() && status === "suspended") {
//       return res
//         .status(400)
//         .json({ success: false, message: "You can't suspend your own account." });
//     }

//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     user.status = status;
//     await user.save();

//     await logActivity({
//       action: status === "suspended" ? "user.suspended" : "user.unsuspended",
//       performedBy: req.user._id,
//       targetId: user._id,
//       targetType: "User",
//       details: user.username,
//     });

//     res.json({ success: true, user: user.toPublicJSON() });
//   } catch (err) {
//     console.error("[admin.updateUserStatus]", err);
//     res.status(500).json({ success: false, message: "Failed to update status" });
//   }
// };
// // @route PATCH /api/admin/discoveries/:id/approve
// const approveDiscovery = (req, res) => setDiscoveryStatus(req, res, "verified");

// // @route PATCH /api/admin/discoveries/:id/reject
// const rejectDiscovery = (req, res) => setDiscoveryStatus(req, res, "rejected");

// module.exports = {
//   getDashboardStats,
//   getDiscoveriesForReview,
//   approveDiscovery,
//   rejectDiscovery,
// };



// server/controllers/adminController.js

const User = require("../models/User");
const Discovery = require("../models/Discovery");
const ActivityLog = require("../models/ActivityLog");
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
      recentLogs,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "admin" }),
      Discovery.countDocuments(),
      Discovery.countDocuments({ status: "under-review" }),
      Discovery.countDocuments({ status: "verified" }),
      ActivityLog.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("performedBy", "username"),
    ]);

    res.json({
      success: true,
      data: {
        userCount,
        adminCount,
        discoveryCount,
        underReview,
        verified,
        recentLogs,
      },
    });
  } catch (err) {
    console.error("[admin.getDashboardStats]", err);
    res.status(500).json({
      success: false,
      message: "Failed to load stats",
    });
  }
};

// @route GET /api/admin/discoveries?status=under-review|verified|rejected|all
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

// Shared logic behind both approve and reject
const setDiscoveryStatus = async (req, res, newStatus) => {
  try {
    const discovery = await Discovery.findById(req.params.id);

    if (!discovery) {
      return res.status(404).json({
        success: false,
        message: "Discovery not found",
      });
    }

    discovery.status = newStatus;
    discovery.moderatedBy = req.user._id;
    discovery.moderatedAt = new Date();

    if (discovery.verificationTimeline?.[2]) {
      discovery.verificationTimeline[2].status = "completed";

      discovery.verificationTimeline[2].description =
        newStatus === "verified"
          ? "Reviewed and approved by museum admin."
          : "Reviewed and rejected by museum admin.";
    }

    if (discovery.verificationTimeline?.[3]) {
      discovery.verificationTimeline[3].status =
        newStatus === "verified" ? "completed" : "pending";
    }

    await discovery.save();

    await logActivity({
      action:
        newStatus === "verified"
          ? "discovery.approved"
          : "discovery.rejected",
      performedBy: req.user._id,
      targetId: discovery._id,
      targetType: "Discovery",
      details: discovery.fossilName,
    });

    res.json({
      success: true,
      status: discovery.status,
    });
  } catch (err) {
    console.error(
      `[admin.setDiscoveryStatus:${newStatus}]`,
      err
    );

    res.status(500).json({
      success: false,
      message: "Failed to update discovery",
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

module.exports = {
  getDashboardStats,
  getDiscoveriesForReview,
  getUsers,
  approveDiscovery,
  rejectDiscovery,
  updateUserRole,
  updateUserStatus,
  getActivityLogs,
};