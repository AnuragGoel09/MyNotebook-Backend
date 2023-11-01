const express=require('express')
const router=express.Router()
const fetchuser=require('../middleware/fetchUser')
const Notes=require('../models/Text');

router.get('/allnotes',fetchuser,async(req,res)=>{
    try {
        const notes= await Notes.find({user:req.user.id});
        res.json(notes);
    } catch (error) {
        res.status(500).send({error:"Internal Server Error"});
    }
})

// Get all the notes using GET "/api/notes/fetchallnotes"
router.get('/fetchallnotes/:id',fetchuser,async(req,res)=>{

    try {
        const notes= await Notes.find({notebook:req.params.id});
        res.json(notes);
    } catch (error) {
        res.status(500).send({error:"Internal Server Error"});
    }
});

// All notes for loggedin users using PORT : "/api/notes/addnote"
router.post('/addnote/:id',fetchuser,async(req,res)=>{
    try {
        const note=new Notes({notebook:req.params.id,user:req.user.id});
        const savedNote= await note.save();
        res.send(savedNote);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({error:"Internal Server Error"});
    }
})

// Update note for loggedin users using PUT : "/api/notes/updatenote"
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    try {
        const {title,desc,bgcolor,fontcolor}=req.body;

        // Create a newNote
        const newNote={title,desc,bgcolor,fontcolor};
        
        // find the note to be updated
        let note= await Notes.findById(req.params.id);
        
        // if note not exist
        if(!note){
            res.status(303).send("Not Found");    
        }
        // console.log(note)
        // console.log(req.body)
        // if some other user accessing the note
        if(note.user.toString()!==req.user.id){
            return res.status(401).send({error:"Not Allowed"})
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        res.json(note);

    } catch (error) {
        console.log(error.message)
        res.status(500).send({error:"Internal Server Error"});   
    }
})

// Delete Note for loggedin users using DEL : "/api/notes/deletenote"
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try {
        // find the note to be deleted
        let note= await Notes.findById(req.params.id);
        
        // if note not exist
        if(!note){
            res.status(303).send("Not Found");    
        }
        
        // if some other user accessing the note
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"success":"Note has been deleted"});

    } catch (error) {
        console.log(error.message)
        res.status(500).send({error:"Internal Server Error"});   
    }
})

module.exports=router