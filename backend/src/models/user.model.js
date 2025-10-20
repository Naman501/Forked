const mongoose= require('mongoose')

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        typr:String,
    }
},{
    timestamps:true
})

const userModel= mongoose.Mongoose.model("user",userSchema)

module.exports=userModel;