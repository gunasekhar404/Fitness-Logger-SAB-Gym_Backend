import { User } from "../user.js";
import express from "express"


const updatedetails=express.Router()

updatedetails.post("/:email",async(req,res)=>{
  const { fname,lname,height,weight,age} = req.body
  const {email} = req.params
  const user =await User.findOne({email})
  const useremail=user.email
  if(useremail==email){
    await User.updateOne({ email:useremail },{$set:{fname:fname }})
    await User.updateOne({ email:useremail },{$set:{lname:lname}})
    await User.updateOne({ email:useremail },{$set:{height:height }})
    await User.updateOne({ email:useremail },{$set:{weight:weight}})
    await User.updateOne({ email:useremail },{$set:{age:age }})
    res.status(200).json({code:205,message:"update success"})
    }else{
        res.status(404).json({code:405,message:"Update error please try again"})}

})


export default updatedetails