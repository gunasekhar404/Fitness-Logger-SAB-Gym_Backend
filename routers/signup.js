import { User } from "../user.js";
import express from "express"
import bcrypt from "bcrypt"

const signuprouter=express.Router()

signuprouter.post("/",async(req,res)=>{
    const {fname,lname,gender,email,password}=req.body

    try{
        const user=await User.findOne({email})
        if(!user){
            
            const hashpassword=await bcrypt.hash(password,10)
        const newuser = new User({
            "fname":fname,
            "lname":lname,
            "gender":gender,
            "email" : email,
        "password" : hashpassword})
        await newuser.save()
       
    res.status(200).json({code:200,message:"create user",email:req.body.email})
   
}
   
        else{res.status(400).json({code:405,message:"user already exist"})}
    }catch(err){
        res.status(500);
        res.send(err);
        res.setHeader('Content-Type', 'text/html')
    }
})





export default signuprouter