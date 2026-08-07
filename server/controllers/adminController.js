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

module.exports = { getDashboardStats };