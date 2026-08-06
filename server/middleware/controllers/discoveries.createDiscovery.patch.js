/**
 * PATCH for your existing server/controllers/discoveries.js (or wherever
 * createDiscovery lives).
 *
 * Your frontend (JournalSection.jsx) already redirects to /login before
 * submitting if there's no logged-in user, so by the time this controller
 * runs, req.user SHOULD be populated -- but only if the discoveries route
 * actually has the `protect` middleware attached. Add it if it doesn't:
 *
 *   const { protect } = require("../middleware/authMiddleware");
 *   router.post("/", protect, upload.array("evidence"), createDiscovery);
 *
 * Then in createDiscovery, add a real `user` reference alongside the
 * existing free-typed `signature` field, so future queries don't have to
 * guess based on matching text:
 */

const discovery = await Discovery.create({
  archiveId,
  user: req.user?._id || null,     // <-- ADD THIS LINE
  fossilName: req.body.fossilName,
  location: req.body.location,
  latitude: req.body.latitude,
  longitude: req.body.longitude,
  era: req.body.era,
  species: req.body.species,
  notes: req.body.notes,
  signature: req.body.signature,   // kept for backward compatibility / display
  status: "under-review",
  // ...rest of your existing fields unchanged
});

/**
 * And in your Discovery schema, add:
 *   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
 *
 * Existing discoveries won't have `user` set (it'll be null), so
 * profile.controller.js queries by BOTH user id and signature as a
 * fallback -- see the updated query below.
 */
