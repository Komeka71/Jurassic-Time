


const express = require("express");
const router = express.Router();
const {
  createDiscovery,
  getLatestDiscoveries,
  getAllDiscoveries,
  getArchiveStats,
  getDiscoveryById,
  likeDiscovery,
  verifyDiscovery,
  addComment,
  getComments,
  getResearchNetworkStats,
  getResearchActivity,
  getTopContributors,
  getNetworkHealth,
} = require("../controllers/discoveryController");

const upload = require("../middleware/uploadDiscovery");
const { protect } = require("../middleware/authMiddleware");

/*
========================================
ARCHIVE STATS
========================================
*/
router.get("/archive-stats", getArchiveStats);

/*
========================================
LATEST DISCOVERIES
========================================
*/
router.get("/latest", getLatestDiscoveries);

/*
========================================
NETWORK
========================================
*/
router.get("/network-stats", getResearchNetworkStats);
router.get("/activity", getResearchActivity);
router.get("/top-contributors", getTopContributors);
router.get("/network-health", getNetworkHealth);

/*
========================================
ALL DISCOVERIES
========================================
*/
router.get("/", getAllDiscoveries);

/*
========================================
GET SINGLE DISCOVERY
========================================
*/
router.get("/:id", protect, getDiscoveryById);

/*
========================================
LIKE DISCOVERY
========================================
*/
router.post("/:id/like", protect, likeDiscovery);

/*
========================================
VERIFY DISCOVERY
========================================
*/
router.post("/:id/verify", protect, verifyDiscovery);
/*
========================================
GET COMMENTS
========================================
*/
router.get("/:id/comments", getComments);

/*
========================================
ADD COMMENT
========================================
*/
router.post("/:id/comments", protect, addComment);

/*
========================================
CREATE DISCOVERY
========================================
*/
router.post(
  "/",
  protect,
  upload.array("evidence", 10),
  createDiscovery
);

module.exports = router;