const mongoose=require('mongoose')
const Schema=mongoose.Schema

const NotebookSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type:String,
        default:"New Notebook"
    },
    image:{
        type:String,
        default:"./notebook-cover/pattern1.jpg"
    },
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model('notebook',NotebookSchema)