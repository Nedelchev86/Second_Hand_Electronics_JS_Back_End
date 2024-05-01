const router = require("express").Router();
const authController = require("./controllers/authController");
const homeController = require("./controllers/homeController");

router.use(authController);
router.use(homeController);

module.exports = router;
