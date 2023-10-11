const mongoose=require('mongoose')
const mongoURI="mongodb+srv://goelanurag2003:Goel%402003@cluster0.i685o29.mongodb.net/"

const connectToMongo=()=>{
    try {
        mongoose.connect(mongoURI)
        console.log("Mongo Connected Successfully")
    } catch (error) {
        console.log(error)        
    }

}
module.exports=connectToMongo