const userModel= require("../models/user.model")
const foodPartnerModel=require("../models/foodpartner.model")
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

    const hashedPassword= await bcrypt.hash(password,10)

    const user=await userModel.create({
        fullName,email,password:hashedPassword
    })

    const token = jwt.sign(
        {
            id:user._id,

        },process.env.JWT_SECRET
    )
    res.cookie("token",token,{
  httpOnly: true,
  secure: false,      // true only if you're on HTTPS
  sameSite: "lax",    // or "none" if backend and frontend are on different domains
})

    res.status(201).json({
        message:"User registered successfully.",
        user: {
            _id:user.id,
            email:user.email,
            fullName:user.fullName
        }
    })
}

async function loginUser(req,res) {
    const {email,password}=req.body;

    const user = await userModel.findOne({email})

    if(!user){
       return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    // console.log(user);

    const isPasswordValid=await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    //if we find user and afterwards password also matches=>
    
        const token = jwt.sign({
            id:user._id,
            },process.env.JWT_SECRET)

            res.cookie("token",token);

            res.status(200).json({
                message:"User logged-in successfully",
                user:{
                    _id:user._id,
                    email:user.email,
                    fullName:user.fullName
                }
            })

    }

function logoutUser(req,res) {
    // console.log(res);
    
    res.clearCookie("token");
    res.status(200).json({
        message:"User logged-out successfully"
    })
}

async function registerFoodPartner(req,res) {
    const {name,email,password,phone,address,contactName}=req.body;
// console.log(req.body);

    const isAccountAlreadyExists = await foodPartnerModel.findOne({email})

    if(isAccountAlreadyExists){
        return res.status(400).json({
            message:"Food Partner account already exists"
        })
    }

    const hashedPassword= await bcrypt.hash(password,10);

    const foodpartner = await foodPartnerModel.create({
name,
email,
password:hashedPassword,
phone,
address,
contactName
    })

const token = jwt.sign(
        {
            id:foodpartner._id,

        },process.env.JWT_SECRET
    )
    res.cookie("token",token);

    res.status(201).json({
        message:"Food Partner registered successfully.",
        foodpartner: {
            _id:foodpartner._id,
            email:foodpartner.email,
            fullName:foodpartner.fullName,
            thikana:foodpartner.address,
            mobile:foodpartner.phone,
            naam:contactName
        }
    })

}

async function loginFoodPartner(req,res) {
      const {email,password}=req.body;

    const foodpartner = await foodPartnerModel.findOne({email})

    if(!foodpartner){
       return res.status(400).json({
            message:"Invalid email or password"
        })
    }

     const isPasswordValid=await bcrypt.compare(password, foodpartner.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    //if we find user and afterwards password also matches=>
    
        const token = jwt.sign({
            id:foodpartner._id,
            },process.env.JWT_SECRET)

            res.cookie("token",token);

            res.status(200).json({
                message:"Food Partner logged-in successfully",
                foodpartner:{
                    _id:foodpartner._id,
                    email:foodpartner.email,
                    fullName:foodpartner.fullName
                }
            })
}

function logoutFoodPartner(req, res) {
res.clearCookie("token");
res.status(200).json({
message: "Food partner logged-out successfully"
});
}

module.exports={
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}