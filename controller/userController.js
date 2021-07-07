// To declare
//db and schema
/* const User = require("../db/type/user"); */
const User = require("../db/Model/USER");
const cloudinary = require('../utils/cloudinary');
const path = require('path')

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

    const id = req.params.id
    const allowedUpdates = ['name', 'email', 'password', 'mobile', 'image']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid Upadates!' })
    }

    if (id != req.user._id) {
        res.status(404).json("Vous n'avrez pas le droit de mettre a jour un autre utilisateur");
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                upload_preset: "hawa_user_default"
            })
            req.user.avatar = result.secure_url
        }

        console.log(req.user._id)

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

async function uploadUser(req, res) {
    try {
        console.log(req.file.originalname.split('.')[0])
        const result = await cloudinary.uploader.upload(req.file.path, {
            upload_preset: "hawa_product_default"
        })
        res.json(result)
    } catch (e) {
        console.log(e)
    }
}
async function reconnectUser(req, res) {
    console.log('ici')
    return res.status(200).json(
        req.user
    );
}

module.exports = {
    register,
    logIn,
    logOut,
    myInfo,
    updateInfo,
    uploadUser,
    reconnectUser
}