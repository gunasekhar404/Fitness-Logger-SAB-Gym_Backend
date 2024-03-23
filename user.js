import mongoose,{Schema} from "mongoose"

const userschema= new mongoose.Schema({
    fname:{
        type:String,
        require:true
    },
    lname:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    OTP:{
        type:String,
        default:""  
    },
    weight:{
        type:String,
        default:0 
    },
    height:{
        type:String,
        default:0  
    },
    age:{
        type:String,
        default:0  
    },
    image:{
        type:String,
        default:"https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
    },
    task:[{
        id:{
            type:String,
            require:true
           },
       title:{
        type:String,
        require:true
       },
       message:{
        type:String,
        require:true
       }
    }]
})

const User=mongoose.model("User",userschema)
export {User}