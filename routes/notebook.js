const express=require('express')
const router=express.Router()
const fetchuser=require('../middleware/fetchUser')
const Notebook=require('../models/Notebook')

// Get all the notebooks using GET "/api/notes/fetchallnotes"
router.get('/fetchallnotebooks',fetchuser,async(req,res)=>{

    try {
        const notebooks= await Notebook.find({user:req.user.id});
        res.json(notebooks);
    } catch (error) {
        res.status(500).send({error:"Internal Server Error"});
    }
});

// Add notebook for loggedin users using PORT : "/api/notes/addnote"
router.post('/addnotebook',fetchuser,async(req,res)=>{
    try {
        const {title,image}=req.body;
        const note=new Notebook({title,image,user:req.user.id});
        const savedNotebook= await note.save();
        res.send(savedNotebook);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({error:"Internal Server Error"});
    }
})

// Update notebook for loggedin users using PUT : "/api/notes/updatenote"
router.put('/updatenotebook/:id',fetchuser,async (req,res)=>{
    try {
        const {title,image}=req.body;

        // Create a newNote
        const newNotebook={title,image};
        
        // find the note to be updated
        let notebook= await Notebook.findById(req.params.id);
        
        // if note not exist
        if(!notebook){
            res.status(303).send("Not Found");    
        }
        
        // if some other user accessing the note
        if(notebook.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed")
        }
        notebook = await Notebook.findByIdAndUpdate(req.params.id,{$set:newNotebook},{new:true});
        res.json(notebook);

    } catch (error) {
        console.log(error.message)
        res.status(500).send({error:"Internal Server Error"});   
    }
})

// Delete Notebook for loggedin users using DEL : "/api/notes/deletenote"
router.delete('/deletenotebook/:id',fetchuser,async(req,res)=>{
    try {
        // find the note to be deleted
        let notebook= await Notebook.findById(req.params.id);
        
        // if note not exist
        if(!notebook){
            res.status(303).send("Not Found");    
        }
        
        // if some other user accessing the note
        if(notebook.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed")
        }
        notebook = await Notebook.findByIdAndDelete(req.params.id)
        res.json({"success":"Note has been deleted"});

    } catch (error) {
        console.log(error.message)
        res.status(500).send({error:"Internal Server Error"});   
    }
})

module.exports=router