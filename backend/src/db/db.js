const mongoose=require('mongoose')

function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("MongoDB connected.");  
    }).catch((error)=>{
        console.log("MongoDB connection error:",error);
        
    })   
}

module.exports=connectDB;