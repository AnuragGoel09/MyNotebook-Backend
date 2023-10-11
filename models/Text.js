const mongoose=require('mongoose')
const Schema=mongoose.Schema

const TextSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type:String,
        default:"Untitled"
    },
    desc:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model('note',TextSchema)