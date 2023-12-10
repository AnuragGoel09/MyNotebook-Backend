const mongoose=require('mongoose')
require('dotenv').config();
const mongoURI=process.env.MONGODB_URI;
const connectToMongo=()=>{
    try {
        mongoose.connect(mongoURI)
        console.log("MongoDB Database Connected Successfully")
    } catch (error) {
        console.log(error)        
    }

}
module.exports=connectToMongo