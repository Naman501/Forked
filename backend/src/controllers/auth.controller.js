const userModel= require("../models/user.model")
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')

async function registerUser(req,res) {

    const {fullName,email,password}=req.body;

    const isUserAlreadyExists= await userModel.findOne({
        email
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"User Already Exists"
        })
    }

    const hashedPassword= await bcypt.hash(password,10)

    const user=await userModel.create({
        fullName,email,password:hashedPassword
    })
}