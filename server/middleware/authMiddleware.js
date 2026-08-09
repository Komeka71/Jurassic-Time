const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Verifies the JWT cookie and attaches the logged-in user to req.user.
// Any route that uses this should be considered "logged-in users only."
const protect = async (req, res, next) => {
 const authHeader = req.headers.authorization;

const token =
  authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

if (!token) {
  return res.status(401).json({
    message: "Not logged in. Please sign in first.",
  });
}
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        message: "This account no longer exists.",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email first.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Session expired. Please log in again.",
    });
  }
};

// Authorization middleware
const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      message: "Admins only.",
    });
  }

  next();
};

module.exports = {
  protect,
  adminOnly,
};