
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

// For Path "/Signup"
router.route("/signup")
    // sign up
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

// for path "/Login"
router.route("/login")
   //login
   .get(userController.renderLoginForm)
   .post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash:true} ), userController.login);

//logout
router.get("/logout", userController.logout);


module.exports = router;