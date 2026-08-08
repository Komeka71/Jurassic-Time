// // server/utils/logActivity.js
// const ActivityLog = require("../models/ActivityLog");

// async function logActivity({ action, performedBy, targetId, targetType, details }) {
//   try {
//     await ActivityLog.create({ action, performedBy, targetId, targetType, details });
//   } catch (err) {
//     // Never let logging failure break the actual admin action.
//     console.error("[logActivity]", err);
//   }
// }

// module.exports = logActivity;



const ActivityLog = require("../models/ActivityLog");

async function logActivity({
  action,
  performedBy,
  targetId,
  targetType,
  details,
}) {
  try {
    await ActivityLog.create({
      action,
      performedBy,
      targetId,
      targetType,
      details,
    });
  } catch (err) {
    // Logging failure should never break the admin action.
    console.error("[logActivity]", err);
  }
}

module.exports = logActivity;