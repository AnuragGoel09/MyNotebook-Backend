const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ChecklistSchema=new Schema({
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
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model('checklist',ChecklistSchema)