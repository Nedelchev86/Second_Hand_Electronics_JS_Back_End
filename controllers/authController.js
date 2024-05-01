const authController = require("express").Router();
const authService = require("../services/authService");
// const jwt = require("jsonwebtoken");
// const { registerValidation, loginValidation } = require("../validation");

authController.get("/login", (req, res) => {
    res.render("login");
});

authController.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authService.login(email, password);
        const token = jwt.sign({ userId: user._id }, "your_secret_key_here", { expiresIn: "2h" });
        res.cookie("auth", token, { httpOnly: true });
        res.redirect("/"); // Redirect to dashboard or any other authenticated route
    } catch (error) {
        res.render("/login", {errorMessage: error.message, userData: req.body});
    }
});

authController.post("/login", async (req, res) => {
    // const { error } = loginValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("Email or password is wrong");
    // const validPass = await bcrypt.compare(req.body.password, user.password);
    // if (!validPass) return res.status(400).send("Email or password is wrong");
    // const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    // res.header("auth-token", token).send(token);
});

authController.get("/register", (req, res) => {
    res.render("register");
});

authController.post("/register", async (req, res) => {
    try {
        const userData = req.body;
        const savedUser = await authService.register(userData);
        res.redirect("/login");
    } catch (error) {
        res.render("register", {errorMessage: error.message, userData: req.body});
    }
});
module.exports = authController;
