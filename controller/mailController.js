const mailer = require('../service/mail')

function SendContactMail(req, res) {
    try {

        const mailData = {
            from: "website@hawabowls.com",
            to: "bertynboulikou@gmail.com",
            subject: "Formulaire de contact du site web",
            text: `Bonjour, </br> 
            <p>Vous avez reçu un nouveau messagede la part de`,
            html: req.body.content

        }
        mailer(mailData)
        res.status(200).send({ message: "Mail send" })
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}


module.exports = {
    SendContactMail
}