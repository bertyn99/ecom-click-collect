const express = require("express");
const mail = require("../controller/mailController")
const router = express.Router()


router.post('/mail', mail.SendContactMail);

module.exports = router;