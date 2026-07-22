import jwt from "jsonwebtoken";

// Signs a JWT for a user and sets it as an httpOnly cookie on the response.
// httpOnly cookies can't be read by frontend JS, which protects against XSS
// token theft (a token in localStorage can be read by any injected script).
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

export default generateToken;
