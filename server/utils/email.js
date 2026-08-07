const nodemailer = require("nodemailer");

// Built lazily (on first send) rather than at import time.
let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true, // true for port 465
      family: 4, // force IPv4 - Render's IPv6 egress can't reach Gmail's SMTP host
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Without these, a blocked/throttled SMTP port (common on cloud
      // hosts like Render) causes sendMail() to hang on the OS-level
      // TCP timeout (can be 2+ minutes) instead of failing fast. That
      // hangs the whole signup/verify request even though the user
      // record was already created successfully.
      connectionTimeout: 8000, // time to establish the TCP connection
      greetingTimeout: 8000,   // time to wait for the SMTP greeting
      socketTimeout: 10000,    // time before an idle socket is killed
    });
  }

  return transporter;
};

const sendEmail = async ({ to, subject, html }) => {
  await getTransporter().sendMail({
    from: `"Paleora" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

const otpEmailTemplate = (otp, username) => `
  <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
    <h2 style="color:#c97a3d;">🦖 Paleora</h2>
    <p>Hi ${username || "there"},</p>
    <p>Use this code to verify your email and start exploring the dig site:</p>
    <p style="font-size: 28px; font-weight: bold; letter-spacing: 6px; background:#f4f1ea; padding: 14px 20px; text-align:center; border-radius: 8px;">${otp}</p>
    <p>This code expires in 10 minutes. If you didn't request this, you can ignore this email.</p>
  </div>
`;

const welcomeEmailTemplate = (username) => `
  <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
    <h2 style="color:#c97a3d;">🦖 Welcome to Paleora , ${username}!</h2>
    <p>Your account is verified and ready to go. Head back to the app to pick your dino guide and start exploring.</p>
  </div>
`;

module.exports = {
  sendEmail,
  otpEmailTemplate,
  welcomeEmailTemplate,
};