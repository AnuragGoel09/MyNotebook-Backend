const express=require('express');
const router=express.Router();
const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');
const JWT_SECRET="MyNotebook";
const {body,validationResult}=require('express-validator');

// Create a User using: POST "/api/auth/" . Doesn't require auth
router.post('/createuser',[
    body('email').isEmail(),
    body('name').isLength({min:1}),
    body('password').isLength({min:1})
],async(req,res)=>{
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.json({error:"Invalid Credentials"});
        }
        // Check whether user email exists already
        let user = await User.findOne({email:req.body.email});
        console.log(user)
        if(user){
            return res.json({error:"Email already exist"})
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
router.post('/login',[
    body('email').isEmail(),
    body('password').isLength({min:1})
],async (req,res)=>{
    
    const {email,password}=req.body;
    // console.log(req.body);
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.json({error:"Invalid Credentials"});
        }
        let user=await User.findOne({email});
        
        // if user not exist
        if(!user){
            return res.json({error:"Invalid Credentials"});
        }   
        const passwordCompare= await bcrypt.compare(password,user.password);
        // if password mismatch
        if(!passwordCompare){
            return res.json({error:"Invalid Credentials"});
        }
        const payload={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(payload,JWT_SECRET);
        res.json({authtoken});

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// Get loggedin User Details using POST "/api/auth/getuser" . Login Required ( need authtoken )
router.post('/getuser',fetchuser,async (req,res)=>{
    try {
        const userid=req.user.id;
        const user=await User.findById(userid).select("-password");
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports=router