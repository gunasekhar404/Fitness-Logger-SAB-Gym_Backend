import { User } from "../user.js";
import express from "express"
import otpGenerator from "otp-generator"
import nodemailer from "nodemailer"
import bcrypt from "bcrypt"
const resetrouter=express.Router()

resetrouter.post("/",async(req,res)=>{
    const {email}=req.body
    try{
        const user=await User.findOne({email})
        if(user){
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false })
        await User.updateOne({ email:req.body.email },{$set:{OTP: otp }})
        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"bharathsab123@gmail.com",
                pass:"ugzm otjt gcce mngl"
            }
        })
        const message={
            from:"bharathsab123@gmail.com",
            to:req.body.email,
            subject:"password reset",
            text:`Here is your password reset OTP is ${otp}`
        }
        transporter.sendMail(message,(err,info)=>{
            if(err){res.status(404).json({code:401,message:"Unable to Sent OTP please try again",err})}
            else{
                 console.log(req.body.email)
                res.status(200).json({code:201,message:"email sent successfully"})}
        })
        }else{res.status(404).json({code:402,message:"user not found"})}

    }catch(err){res.status(404).json({code:503,message:"Somthing is wrong"})}
})


resetrouter.post("/otp",async(req,res)=>{
   const {OTP} = req.body
    const user =await User.findOne({OTP})
    console.log(user)
 if(user==null){res.status(404).json({code:405,message:"OTP unmatch"})}
     else{
     const userotp=user.OTP
   console.log(userotp)
     if(req.body.OTP==userotp){
         res.status(200).json({code:205,message:"otp match"})
     }else{res.status(404).json({code:405,message:"OTP unmatch"})}}
 })


resetrouter.post("/password/:OTP",async(req,res)=>{
    const npassword=req.body.npassword
    const cpassword=req.body.cpassword
    const {OTP} = req.params
    console.log(OTP)
    const user =await User.findOne({OTP})
    const userotp=user.OTP
    const useremail=user.email
    console.log(useremail)
    if(npassword==cpassword){
    if(OTP==userotp){
        const hashpassword=await bcrypt.hash(npassword,10)
        await User.updateOne({ email:useremail },{$set:{password:hashpassword }})
        await User.updateOne({ email:useremail },{$set:{OTP:""}})
        res.status(200).json({code:205,message:"password is reset sucessfully"})
    }else{
        res.status(404).json({code:405,message:"Unknown error please try again"})
    }}else{res.status(404).json({code:406,message:"Password is not match"})}
        

})


resetrouter.get("/:email",async(req,res)=>{
    const {email} = req.params
    if(!email){
       res.status(404).json({code:403,message:"there is no email"})
    }else{
       const user =await User.findOne({email})
       console.log(user)
       res.status(200).json([user])}
 })


export default resetrouter
