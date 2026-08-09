/**
 * Rewritten against the REAL schemas found in your codebase (not guesses):
 *
 * - req.user is set by `protect` (server/middleware/authMiddleware.js) from
 *   the JWT cookie -- it's the auth `User` document: username, email, photo,
 *   quizStats{maxScore,maxStreak}, points, badges, preferences, companion.
 * - Game progress lives in a SEPARATE `UserStats` collection, keyed by the
 *   plain username string (not an ObjectId ref): xp, level, coins,
 *   dailyStreak, longestStreak, discoveredDinosaurs[], purchasedItems[],
 *   equippedItems (Map), soundPreferences, quizzesPlayed, highestScore.
 * - `DailyMission` is one doc per username+date, with an embedded
 *   `missions[]` array. Claiming is done by MISSION TITLE, matching your
 *   existing PATCH /api/daily/:username/claim route -- there is no mission id
 *   endpoint, so this controller reuses that exact contract.
 * - `Discovery` documents are NOT linked to a user id -- the journal only
 *   stores a free-typed `signature` string. This controller best-effort
 *   matches `signature === req.user.username`. If your discoveries use a
 *   different linkage in practice, tell me and I'll fix the query.
 * - Dinosaur names/images/rarity and shop item names/images/descriptions
 *   only exist in frontend data files (data/dinosaurs.js, data/shopItems.js)
 *   -- the backend only knows IDs. This endpoint returns the unlocked/owned
 *   ID lists; the frontend cross-references them against those data files
 *   (see ProfilePage.jsx changes).
 */

const UserStats = require("../models/UserStats");
const QuizAttempt = require("../models/QuizAttempt");
const DailyMission = require("../models/DailyMission");
const Discovery = require("../models/Discovery");

function todayKey() {
  return new Date().toISOString().split("T")[0];
}
/**
 * Discovery.status uses: field-draft, under-review, verified, rejected, featured.
 * ResearchContributions.jsx only knows about three tones: verified, pending, rejected.
 * Normalize here so the badge color always resolves instead of falling through
 * to the default "neutral" tone for under-review/field-draft/featured docs.
 */
function mapDiscoveryStatus(status) {
  if (status === "verified" || status === "featured") return "verified";
  if (status === "rejected") return "rejected";
  return "pending"; // field-draft, under-review
}
// GET /api/users/dashboard  (protected)
exports.getDashboard = async (req, res) => {
  try {
    const user = req.user; // auth User doc, already verified by `protect`
    const username = user.username;

    let stats = await UserStats.findOne({ username });
    if (!stats) {
      stats = await UserStats.create({ username });
    }

    const today = todayKey();
    const [dailyDoc, recentQuizzes, discoveries] = await Promise.all([
      DailyMission.findOne({ username, date: today }),
      QuizAttempt.find({ username }).sort({ createdAt: -1 }).limit(20),
      // Matches on the new `user` ref when present (see
      // discoveries.createDiscovery.patch.js), falling back to the legacy
      // free-typed `signature` field for discoveries created before that
      // patch. Once all discoveries have `user` set, drop the signature arm.
      Discovery.find({
        $or: [{ user: user._id }, { signature: username }],
      }).sort({ createdAt: -1 }),
    ]);

    const accuracy =
      recentQuizzes.length && recentQuizzes[0].totalQuestions
        ? Math.round(
            recentQuizzes.reduce((s, q) => s + (q.score || 0), 0) /
              recentQuizzes.length
          )
        : 0;

    res.json({
      // Identity (from auth User)
    username: user.username,
      email: user.email,
      avatarUrl: user.photo?.url || "",
      verified: !!user.photo?.verified,
      joinDate: user.createdAt,
      badges: user.badges || [],
      points: user.points || 0,
      quizStats: user.quizStats || { maxScore: 0, maxStreak: 0 },
      preferences: user.preferences || {},
      companion: user.companion || {},
      fullName: user.fullName || "",
      bio: user.bio || "",

      // Game progress (from UserStats)
      level: stats.level || 1,
      xp: stats.xp || 0,
      coins: stats.coins || 0,
      dailyStreak: stats.dailyStreak || 0,
      longestStreak: stats.longestStreak || 0,
      quizzesPlayed: stats.quizzesPlayed || 0,
      highestScore: stats.highestScore || 0,
      discoveredDinosaurIds: stats.discoveredDinosaurs || [],
      purchasedItemIds: stats.purchasedItems || [],
      equippedItems: stats.equippedItems || {},
      soundPreferences: stats.soundPreferences || { music: true, effects: true },

      // Derived
      stats: {
        xp: stats.xp || 0,
        coins: stats.coins || 0,
        level: stats.level || 1,
        quizAttempts: stats.quizzesPlayed || 0,
        accuracy,
        bestStreak: stats.longestStreak || 0,
        dailyStreak: stats.dailyStreak || 0,
        discoveries: discoveries.length,
        dinosaursCollected: (stats.discoveredDinosaurs || []).length,
        achievementsUnlocked: (user.badges || []).length,
      },

      recentQuizzes: recentQuizzes.map((q) => ({
        id: q._id,
        date: q.createdAt,
        topic: q.topic,
        difficulty: q.difficulty,
        score: q.score,
        totalQuestions: q.totalQuestions,
        xpEarned: q.xpEarned,
        coinsEarned: q.coinsEarned,
        timeTaken: q.timeTaken,
      })),

      // Requires the expeditionLevels field patch -- see
      // models/UserStats.expedition.patch.js. Returns [] gracefully until
      // that's added.
      expedition: (stats.expeditionLevels || []).map((lvl) => ({
        id: lvl.number,
        number: lvl.number,
        name: lvl.name,
        status: lvl.status,
      })),

      dailyMissions: {
        list: (dailyDoc?.missions || []).map((m) => ({
          id: m._id,
          title: m.title,
          description: m.description,
          progress: m.progress,
          target: m.goal,
          completed: m.completed,
          claimed: m.claimed,
          rewardXP: m.rewardXP,
          rewardCoins: m.rewardCoins,
        })),
      },
discoveries: discoveries.map((d) => ({
  _id: d._id,
  title: d.species,
  species: d.species,
  era: d.era,
  location: d.location,
  verified: d.status === "verified",
  likes: d.upvotes || 0,
  photoUrl: d.evidence?.[0]
    ? `/uploads/discoveries/${d.evidence[0].filename}`
    : null,

  // NEW — needed by DiscoveriesSection.jsx
  archiveId: d.archiveId,
  date: d.createdAt,

  // From the earlier Research Contributions patch
  status: mapDiscoveryStatus(d.status),
  aiConfidence: d.aiVerification?.confidence ?? 0,
  comments: d.comments ?? 0,
  submitted: d.createdAt,
})),
      account: {
        email: user.email,
        accountId: user._id,
        joinDate: user.createdAt,
        verified: !!user.isVerified,
      },
    });
  } catch (err) {
    console.error("[profile.getDashboard]", err);
    res.status(500).json({ message: "Failed to load profile dashboard" });
  }
};
