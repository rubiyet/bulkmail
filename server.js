const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Bulk Email Tool API');
});

// Endpoint to send bulk emails
app.post('/send-emails', async (req, res) => {
    const { emails, subjects, body, userEmail, userPassword } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: userEmail,
            pass: userPassword,
        },
    });

    let failedEmails = [];

    for (let i = 0; i < emails.length; i++) {
        let mailOptions = {
            from: userEmail,
            to: emails[i],
            subject: subjects[i] || 'Default Subject',
            text: body,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${emails[i]}`);
        } catch (err) {
            console.error(`Error sending email to ${emails[i]}`, err);
            failedEmails.push(emails[i]);
        }
    }

    if (failedEmails.length) {
        return res.status(500).json({ message: 'Some emails failed to send.', failedEmails });
    }

    res.status(200).json({ message: 'All emails sent successfully!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
