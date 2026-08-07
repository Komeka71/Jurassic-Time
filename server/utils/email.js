// Sends email via the Gmail API (OAuth2) instead of raw SMTP or a
// third-party provider. Uses HTTPS under the hood, so it isn't affected
// by Render blocking outbound SMTP ports. Sends as your real Gmail
// address with no sender-domain verification needed.

const { google } = require("googleapis");

const OAUTH_PLAYGROUND_REDIRECT = "https://developers.google.com/oauthplayground";

let gmailClient = null;

const getGmailClient = () => {
  if (gmailClient) return gmailClient;

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    OAUTH_PLAYGROUND_REDIRECT
  );

  oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  gmailClient = google.gmail({ version: "v1", auth: oAuth2Client });
  return gmailClient;
};

// Gmail's API expects a raw, base64url-encoded RFC 2822 email message.
const buildRawMessage = ({ to, from, subject, html }) => {
  const messageParts = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=utf-8",
    "",
    html,
  ];

  const message = messageParts.join("\n");

  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const sendEmail = async ({ to, subject, html }) => {
  const gmail = getGmailClient();
  const sender = process.env.GMAIL_SENDER;

  const raw = buildRawMessage({
    to,
    from: `"Paleora" <${sender}>`,
    subject,
    html,
  });

  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw },
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