const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const pdf = require("html-pdf");
const puppeteer = require("puppeteer");
const fs = require("fs");

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Root route - serves index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Utility function to generate random values
function generateRandomValues() {
  return {
    capitalLetters: Math.random().toString(36).substring(2, 10).toUpperCase(),
    mixedLetters: Math.random().toString(36).substring(2, 10),
    number: (Math.random() * 999).toFixed(2),
    name: ["Adam", "Smith", "Biten", "John", "Emily"][
      Math.floor(Math.random() * 5)
    ],
  };
}

// Function to replace tags in a template
function replaceTags(template, recipientEmail, randomValues) {
  return template
    ?.replace(/\$email/g, recipientEmail)
    ?.replace(/\$ran/g, randomValues.capitalLetters)
    ?.replace(/\$id/g, randomValues.mixedLetters)
    ?.replace(/\$num/g, randomValues.number)
    ?.replace(/\$name/g, randomValues.name);
}

// Generate random 8-character alphanumeric string
function generateRandomFileName() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// Convert HTML to PDF buffer
function htmlToPdfBuffer(htmlContent) {
  return new Promise((resolve, reject) => {
    pdf.create(htmlContent).toBuffer((err, buffer) => {
      if (err) return reject(err);
      resolve(buffer);
    });
  });
}

// Convert HTML to Image (PNG/JPEG) buffer
async function htmlToImageBuffer(htmlContent, format = "png") {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  const buffer = await page.screenshot({ fullPage: true, type: format });
  await browser.close();
  return buffer;
}

// Endpoint to send bulk emails with optional attachments
app.post("/send-emails", async (req, res) => {
  const {
    emails,
    subjects = [],
    htmlTemplates = [],
    userEmail,
    userPassword,
    attachmentType,
  } = req.body;
  console.log(emails, subjects);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: userEmail,
      pass: userPassword,
    },
  });

  let failedEmails = [];

  for (let i = 0; i < emails.length; i++) {
    const recipientEmail = emails[i].trim();

    // Generate random filename for attachment
    const randomFileName = generateRandomFileName();

    // Generate random values
    const randomValues = generateRandomValues();

    // Get the subject line, rotating through the subjects
    const subject = subjects.length
      ? replaceTags(subjects[i % 2], recipientEmail, randomValues)
      : "No Subject";

    // Select the correct HTML template (box) in a round-robin fashion
    const boxIndex = i % 3; // 0 for Box 1, 1 for Box 2, 2 for Box 3
    const htmlContent = replaceTags(
      htmlTemplates[boxIndex],
      recipientEmail,
      randomValues
    );

    let attachment;
    if (attachmentType === "pdf") {
      const pdfBuffer = await htmlToPdfBuffer(htmlContent);
      attachment = {
        filename: `${randomFileName}.${attachmentType}`,
        content: pdfBuffer,
        encoding: "base64",
      };
    } else if (attachmentType === "jpeg" || attachmentType === "png") {
      const imageBuffer = await htmlToImageBuffer(htmlContent, attachmentType);
      attachment = {
        filename: `${randomFileName}.${attachmentType}`,
        content: imageBuffer,
        encoding: "base64",
      };
    }

    let mailOptions = {
      from: userEmail,
      to: recipientEmail,
      subject: subject,
      ...(attachmentType
        ? { attachments: attachment ? [attachment] : [] }
        : { html: htmlContent }),
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${recipientEmail}`);
    } catch (err) {
      console.error(`Error sending email to ${recipientEmail}:`, err);
      failedEmails.push(recipientEmail);
    }
  }

  if (failedEmails.length) {
    return res
      .status(500)
      .json({ message: "Some emails failed to send.", failedEmails });
  }

  res.status(200).json({ message: "All emails sent successfully!" });
});

// Serve the app
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
