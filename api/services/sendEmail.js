import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "Gmail", // e.g., 'Gmail', 'SendGrid', etc.
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Send email
  const sendMail = (email, text, subject) => {
    transporter.sendMail({
        // Define email options
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text: text,
    }, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          res.status(500).json({ message: "Error sending email" });
        } else {
          console.log("Email sent:", info.response);
          res.json({ message: "Email sent successfully" });
        }
      });
  }

  export default sendMail;
  