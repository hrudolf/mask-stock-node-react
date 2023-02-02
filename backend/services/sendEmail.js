require('dotenv').config()
const nodemailer = require('nodemailer');

const sendEmail = (regName) => {

    const message = `<p>Dear Admin, a new user (${regName}) has registered to the site. Please verify them.</p>`

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.MAILPASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: 'New user registered to your site!',
        html: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

module.exports = sendEmail;