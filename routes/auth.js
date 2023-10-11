const express=require('express');
const router=express.Router();
const User=require('../models/User');

// Create a User using: POST "/api/auth/" . Doesn't require auth
router.post('/createuser',async(req,res)=>{
    
    try {
        // Check whether user email exists already
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:"Email already exist"})
        }
        user=await User.create({
            name:req.body.name,
            password:req.body.password,
            email:req.body.email,
        })
        res.json(user)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

module.exports=router