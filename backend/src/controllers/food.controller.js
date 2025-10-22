const foodModel=require('../models/food.model')

async function createFood(req,res) {
    console.log(req.foodPartner);
    console.log(req.body);
    console.log(req.file);
    res.status(200).json({
        message:"Food item created"
    })
    // res.send("Food Item Created")
}

module.exports={
    createFood
}