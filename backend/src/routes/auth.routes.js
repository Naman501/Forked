const express= require('express')
const authController = require("../controllers/auth.controller")
const userModel = require('../models/user.model')

const router=express.Router()

router.post("/user/register", authController.registerUser)
router.post("/user/login", authController.loginUser)
router.get("/user/logout",authController.logoutUser)

module.exports=router;