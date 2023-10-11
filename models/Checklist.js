const mongoose=require('mongoose')
import { Schema } from 'mongoose'

const ChecklistSchema=new Schema({
    title:{
        type:String,
        default:"Untitled"
    },
    list:{
        type:Object,
    },
});
module.exports=mongoose.model('checklist',ChecklistSchema)