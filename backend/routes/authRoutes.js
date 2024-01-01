const express = require("express");
const router = express.Router();
const validation = require("../validation/validation");
const isAuth = require("../middelware/is-auth");

const authController = require("../controller/authController");

router.post("/signup", validation.validateSignupUser(), authController.signup);
router.post("/login", authController.login);
router.get("/users", isAuth, authController.getUsers);

module.exports = router;
