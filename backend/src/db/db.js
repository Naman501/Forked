const mongoose=require('mongoose')

function connectDB(){
    mongoose.connect("mongodb://localhost:27017/Forked")
    .then(()=>{
        console.log("MongoDB connected.");  
    }).catch((error)=>{
        console.log("MongoDB connection error:",error);
        
    })   
}

module.exports=connectDB;