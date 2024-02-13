
const isConnected = (req, res, next) => {
    res.locals.isConnected = req.session.login;
    next();
};

module.exports = isConnected;