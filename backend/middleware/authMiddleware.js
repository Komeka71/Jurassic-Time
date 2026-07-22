import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Verifies the JWT cookie and attaches the logged-in user to req.user.
// Any route that uses this should be considered "logged-in users only."
export const protect = async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ message: "Not logged in. Please sign in first." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "This account no longer exists." });
    }
    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email first." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Session expired. Please log in again." });
  }
};

// Authorization (not just authentication): only lets admins through.
// Use after `protect` on routes like approving contributions.
export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admins only." });
  }
  next();
};
