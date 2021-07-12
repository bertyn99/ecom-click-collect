const nodemailer = require("nodemailer")
const config = require('../config');
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.MAIL,
        pass: config.MAILPASS,
    }
});

let sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log(err)
        }
        console.log(info);
        return info
    })
}


module.exports = sendMail;