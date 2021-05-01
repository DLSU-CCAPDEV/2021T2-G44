const nodemailer = require("nodemailer");
require('dotenv').config();

// Prepare Mail Transporter Object
const mailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: String(process.env.NODE_ENV) === 'production',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
module.exports.mailTransporter = mailTransporter;