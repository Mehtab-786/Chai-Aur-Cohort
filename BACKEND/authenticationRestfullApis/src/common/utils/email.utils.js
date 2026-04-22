import nodemailer from "nodemailer";
import APIError from "./APIError.js";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// try {
//   const info = await transporter.sendMail({
//     from: '"Example Team" <team@example.com>', // sender address
//     to: "alice@example.com, bob@example.com", // list of recipients
//     subject: "Hello", // subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // HTML body
//   });

//   console.log("Message sent: %s", info.messageId);
// } catch (err) {
//   console.error("Error while sending mail:", err);
// }


const sendMail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `${process.env.SMTP_FROM_EMAIL}`,
      to,
      subject,
      html
    })
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error while sending mail:", error);
    throw new APIError(500, "Email sending failed");
  }
}
const sendVerificationToken = async (email, token, subject, html) => {
  try {
    const url = `${process.env.CLIENT_URL}/verify-email/${token}`;

    await sendMail(
      email,
      'Verify your email',
        `<h2>Welcome!</h2><p>Click <a href="${url}">here</a> to verify your email.</p>`
    )
  } catch (error) {
    throw new APIError(500, "Error while sending token")
  }
}

export { sendMail, sendVerificationToken }
