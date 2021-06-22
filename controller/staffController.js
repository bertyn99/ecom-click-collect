// To declare
//db and schema
/* const User = require("../db/type/user"); */
const Staff = require("../db/model/Staff");

const bcrypt = require("bcrypt");

async function register(req, res) {
    console.log(req.body);
    const staff = new Staff(req.body)
    console.log("i")
    try {
        console.log("ic")
        await staff.save()
        console.log("ici")
        //envoyer l'emaild e confirmation de création de compte
        const token = await staff.generateAuthToken()
        res.status(201).send({ staff, token })
    } catch (e) {
        res.status(400).send(e)
    }
}

async function logIn(req, res) {
    try {
        const staff = await Staff.findByCredentials(req.body.email, req.body.password)
        const token = await staff.generateAuthToken()
        res.send({ staff, token })
    } catch (e) {
        res.status(400).send(e)
    }
}

async function logOut(req, res) {
    try {
        req.staff.tokens = []
        await req.staff.save()

        res.send()
    } catch (e) {
        res.status(500).send(e)
    }

}

async function myInfo(req, res) {
    const _id = req.params.id

    try {

        const staff = await Staff.findById(_id)
        console.log(staff)
        if (!staff) {
            return res.status(404).send("This is a wrong id")
        }
        res.status(200).send(staff)
    } catch (e) {
        res.status(404).send("This is a wrong id")
    }
}

async function updateInfo(req, res) {
    const allowedUpdates = ['name', 'email', 'password']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid Upadates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.staff.save()
        res.send(req.staff)

    } catch (e) {
        res.status(400).send(e)
    }
}

async function deleteStaff(req, res) {
    try {
        await req.staff.remove()
        res.send(req.staff)
    } catch (e) {
        res.status(500).send(e)
    }
}


module.exports = {
    register,
    logIn,
    logOut,
    myInfo,
    deleteStaff,
    updateInfo
}