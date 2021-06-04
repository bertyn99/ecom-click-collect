// To declare
//db and schema
/* const User = require("../db/type/user"); */
const User = require("../db/model/USER");
const database = require("../db/connexion");

const bcrypt = require("bcrypt");

async function register(req, res) {

    const user = new User(req.body)

    try {
        await user.save()
        //envoyer l'emaild e confirmation de création de compte
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
}

async function logIn(req, res) {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
}

async function logOut(req, res) {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send(e)
    }

}

async function myInfo(req, res) {
    const _id = req.params.id

    try {

        const user = await User.findById(_id)
        console.log(user)
        if (!user) {
            return res.status(404).send("This is a wrong id")
        }
        res.status(200).send(user)
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
        await req.user.save()
        res.send(req.user)

    } catch (e) {
        res.status(400).send(e)
    }
}

async function deleteUser(req, res) {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
}


module.exports = {
    register,
    logIn,
    logOut,
    myInfo,
    deleteUser,
    updateInfo
}