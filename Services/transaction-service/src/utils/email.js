import nodemailer from "nodemailer";

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.ethereal.email",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || "placeholder",
    pass: process.env.SMTP_PASS || "placeholder",
  },
});

export const sendEmail = async ({ to, subject, text, html }) => {
  let activeTransporter = transporter;
  let fromAddress = process.env.SMTP_FROM || "noreply@smartfuel.com";

  // If we are using Ethereal email and credentials are placeholders, auto-generate a test account
  if (
    (!process.env.SMTP_HOST || process.env.SMTP_HOST === "smtp.ethereal.email") &&
    (!process.env.SMTP_USER || process.env.SMTP_USER === "placeholder")
  ) {
    try {
      const testAccount = await nodemailer.createTestAccount();
      activeTransporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      fromAddress = testAccount.user;
      console.log(`[SMTP Ethereal] Created test account: ${testAccount.user}`);
    } catch (err) {
      console.error("[SMTP Ethereal] Failed to create test account:", err.message);
    }
  }

  const mailOptions = {
    from: fromAddress,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await activeTransporter.sendMail(mailOptions);
    console.log(`[SMTP] Email sent: ${info.messageId}`);
    if (activeTransporter.options.host === "smtp.ethereal.email") {
      console.log(`[SMTP Ethereal] View email at: ${nodemailer.getTestMessageUrl(info)}`);
    }
    return info;
  } catch (err) {
    console.error("[SMTP] Error sending email:", err.message);
    throw err;
  }
};
