const express = require("express");
const router = express.Router();
const authControl = require('../control/authControl')
const forgotControl = require('../control/forgotControl')



router.post("/sign-in", authControl.sign_in_post);

router.post("/log-in",authControl.log_in_post);

router.get("/log-out",authControl.log_out_get);

router.post("/forgot-password", forgotControl.forgot_password_post);

router.get("/reset-password/:id", forgotControl.reset_password_get);

router.put("/reset-password", forgotControl.reset_password_put);

router.get("/verify-account/:id", authControl.verify_account_get);

router.get("/log-in",authControl.log_in_get);

router.get("/sign-in",authControl.sign_in_get);

module.exports = router;