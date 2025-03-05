const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

function generateVerificationCode(length = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // No 0, 0, I and 1 to avoid confusion
  let code = "";

  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

async function sendVerificationCode(clientEmail, code) {
  try {
    const verificationCode = generateVerificationCode();
    const mailOptions = {
      from: `Xirion Africa <${process.env.MY_EMAIL}>`,
      to: clientEmail,
      subject: "Xirion Africa - Verify Your Email",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="text-align: center; color: #ff6600;">XIRION AFRICA</h2>
          <p style="font-size: 16px; color: #555;">Thank you for signing up. To complete your registration, please use the verification code below:</p>
          <div style="font-size: 20px; font-weight: bold; color: #FF6600; text-align: center; margin: 20px 0;">${code}</div>
          <p style="font-size: 16px; color: #555;">This code is valid for <strong>30 minutes</strong>. If you did not request this, please ignore this email.</p>
          <hr>
          <p style="font-size: 14px; text-align: center; color: #888;">&copy; ${new Date().getFullYear()} Xirion Africa. All rights reserved.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return verificationCode; // Return the code for further processing
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = { sendVerificationCode, generateVerificationCode };
