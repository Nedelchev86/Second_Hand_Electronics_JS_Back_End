const router = require("express").Router();
const authController = require("./controllers/authController");
const homeController = require("./controllers/homeController");
const electronicsController = require("./controllers/electronicsController");

router.use(authController);
router.use(homeController);
router.use(electronicsController);

module.exports = router;
