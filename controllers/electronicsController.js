const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Electronics = require("../models/Electronics");

router.get("/create", authMiddleware, (req, res) => {
    res.render("create");
});
