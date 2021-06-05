function healthCheck(req, res) {
    return res.send("OK");
}

module.exports = {
    healthCheck,
};