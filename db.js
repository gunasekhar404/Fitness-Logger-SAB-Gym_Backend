import mongoose from "mongoose"

export function Connectdb(){
    const params ={
        useNewUrlParams:true,
        useUnifiedTopology:true
    }
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log("database connected")
    }catch(error){
        console.log("error to connect database",error)
    }
}