const nodemailer = require('nodemailer');

const hr_email = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, 
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.HR_EMAIL,
      pass: process.env.HR_EMAIL_PASS,
    },
});

module.exports = hr_email;