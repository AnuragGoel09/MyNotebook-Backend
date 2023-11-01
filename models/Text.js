const mongoose=require('mongoose')
const Schema=mongoose.Schema

const TextSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    notebook:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'notebook'
    },
    title:{
        type:String,
        default:"Untitled"
    },
    desc:{
        type:String,
        default:""
    },
    bgcolor:{
        type:String,
        default:"blue"
    },
    fontcolor:{
        type:String,
        default:"white"
    },
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model('note',TextSchema)