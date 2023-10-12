const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ChecklistSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type:String,
        default:"Untitled"
    },
    list:{
        type:Array,
    },
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model('checklist',ChecklistSchema)