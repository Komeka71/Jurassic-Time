const generateOtp = () => {
  return String(Math.floor(100000 + Math.random() * 900000));
};

const OTP_TTL_MS = 10 * 60 * 1000;

module.exports = {
  generateOtp,
  OTP_TTL_MS,
};