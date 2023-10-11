const express=require('express');
const router=express.Router();
const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const JWT_SECRET="MyNotebook";

// Create a User using: POST "/api/auth/" . Doesn't require auth
router.post('/createuser',async(req,res)=>{
    try {
        // Check whether user email exists already
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:"Email already exist"})
        }

        const salt=await bcrypt.genSalt(10);
        const secpPass=await bcrypt.hash(req.body.password,salt);
        // Create user
        user=await User.create({
            name:req.body.name,
            password:secpPass,
            email:req.body.email,
        });

        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        res.json({authtoken})
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})


// Authenticate a User using POST "/api/auth/login"
router.post('/login',async (req,res)=>{
    
    const {email,password}=req.body;
    try {
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Invalid Credentials"});
        }   
        const passwordCompare=bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({error:"Invalid Credentials"});
        }
        const payload={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(payload,JWT_SECRET);
        return res.json({authtoken});

    } catch (error) {
        return res.status(500).send("Some Error Occured");
    }
});
module.exports=router