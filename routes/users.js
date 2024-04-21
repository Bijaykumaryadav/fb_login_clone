const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user_controller");

router.get("/sign-up",usersController.signUp);
router.post("/create",usersController.create);
router.post("/create-session",usersController.createSession);
module.exports = router;