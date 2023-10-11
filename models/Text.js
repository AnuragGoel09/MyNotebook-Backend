const mongoose=require('mongoose')
import { Schema } from 'mongoose'

const TextSchema=new Schema({
    title:{
        type:String,
        default:"Untitled"
    },
    desc:{
        type:String,
    },
});
module.exports=mongoose.model('note',TextSchema)