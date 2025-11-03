const foodModel=require('../models/food.model')
const storageService = require('../services/storage.service.js')
const { v4 : uuid }=require('uuid')

async function createFood(req,res) {
    console.log("A",req.foodPartner);
    console.log("B",req.body);
    console.log("C",req.file);

    const fileUploadResult= await storageService.uploadFile(req.file.buffer,uuid())

    // console.log(fileUploadResult);
    
   const foodItem=await foodModel.create({
        name:req.body.name,
        description:req.body.description,
        video:fileUploadResult.url,
        foodPartner:req.foodPartner._id
    })

    res.status(201).json({
        message:"Food item created",
        food: foodItem
    })
    // res.send("Food Item Created")
}

async function getFoodItems(req,res) {
    const foodItems= await foodModel.find({})

    res.status(200).json({
        foodItems,
        message:"Food items fetched successfully",
    })
}

module.exports={
    createFood,
    getFoodItems
}