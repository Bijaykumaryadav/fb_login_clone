//routes/user.js
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user_controller");

router.get("/sign-up",usersController.signUp);
router.post("/create",usersController.create);
router.post("/create-session",usersController.createSession);
router.get("/profile",usersController.profile);
module.exports = router;