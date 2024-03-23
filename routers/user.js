import express from "express"
import nodemailer from "nodemailer"

const userrouter=express.Router()

userrouter.post("/",async(req,res)=>{
    const {name,email,message}=req.body
        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"bharathsab123@gmail.com",
                pass:"ugzm otjt gcce mngl"
            }
        })
        const messages={
            from:"bharathsab123@gmail.com",
            to:req.body.email,
            subject:"password reset",
            text:`NAME:${name}\n 
            Email:${email}\n
            Message:${message}`
        }
        transporter.sendMail(messages,(err,info)=>{
            if(err){res.status(404).json({code:401,message:"Unable to Sent Message please try again"})}
            else{
                 console.log(req.body.email)
                res.status(200).json({code:201,message:"Email sent successfully"})}
        })
})
export default userrouter