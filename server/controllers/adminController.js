// server/controllers/adminController.js
const User = require("../models/User");
const Discovery = require("../models/Discovery");

// @route GET /api/admin/stats
const getDashboardStats = async (req, res) => {
  try {
    const [userCount, adminCount, discoveryCount, underReview, verified] =
      await Promise.all([
        User.countDocuments(),
        User.countDocuments({ role: "admin" }),
        Discovery.countDocuments(),
        Discovery.countDocuments({ status: "under-review" }),
        Discovery.countDocuments({ status: "verified" }),
      ]);

    res.json({
      success: true,
      data: { userCount, adminCount, discoveryCount, underReview, verified },
    });
  } catch (err) {
    console.error("[admin.getDashboardStats]", err);
    res.status(500).json({ success: false, message: "Failed to load stats" });
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

    res.json({ success: true, discoveries });
  } catch (err) {
    console.error("[admin.getDiscoveriesForReview]", err);
    res.status(500).json({ success: false, message: "Failed to load discoveries" });
  }
};

// Shared logic behind both approve and reject
const setDiscoveryStatus = async (req, res, newStatus) => {
  try {
    const discovery = await Discovery.findById(req.params.id);
    if (!discovery) {
      return res.status(404).json({ success: false, message: "Discovery not found" });
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
    res.json({ success: true, status: discovery.status });
  } catch (err) {
    console.error(`[admin.setDiscoveryStatus:${newStatus}]`, err);
    res.status(500).json({ success: false, message: "Failed to update discovery" });
  }
};

// @route PATCH /api/admin/discoveries/:id/approve
const approveDiscovery = (req, res) => setDiscoveryStatus(req, res, "verified");

// @route PATCH /api/admin/discoveries/:id/reject
const rejectDiscovery = (req, res) => setDiscoveryStatus(req, res, "rejected");

module.exports = {
  getDashboardStats,
  getDiscoveriesForReview,
  approveDiscovery,
  rejectDiscovery,
};