// 6-digit numeric OTP, e.g. "042819"
export const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

export const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
