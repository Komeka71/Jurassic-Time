// // Sends email via the Gmail API (OAuth2) instead of raw SMTP or a
// // third-party provider. Uses HTTPS under the hood, so it isn't affected
// // by Render blocking outbound SMTP ports. Sends as your real Gmail
// // address with no sender-domain verification needed.

// const { google } = require("googleapis");

// const OAUTH_PLAYGROUND_REDIRECT = "https://developers.google.com/oauthplayground";

// let gmailClient = null;

// const getGmailClient = () => {
//   if (gmailClient) return gmailClient;

//   const oAuth2Client = new google.auth.OAuth2(
//     process.env.GOOGLE_CLIENT_ID,
//     process.env.GOOGLE_CLIENT_SECRET,
//     OAUTH_PLAYGROUND_REDIRECT
//   );

//   oAuth2Client.setCredentials({
//     refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
//   });

//   gmailClient = google.gmail({ version: "v1", auth: oAuth2Client });
//   return gmailClient;
// };

// // Gmail's API expects a raw, base64url-encoded RFC 2822 email message.
// const buildRawMessage = ({ to, from, subject, html }) => {
//   const messageParts = [
//     `From: ${from}`,
//     `To: ${to}`,
//     `Subject: ${subject}`,
//     "MIME-Version: 1.0",
//     "Content-Type: text/html; charset=utf-8",
//     "",
//     html,
//   ];

//   const message = messageParts.join("\n");

//   return Buffer.from(message)
//     .toString("base64")
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_")
//     .replace(/=+$/, "");
// };

// const sendEmail = async ({ to, subject, html }) => {
//   const gmail = getGmailClient();
//   const sender = process.env.GMAIL_SENDER;

//   const raw = buildRawMessage({
//     to,
//     from: `"Paleora" <${sender}>`,
//     subject,
//     html,
//   });

//   await gmail.users.messages.send({
//     userId: "me",
//     requestBody: { raw },
//   });
// };

// const otpEmailTemplate = (otp, username) => `
//   <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
//     <h2 style="color:#c97a3d;">🦖 Paleora</h2>
//     <p>Hi ${username || "there"},</p>
//     <p>Use this code to verify your email and start exploring the dig site:</p>
//     <p style="font-size: 28px; font-weight: bold; letter-spacing: 6px; background:#f4f1ea; padding: 14px 20px; text-align:center; border-radius: 8px;">${otp}</p>
//     <p>This code expires in 10 minutes. If you didn't request this, you can ignore this email.</p>
//   </div>
// `;

// const welcomeEmailTemplate = (username) => `
//   <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
//     <h2 style="color:#c97a3d;">🦖 Welcome to Paleora , ${username}!</h2>
//     <p>Your account is verified and ready to go. Head back to the app to pick your dino guide and start exploring.</p>
//   </div>
// `;

// module.exports = {
//   sendEmail,
//   otpEmailTemplate,
//   welcomeEmailTemplate,
// }; //brevo



// server/utils/email.js

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

const sendEmail = async ({ to, subject, html }) => {
  if (!process.env.BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY is not configured");
  }

  if (!process.env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM is not configured");
  }

  const response = await fetch(BREVO_API_URL, {
    method: "POST",

    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: JSON.stringify({
      sender: {
        name: "Paleora",
        email: process.env.EMAIL_FROM,
      },

      to: [
        {
          email: to,
        },
      ],

      subject,
      htmlContent: html,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");

    throw new Error(
      `Brevo API error (${response.status}): ${
        errorBody || response.statusText
      }`
    );
  }

  return response.json();
};


// ==========================================
// OTP EMAIL
// ==========================================

const otpEmailTemplate = (otp, username = "there") => `
<!DOCTYPE html>
<html>
  <body
    style="
      margin: 0;
      padding: 40px;
      background: #f5f7fa;
      font-family: Arial, sans-serif;
    "
  >
    <div
      style="
        max-width: 500px;
        margin: auto;
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      "
    >
      <h2 style="color: #2d3748;">
        Welcome to Paleora, ${username}!
      </h2>

      <p style="color: #4a5568;">
        Use the OTP below to verify your email address:
      </p>

      <div
        style="
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 8px;
          text-align: center;
          padding: 20px;
          margin: 25px 0;
          background: #f0f4ff;
          color: #4f46e5;
          border-radius: 10px;
        "
      >
        ${otp}
      </div>

      <p style="color: #718096;">
        This OTP is valid for a limited time.
        Please do not share it with anyone.
      </p>

      <p style="color: #718096;">
        If you did not request this code, you can safely ignore this email.
      </p>

      <p style="color: #4a5568;">
        — Team Paleora
      </p>
    </div>
  </body>
</html>
`;


// ==========================================
// WELCOME EMAIL
// ==========================================

const welcomeEmailTemplate = (username = "there") => `
<!DOCTYPE html>
<html>
  <body
    style="
      margin: 0;
      padding: 40px;
      background: #f5f7fa;
      font-family: Arial, sans-serif;
    "
  >
    <div
      style="
        max-width: 500px;
        margin: auto;
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      "
    >
      <h1 style="color: #2d3748;">
        Welcome to Paleora, ${username}! 🦖
      </h1>

      <p style="color: #4a5568; font-size: 16px;">
        Your account has been successfully created.
      </p>

      <p style="color: #4a5568;">
        You're now ready to explore the prehistoric world,
        discover fossils, learn about dinosaurs, and begin
        your Paleora journey.
      </p>

      <div
        style="
          background: #f0f4ff;
          padding: 20px;
          border-radius: 10px;
          margin: 25px 0;
        "
      >
        <strong>Ready to explore?</strong>

        <p style="margin-bottom: 0; color: #4a5568;">
          Log in to Paleora and start your adventure.
        </p>
      </div>

      <p style="color: #4a5568;">
        Happy exploring! 🦕
      </p>

      <p style="color: #718096;">
        — Team Paleora
      </p>
    </div>
  </body>
</html>
`;


// ==========================================
// EXPORTS
// ==========================================

module.exports = {
  sendEmail,
  otpEmailTemplate,
  welcomeEmailTemplate,
};