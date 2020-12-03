const express = require("express");
const router = express.Router();
const medControl = require('../control/medControl')
const { jwtverify} = require("../middileware/jwtVerify");

router.get('/home',jwtverify,medControl.home_get);

router.get('/account',jwtverify,medControl.account_get);

router.get('/',(req,res)=>{
    res.redirect('/home')
})

module.exports = router;