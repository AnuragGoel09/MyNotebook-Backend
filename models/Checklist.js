const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ChecklistSchema=new Schema({
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
    list:{
        type:Array,
    },
    bgcolor:{
        type:String,
        default:"purple"
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
module.exports=mongoose.model('checklist',ChecklistSchema)