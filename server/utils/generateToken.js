const jwt = require("jsonwebtoken");

// Signs a JWT for a user and sets it as an httpOnly cookie on the response.
const generateToken = (res, userId) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );

  res.cookie("jwt", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
});
  return token;
};

module.exports = generateToken;