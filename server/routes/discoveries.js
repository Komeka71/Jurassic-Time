const express = require("express");
const router = express.Router();

const {
  createDiscovery,
  getLatestDiscoveries,
  getAllDiscoveries,
  getArchiveStats,
  getDiscoveryById,
  likeDiscovery,
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
ALL DISCOVERIES
========================================
*/
router.get("/", getAllDiscoveries);
router.get("/network-stats", getResearchNetworkStats);

router.get("/activity", getResearchActivity);
router.get("/top-contributors", getTopContributors);
router.get("/network-health", getNetworkHealth);

/*
========================================
GET SINGLE DISCOVERY
========================================
*/
router.get("/:id", getDiscoveryById);
/*
========================================
LIKE DISCOVERY
========================================
*/
router.post("/:id/like", likeDiscovery);


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
router.post("/:id/comments", addComment);
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