const Staff = require("../db/Model/Staff");
const config = require('../config');
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, config.JWT_SECRET)
        const staff = await Staff.findOne({ _id: decoded._id, role: decoded.role, 'tokens.token': token })
        console.log(staff)
        if (!staff) {
            throw new Error()
        }

        req.token = token;
        req.staff = staff;
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }

}

module.exports = verifyToken;