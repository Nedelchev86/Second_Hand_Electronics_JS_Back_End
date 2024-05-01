const router = require("express").Router();
const authService = require("../services/authService");
const jwt = require("../utils/jwt");
// const { registerValidation, loginValidation } = require("../validation");

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try {
        const token = await authService.login(email, password);

        res.cookie("auth", token);
        res.redirect("/");
    } catch (error) {
        res.render("login", {errorMessage: error.message});
    }
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("Email or password is wrong");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", async (req, res) => {
    try {
        const userData = req.body;
        const savedUser = await authService.register(userData);
        res.redirect("/login");
    } catch (error) {
        res.render("register", {errorMessage: error.message, userData: req.body});
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("auth");
    res.redirect("/");
});

module.exports = router;
