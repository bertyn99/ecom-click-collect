const Staff = require("../db/model/staff");
const database = require("../db/connexion");


async function getAllStaff(req, res) {
    try {

        const all = await Staff.find()
        const allStaff = all.map(({ password, ...rest }) => rest)
        res.status(200).send(allStaff)
    } catch (e) {
        res.status(404).send("Cant get all the Staff")
    }
}

async function updaterole() {
    try {

    }
    catch (e) {
        res.status(404).send("Cant get all the Staff")
    }
}


module.exports = {
    getAllStaff,

}