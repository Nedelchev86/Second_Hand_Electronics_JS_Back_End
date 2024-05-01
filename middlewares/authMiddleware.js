const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.cookies["auth"];

    if (!token) {
        res.locals.isAuthenticated = false;
        return next();
    }
    try {
        const decodeToken = jwt.verify(token, "ferferf345r34wrd34wf34f3");
        res.locals.isAutenticated = true;
        res.locals.user = decodeToken;
        next();
    } catch (err) {
        res.clearCookie("auth");
        res.redirect("/login");
    }
};

module.exports = authMiddleware;
