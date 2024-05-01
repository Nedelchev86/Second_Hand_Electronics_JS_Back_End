const jwt = require("../utils/jwt");

// const authMiddleware = async (req, res, next) => {
//     const token = req.cookies["auth"];

//     if (!token) {
//         res.locals.isAuthenticated = false;
//         return next();
//     }
//     try {
//         const decodeToken = await jwt.verify(token, "ferferf345r34wrd34wf34f3");
//         res.locals.isAutenticated = true;
//         req.user = decodeToken;
//         res.locals.user = decodeToken;
//         next();
//     } catch (err) {
//         res.clearCookie("auth");
//         res.redirect("/login");
//     }
// };

const authMiddleware = (req, res, next) => {
    let token = req.cookies["auth"];

    if (token) {
        jwt.verify(token, "ferferf345r34wrd34wf34f3")
            .then((decodedToken) => {
                req.user = decodedToken;
                res.locals.user = decodedToken;
                res.locals.isAutenticated = true;
                next();
            })
            .catch((err) => {
                res.clearCookie("auth");
                res.status(401).render("404");
            });
    } else {
        next();
    }
};

// exports.isAuth = function (req, res, next) {
//     if (req.user) {
//         next();
//     } else {
//         res.render('auth/login')
//     }
// }

// exports.isGuest = function (req, res, next) {
//     if (!req.user) {
//         next();
//     } else {
//         res.redirect('/');
//     }
// }

module.exports = authMiddleware;
