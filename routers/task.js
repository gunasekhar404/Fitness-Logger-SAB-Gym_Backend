import { User } from "../user.js";
import express from "express"
import otpGenerator from "otp-generator"

const taskrouter=express.Router()


taskrouter.post("/:email",async(req,res)=>{
   const {title,message} = req.body
   const {email} = req.params
   const id = otpGenerator.generate(10, { upperCaseAlphabets: false, specialChars: false })
   try{
      await User.updateOne({ email:email },{$push:{task:{id:id,title:title,message:message }}})
      res.status(200).json({code:200,message:"sent sucessfully"})
   }
   catch(err){
      res.status(400).json({code:400,message:"error"})
   }
      
})

taskrouter.get("/:email",async(req,res)=>{
   const {email} = req.params
   if(!email){
      res.status(404).json({code:403,message:"there is no email"})
   }else{
      const user =await User.findOne({email})
      const task= user.task
      res.status(200).json(task)}
})

taskrouter.delete('/del/:email/:id', async (req, res) => {
   const {email} = req.params
   const { id } = req.params;
   console.log(id)
   
   try {
   
     const object = await User.updateOne({ email:email },{$pull:{task:{id:id}}})
     if (!object) {
       return res.status(404).json({ message: 'Object not found' });
     }
 
     return res.status(200).json({ message: 'Object deleted successfully' });
   } catch (error) {
     return res.status(500).json({ message: 'Error deleting object' });
   }
 });

export default taskrouter
