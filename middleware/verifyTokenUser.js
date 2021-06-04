
const User = require("../db/model/USER");
const config = require("../config")
const jwt = require('jsonwebtoken');

const verifyTokenUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, config.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        console.log(user)
        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }

}

module.exports = verifyTokenUser;