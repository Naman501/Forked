const express= require('express')
const authController = require("../controllers/auth.controller")
const userModel = require('../models/user.model')
const foodPartnerModel=require("../models/foodpartner.model")

const router=express.Router()

router.post("/user/register", authController.registerUser)
router.post("/user/login", authController.loginUser)
router.get("/user/logout",authController.logoutUser)


router.post("/food-partner/register",authController.registerFoodPartner)
router.post("/food-partner/login",authController.loginFoodPartner)
router.get("/food-partner/logout",authController.logoutFoodPartner)


module.exports=router;