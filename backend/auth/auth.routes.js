// auth.routes.js
const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/link-google", authController.linkGoogleAccount);
router.get("/is-google-linked", authController.isGoogleLinked);
router.post("/unlink-google", authController.unlinkGoogleAccount);
router.post("/verify-google-token", authController.verifyGoogleToken);
router.post("/login-google", authController.loginWithGoogle);
router.get("/user-info", authController.getUserInfo);
router.post("/change-password", authController.changePassword);

module.exports = router;
