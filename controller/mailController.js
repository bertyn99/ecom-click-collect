const mailer = require('../service/mail')

function SendContactMail(req, res) {
    try {

        const mailData = {
            from: "website@hawabowls.com",
            to: "communication.hawabowls@gmail.com",
            subject: "Formulaire de contact du site web",
            html: `<p>&nbsp; &nbsp; Bonjour,<br><br>&nbsp;Vous&nbsp;avez&nbsp;reçu&nbsp;un&nbsp;nouveau&nbsp;messagede&nbsp;la&nbsp;part&nbsp;de : <strong>${req.body.firstname + ' ' + req.body.lastname}</strong><br><br>Il représente :<em><strong>${req.body.entreprise}</strong></em><br><br>Comment a-t-il entendu parlé de nous?: ${req.body.aboutus}<br><br>Voici son message :<br>   ${req.body.content} <br><br>Voici ces contact:<br>&nbsp; &nbsp;-Email: <a target="_blank" href="mailto:${req.body.email}">${req.body.email}</a><br>&nbsp; &nbsp;-Tel: &nbsp ${req.body.mobile};<br><br><br></p>`

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