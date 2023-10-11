const express=require('express')
const router=express.Router()
const fetchuser=require('../middleware/fetchUser')
const Notes=require('../models/Text');

// Get all the notes using GET "/api/notes/fetchallnotes"
router.get('/fetchallnotes',fetchuser,async(req,res)=>{

    try {
        const notes= await Notes.find({user:req.user.id});
        res.json(notes);
    } catch (error) {
        res.status(500).send({error:"Internal Server Error"});
    }
});

// All notes for loggedin users using PORT : "/api/notes/addnote"
router.post('/addnote',fetchuser,async(req,res)=>{
    try {
        const {title,desc}=req.body;
        const note=new Notes({title,desc,user:req.user.id});
        const savedNote= await note.save();
        res.send(savedNote);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({error:"Internal Server Error"});
    }
})

module.exports=router