const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const electronicService = require("../services/electronicsService");

router.get("/create", authMiddleware, (req, res) => {
    res.render("create");
});

router.post("/create", async (req, res) => {
    try {
        await electronicService.create({...req.body, owner: req.user});
        res.redirect("catalog");
    } catch (error) {
        console.log(error);
        res.render("create", {error: error.message});
    }
});
//     try {
//         // const electronicsData = req.body;
//         await electronics.create({...req.body, owner: req.user._id});
//         res.redirect("/catalog");
//     } catch (error) {
//         console.log(error);
//         res.render("create", {error: error.message});
//     }
// });

router.get("/catalog", authMiddleware, async (req, res) => {
    const Allelectronics = await electronicService.getAll().lean();
    console.log(req.user);
    res.render("catalog", {Allelectronics});
});

module.exports = router;
