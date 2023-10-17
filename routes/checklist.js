const express=require('express')
const router=express.Router()
const fetchuser=require('../middleware/fetchUser')
const checklist=require('../models/Checklist');

// Get all the notes using GET "/api/notes/fetchallnotes"
router.get('/fetchalllist/:id',fetchuser,async(req,res)=>{

    try {
        const list= await checklist.find({notebook:req.params.id});
        res.json(list);
    } catch (error) {
        res.status(500).send({error:"Internal Server Error"});
    }
});

// All notes for loggedin users using PORT : "/api/notes/addnote"
router.post('/addlist/:id',fetchuser,async(req,res)=>{
    try {
        const newList=new checklist({notebook:req.params.id,user:req.user.id});
        const savedList= await newList.save();
        res.send(savedList);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({error:"Internal Server Error"});
    }
})

// Update note for loggedin users using PUT : "/api/notes/updatenote"
router.put('/updatelist/:id',fetchuser,async (req,res)=>{
    try {
        const {title,list}=req.body;

        // Create a newNote
        const newList={title,list};
        
        // find the note to be updated
        let findlist= await checklist.findById(req.params.id);
        
        // if note not exist
        if(!findlist){
            res.status(303).send("Not Found");    
        }
        
        // if some other user accessing the note
        if(findlist.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed")
        }
        findlist = await checklist.findByIdAndUpdate(req.params.id,{$set:newList},{new:true});
        res.json(findlist);

    } catch (error) {
        console.log(error.message)
        res.status(500).send({error:"Internal Server Error"});   
    }
})

// Delete Note for loggedin users using DEL : "/api/notes/deletenote"
router.delete('/deletelist/:id',fetchuser,async(req,res)=>{
    try {
        // find the note to be deleted
        let list= await checklist.findById(req.params.id);
        
        // if note not exist
        if(!list){
            res.status(303).send("Not Found");    
        }
        
        // if some other user accessing the note
        if(list.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed")
        }
        note = await checklist.findByIdAndDelete(req.params.id)
        res.json({"success":"Note has been deleted"});

    } catch (error) {
        console.log(error.message)
        res.status(500).send({error:"Internal Server Error"});   
    }
})

module.exports=router