const authenticateRole = (roleArray) => (req, res, next) => {
    if (!req.staff) {
        return res.status(401).json({
            success: false,
            message: 'Session expired',
            code: 'SESSION_EXPIRED'
        });
    }
    const authorized = false;
    //if user has a role that is required to access any API
    rolesArray.forEach(role => {
        authorized = req.staff.role === role;
    })
    if (authorized) {
        return next();
    }
    return res.status(401).json({
        success: false,
        message: 'Unauthorized',
    })
}

module.exports = authenticateRole;